import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirContenidoComponent } from './subir-contenido.component';

describe('SubirContenidoComponent', () => {
  let component: SubirContenidoComponent;
  let fixture: ComponentFixture<SubirContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirContenidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
