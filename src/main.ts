import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
