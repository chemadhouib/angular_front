import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTripSummaryComponent } from './book-trip-summary.component';

describe('BookTripSummaryComponent', () => {
  let component: BookTripSummaryComponent;
  let fixture: ComponentFixture<BookTripSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTripSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTripSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
