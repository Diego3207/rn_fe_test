import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
//import CurrencyAPI from '@everapi/currencyapi-js';



@Injectable({
  providedIn: 'root'  
})
export class CurrencyConverterService 
{
  url:string = environment.apiUrlCurrencies;
	
  constructor(private http: HttpClient) 
  {	  
  }

  getCurrencyConversion(baseCurrency,currencies):Observable<any> {
    
    /*
    Forma #1 para obtener el valor de divisa -> codigo
    

    # hacer npm install --save @everapi/currencyapi-js

   
   
   
    const currencyApi = new CurrencyAPI('cur_live_4xRqUHTjJB8DerYmATULvKjZ4e0SgrpB1BOTWyD9');
    currencyApi.latest({
      base_currency: baseCurrency,
      currencies: currencies // si se quiere convertir a mas de una divisa se puede concatenar por comas (,) cada divisa
    }).then(response => {
        let currencies = Object.keys(response.data);
        for (let currency of currencies) {
           console.log({'currency': currency , 'value':response.data[currency].value});
        }
    });
    
    */

   /* Forma #2 mediante ->  URL */
      const options = { params: new HttpParams({fromString: "base_currency="+baseCurrency+"&currencies="+currencies}) };

      return this.http.get<any[]>(this.url,options);
    }
}
