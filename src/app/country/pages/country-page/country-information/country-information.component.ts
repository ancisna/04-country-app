import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { Languages } from '../../../interfaces/rest-countries.interface';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country = input.required<Country>(); // estará disponible en el html

  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
