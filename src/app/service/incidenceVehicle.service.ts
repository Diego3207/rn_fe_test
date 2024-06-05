import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IncidenceVehicle } from 'src/app/api/incidenceVehicle';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'  
})
export class  IncidenceVehicleService 
{
	bearer:string = "bearer";
    url:string = `${environment.apiUrl}/incidenceVehicle`; 

  constructor(private http: HttpClient) 
  {	  
  }
  
  create(evidence: any){
    return this.http.post<IncidenceVehicle>(this.url+"/add",evidence);
  }

  delete(id:number){
    const body = { id: id };
    return this.http.put<IncidenceVehicle>(this.url+"/delete",body);
  }
  getAll(limit,page,sort):Observable<IncidenceVehicle[]> {
    const options = { params: new HttpParams({fromString: "limit="+limit+"&page="+page+"&sort="+sort}) };
	return this.http.get<IncidenceVehicle[]>(this.url+"/list",options);
  }
  getFilter(text,limit,page,sort) {
    const options = { params: new HttpParams({fromString: "filters="+text+"&limit="+limit+"&page="+page+"&sort="+sort}) };
    return this.http.get<IncidenceVehicle[]>(this.url+"/list",options);
          
  }
  getById(id:number){
    const options = { params: new HttpParams({fromString: "id="+ id}) };

    return this.http.get<IncidenceVehicle>(this.url+"/find",options);
  }
  update(data: IncidenceVehicle):Observable<any>{
    return this.http.put<IncidenceVehicle>(this.url+"/update",data);
   }
  disable(id:number){
    const body = { id: id };
    return this.http.put<IncidenceVehicle>(this.url+"/disable",body);
  }
}
