import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import countryRoutes from '../../country.routes';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/notFound/notFound.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  // ActivatedRoute servicio que da información sobre la ruta activa.
  // snapshot toma una "foto" de la ruta actual no es dinámico!!!.
  // params['code'] accede al parámetro code en la URL.
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService);

  countryResources = rxResource({
    request: () => ({ code: this.countryCode }), // define los datos de entrada
    loader: ({ request }) => {
      // Carga los datos, hace la llamada usando el código
      return this.CountryService.searchCountryByAlphaCode(request.code);
    },
  });
}
