import { Component, inject, signal } from '@angular/core'; // permite injectar dependencias signal permite el estado reactivo sin RxJS o BehaviorSubject
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service'; // Servicio
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 
  // inyectamos nuestro servicio para poder usarlo en lugar de un constructor
  countryService = inject(CountryService); 

  // Definición de estados de la consulta
  isLoading = signal(false); // En proceso
  isError = signal<string|null>(null); // Guarda mensaje de Error
  countries = signal<Country[]>([]); // Guarda la lista de países obtenidos de la API

  onSearch(query:string){
    if( this.isLoading() ) return; 

    this.isLoading.set(true); // Marca isLoading como true mientras se obtiene la respuesta
    this.isError.set(null); // Pone isError a null para borrar mensajes anteriores

    // Hay que suscribirse a la respuesta para recibir datos
    // Hace la petición a CountryService para buscar por capital.
    // Cuando llega la respuesta, actualiza countries con los datos obtenidos y desactiva isLoading.
    this.countryService.searchByCapital(query).subscribe((countries) =>{      
      this.isLoading.set(false);
      this.countries.set(countries);
    });

  }
}
