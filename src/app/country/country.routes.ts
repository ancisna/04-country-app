// Archivo de configuración de rutas
// Aquí pondremos las rutas específicas de las rutas de países
import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountryLayoutComponent } from './layout/countryLayout/countryLayout.component';


// Hacemos que la ruta del home esté disponible para todos los usuarios
export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayoutComponent, // Ruta principal y su componente principal

        children:[ // Rutas hijas
            {
                path: 'by-capital',
                component: ByCapitalPageComponent 
            },
            {
                path: 'by-country',
                component: ByCountryPageComponent
            },
            {
                path: 'by-region',
                component: ByRegionPageComponent
            },
            {
                path: 'by/:code',
                component: CountryPageComponent
            },
            {
                path: '**', // Ruta comodín si el usuario introduce una URL no válida
                redirectTo:'by-capital', // esto se coloca al final, si no esta puesta la ruta siempre redirecciona a esta
            }
        ]
    },
];
export default countryRoutes; // Se exporta para que luego esté diponible mediante un import sin {} en otro archivo

