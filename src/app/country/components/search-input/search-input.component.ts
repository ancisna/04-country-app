import {
  Component,
  output,
  input,
  signal,
  effect,
  linkedSignal,
} from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input('Buscar');
  value = output<string>(); // no se recomienda poner on para los eventos (onValue) por buenas practicas

  initialValue = input<string>();
  debounceTime = input(300); // señal, establece el valor en 300

  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // Señal, tiene siempre el valor actualizado de la caja de texto
  // lo ultimo que la persona escribió.

  // El debounce hace la petición cuando se deja de escribir no cada vez
  // que se escribe una letra
  // Se coloca en el componente input (aquí)
  // El efecto se dispara cada vez que cambiamos el inputValue.
  debounceEfect = effect((onCleanup) => {
    // funcion que dispara la limpieza
    // cuando se llama o cuando se destruye o cuando cambie el efecto.

    const value = this.inputValue(); // Dispara el efecto cuando cambia inputValue dentro del input.

    // Retardo antes de emitir el valor
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());
    // Limpieza: Cancela el timeout si el efecto se vuelve a ejecutar
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
