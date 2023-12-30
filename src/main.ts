/// <reference types="@angular/localize" />


import { bootstrapApplication } from '@angular/platform-browser';
import "bootstrap-icons/font/bootstrap-icons.css"
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
