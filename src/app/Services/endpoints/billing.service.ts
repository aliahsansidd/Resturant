import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';
@Injectable()
export class BillingService {

  constructor(private http: HttpService) { }

  saveIncomGroup(data) {
    return this.http.post('/api/incomegroup/create', data);
  }

  getAllIncomeGroup(){
    return this.http.get('/api/incomegroup/get');
  }

  updateIncomeGroup(data) {
    return this.http.put('/api/incomegroup/update', data);
  }

  deleteIncomeGroup(id) {
    return this.http.delete('/api/incomegroup/delete?id='+id);
  }

}
