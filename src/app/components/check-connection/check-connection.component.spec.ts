import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConnectionComponent } from './check-connection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CheckConnectionComponent', () => {
  let component: CheckConnectionComponent;
  let fixture: ComponentFixture<CheckConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CheckConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
