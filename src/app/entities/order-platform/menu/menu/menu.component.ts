import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuService} from "./menu.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ProductsService} from "../../../manage/products/products.service";
import {debounceTime} from "rxjs";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  params: any;
  nodata = false;
  dataCoffee: any[] = [];
  dataCakes: any[] = [];
  dataSnacks: any[] = []
  coffee = true;
  cakes = false;
  snacks = false;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private productService : ProductsService,
  ) {
    this.activatedRoute.queryParams.subscribe( queryParams =>{
      this.params = queryParams
    })
  }

  ngOnInit() {
    const options: ScrollToOptions = {
      top: 0,
      behavior: 'smooth'
    };

    window.scrollTo(options);
    if(this.params.filter){
      this.checkMenu()
    }else {
      this.getMenu()
    }
  }

  onSearch(data: any){
    this.nodata = false
    let res = {}
    if(this.coffee){
      res = {
        category: 'coffee',
        value: data.value,
      }
    }else if(this.cakes){
      res = {
        category: 'cakes',
        value: data.value,
      }
    }else {
      res = {
        category: 'snacks',
        value: data.value,
      }
    }
    this.menuService.searchMenu(res)
      .pipe(debounceTime(300))
      .subscribe(res => {
        if(this.coffee){
          this.dataCoffee = res
        }else if(this.cakes){
          this.dataCakes = res
        }else {
          this.dataSnacks = res
        }
        if (res.length === 0) {
          this.nodata = true ;
        }
      });
  }
  clearValueSearch(event: any){
    if(this.coffee){
      this.getCoffee()
    }else if(this.cakes) {
      this.getCakes()
    }else {
      this.getSnacks()
    }
  }


  handleOrder(data: any){
    this.router.navigate(['/orderDialog'], { queryParams: { id: data.product_id } })
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }

  checkMenu(){
    this.coffee = false;
    this.snacks = false;
    this.cakes = false;
    switch (this.params.filter) {
      case 'coffee':
        this.coffee = true
        this.getCoffee()
        break;
      case 'cakes':
        this.cakes = true
        this.getCakes()
        break;
      case 'snack':
        this.snacks = true
        this.getSnacks()
        break;
    }
  }

  getMenu(){
    this.getCoffee()
    this.getCakes()
    this.getSnacks()
  }

  getCoffee():void{
    this.menuService.getCafe().subscribe(
      res =>{
        this.dataCoffee = res
        this.nodata = false ;
        if(res.length === 0){
          this.nodata = true
        }
      }
    )

  }

  getCakes(): void{
    this.menuService.getCake().subscribe(
      res =>{
        this.dataCakes = res
        this.nodata = false ;
        if(res.length === 0){
          this.nodata = true
        }

      }
    )
  }

  getSnacks(): void {
    this.menuService.getSnack().subscribe(
      res =>{
        this.dataSnacks = res
        this.nodata = false ;
        if(res.length === 0){
          this.nodata = true
        }
      }
    )
  }

  handleMenu(data: string): void {
    this.coffee = false;
    this.cakes = false;
    this.snacks = false;
    switch (data) {
      case 'coffee':
        this.coffee = true
        this.getCoffee()
        break;
      case 'cakes':
        this.cakes = true
        this.getCakes()
        break;
      case 'snacks':
        this.snacks = true
        this.getSnacks()
        break;
    }
  }
}
