import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

// Hacemos que la ruta del home esté disponible para todos los usuarios
export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'country', // Si el path es country carga el componente country.routes que contiene la ruta principal de los paises y las rutas hijas
        loadChildren: ()=> import('./country/country.routes'),
    },
    {
        path: '**', // Comodín
        redirectTo: '' // Aquí se puede indicar un componente, 
    }
];
