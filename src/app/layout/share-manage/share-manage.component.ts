import {
  Component,
  EventEmitter,
  HostListener,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import { Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddAccountComponent} from "../../entities/manage/account/add-account/add-account.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-share-manage',
  templateUrl: './share-manage.component.html',
  styleUrls: ['./share-manage.component.scss']
})

export class ShareManageComponent implements OnInit, OnChanges{
  public subscription: Subscription = new Subscription();
  @ViewChild('drawer') drawer?: MatDrawer;
  @Input() columns: any;
  @Input() dataOldOrder: any;
  @Input() totalRevenue?: number;
  @Input() rowData: any;
  @Input() orderSuc = false;
  @Input() loading = false;
  @Input() noData = false;
  @Input() revenue = false;
  @Input() products = false;
  @Input() order = false;
  @Input() overview = false;
  @Input() orderProduct = false;
  @Input() emptyOrder = false;
  @Input() users = false;
  @Input() tables = false;
  @Input() account = false;
  @Input() tableNumber: number = 0 ;
  @Input() clearSearchProduct = false;
  @Output() Detail: EventEmitter<any> = new EventEmitter<any>();
  @Output() detailEmptyOrder: EventEmitter<any> = new EventEmitter<any>();
  @Output() tableEmptyOrder: EventEmitter<any> = new EventEmitter<any>();
  @Output() export = new EventEmitter<any>();
  @Output() clearValueSearch = new EventEmitter<any>();
  @Output() updateRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() categoryProduct: EventEmitter<any> = new EventEmitter<any>();
  @Output() addAccount: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() addUser: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() searchValue = new EventEmitter<any>();
  @Output() OnRefresh = new EventEmitter<any>
  time_gte: Date | null = null;
  time_lte: Date | null = null;
  time_from: number = 0
  time_to: number = 0
  search = ''
  currentLanguage = '';
  emailUser: any;
  username: any;
  userPosition: any;
  user_id: any;
  imgAccount!: string;
  constructor(
    private dialog: MatDialog,
    private translateService: TranslateService,
    private router: Router,
    private loginService : LoginService
  ) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('account_id')
    this.username = localStorage.getItem('name')
    this.emailUser = localStorage.getItem('email')
    this.userPosition = localStorage.getItem('role')
    this.loginService.getUserInfo(this.emailUser).subscribe(res =>{
      this.imgAccount = res.userData?.img
      }
    )
    this.subscription.add(
    )
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.clearSearchProduct){
      this.search = ''
    }
  }


  tableDetail(event: any){
    this.Detail.emit(event)
  }

  tableDetailEmpty(event: any){
    this.detailEmptyOrder.emit({
      id: event,
      detail: true
    })
  }

  orderEmpty(event: any){
    this.tableEmptyOrder.emit(event)
  }
  updateRowShare(event: any): void {
    this.updateRow.emit(event);
  }

  categoryProductShare(event: any): void{
    this.categoryProduct.emit(event)
  }
  onSearch(): void {
    if(this.order || this.revenue){
      this.searchValue.emit(
        {
          time_gte: this.time_from,
          time_lte: this.time_to,
          searchValue: this.search
        })
    }else if(this.products || this.account || this.users || this.tables || this.emptyOrder || this.orderProduct){
      this.searchValue.emit(
        {
          searchValue: this.search
        })
    }

  }

  submitDateTime(): void {
    const currentDate = new Date();
    if(this.time_gte && this.time_lte){
      this.time_from = this.time_gte?.getTime()
      this.time_to = this.time_lte?.getTime()

    }else if(this.time_gte &&!this.time_lte){
      this.time_lte = new Date();
      this.time_from = this.time_gte?.getTime()
      this.time_to = this.time_lte?.getTime()
    }else if(!this.time_gte && this.time_lte){
      this.clearDateTime()
    } else if (this.time_lte && this.time_lte.getTime() > currentDate.getTime()) {
      this.time_to = currentDate.getTime();
      this.time_lte = currentDate
    }
    this.searchValue.emit(
      {
        time_gte: this.time_from,
        time_lte: this.time_to,
        searchValue: this.search
      }
    )
  }

  exportOrder(event: any){
    this.export.emit(event)
  }

  refresh(event: any): void{
    this.search = ''
    this.time_from = 0
    this.time_to = 0
    if(this.search || this.time_from !== 0  || this.time_to !== 0){
      this.searchValue.emit(
        {
          time_gte: this.time_from,
          time_lte: this.time_to,
          searchValue: this.search
        }
      )
    }
    this.OnRefresh.emit(event)
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    const currentDate = new Date();
    if (event.key === 'Enter') {
      if(this.time_gte && this.time_lte){
        this.time_from = this.time_gte?.getTime()
        this.time_to = this.time_lte?.getTime()
      }else if(this.time_gte &&!this.time_lte){
        this.time_lte = new Date();
        this.time_from = this.time_gte?.getTime()
        this.time_to = this.time_lte?.getTime()
      }else if(!this.time_gte && this.time_lte){
        this.clearDateTime()
      }else if(this.time_lte && this.time_lte > currentDate) {
        this.time_to = 0
      }
    }
  }

  clearDateTime(): void {
    this.time_from = 0;
    this.time_to = 0;
    this.time_gte = null;
    this.time_lte = null
    this.searchValue.emit({
      time_gte: 0,
      time_lte: 0,
      searchValue: this.search
    }
    )

  }

  onSearchChange(newValue: string): void {
    if (/^\s*$/.test(newValue)) {
      this.clearValueSearch.emit(true);
    }
  }

  onKeyPress(event: any): void {
    if (this.order) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    }
  }


  isValidSearchTerm(): boolean{
    return /\S/.test(this.search);
  }
  clearSearchValue(): void{
    this.search = ''
    this.searchValue.emit(
      {
        time_gte: this.time_from,
        time_lte: this.time_to,
        searchValue: ""
      }
    )
    this.clearValueSearch.emit(true)
  }

  toggle(): void{
    this.drawer?.toggle()
  }

  signOut(): void {
    this.router.navigate(['/login'])
    localStorage.setItem('authToken', '');
  }

  changePassword(): void{
    const email = localStorage.getItem('email')

    this.dialog.open(ChangePasswordComponent, {
      width: '440px',
      height:'460px',
      data: {
        email: email
      }
    });
  }

  handleLang(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('lang', this.currentLanguage);
  }

  createAccount(): void{

    this.account && this.addAccount.emit(true)
    this.users && this.addUser.emit(true)
  }

  protected readonly localStorage = localStorage;
}
