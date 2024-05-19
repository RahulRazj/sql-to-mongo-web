import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DB_CONNECTION } from '../../../models/constants';

@Component({
  selector: 'app-check-connection',
  templateUrl: './check-connection.component.html',
  styleUrl: './check-connection.component.scss',
})
export class CheckConnectionComponent {
  connectionForm: FormGroup;
  isFormSubmitted = false;
  sqlConnectionCheck = false;
  mongoConnectionCheck = false;

  isSqlConnected = false;
  isMongoConnected = false;

  connectionResponse = {
    sql: {
      errorMsg: null,
      successMsg: null,
    },
    mongo: {
      errorMsg: null,
      successMsg: null,
    },
  };

  constructor() {
    this.connectionForm = new FormGroup({
      sqlServer: new FormControl('', [Validators.required]),
      sqlServerUsername: new FormControl('', [Validators.required]),
      sqlServerPassword: new FormControl('', [Validators.required]),
      sqlServerDatabaseName: new FormControl('', [Validators.required]),
      sqlConnectionString: new FormControl('', [Validators.required]),
      mongoConnectionString: new FormControl('', [Validators.required]),
    });
  }

  checkConnection(dbConnectionType: string) {
    dbConnectionType = dbConnectionType as DB_CONNECTION;

    switch (dbConnectionType) {
      case DB_CONNECTION.SQL:
        this.sqlConnectionCheck = true;
        break;
      case DB_CONNECTION.MONGO:
        this.mongoConnectionCheck = true;
        break;
    }
  }

  onSubmit() {
    const isFormValid = this.connectionForm.valid;
    console.log('valid', this.connectionForm.controls['sqlConnectionString'].invalid);
    this.isFormSubmitted = true;
  }
}
