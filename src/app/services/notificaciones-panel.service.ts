import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesPanelService {
  
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  constructor() { }

  // Abrir el panel
  abrir(): void {
    this.isOpenSubject.next(true);
  }

  // Cerrar el panel
  cerrar(): void {
    this.isOpenSubject.next(false);
  }

  // Toggle del panel
  toggle(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  // Obtener estado actual
  estaAbierto(): boolean {
    return this.isOpenSubject.value;
  }
}
