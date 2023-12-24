import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { appConfig } from './app.config';
import { routes } from './app.routes';

import 'localstorage-polyfill';
global['localStorage'] = localStorage;

const serverConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
