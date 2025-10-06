import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRepasComponent } from './gestion-repas.component';

describe('GestionRepasComponent', () => {
  let component: GestionRepasComponent;
  let fixture: ComponentFixture<GestionRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRepasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
