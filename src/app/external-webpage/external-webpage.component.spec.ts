import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalWebpageComponent } from './external-webpage.component';

describe('ExternalWebpageComponent', () => {
  let component: ExternalWebpageComponent;
  let fixture: ComponentFixture<ExternalWebpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalWebpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalWebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
