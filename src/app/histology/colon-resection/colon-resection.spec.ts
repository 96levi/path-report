import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonResection } from './colon-resection';

describe('ColonResection', () => {
  let component: ColonResection;
  let fixture: ComponentFixture<ColonResection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColonResection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColonResection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
