import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Routes} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() homeOrder = false;
  @Input() menuOrder = false;

  @Output() searchValue = new EventEmitter<any>();
  @Output() clearValueSearch = new EventEmitter<any>();
  currentLanguage = '';
  search = ''
  not_order = true;
  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private translateService: TranslateService,
  ) {}

  orders : any[] = [{img: './assets/img/empty-cart.webp',name: 'bạc xỉu', total: 3 },{img: './assets/img/empty-cart.webp' ,name: 'bạc xỉu', total: 3 },{img: './assets/img/empty-cart.webp',name: 'bạc xỉu', total: 3 },{name: 'bạc xỉu', total: 3 }]

  isMenuActive(): boolean {
    const queryParams = this.route.snapshot.queryParams;
    const filter = queryParams && queryParams['filter'];
    return filter === 'coffee' || filter === 'cakes' || filter === 'snack';
  }

  onSearchChange(value: string): void {
    if(value){
      this.searchValue.emit({
        value: value
      })
    }
  }

  clearSearchValue(): void{
    this.search = ''
    this.clearValueSearch.emit(true)
  }

  handleLang(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('lang', this.currentLanguage);
  }

  increaseQuantity(item: any) {
    item.total++;
  }

  decreaseQuantity(item: any) {
    if (item.total > 1) {
      item.total--;
    }
  }

  onOrder(){
    console.log('Ordered Items:', this.orders);
  }

  delete(item: any){
    const index = this.orders.indexOf(item);
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }

}
