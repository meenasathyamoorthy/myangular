import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Number } from 'mongoose';
import { UserService } from 'src/service/user.service';
export class userModel {
  _id!: string;
  Username!: string;
  Age!: string;
  Dob!: string;
  Mobile!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userList: userModel[] = [];
  isEdit: boolean = false;
  constructor(private userservice: UserService) { }


  user: userModel = new userModel();

  onSubmit(form: NgForm): void 
  {
    if (!this.isEdit) 
    {
      console.log(form.value);
      delete form.value._id;
      this.userservice.create(form.value)
        .subscribe(resp => {
          console.log(resp);
          form.resetForm();
          this.getAll();
        })
    }
    else {
      this.userservice.update(form.value)
        .subscribe(resp => {
          form.resetForm();
          this.isEdit = false;
          this.getAll();
        });
    }
  }
  getAll(): void {
    this.userservice.GetAll()
      .subscribe(resp => {
        console.log(resp);
        this.userList = resp;

      })
  }
  edit(data:userModel): void
   {
    console.log(data);
    this.isEdit = true;
    this.userservice.Getone(data._id)
    .subscribe(resp =>{
      console.log(resp);
      this.user = resp;
    })
  }
  ngOnInit(): void {
    this.getAll();
  }

  
  delete(data: userModel): void 
  {
     const confirm = window.confirm("Are you sure want to delete ?")
     if (confirm)
     {
     this.userservice.delete(data._id)
     .subscribe(resp =>{
       this.getAll();
    
     })
     } 
   }
}