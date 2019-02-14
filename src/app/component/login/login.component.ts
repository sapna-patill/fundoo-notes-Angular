import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  constructor(private httpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]); //Formcontrol for binding the value.
  password = new FormControl('', [Validators.required]);

  //method to show email error message
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' : '';

  }
  // method to show password errormessgae
  getpasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';

  }
  
  login() {
    try{
    if( this.email.value == "" || this.password.value == "") throw "fields cannot be empty"

    var reqbody = {
      email: this.email.value,
      password: this.password.value
    }
    this.httpService.postUser(reqbody, '/login').subscribe(
      res => {
        console.log(res);
        //snackbar to show messages.
        this.snackBar.open("you are logged in!!", "ok", { duration: 5000 });
      },
      err => {
        console.log("error: ", err)
        this.snackBar.open("you have entered wrong credentials", "ok", {
          duration: 500,
        });

      });
    }catch{
      this.snackBar.open("email or password cannot be empty", "", { duration: 5000 });
    }

  }


}
