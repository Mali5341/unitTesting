import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://192.168.100.14:8080/employees'
  constructor(private httpRequest:HttpClient) { }

  getUserData(){
    return[
        {name:"umer", age: 20, position:"react Developer"},
     
    ]
  }
  // getUserData(){
  //   return this.httpRequest.get(this.url)
  // }
  postData(data:any){
     return this.httpRequest.post(this.url, data)
  }
}
