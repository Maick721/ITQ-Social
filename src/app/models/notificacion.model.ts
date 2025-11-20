export interface Notificacion {
  id: number;
  tipo: 'like' | 'comentario' | 'amistad' | 'publicacion' | 'etiqueta' | 'compartir';
  usuarioEmisor: {
    id: number;
    nombre: string;
    avatar: string;
  };
  mensaje: string;
  fecha: Date;
  leida: boolean;
  imagen?: string; // Imagen de la publicación relacionada (opcional)
  enlace?: string; // Ruta a la que debe navegar al hacer click
}

export type TipoNotificacion = 'like' | 'comentario' | 'amistad' | 'publicacion' | 'etiqueta' | 'compartir';
