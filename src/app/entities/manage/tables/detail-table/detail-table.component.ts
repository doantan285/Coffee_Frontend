import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TablesService} from "../tables.service";

@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class DetailTableComponent implements OnInit{

    detailTable: any
    constructor(
      private tableService: TablesService,
      private dialogRef: MatDialogRef<DetailTableComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
      this.getDetailTable()
    }

    getDetailTable(): void {
      const res = { id: Number(this.data.id)}
      this.tableService.getTableDetail(res).subscribe(req =>{
        this.detailTable = req[0]
        console.log(this.detailTable)

      })
    }

  close(){
      this.dialogRef.close()
  }
}
