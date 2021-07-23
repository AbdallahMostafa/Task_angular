import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any;
  countryFilter :any;
  stateFilter : any;
  countryCodes : any;
  stateArray :any;
  baseURL = "http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) { 
    this.getData();
    this.getCountryCodes();
    this.users = null;
    this.stateFilter = null;
    this.countryFilter = null;
    this.stateArray = [
      {"title":"Valid Phone Numbers","value":"OK"}
    , {"title":"Invaild Phone Numbers","value":"NOK"}
    ];
  }
  ngOnInit(): void {
  }

  getData() {
    this.http.get(`${this.baseURL}/all/`).pipe(first()).subscribe(res =>{
      this.users = res;            
    });
  }

  getCountryCodes() {
    this.http.get(`${this.baseURL}/country_codes/`).pipe(first()).subscribe(res =>{
      this.countryCodes = res;           
    });
  }
  
  filter(event:any){
    let Url = this.baseURL + '/all/?';
    if( event.target.name == "country") {
      this.countryFilter=event.target.value;
    }
    if(this.countryFilter) {
      Url += 'country='  + this.countryFilter + '&';
    }
    if(event.target.name == "state") {
      this.stateFilter=event.target.value;       
    }
    if(this.stateFilter) {
      Url += 'state='  + this.stateFilter;
    }
    this.http.get(Url).pipe(first()).subscribe(res =>{
      this.users = res;
    });
    
  }
}

