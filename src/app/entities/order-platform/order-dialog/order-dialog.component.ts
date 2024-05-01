import {Component, OnInit} from '@angular/core';
import {OrderDialogService} from "./order-dialog.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductsService} from "../../manage/products/products.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreatProductComponent} from "../../manage/products/creat-product/creat-product.component";

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit{
  product_id: any;
  data: any
  formComment!: FormGroup;
  commentValue = ''
  commentList: any[] = []
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private productService: ProductsService,
    private orderDialogService: OrderDialogService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe( queryParams =>{
      this.product_id = queryParams
    })
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getProduct()
    this.formComment = this.fb.group({
      commentValue: ['']
    })
  }

  getProduct(){
    this.orderDialogService.getProductOrder(this.product_id).subscribe(
      res =>{
        this.data = {
          ...res,
          total: 1
        }
        this.commentList = res.comments.reverse()
      } )
  }

  comment(): void {
    const currentTime = new Date();
    const res = {
      product_id: this.product_id.id,
      content: this.formComment.value.commentValue,
      timestamp: currentTime
    };

    this.productService.comment(res).subscribe(
      (req) => {
        this.getProduct();
        this.commentValue = ''

      },
      (error) => {
        console.error('Comment error:', error);
      }
    );
  }

  orderProduct(): void{

  }

  increaseQuantity(item: any) {
    item.total++;
  }

  decreaseQuantity(item: any) {
    if (item.total > 1) {
      item.total--;
    }
  }

  protected readonly localStorage = localStorage;
}
