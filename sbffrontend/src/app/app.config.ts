
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';  // Import routes

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';  // Import JwtHelperService

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(),  // Provide HttpClient
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },  // Provide JWT options
    JwtHelperService  // Provide JwtHelperService
  ]
};
