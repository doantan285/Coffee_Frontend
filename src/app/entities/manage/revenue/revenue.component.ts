import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RevenueService} from "./revenue.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditPaidComponent} from "../order/edit-paid/edit-paid.component";
import {Subscription} from "rxjs";
import {ShareService} from "../../../share/share.service";
interface Revenue {
  id: number;
  name: string;
  time: number;
  nameCustomer: string;
  note: string;
  total_amount: number;
  paid: boolean
}
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit{
  private subscriptions = new Subscription();
  totalRevenue!: number;
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataRevenue: Revenue[] = []
  loading = false;
  noData = false;

  constructor(private revenueService: RevenueService,
              private dialog: MatDialog,
              private shareService: ShareService,) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.shareService.refresh$.subscribe(() => {
        this.getRevenue()
      })
    );
    this.getRevenue()
  }

  getRevenue(): void{
    this.loading = true;
    this.revenueService.getRevenues().subscribe(res =>{
      if (res !== null && res !== undefined) {
        this.dataRevenue = res
        this.loading = false
        const totalArray: any[] = []
        res.forEach((item: any) =>{
          totalArray.push(Number(item.total_amount))
        })
        this.totalRevenue = totalArray.reduce((a, b) => a + b, 0);
        if(res.length === 0){
          this.noData = true
        }

      } else {
        this.loading = false;
        this.noData = true;
      }
    }, error => {
      this.loading = false;
      this.noData = true;
    })
  }

  onSearch(data: any): void{
      this.loading = true
      if(data){
        this.revenueService.searchInputRevenue(data).subscribe(
          res =>{
            if(res.length === 0){
              this.dataRevenue = []
              this.noData = true;
              this.loading = false;
              this.totalRevenue = 0;
            }else {
              this.noData = false;
              this.dataRevenue = res;
              const totalArray: any[] = [];
              res.forEach((item: any) =>{
                totalArray.push(Number(item.total_amount))
              })
              this.totalRevenue = totalArray.reduce((a, b) => a + b, 0);
              this.loading = false;
            }
          },
          ()=>{
            this.totalRevenue = 0;
            this.dataRevenue = []
            this.loading = false;
            this.noData = true;
          }
        )
      }
  }

  updateRow(event: any): void{
    if(event.isDelete){
      const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
        width: '300px',
        height:'160px',
        data: event
      });
      dialogRef.afterClosed().subscribe( ()=> {

      })
    }

  }
}
