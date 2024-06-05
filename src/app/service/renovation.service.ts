import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Renovation } from 'src/app/api/renovation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'  
})
export class RenovationService 
{
	bearer:string = "bearer";
    url:string = `${environment.apiUrl}/viewRenovation`; 

  constructor(private http: HttpClient) 
  {	  
  }
  
  getAll(limit,page,sort):Observable<Renovation[]> {
    const options = { params: new HttpParams({fromString: "limit="+limit+"&page="+page+"&sort="+sort}) };
	return this.http.get<Renovation[]>(this.url+"/list",options);
  }
  getFilter(text,limit,page,sort) {
    const options = { params: new HttpParams({fromString: "filters="+text+"&limit="+limit+"&page="+page+"&sort="+sort}) };
    return this.http.get<Renovation[]>(this.url+"/list",options);
          
  }
  getById(id:number){
    const options = { params: new HttpParams({fromString: "id="+ id}) };

    return this.http.get<Renovation>(this.url+"/find",options);
  }
  create(data: any){
    return this.http.post<Renovation>(this.url+"/add",data);
  }
  update(data:any):Observable<any>{
    return this.http.put<Renovation>(this.url+"/update",data);
   }
  disable(id:number){
    const body = { id: id };
    return this.http.put<Renovation>(this.url+"/disable",body);
  }

}
