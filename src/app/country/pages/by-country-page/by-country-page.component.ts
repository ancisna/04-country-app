import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { 
    // inyectamos nuestro servicio para poder usarlo en lugar de un constructor
    countryService = inject(CountryService); 
 
    // signal crea una señal que almacena una consulta hecha por el usuario
    //  se actualiza dinámicamente cuando el usuario escriba en el campo de búsqueda.
    query = signal('');
  
    // Resource sustituye a Observable y suscribe()
     // resource: permite manejar datos asíncronos de forma reactiva
    countryResource = rxResource({
      request: () => ({ query: this.query() }),
      loader: ( {request }) => {
        if(!request.query) return of([]);
        return this.countryService.searchByCountry(request.query);
      },
    });
}


