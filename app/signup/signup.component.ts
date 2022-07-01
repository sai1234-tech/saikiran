import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:['']

    })
  }
//directly defieinng api in signup
  signUp(){
    this.http.post<any>("http://localhost:3000/signup",this.signupForm.value)
    .subscribe(res=>{
      alert("Registration Successfully");
      this.signupForm.reset();
      this.router.navigate(['login'])
    },
    err=>{
      alert('Something went wrong');
    }
    )
    console.log(this.signupForm.value)
  }

}
