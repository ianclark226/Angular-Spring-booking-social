import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpTokenInterceptor } from './services/interceptor/http-token.interceptor'; // ✅ Use lowercase 'h'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpTokenInterceptor]) // ✅ Register interceptor here
    )
  ]
};
