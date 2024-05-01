import {Component, OnInit} from '@angular/core';
import {UsersService} from "./users.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteUserComponent} from "./delete-user/delete-user.component";
import {AdduserComponent} from "./adduser/adduser.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  dataUsers: any;
  loading = false;
  noData = false;
  constructor(

    private userSevice: UsersService,
    private dialog: MatDialog,) {
  }
  ngOnInit(){
    this.getUser()
  }
  getUser():void{
    this.loading = true
    this.userSevice.getusers().subscribe(
      res =>{
        this.loading = false
        this.dataUsers = res
        if(res.length === 0){
          this.noData = true
        }else {
          this.noData = false
        }
      }
    )
  }

  refresh(data: any): void {
    this.getUser()
  }

  clearValueSearch(data: any){
    this.getUser()
  }

  addUser(data: any): void {
    if(data){
      const dialogRef: MatDialogRef<AdduserComponent> = this.dialog.open(AdduserComponent, {
        width: '500px',
        height:'640px',
      });
      dialogRef.afterClosed().subscribe( ()=> {
        this.getUser()
      })
    }
  }

  onSearch(data: any): void{
    this.loading = true
    const res = {
      valueSearch: data.searchValue
    }
    this.userSevice.search(res).subscribe(
      res =>{
        this.loading = false
        this.dataUsers = res
        console.log(res)
        if(res.length === 0){
          this.noData = true
        }
      }, error => {
        this.loading = false
        this.noData = true
      }
    )

  }

  updateRow(data: any): void{
    if(data.type === 'changeUser'){
      if(data){
        const dialogRef: MatDialogRef<AdduserComponent> = this.dialog.open(AdduserComponent, {
          width: '500px',
          height:'640px',
          data: data
        });
        dialogRef.afterClosed().subscribe( ()=> {
          this.getUser()
        })
      }
    }else {
      const dialogRef: MatDialogRef<DeleteUserComponent> = this.dialog.open(DeleteUserComponent, {
        width: '300px',
        height:'160px',
        data: data
      });
      dialogRef.afterClosed().subscribe( ()=> {
        this.getUser()
      })
    }
  }
}
