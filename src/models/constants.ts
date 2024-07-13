export enum THEME_MODE {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum DB_CONNECTION {
  SQL = 'sql',
  MONGO = 'mongo'
}

export interface SQL_CONNECTION_BODY {
  sqlServer: string;
  sqlServerUsername: string;
  sqlServerPassword: string;
  sqlServerDatabaseName: string;
}

export type CONNECTION_STATUS = 'SUCCESS' | 'ERROR' | 'PENDING';

export interface connectionResponse {
  sql: {
    connected: boolean;
    response: CONNECTION_STATUS;
    errorMsg: string | null;
    successMsg: string | null;
  };
  mongo: {
    connected: boolean;
    response: CONNECTION_STATUS;
    errorMsg: string | null;
    successMsg: string | null;
  };
}

export interface API_SUCCESS_RESPONSE {
  data: {
    code: number;
    status: number;
    message: string;
  };
  status: CONNECTION_STATUS;
  statusCode: number;
}

export interface ConnectionInfo {
  sql: SQL_CONNECTION_BODY;
  mongo: string;
}
