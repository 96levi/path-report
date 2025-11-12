import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonBiomarker } from './colon-biomarker';

describe('ColonBiomarker', () => {
  let component: ColonBiomarker;
  let fixture: ComponentFixture<ColonBiomarker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColonBiomarker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColonBiomarker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
