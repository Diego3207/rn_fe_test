import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Tracker } from 'src/app/api/tracker';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'  
})
export class TrackerService 
{
	bearer:string = "bearer";
    url:string = `${environment.apiUrl}/tracker`; 

  constructor(private http: HttpClient) 
  {	  
  }
  
  getAll(limit,page,sort):Observable<Tracker[]> {
    const options = { params: new HttpParams({fromString: "limit="+limit+"&page="+page+"&sort="+sort}) };
	return this.http.get<Tracker[]>(this.url+"/list",options);
  }
  getFilter(text,limit,page,sort) {
    const options = { params: new HttpParams({fromString: "filters="+text+"&limit="+limit+"&page="+page+"&sort="+sort}) };
    return this.http.get<Tracker[]>(this.url+"/list",options);
          
  }
  getList(type:number,parameters:any) : Observable<Tracker[]>{
		const options = { params: new HttpParams({fromString: "type="+type+"&parameters="+parameters}) };
		return this.http.get<Tracker[]>(this.url+"/native",options);
			  
	}
  getById(id:number){
    const options = { params: new HttpParams({fromString: "id="+ id}) };

    return this.http.get<Tracker>(this.url+"/find",options);
  }
  create(data: any){
    return this.http.post<Tracker>(this.url+"/add",data);
  }
  update(data:any):Observable<any>{
    return this.http.put<Tracker>(this.url+"/update",data);
   }
  disable(id:number){
    const body = { id: id };
    return this.http.put<Tracker>(this.url+"/disable",body);
  }

}




