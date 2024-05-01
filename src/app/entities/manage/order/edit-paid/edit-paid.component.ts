import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShareService} from "../../../../share/share.service";
import {OrderService} from "../order.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-paid',
  templateUrl: './edit-paid.component.html',
  styleUrls: ['./edit-paid.component.scss']
})
export class EditPaidComponent implements OnInit{
  checkboxForm: FormGroup;
  isEditButtonEnabled: boolean = false;
  currenValue: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPaidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: ShareService,
    private orderService: OrderService,
  ) {
    this.currenValue = this.data.isPaid ? 'isPaid' : this.data.isShipping ? 'isShipping' : 'isUnPaid';
    this.checkboxForm = this.fb.group({
      option: this.currenValue
    });
  }

  ngOnInit() {
    const InitValue =  this.checkboxForm.get('option')?.value
    if(InitValue === this.currenValue){
      this.isEditButtonEnabled = true
    }
    this.checkboxForm.get('option')?.valueChanges.subscribe((value) => {
      if(value !== this.currenValue){
        this.isEditButtonEnabled = false
      }else {
        this.isEditButtonEnabled = true
      }
    });
  }

  editStatus(value: any, data: any): void {
      const res = {
        ids: data.ids,
        isPaid: value.option === 'isPaid' ? 1 : value.option === 'isShipping' ? 2 : 0,
      }
    console.log(res)
    this.orderService.changeStatusOrder(res).subscribe(
      () =>{
        this.sharedService.triggerRefresh()
        this.closeDialog()
        this.openSnackBar('Edit successfully ! ', 'Close');

    },
      () => {
        this.closeDialog()

    })
  }
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }

  deleteOrders(data: any): void {
    this.orderService.deleteOrders(data).subscribe(
      () =>{
        this.closeDialog()
        this.sharedService.triggerRefresh()
        this.openSnackBar('Delete successfully ! ', 'Close');
      },
      ()=>{
        this.closeDialog()
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
