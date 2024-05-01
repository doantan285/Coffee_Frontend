import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../products.service";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreatProductComponent} from "../creat-product/creat-product.component";
import {DeteleDialogProductComponent} from "../detele-dialog-product/detele-dialog-product.component"
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
interface Comment {
  comment_id: string;
  product_id: string;
  content: string;
  timestamp: string;
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  commentList: Comment[] = [];
  dataDetail: any;
  nodata = false;
  showScrollButton = false;
  currentLanguage = '';
  commentValue = ''
  formComment!: FormGroup;
  constructor(private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private productService: ProductsService,
              private translateService: TranslateService,
              private dialog: MatDialog,
              ) {
  }
  ngOnInit() {
    this.getDetail()
    this.formComment = this.fb.group({
      commentValue: ['']
    })
  }
  getDetail(): void{
    this.route.params.subscribe(params => {
      const id = params['id'];
      const res = {
        id: id,
      }
      this.productService.getDetailId(res).subscribe(
        res=>{
          this.dataDetail = res.product[0]
          this.commentList = res.comments
          this.commentList.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampB - timestampA;
          });
        },
        error => {
          this.nodata  = true
        }
      )
    });

  }

  bookmark(){
    const res = {
      category: this.dataDetail.category,
      mark: this.dataDetail?.InStock === "1" ? false : true,
      id: this.dataDetail.product_id
    }
    this.productService.handleBookMark(res).subscribe(
      req =>{
        this.openSnackBar(localStorage.getItem('lang')=== 'vi'?
            ( res.mark ? 'Đánh dấu thành công !' : 'Bỏ đánh dấu thành công !') :
            ( res.mark ? 'Mark success !' : 'Unmark success !'),
          localStorage.getItem('lang')=== 'vi' ? 'Đóng' : 'Close');
       const newDetail = req.filter((item: any) => item.product_id === this.dataDetail.product_id);
       this.dataDetail = newDetail[0]

      }
    )
  }
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }

  changeProduct():void{
    const data = {
      type: 3,
      data: this.dataDetail
    }
    const dialog4: MatDialogRef<CreatProductComponent> = this.dialog.open(CreatProductComponent, {
      width: '1000px',
      height:'580px',
      data: data
    });
    dialog4.afterClosed().subscribe( ()=> {
      this.getDetail()
    })
  }

  comment(): void {
    const currentTime = new Date();
    const res = {
      product_id: this.dataDetail.product_id,
      content: this.formComment.value.commentValue,
      timestamp: currentTime
    };
    console.log(res)

    this.productService.comment(res).subscribe(
      (req) => {
        console.log(req);
        this.getDetail();
        this.commentValue = ''

      },
      (error) => {
        console.error('Comment error:', error);
      }
    );
  }

  deleteComment(data: any): void{
    const res = {
     id: data.comment_id,
      detailProduct: true
    }
    const dialog4: MatDialogRef<DeteleDialogProductComponent> = this.dialog.open(DeteleDialogProductComponent, {
      width: '300px',
      height:'160px',
      data: res
    });
    dialog4.afterClosed().subscribe( ()=> {
      this.getDetail()
    })

  }


  handleLang(): void{
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
    localStorage.setItem('lang', this.currentLanguage);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showScrollButton = scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected readonly decodeURI = decodeURI;
  protected readonly localStorage = localStorage;
}
