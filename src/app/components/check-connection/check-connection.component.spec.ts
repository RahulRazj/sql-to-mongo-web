import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConnectionComponent } from './check-connection.component';
import { AppService } from '../../services/app.service';
import { MockAppService, MockLocalStorage } from '../../../models/mock';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CheckConnectionComponent', () => {
  let component: CheckConnectionComponent;
  let fixture: ComponentFixture<CheckConnectionComponent>;
  let service: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: AppService, useClass: MockAppService }],
      declarations: [CheckConnectionComponent]
    }).compileComponents();


    fixture = TestBed.createComponent(CheckConnectionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle passwordHidden on calling togglePasswordVisibility', () => {
    component.passwordHidden = true;
    component.togglePasswordVisibility();
    expect(component.passwordHidden).toBeFalsy();
  });

  it('should initialize form group correctly', () => {
    component.initializeFormGroup();
    expect(component.connectionForm).toBeTruthy();
    expect(component.connectionForm.controls['sqlServer']).toBeTruthy();
    expect(component.connectionForm.controls['sqlServerUsername']).toBeTruthy();
    expect(component.connectionForm.controls['sqlServerPassword']).toBeTruthy();
    expect(component.connectionForm.controls['sqlServerDatabaseName']).toBeTruthy();
    expect(component.connectionForm.controls['mongoConnectionString']).toBeTruthy();
  });

  it('should handle SQL connection check correctly', async () => {
    const spyCheckSqlConnection = jest.spyOn(component, 'checkSqlConnection');
    component.onCheckConnection('SQL');
    expect(spyCheckSqlConnection).toHaveBeenCalled();
  });

  it('should handle Mongo connection check correctly', async () => {
    const checkMongoConnection = jest.spyOn(component, 'checkMongoConnection');
    component.onCheckConnection('MONGO');
    expect(checkMongoConnection).toHaveBeenCalled();
  });

  // Mocking the service call for SQL connection check
  it('checkSqlConnection should update connection response on success', async () => {
    const spy = spyOn(service, 'checkSqlConnection')
    await component.checkSqlConnection();
    expect(spy).toHaveBeenCalled();
  });

  // Mocking the service call for Mongo connection check
  it('checkMongoConnection should update connection response on success', async () => {
    const spy = jest.spyOn(service, 'checkMongoConnection');
    await component.checkMongoConnection();
    expect(spy).toHaveBeenCalled();
  });

  it('should toggle password visibility', () => {
    const initialVisibility = component.passwordHidden;
    component.togglePasswordVisibility();
    expect(component.passwordHidden).toBe(!initialVisibility);
  });

  it('should submit form and store connection info', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    component.connectionInfo = {
      sql: {
        sqlServer: '',
        sqlServerUsername: '',
        sqlServerPassword: '',
        sqlServerDatabaseName: ''
      },
      mongo: ''
    };

    Object.defineProperty(component.connectionForm, 'valid', {
      get: () => true
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith('connectionInfo', JSON.stringify(component.connectionInfo));
  });
});
function spyOnProperty(myForm: any, arg1: string) {
  throw new Error('Function not implemented.');
}

