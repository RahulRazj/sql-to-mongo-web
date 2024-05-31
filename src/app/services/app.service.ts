import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_SUCCESS_RESPONSE, SQL_CONNECTION_BODY } from '../../models/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiBaseUrl = environment.apiBaseUrl;

  private CHECK_SQL_CONNECTION = 'api/v1/checkSqlConnection';
  private CHECK_MONGO_CONNECTION = 'api/v1/checkMongoConnection';

  constructor(private http: HttpClient) {}

  checkMongoConnection(mongoConnectionString: string) {
    const url = `${this.apiBaseUrl}/${this.CHECK_MONGO_CONNECTION}`;

    return firstValueFrom(this.http.post(url, { mongoConnectionString }));
  }

  checkSqlConnection(sqlConfig: SQL_CONNECTION_BODY): Promise<API_SUCCESS_RESPONSE | any> {
    const url = `${this.apiBaseUrl}/${this.CHECK_SQL_CONNECTION}`;

    return firstValueFrom(this.http.post(url, sqlConfig));
  }

}
