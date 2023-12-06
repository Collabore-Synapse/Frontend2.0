import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeNamePage } from './change-name.page';

describe('ChangeNamePage', () => {
  let component: ChangeNamePage;
  let fixture: ComponentFixture<ChangeNamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangeNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
