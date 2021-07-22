import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mydata: any;
  value : any;
  countryFilter :any;
  stateFilter : any;

  stateArray :any;
  
  constructor(private http: HttpClient) { 
    this.getData();
    this.stateArray = [
      {"title":"Valid Phone Numbers","value":"OK"}
    , {"title":"Invaild Phone Numbers","value":"NOK"}
  ];
  }
  ngOnInit(): void {
  }

  getData() {
    this.http.get('http://127.0.0.1:8000/all/').pipe(first()).subscribe(res =>{
      this.mydata = res; 
      console.log(this.mydata);
           
    });
  }
  
  filter(event:any){
    if( event.target.name == "country") {
      this.countryFilter=event.target.value;
      this.http.get(`http://127.0.0.1:8000/country_filter/${event.target.value}`).pipe(first()).subscribe(res =>{
        this.mydata = res;
      });
    }
    if(event.target.name == "state") {
      this.stateFilter=event.target.value;       
      this.http.get(`http://127.0.0.1:8000/state_filter/${event.target.value}`).pipe(first()).subscribe(res =>{
        this.mydata = res;
      });
    }
    if(this.countryFilter && this.stateFilter) {
      this.http.get(`http://127.0.0.1:8000/country_state_filter/${this.countryFilter}/${this.stateFilter}`).pipe(first()).subscribe(res =>{
        this.mydata = res;
      });
    } 
  }
}

