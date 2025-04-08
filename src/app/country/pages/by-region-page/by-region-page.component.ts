import { Component, signal, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryButtonComponent } from '../../components/country-button/country-button.component';
import { Region } from '../../models/region.model';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryPram(queryParam: string): string {
  queryParam.toLowerCase();

  const validRegions: Record<string, string> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    eruope: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };
  console.log('pasó por validate', queryParam);
  return validRegions[queryParam] ?? 'Americas'; // si no hay parametro valido devuelve 'Americas'
}
@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, CountryButtonComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';

  // 1 - Definimos regions en el padre y en en el .html del padre usaremos
  // 2 - [regions]="regions" donde coloquemos el componente hijo.
  // 3 - En el .ts del hijo usamos
  //     regions = input.required<Region[]>(); para recibir el array
  // 4 - En el html del hijo estará disponible mediante regions()
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  query = linkedSignal<string>(() => validateQueryPram(this.queryParam));

  sendRegionEvent(region: string) {
    console.log('region:', region);
    console.log('a', this.query); // region pero en funcion
    console.log('b', this.queryParam); //anterior
    if (region) {
      this.query.set(region);
    }
    validateQueryPram(this.queryParam);
  }

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log('1', this.query);
      console.log('2', this.queryParam);
      console.log('3', request.query);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.query,
        },
      });
      if (!request.query) return of([]);
      return this.countryService.searchByRegion(request.query);
    },
  });
}
