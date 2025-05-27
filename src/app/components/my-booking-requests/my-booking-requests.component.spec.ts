import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingRequestsComponent } from './my-booking-requests.component';

describe('MyBookingRequestsComponent', () => {
  let component: MyBookingRequestsComponent;
  let fixture: ComponentFixture<MyBookingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBookingRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
