export type Category = 'Especialidades' | 'Parrilla' | 'Picantes' | 'Sopas' | 'Pescados' | 'Vinos' | 'Cervezas' | 'Bebidas';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description?: string;
  imageUrl?: string;
}

export const menuItems: Product[] = [
  // Especialidades
  { id: '1', name: 'Lechón a la Cruz', price: 60, category: 'Especialidades', description: 'Lechón tierno asado a la cruz con técnica tradicional.' },
  { id: '2', name: 'Costillar a la Cruz', price: 60, category: 'Especialidades', description: 'Corte premium de costillar asado lentamente.' },
  { id: '3', name: 'Mixto Costillar y Lechón', price: 60, category: 'Especialidades', description: 'Lo mejor de ambos mundos en un solo plato.' },
  // Parrilla
  { id: '4', name: 'Pollo a la Cruz', price: 20, category: 'Parrilla', description: 'Pollo jugoso con cuero crocante.' },
  { id: '5', name: 'Costillitas de Chancho', price: 30, category: 'Parrilla', description: 'Costillas de cerdo bien sazonadas.' },
  { id: '6', name: 'Media Porción Lechón', price: 30, category: 'Parrilla', description: 'Porción personal de nuestro lechón estrella.' },
  { id: '7', name: 'Media Porción Costillar', price: 40, category: 'Parrilla', description: 'Porción personal de costillar premium.' },
  { id: '8', name: 'Media Porción Mixto', price: 40, category: 'Parrilla', description: 'Porción personal combinada.' },
  // ... (Adding a few to check if it works)
  { id: '9', name: 'Picante de Lengua', price: 20, category: 'Picantes', description: 'Lengua de res en salsa picante tradicional.' },
  // ... (Rest of items remain the same but I'll add description to all for completeness)
  { id: '10', name: 'Picante de Gallina', price: 20, category: 'Picantes' },
  { id: '11', name: 'Picante Mixto', price: 25, category: 'Picantes' },
  { id: '12', name: 'Saice Criollo', price: 10, category: 'Picantes' },
  { id: '13', name: 'Ranga Ranga', price: 12, category: 'Picantes' },
  { id: '14', name: 'Milanesa de Pollo', price: 12, category: 'Picantes' },
  { id: '15', name: 'Lomito al Plato', price: 15, category: 'Picantes' },
  // Sopas
  { id: '16', name: 'Sopa de Arroz Sencilla', price: 7, category: 'Sopas' },
  { id: '17', name: 'Sopa de Maní Sencilla', price: 7, category: 'Sopas' },
  { id: '18', name: 'Sopa de Arroz con Presa', price: 12, category: 'Sopas' },
  { id: '19', name: 'Sopa de Maní con Presa', price: 12, category: 'Sopas' },
  // Pescados
  { id: '20', name: 'Sábalo', price: 25, category: 'Pescados' },
  { id: '21', name: 'Tilapia', price: 30, category: 'Pescados' },
  { id: '22', name: 'Pejerrey', price: 30, category: 'Pescados' },
  { id: '23', name: 'Doradito', price: 40, category: 'Pescados' },
  // Vinos
  { id: '24', name: 'Terruño Tinto', price: 22, category: 'Vinos' },
  { id: '25', name: 'Kohlberg Tinto', price: 22, category: 'Vinos' },
  { id: '26', name: 'Aranjuez Blanco', price: 15, category: 'Vinos' },
  { id: '27', name: 'Kohlberg Blanco', price: 20, category: 'Vinos' },
  { id: '28', name: 'Guitarrita Blanco', price: 25, category: 'Vinos' },
  { id: '29', name: 'Vino Patero Artesanal 1/2L', price: 13, category: 'Vinos' },
  { id: '30', name: 'Vino Patero Artesanal 1L', price: 25, category: 'Vinos' },
  // Cervezas
  { id: '31', name: 'Huari 620ml', price: 18, category: 'Cervezas' },
  { id: '32', name: 'Paceña 1L', price: 22, category: 'Cervezas' },
  { id: '33', name: 'Potosina 1L', price: 25, category: 'Cervezas' },
  // Bebidas
  { id: '34', name: 'Gaseosa 3L', price: 15, category: 'Bebidas' },
  { id: '35', name: 'Gaseosa 2L', price: 12, category: 'Bebidas' },
  { id: '36', name: 'Gaseosa 1.5L', price: 10, category: 'Bebidas' },
  { id: '37', name: 'Gaseosa 1L', price: 7, category: 'Bebidas' },
  { id: '38', name: 'Gaseosa Personal', price: 5, category: 'Bebidas' },
  { id: '39', name: 'Refresco de Linaza 2L', price: 12, category: 'Bebidas' },
  { id: '40', name: 'Jugos 2L', price: 12, category: 'Bebidas' },
];
