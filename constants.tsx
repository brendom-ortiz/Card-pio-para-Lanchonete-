
import { Snack, MenuCategory } from './types';

export const CATEGORIES: MenuCategory[] = [
  { id: 'Burgers', label: 'Burgers', icon: '🍔' },
  { id: 'Hot Dogs', label: 'Hot Dogs', icon: '🌭' },
  { id: 'Acompanhamentos', label: 'Porções', icon: '🍟' },
  { id: 'Bebidas', label: 'Bebidas', icon: '🥤' },
];

export const SNACKS: Snack[] = [
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
  },
  {
    id: 'b3',
    name: 'Classic Guilherme',
    description: 'O clássico com alface premium, tomate, cebola branca, picles crocante e maionese real.',
    price: 32.90,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400&h=300'
  }
];
