import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationModal } from './location.page';

describe('LocationPage', () => {
  let component: LocationModal;
  let fixture: ComponentFixture<LocationModal>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
