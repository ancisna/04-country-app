import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './notFound.component.html',
})
export class NotFoundComponent {
  location = inject(Location);
  goBack() {
    this.location.back(); // se mueve en el historial hacia atrás
  }
}
