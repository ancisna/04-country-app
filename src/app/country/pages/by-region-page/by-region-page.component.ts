import { Component, signal, inject, effect } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryButtonComponent } from '../../components/country-button/country-button.component';
import { Region } from '../../models/region.model';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryPram(queryParam: string) {
  queryParam.toLocaleLowerCase();

  const validRegions: Record<string, string> = {
    africa: 'Africa',
    america: 'Americas',
    asia: 'Asia',
    eruope: 'Europe',
    oceania: 'Oceania',
    antartic: 'Antarctic',
  };
  return validRegions[queryParam] ?? 'Americas';
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

  query = signal(this.queryParam);

  sendRegionEvent(region: string | null) {
    if (region) {
      this.query.set(region);
    }
  }
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log(this.query);
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
