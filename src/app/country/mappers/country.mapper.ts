import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  // Recibe un objeto RestCountry y lo convierte en un objeto Country
  static mapRESTCountryItemToCountry(item: RESTCountry): Country {
    return {
      // Capital
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      name: item.translations['spa'].common ?? 'No Spanish name',
      capital: item.capital?.join(','),
      population: item.population,

      region: item.region,
      subregion: item.subregion,

      area: item.area,
    };
  }

  // Recibe un array de objetos RestCountry[]  y devuelve un array de objetos Country[]
  static mapRESTCountryArrayToCountryArray(items: RESTCountry[]): Country[] {
    return items.map(this.mapRESTCountryItemToCountry);
  }
}
