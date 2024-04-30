import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  componentName:string = "unit"
  userDetails:any  =[];
  constructor(public dataFromService: ServiceService) { }

  ngOnInit(): void {
    this.userDetails = this.dataFromService.getUserData()
    console.log("user data", this.userDetails);
    
  }
  postDataToBackend(data:any)
  {
  this.dataFromService.postData(data).subscribe(response =>{
        console.log(response);
        
  })
}
  sum(a:number, b:number)
   {
    return a+b;
   }


   multiplication(x:number, y:number)
   {
    return x*y;
   }
}
