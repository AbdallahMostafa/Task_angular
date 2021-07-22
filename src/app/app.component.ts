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
  
  constructor(private http: HttpClient) { 
    this.getData();

  }
  ngOnInit(): void {
  }

  getData() {
    this.http.get('http://127.0.0.1:8000/all/').pipe(first()).subscribe(res =>{
      this.mydata = res;      
    });
  }
  
  filter(){
    if(this.countryFilter) {
      this.http.get(`http://127.0.0.1:8000/country_filter/${this.countryFilter}`).pipe(first()).subscribe(res =>{
        this.mydata = res;
      });
    }
    if(this.stateFilter) {      
      this.http.get(`http://127.0.0.1:8000/state_filter/${this.stateFilter}`).pipe(first()).subscribe(res =>{
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

