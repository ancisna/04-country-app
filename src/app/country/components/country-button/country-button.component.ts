import { Component, signal, input, output } from '@angular/core';
import { Region } from '../../models/region.model';

@Component({
  selector: 'country-button',
  imports: [],
  templateUrl: './country-button.component.html',
})
export class CountryButtonComponent {
  regions = input.required<Region[]>(); // Recibe las regiones del padre
  initialValue = input<string>();
  selectedRegion = signal<string | null>(null); //Señal donde guardamos el valor del botón clicado

  sendRegionEvent = output<string | null>(); // evento personalizado Emite una referencia

  sendRegionToByRegion(region: string | null) {
    this.selectedRegion.set(region);
    this.sendRegionEvent.emit(region);
  }
}
