import { Component, inject, resource, signal } from '@angular/core'; // permite injectar dependencias signal permite el estado reactivo sin RxJS o BehaviorSubject
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service'; // Servicio
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  // inyectamos nuestro servicio para poder usarlo en lugar de un constructor
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute); // Obtiene la info de la ruta activa
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''; //snapshot no es reactivo

  // señal que almacena una consulta hecha por el usuario
  //  se actualiza dinámicamente cuando el usuario escriba en el campo de búsqueda.
  query = signal(this.queryParam);

  /****** rxResource no trabaja con promesas, trabaja con Observables
   * **** es muy similar a la función firstValueFrom que se usa en el codigo comentado ***************/
  countryResource = rxResource({
    // request: datos que necesita para funcionar, observa query()
    // Cuando query cambie el recurso se actualizará automáticamente
    request: () => ({ query: this.query() }),
    // loader: cargará los datos usa query para hacer la petición al servicio
    loader: ({ request }) => {
      // ruta y parametros opcionales
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
        },
      });
      if (!request.query) return of([]); // si query está vacío

      return this.countryService.searchByCapital(request.query);
    },
  });

  /****** Resorce manda llamar a la funcion firstValueFrom que es de rxjs
   ****** que transforma el valor del observable en una promesa porque el resource
   ****** trabaja con promesas ***************/
  /*
  // Resource sustituye a Observable y suscribe()
   // resource: permite manejar datos asíncronos de forma reactiva
  countryResource = resource({
    // request: datos que necesita para funcionar, observa query()
    // Cuando query cambie el recurso se actualizará automáticamente
    request: () => ({ query: this.query() }),
    // loader: cargará los datos usa query para hacer la petición al servicio
    loader: async({ request }) => {
      if (!request.query) return []; // si query está vacío
      // Convierte el Observable en una Promesa para poder usar await
      return await firstValueFrom( 
        this.countryService.searchByCapital(request.query)
      )
    },
  });

*/

  /****** Forma antigua ***************/

  /*
  // Definición de estados de la consulta
  isLoading = signal(false); // En proceso
  isError = signal<string|null>(null); // Guarda mensaje de Error
  countries = signal<Country[]>([]); // Guarda la lista de países obtenidos de la API


    onSearch(query:string){
    if( this.isLoading() ) return; // comprueba si esta cargando

    this.isLoading.set(true); // Marca isLoading como true mientras se obtiene la respuesta
    this.isError.set(null); // Pone isError a null para borrar mensajes anteriores

    // Hay que suscribirse a la respuesta para recibir datos
    // Hace la petición a CountryService para buscar por capital.
    // Cuando llega la respuesta, actualiza countries con los datos obtenidos y desactiva isLoading.
    this.countryService.searchByCapital(query).subscribe({ 
      next: ( countries ) =>{ // complete: cuando termina el observable | error: cuando hay excepciones | next: todo sale bien y tenemos el siguiente valor del observable
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: ( err ) =>{
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      },
      });
    }
  */
}
