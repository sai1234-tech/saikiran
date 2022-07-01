import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl } from '@angular/forms';
import{RestaurantData} from 'src/app/restaurent.model';
import{ApiService} from 'src/app/shared/api.service';
@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  restaurentModelObj:RestaurantData= new RestaurantData;

  req:any;

  showAdd!:boolean;
  showbtn!:boolean;
  constructor(private fb:FormBuilder,private api:ApiService) { }
public allRestaurantData:any=[]
  formValue!:FormGroup
  ngOnInit(): void {
    this.formValue = this.fb.group({
      name:[''],
      emailId:[''],
      mobile:[''],
      address:[''],
      services:['']
    });
    this.getAllData();

  }

  login(){
    console.log(this.formValue.value)
  }

clickAddResto(){
  this.formValue.reset();
  this.showAdd=true;
  this.showbtn=false;
}

  //now subscribe our data which is maped
//adding this addResto directly to button
  addResto(){
    //mappinig restaurentModelObj to form value
    this.restaurentModelObj.name=this.formValue.value.name;
    this.restaurentModelObj.emailId=this.formValue.value.emailId;
    this.restaurentModelObj.mobile=this.formValue.value.mobile;
    this.restaurentModelObj.address=this.formValue.value.address;
    this.restaurentModelObj.services=this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Restaurant Record Added successfully");
      //clear filled the form data
      let ref=document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();
    },
    err=>{
      alert("Something went wrong");
    }

    )
  }

//Get all Data
// getAllData(){
//   this.api.getRestaurant()
//   .subscribe(res=>{
//     this.allRestaurantData=res;
//     console.log(res)
//   })
// }

getAllData(){
  this.api.getRestaurant()
  .subscribe(res=>{
    this.allRestaurantData=res;
  })

}


//deleteRecords

// and calling this delete record in delete button
deleteRecord(data:any){
  this.api.deleteRestaurant(data.id)
  .subscribe(res=>{
    console.log(res);
    alert("Restaurant Record deleted successfully");
// afterdeleting data get alldata i.e gives quit referesh data
    this.getAllData();
  })

}

//edit data based on name or id,addess etc..
onEditResto(data:any){
  //these for cancel button
  this.showAdd=false;
  this.showbtn=true;

//this.restaurentModelObj.id=data.id; it is for updateResto()
this.restaurentModelObj.id=data.id;

  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['emailId'].setValue(data.emaikId);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);


}
//update is same like add restaurent
updateResto(){
  this.restaurentModelObj.name=this.formValue.value.name;
  this.restaurentModelObj.emailId=this.formValue.value.emailId;
  this.restaurentModelObj.mobile=this.formValue.value.mobile;
  this.restaurentModelObj.address=this.formValue.value.address;
  this.restaurentModelObj.services=this.formValue.value.services;

  this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id)
  .subscribe(res=>{
    alert("Restaurant Record updated successfully")
    console.log(res);
    let ref=document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData();

  })
}

}
