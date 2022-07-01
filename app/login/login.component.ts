import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import{Router} from '@angular/router';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  //login Method Define
  login(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      //match email and password from signup so we use signup api

      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if(user){
        alert("Login is Successful");
        this.loginForm.reset();
        this.router.navigate(['restaurent-dash'])
      }
      else{
        alert('User Not Found');
      }
    },
    //something went wrong
     err =>{
       alert("Something went wrong from server side")
    }
    )

  }

}
