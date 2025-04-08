import { Component, linkedSignal, signal, input, output } from '@angular/core';
import { Region } from '../../models/region.model';

@Component({
  selector: 'country-button',
  imports: [],
  templateUrl: './country-button.component.html',
})
export class CountryButtonComponent {
  regions = input.required<Region[]>(); // Recibe las regiones del padre
  initialValue = input<string>();
  selectedRegion = linkedSignal<string>(() => this.initialValue() ?? ''); //Señal donde guardamos el valor del botón clicado

  sendRegionEvent = output<string>(); // evento personalizado Emite una referencia

  sendRegionToByRegion(region: string) {
    // this.selectedRegion.set(region);
    console.log('selectedRegion:', this.selectedRegion());
    console.log('initialValue', this.initialValue());
    console.log('region', region);

    this.sendRegionEvent.emit(this.selectedRegion());
  }
}
