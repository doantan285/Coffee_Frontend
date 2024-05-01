import {Component, OnInit} from '@angular/core';
import {TablesService} from "../tables/tables.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DetailTableComponent} from "../tables/detail-table/detail-table.component";
import {OrderProductComponent} from "../order-product/order-product.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employ-order',
  templateUrl: './employ-order.component.html',
  styleUrls: ['./employ-order.component.scss']
})
export class EmployOrderComponent implements OnInit{
  data: any;
  loading = false;
  noData = false;
  constructor(  private router: Router,
    private tableService : TablesService,
               private dialog: MatDialog) {}

  ngOnInit() {
    this.getTable()
  }

  getTable(): void {
    this.tableService.getTable().subscribe(res =>{
      this.data = res
    })
  }
  clearValueSearch(){

  }
  order(data: any){
    this.router.navigate(['/manage/orderProduct'], { queryParams: { table_number: data.table_number } })
  }

  detail(data: any){
    const dialogRef: MatDialogRef<DetailTableComponent> = this.dialog.open(DetailTableComponent, {
      width: '600px',
      height:'500px',
      data: data
    });

    dialogRef.afterClosed().subscribe( ()=> {
    })
  }

  onSearch(event: any){
    this.tableService.searchTable(event).subscribe(
      res =>{
        if(res.length === 0){
          this.noData
        }
        this.data = res
      }
    )

  }

  updateRow(event: any){

  }
}
