import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../../products/products.service";
import {TablesService} from "../tables.service";

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.scss']
})
export class DeleteTableComponent implements OnInit{
  constructor(
    private tableService: TablesService,
    private dialogRef: MatDialogRef<DeleteTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
  }

  closeDialog(): void{
    this.dialogRef.close()
  }

  delete(data: any): void{
    if(data.type === 4){
      const res = {
        type: 'addTable'
      }
      this.tableService.addTable(res).subscribe(
        res =>{
          this.closeDialog()
        },
        error => {
          this.closeDialog()
        }
      )

    }else {
      const res = {
        id: data.data.table_id
      }
      this.tableService.deleteTable(res).subscribe(
        res =>{
          this.closeDialog()
        }
      )
    }

  }
}
