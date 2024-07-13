import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { API_SUCCESS_RESPONSE, ConnectionInfo, DB_CONNECTION, connectionResponse } from '../../../models/constants';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-check-connection',
  templateUrl: './check-connection.component.html',
  styleUrls: ['./check-connection.component.scss']
})
export class CheckConnectionComponent {
  connectionForm: FormGroup = new FormGroup({});
  isFormSubmitted = false;
  sqlConnectionCheck = false;
  mongoConnectionCheck = false;
  passwordHidden = true;
  sqlConnectionChecking = false;
  mongoConnectionChecking = false;

  connectionInfo: ConnectionInfo = {
    sql: {
      sqlServer: '',
      sqlServerUsername: '',
      sqlServerPassword: '',
      sqlServerDatabaseName: ''
    },
    mongo: ''
  };

  connectionResponse: connectionResponse = {
    sql: {
      connected: false,
      response: 'PENDING',
      errorMsg: null,
      successMsg: null
    },
    mongo: {
      connected: false,
      response: 'PENDING',
      errorMsg: null,
      successMsg: null
    }
  };

  constructor(private service: AppService) {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.connectionForm = new FormGroup({
      sqlServer: new FormControl('', [Validators.required]),
      sqlServerUsername: new FormControl('', [Validators.required]),
      sqlServerPassword: new FormControl('', [Validators.required]),
      sqlServerDatabaseName: new FormControl('', [Validators.required]),
      mongoConnectionString: new FormControl('', [Validators.required])
    });
  }

  onCheckConnection(dbConnectionType: string) {
    this.resetConnectionResponse(dbConnectionType);
    switch (dbConnectionType) {
      case DB_CONNECTION.SQL:
        this.checkSqlConnection();
        break;
      case DB_CONNECTION.MONGO:
        this.checkMongoConnection();
        break;
    }
  }

  async checkSqlConnection() {
    this.sqlConnectionCheck = true;
    const isFormValid =
      this.connectionForm.controls['sqlServer'].valid &&
      this.connectionForm.controls['sqlServerUsername'].valid &&
      this.connectionForm.controls['sqlServerPassword'].valid &&
      this.connectionForm.controls['sqlServerDatabaseName'].valid;

    if (!isFormValid) {
      return;
    }

    this.sqlConnectionChecking = true;

    const sqlConfig = {
      sqlServer: this.connectionForm.controls['sqlServer'].value,
      sqlServerUsername: this.connectionForm.controls['sqlServerUsername'].value,
      sqlServerPassword: this.connectionForm.controls['sqlServerPassword'].value,
      sqlServerDatabaseName: this.connectionForm.controls['sqlServerDatabaseName'].value
    };

    try {
      const response = (await this.service.checkSqlConnection(sqlConfig)) as API_SUCCESS_RESPONSE;

      this.connectionResponse.sql.response = response.status;
      this.connectionResponse.sql.successMsg = response.data.message;
      this.connectionResponse.sql.connected = true;

      this.connectionInfo.sql = sqlConfig;
      this.sqlConnectionChecking = false;
    } catch (error: any) {
      this.connectionResponse.sql.response = error.error?.status || 'ERROR';
      this.connectionResponse.sql.errorMsg = error.error?.message || 'SQL connection failed.';
      this.sqlConnectionChecking = false;

      console.log('error', error);
    }
  }

  async checkMongoConnection() {
    this.mongoConnectionCheck = true;
    const isFormValid = this.connectionForm.controls['mongoConnectionString'].valid;

    if (!isFormValid) {
      return;
    }

    this.mongoConnectionChecking = true;

    const mongoConnectionString = this.connectionForm.controls['mongoConnectionString'].value;
    try {
      const response = (await this.service.checkMongoConnection(mongoConnectionString)) as API_SUCCESS_RESPONSE;

      this.connectionResponse.mongo.response = response.status;
      this.connectionResponse.mongo.successMsg = response.data.message;
      this.connectionResponse.mongo.connected = true;

      this.connectionInfo.mongo = mongoConnectionString;
      this.mongoConnectionChecking = false;
    } catch (error: any) {
      this.connectionResponse.mongo.response = error.error?.status || 'ERROR';
      this.connectionResponse.mongo.errorMsg = error.error?.message || 'Mongo connection failed.';
      this.mongoConnectionChecking = false;

      console.log('error', error);
    }
  }

  onConnectionStringChange(dbConnectionType: string) {
    switch (dbConnectionType) {
      case DB_CONNECTION.SQL:
        this.sqlConnectionCheck = false;
        break;
      case DB_CONNECTION.MONGO:
        this.mongoConnectionCheck = false;
        break;
    }
  }

  resetConnectionResponse(dbConnectionType: string) {
    switch (dbConnectionType) {
      case DB_CONNECTION.SQL:
        this.connectionResponse.sql = {
          connected: false,
          response: 'PENDING',
          errorMsg: null,
          successMsg: null
        };
        break;
      case DB_CONNECTION.MONGO:
        this.connectionResponse.mongo = {
          connected: false,
          response: 'PENDING',
          errorMsg: null,
          successMsg: null
        };
        break;
    }
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

  onSubmit() {
    const isFormValid = this.connectionForm.valid;
    this.isFormSubmitted = true;

    if (!isFormValid) {
      return;
    }

    localStorage.setItem('connectionInfo', JSON.stringify(this.connectionInfo));
  }
}
