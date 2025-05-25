import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrabajadorComponent } from './add-trabajador.component';

describe('AddTrabajadorComponent', () => {
  let component: AddTrabajadorComponent;
  let fixture: ComponentFixture<AddTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
