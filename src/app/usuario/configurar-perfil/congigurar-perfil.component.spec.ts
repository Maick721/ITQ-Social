import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongigurarPerfilComponent } from './congigurar-perfil.component';

describe('CongigurarPerfilComponent', () => {
  let component: CongigurarPerfilComponent;
  let fixture: ComponentFixture<CongigurarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongigurarPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongigurarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
