import {Component, OnInit} from '@angular/core';
import {TablesService} from "./tables.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdduserComponent} from "../users/adduser/adduser.component";
import {DetailTableComponent} from "./detail-table/detail-table.component";
import {DeleteTableComponent} from "./delete-table/delete-table.component";


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit{
  dataTale: any[] = [];
  loading= false;
  noData = false;
  detail = false;
  detailSearch = false;

  constructor( private tablesService: TablesService,  private dialog: MatDialog) {
  }
  ngOnInit(){
    this.getTable()
  }
  tableDetail(data: any){
    const dialogRef: MatDialogRef<DetailTableComponent> = this.dialog.open(DetailTableComponent, {
      width: '800px',
      height:'500px',
      data: data
    });

    dialogRef.afterClosed().subscribe( ()=> {
    })
  }

  clearValueSearch(data: any){
    if(data){
      this.getTable()
    }
  }

  getTable(): void {
    this.loading = true
    this.tablesService.getTable().subscribe(res =>{
      this.dataTale = res
      this.loading = false
      if(res.length === 0){
        this.noData = true
      }
    })
  }

  refresh(data: any): void {
    this.getTable()
  }

  onSearch(data: any): void{
    this.loading = true
    this.tablesService.searchTable(data).subscribe(
      res =>{
        if(res){
          this.loading = false
          this.detailSearch = true
          if(res.length === 0){
            this.noData = true
          }
        }
        this.dataTale = res
      },
      error => {
        this.loading = false
        this.noData = true
      }
    )
  }
  updateRow(data: any): void{
    if(data.type === 4){
      const dialogRef: MatDialogRef<DeleteTableComponent> = this.dialog.open(DeleteTableComponent, {
        width: '300px',
        height:'160px',
        data: data
      });

      dialogRef.afterClosed().subscribe( ()=> {
        this.getTable()
      })
    }else {
      const dialogRef: MatDialogRef<DeleteTableComponent> = this.dialog.open(DeleteTableComponent, {
        width: '300px',
        height:'160px',
        data: data
      });

      dialogRef.afterClosed().subscribe( ()=> {
        this.getTable()
      })
    }

  }

}
