import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteAccountComponent } from '../../../manage/account/delete-account/delete-account.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coffee = true;
  cakes = false;
  snack = false;

  top10coffee: any[] = [];
  top10cakes: any[] = [];
  top10snack: any[] = [];

  constructor(
    private homeService: HomeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMenuCoffee();
    this.getMenuSnack();
    this.getMenuCakes();
  }

  getMenuCoffee(): void {
    this.homeService.get10Coffee().subscribe((res) => {
      this.top10coffee = res;
    });
  }
  getMenuCakes(): void {
    this.homeService.get10Cakes().subscribe((res) => {
      this.top10cakes = res;
    });
  }
  getMenuSnack(): void {
    this.homeService.get10Snack().subscribe((res) => {
      this.top10snack = res;
    });
  }

  detailImg(event: any) {
    const dialogRef: MatDialogRef<ImgDetailComponent> = this.dialog.open(
      ImgDetailComponent,
      {
        width: '1000px',
        height: '600px',
        data: event,
      }
    );
  }

  handleOrder(data: any) {
    this.router.navigate(['/orderDialog'], {
      queryParams: { id: data.product_id },
    });
  }

  handleMenu(data: string): void {
    this.coffee = false;
    this.cakes = false;
    this.snack = false;
    switch (data) {
      case 'coffee':
        this.coffee = true;
        break;
      case 'cakes':
        this.cakes = true;
        break;
      case 'snack':
        this.snack = true;
        break;
    }
  }
}
