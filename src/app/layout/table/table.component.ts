import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {Subscription} from "rxjs";
import {ShareService} from "../../share/share.service";
import * as Highcharts from 'highcharts';
import {Router} from "@angular/router";
import { Options } from 'highcharts';
import {OverviewServiceService} from "../../entities/manage/overview/overview-service.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit ,OnChanges, OnDestroy{
  @ViewChild('chart') componentRef: any;
  private subscriptions = new Subscription();
  @Output() updateRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() categoryProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() tableDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() detailTableEmptyOrder:  EventEmitter<any> = new EventEmitter<any>()
  @Output() orderEmpty:  EventEmitter<any> = new EventEmitter<any>()
  @Output() export:  EventEmitter<any> = new EventEmitter<any>()


  @Input() tableNumber = 0;
  @Input() columns: any;
  @Input() totalRevenue?: number
  @Input() rowData: any[] = [];
  @Input() loading = false;
  @Input() noData = false;
  @Input() orderSuc: any;
  @Input() orderProduct = false;
  @Input() order = false;
  @Input() overview = false;
  @Input() emptyOrder = false;
  @Input() revenue = false;
  @Input() products = false;
  @Input() account = false;
  @Input() users = false;
  @Input() tables = false;


  Highcharts: typeof Highcharts = Highcharts;
  chartRef: any;
  updateFlag: any;
  chartOptions: any;
  dataOverview: any[]= [];
  titlePageProduct = ''
  totals: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  selectedItems: any[] = [];
  totalSelect: number = 0;
  selectedAll = false;
  productOrdered: any[] = [];
  currentYear: any
  constructor(private shareService: ShareService,
              private translate : TranslateService,
              private overviewService: OverviewServiceService,
              private route: Router) {
    this.currentYear = new Date().getFullYear();
  }


  ngOnInit(): void {
    this.titlePageProduct = 'coffee'
    this.subscriptions.add(
      this.shareService.refresh$.subscribe(() => {
        this.refresh();
      })
    );

    const storedData = localStorage.getItem('productOrder');

    if (storedData && Array.isArray(JSON.parse(storedData))) {
      this.productOrdered = JSON.parse(storedData);
    } else {
      this.productOrdered = [];
    }
    this.overviewService.getChartRevenue().subscribe(
      res =>{
        this.dataOverview = res
        this.updateChart()
      }
    )
  }

  updateChart():void {
    this.chartOptions = {
      chart: {
        width: 1180,
        height: 520,
        events: {
          load() {
          }
        }
      },
      title: {
        text: localStorage.getItem('lang') === 'en'? 'Overview Revenue': 'Tổng quan doanh thu'
      },
      yAxis: {
        title: {
          text: localStorage.getItem('lang') === 'en'? 'revenue': 'Doanh Thu'
        },
      },
      xAxis: {
        categories: localStorage.getItem('lang') === 'en' ?
          ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          : ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12', ]
      },
      series: [
        {
          type: 'column',
          name: this.currentYear,
          color: '#b22830',
          data: this.dataOverview
        }
      ]
    };
  }




  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  addSeries(): void {
    setTimeout(() => {
      this.chartRef.addSeries({
        type: 'column',
        data: [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]
      });
    }, 3000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    localStorage.setItem('productOrder', JSON.stringify({}));
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.rowData && this.rowData.length) {
      this.totals = this.rowData.length;

      this.rowData.sort((a: any, b: any) => {
        const dateA = new Date(a.date_order);
        const dateB = new Date(b.date_order);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      this.totals = 0;
    }
  }



  deleteCol(): void{
    this.updateRow.emit({
      ids: this.selectedItems.map(item => item.order_id),
      isDelete: true
    }
  )
  }

  detailTable(data: any) : void{
    this.tableDetail.emit({
      id: data
    })
  }


  detail(event: any): void{
   const res = {
     ...event,
     detail: true
   }
   this.updateRow.emit(
     res
   )
  }
  delete(event: any): void{
    this.updateRow.emit({
      ids: [(this.order || this.revenue)? event.order_id : this.users ? event.user_id : event.account_id],
      isDelete: true,
    })
  }

  changStatusTable(event: any) : void {
    if(this.account){
      this.updateRow.emit({
        ids: [event.account_id],
        type: 'changeAccount'
      })
    }if (this.users){
      this.updateRow.emit({
        type: 'changeUser',
        data: event
      })
    }else {
      this.updateRow.emit({
        ids: [event.order_id],
        isPaid : event.is_paid === '1',
        isUnPaid : event.is_paid === '0',
        isShipping : event.is_paid === '2'
      })
    }
  }

  exportToPdf(event: any): void{
    this.export.emit(event)
  }

  changStatus(): void {
    const allItemsArePaid = this.selectedItems.every(item => item.is_paid === "1");
    const allItemsAreUnPaid = this.selectedItems.every(item => item.is_paid === "0");
    const allItemsAreShipping = this.selectedItems.every(item => item.is_paid === "2");
    this.updateRow.emit({
      ids: this.selectedItems.map(item => item.order_id),
      isPaid : allItemsArePaid,
      isUnPaid : allItemsAreUnPaid,
      isShipping: allItemsAreShipping,
      error:  !allItemsArePaid && !allItemsAreUnPaid && !allItemsAreShipping,
    })
  }

  back(){
    window.history.back()
  }

  bookmark(data: any): void{
    this.updateRow.emit({
      category: data.category,
      mark: data.InStock === "1" ? false : true,
      id: data.product_id,
      type: 1
    })
  }

  deleteProduct(data: any): void{
    this.updateRow.emit({
      category: data.category,
      id: data.product_id,
      type: 2
    })
  }

  overviewDetailRevenue(): void{
    this.route.navigate(['/manage/revenue'])
  }

  createProduct(): void{
    if(this.tables){
      this.updateRow.emit({
        type: 4
      })
    }else {
      this.updateRow.emit({
        type: 4
      })
    }

  }

  deleteTable(col: any): void{
    this.updateRow.emit({
      type: 3,
      data: col
    })
  }

  detailProdcut(id: string): void{
    const url = `/manage/productDetail/${id}`;
    window.open(url, '_blank');
  }

  changeProduct(data: any): void{
    this.updateRow.emit({
      type: 3,
      data: data
    })
  }

  getProduct(data: string): void{
    this.titlePageProduct = data
    this.categoryProduct.emit(data)
  }

  isCategoryActive(category: string): boolean {
    return this.titlePageProduct === category || localStorage.getItem('category') === category;
  }



  refresh(){
    this.onRefresh.emit({
      refresh: true
    })
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.selectedItems = []
    this.selectedAll = false
    this.totalSelect = 0
  }

  get totalPages(): number {
    if (this.rowData && this.rowData.length) {
      return Math.ceil(this.rowData.length / this.pageSize);
    } else {
      return 0; // hoặc giá trị mặc định nếu không có dữ liệu
    }
  }


  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.rowData.slice(startIndex, startIndex + this.pageSize);
  }


  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  selectItem(event: any, item: any): void {
    if (event.target.checked) {
      this.selectedItems.push(item);
      this.totalSelect = this.selectedItems.length
    } else {
      const index = this.selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }

    this.updateSelectAllStatus();
    if (!this.isAllItemsSelected()) {
      this.selectedAll = false;

    }

  }
  isAllItemsSelected(): boolean {
    return this.selectedItems.length === this.rowData.length;
  }

  selectAll(): void {
    this.selectedAll === !this.selectedAll
    if(this.selectedAll){
      this.selectedItems = [...this.rowData];
    }else {
      this.selectedItems = []
    }
    if(this.selectedItems.length === 0){
      this.totalSelect = 0
    }
    this.totalSelect = this.selectedItems.length
  }
  isItemSelected(item: any): boolean {
    return this.selectedItems.some((selectedItem) => selectedItem.order_id === item.order_id);
  }
  isSelected(item: any): boolean {
    return this.selectedAll || this.isItemSelected(item);
  }
  updateSelectAllStatus(): void {
    this.selectedAll = this.selectedItems.length === this.rowData.length;
  }


  handleOrder(data: any){
    this.orderEmpty.emit(data)
  }
  changeOrder(data: any){
    this.orderEmpty.emit(data)
  }

  detailTableEmpty(data: any){
    this.detailTableEmptyOrder.emit(data)
  }

  handleAddProduct(data: any): void {
    let found = false;
    for (let i = 0; i < this.productOrdered.length; i++) {
      if (this.productOrdered[i].product_id === data.product_id) {
        this.productOrdered[i].total++;
        found = true;
        break;
      }
    }
    if (!found) {
      const res = {
        product_id: data.product_id,
        category: data.category,
        image_url: data.image_url,
        name: data.name,
        price: data.price,
        total: 1
      };
      this.productOrdered.push(res);
    }
    localStorage.setItem('productOrder', JSON.stringify(this.productOrdered));
  }

  increaseQuantity(item: any) {
    item.total++;
  }

  decreaseQuantity(item: any) {
    if (item.total > 1) {
      item.total--;
    }
  }

  orderPro(): void {
    const updatedProductOrdered = this.productOrdered.map(product => {
      const { category, name, price, product_id, total } = product;
      return { category, name, price, product_id, total };
    });
    this.updateRow.emit(updatedProductOrdered)
  }

  clearOrder(): void{
    this.productOrdered = []
    localStorage.setItem('productOrder', JSON.stringify({}));
  }

  protected readonly localStorage = localStorage;
}
