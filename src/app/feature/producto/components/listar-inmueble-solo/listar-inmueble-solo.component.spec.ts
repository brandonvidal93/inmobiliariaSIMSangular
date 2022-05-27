import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInmuebleSoloComponent } from './listar-inmueble-solo.component';

describe('ListarInmuebleSoloComponent', () => {
  let component: ListarInmuebleSoloComponent;
  let fixture: ComponentFixture<ListarInmuebleSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInmuebleSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInmuebleSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
