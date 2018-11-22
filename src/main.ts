import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from 'environments/environment';
import { AppModule } from 'app';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
// import * as $ from 'jquery';
// window['$'] = $;
// window['jQuery'] = $;

import 'froala-editor/js/froala_editor.pkgd.min.js';
registerLocaleData(zh);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
