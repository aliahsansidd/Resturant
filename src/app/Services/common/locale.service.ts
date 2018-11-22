import { Injectable } from '@angular/core';
import { en_US } from 'ng-zorro-antd';

@Injectable()
export class LocaleService {
  locales = {
    enUS: en_US
  };
  locale;
  constructor() {
    this.changeLocale(this.locales.enUS);
  }
  changeLocale(locale) {
    this.locale = locale;
    // this.localeService.setLocale(this.locale);
  }
}
