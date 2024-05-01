import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddAccountComponent} from "./add-account/add-account.component";
import {AccountService} from "./account.service";
import {EditPaidComponent} from "../order/edit-paid/edit-paid.component";
import {DeleteAccountComponent} from "./delete-account/delete-account.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataAccount: any[] = [];
  loading = false;
  noData = false;

  constructor( private dialog: MatDialog,
               private accountService: AccountService) {
  }

  ngOnInit() {
    this.getAccount()
  }

  getAccount(): void {
    this.loading = true
    this.accountService.getAccounts().subscribe(
      res =>{
        this.dataAccount = res
        this.loading = false
      }, error => {
        this.loading = false
      }
    )
  }
  onSearch(data: any): void{
    this.loading = true
    const res = {
      valueSearch: data.searchValue
    }
    this.accountService.searchAccount(res).subscribe(
      res =>{
        this.loading = false
       this.dataAccount = res
        if(res.length === 0){
          this.noData = true
        }
      }, error => {
        this.loading = false
        this.noData = true
      }
    )
  }

  updateRow(data: any){
    if(data.isDelete){
      const dialogRef: MatDialogRef<DeleteAccountComponent> = this.dialog.open(DeleteAccountComponent, {
        width: '300px',
        height:'160px',
        data: data
      });
      dialogRef.afterClosed().subscribe( ()=> {
        this.getAccount()
      })
    }else if(data.type === 'changeAccount'){
      const idDetail = data.ids[0]
      const dataDetail = this.dataAccount.filter(item => item.account_id === idDetail)
      const dialogRef: MatDialogRef<AddAccountComponent> = this.dialog.open(AddAccountComponent, {
        width: '500px',
        height:'640px',
        data: {
          type: data.type,
          ...dataDetail[0]
        }
      });
      dialogRef.afterClosed().subscribe( ()=> {
        this.getAccount()
      })
    }
  }

  creatAccount(data: boolean): void{
    console.log('creatAccount', data)
    if(data){
      const dialogRef: MatDialogRef<AddAccountComponent> = this.dialog.open(AddAccountComponent, {
        width: '500px',
        height:'640px',
      });
      dialogRef.afterClosed().subscribe( ()=> {
        this.getAccount()
      })
    }

  }
}
