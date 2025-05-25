import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTurnoComponent } from './detalles-turno.component';

describe('DetallesTurnoComponent', () => {
  let component: DetallesTurnoComponent;
  let fixture: ComponentFixture<DetallesTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
