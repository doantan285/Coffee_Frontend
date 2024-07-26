import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.scss']
})
export class ImgDetailComponent implements OnInit{
  img: string = ''
  currentIndex: number = 0;
  showArrows: boolean = false;
  defaultImages: string[] = [
    './assets/img/imgHome/1.webp',
    './assets/img/imgHome/2.webp',
    './assets/img/imgHome/3.webp',
    './assets/img/imgHome/4.webp',
    './assets/img/imgHome/5.webp'
  ];
  constructor(
    private dialogRef: MatDialogRef<ImgDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    switch (this.data) {
      case '1': 
        this.img = './assets/img/imgHome/1.webp';
        break;
      case '2':
        this.img = './assets/img/imgHome/2.webp';
        break;
      case '3':
        this.img = './assets/img/imgHome/3.webp';
        break;
      case '4':
        this.img = './assets/img/imgHome/4.webp';
        break;
      case '5':
        this.img = './assets/img/imgHome/5.webp';
        break;
      default:
    }
  }

  changeImage(direction: string) {
    if (direction === 'left') {
      this.currentIndex = (this.currentIndex === 0) ? this.defaultImages.length - 1 : this.currentIndex - 1;
    } else if (direction === 'right') {
      this.currentIndex = (this.currentIndex === this.defaultImages.length - 1) ? 0 : this.currentIndex + 1;
    }

    this.img = this.defaultImages[this.currentIndex];
  }

}
