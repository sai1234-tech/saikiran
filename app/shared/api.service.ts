import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {map} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //now here i will define the post,get,delete


//create restaurant using  post methods

postRestaurant(data:any){
  return this.http.post<any>("http://localhost:3000/posts",data)
  .pipe(map((res:any)=>{
    return res
  }))
}

//Get Restaurant data using Get method and mapping using pipe method

getRestaurant(){
  return this.http.get<any>("http://localhost:3000/posts")
  .pipe(map((res:any)=>{
    return res;
    console.log(res);
  }))

}

//update restaurant using put method and mapping using pipe method

updateRestaurant(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/posts/"+id,data)
  .pipe(map((res:any)=>{
    return res
  }))}

//Delete Restaurant data using Delete method and mapping using pipe method

deleteRestaurant(id:number){
  return this.http.delete<any>("http://localhost:3000/posts/"+id)
  .pipe(map((res:any)=>{
    return res
  }))}




}


