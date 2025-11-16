import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonBiopsy } from './colon-biopsy';

describe('ColonBiopsy', () => {
  let component: ColonBiopsy;
  let fixture: ComponentFixture<ColonBiopsy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColonBiopsy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColonBiopsy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
