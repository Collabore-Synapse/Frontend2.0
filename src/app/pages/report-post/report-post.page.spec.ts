import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportPostPage } from './report-post.page';

describe('ReportPostPage', () => {
  let component: ReportPostPage;
  let fixture: ComponentFixture<ReportPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
