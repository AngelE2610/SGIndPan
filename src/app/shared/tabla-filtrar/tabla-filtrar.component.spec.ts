import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFiltrarComponent } from './tabla-filtrar.component';

describe('TablaFiltrarComponent', () => {
  let component: TablaFiltrarComponent;
  let fixture: ComponentFixture<TablaFiltrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaFiltrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaFiltrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
