import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/*
  Generated class for the GmapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GmapsProvider {
  public url:string;
  private  token:string

  constructor(public http: HttpClient) {
    this.url = 'https://maps.googleapis.com/maps/api/geocode/json'
    this.token = 'AIzaSyAr_SETgcKMchDNg44dM3Lf0YGUU7vHAEM'
  }

  getData(lat: number, lng: number): Observable<any>{
    var params ="?latlng="+lat+","+lng+"&key="+this.token
    return this.http.get(this.url+params)
  }

}
