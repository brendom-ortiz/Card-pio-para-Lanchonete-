
import { Snack, MenuCategory } from './types';

export const CATEGORIES: MenuCategory[] = [
  { id: 'Combos', label: 'Combos', icon: '🎁' },
  { id: 'Burgers', label: 'Burgers', icon: '🍔' },
  { id: 'Hot Dogs', label: 'Hot Dogs', icon: '🌭' },
  { id: 'Acompanhamentos', label: 'Porções', icon: '🍟' },
  { id: 'Bebidas', label: 'Bebidas', icon: '🥤' },
];

export const SNACKS: Snack[] = [
  {
    id: 'c1',
    name: 'Combo Império',
    description: '1 X-Guilherme Royal + Batata M + Coca-Cola Original 350ml. O favorito da casa.',
    price: 54.90,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: 'c2',
    name: 'Dupla Real',
    description: '2 Burgers Classic Guilherme + Porção de Batatas G. Perfeito para compartilhar.',
    price: 79.90,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: 'b1',
    name: 'X-Guilherme Royal',
    description: 'Pão brioche, blend 180g, queijo cheddar extra gold, cebola caramelizada e molho secreto Guilherme.',
    price: 38.90,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: 'b2',
    name: 'Purple Flame',
    description: 'Pão australiano, burger duplo, muito bacon crocante, queijo prato e geleia de pimenta roxa intensa.',
    price: 41.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550317143-b3024d869248?auto=format&fit=crop&q=80&w=400&h=300'
  }
];
