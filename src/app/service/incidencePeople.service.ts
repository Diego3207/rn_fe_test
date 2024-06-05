import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IncidencePeople } from 'src/app/api/incidencePeople';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'  
})
export class  IncidencePeopleService 
{
	bearer:string = "bearer";
    url:string = `${environment.apiUrl}/incidencePeople`; 

  constructor(private http: HttpClient) 
  {	  
  }
  
  create(evidence: any){
    return this.http.post<IncidencePeople>(this.url+"/add",evidence);
  }

  delete(id:number){
    const body = { id: id };
    return this.http.put<IncidencePeople>(this.url+"/delete",body);
  }
  getAll(limit,page,sort):Observable<IncidencePeople[]> {
    const options = { params: new HttpParams({fromString: "limit="+limit+"&page="+page+"&sort="+sort}) };
	return this.http.get<IncidencePeople[]>(this.url+"/list",options);
  }
  getFilter(text,limit,page,sort) {
    const options = { params: new HttpParams({fromString: "filters="+text+"&limit="+limit+"&page="+page+"&sort="+sort}) };
    return this.http.get<IncidencePeople[]>(this.url+"/list",options);
          
  }
  getById(id:number){
    const options = { params: new HttpParams({fromString: "id="+ id}) };

    return this.http.get<IncidencePeople>(this.url+"/find",options);
  }
  update(data: IncidencePeople):Observable<any>{
    return this.http.put<IncidencePeople>(this.url+"/update",data);
   }
  disable(id:number){
    const body = { id: id };
    return this.http.put<IncidencePeople>(this.url+"/disable",body);
  }
}
