import { HttpClient } from '@angular/common/http'; // Permite hacer peticiones HTTP a APIs
import { inject, Injectable } from '@angular/core'; // inject permite inyectar dependencias en servicios
import { RESTCountry} from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const  API_URL = 'https://restcountries.com/v3.1'; // Url de la Api del servivio

// El servicio estará disponible en toda la aplicación sin necesidad de importarlo como un módulo
@Injectable({
  providedIn: 'root' 
})

export class CountryService {

  // injectamos el cliente del servicio podrá hacer peticiones Http
  private http = inject(HttpClient); // se debe incluir el HttpClient en el app.config.ts en providers

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLocaleLowerCase();

    // return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    //   .pipe(
    //     map(CountryMapper.mapRESTCountryArrayToCountryArray)      
    //   ); // Petición se le pasa una Url y recibe un array de objetos RESTcountry

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(restCountries => CountryMapper.mapRESTCountryArrayToCountryArray(restCountries)),  
      catchError(error => {
        console.log(`Error fetching `, error);
        return throwError(() => new Error(`No se pudo obtener el país de la capital: ${query}`))
      }) 
    ); // Petición se le pasa una Url y recibe un array de objetos RESTcountry
  }
}

