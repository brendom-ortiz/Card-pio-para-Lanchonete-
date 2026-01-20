
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
    name: 'Combo Família Feliz',
    description: '1 Burger Delícia Bacon + Batata M + Refrigerante 350ml. A alegria da galera!',
    price: 52.90,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: 'c2',
    name: 'Dupla Dinâmica',
    description: '2 Burgers Classic + Porção de Batatas G. Perfeito para dois amigos.',
    price: 74.90,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: 'b1',
    name: 'Delícia Bacon',
    description: 'Pão brioche fofinho, blend 160g, queijo cheddar derretido e muito bacon crocante.',
    price: 34.90,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300'
  },
  {
    id: 'b2',
    name: 'Tropical Burger',
    description: 'Pão com gergelim, burger artesanal, queijo prato, alface, tomate e maionese especial.',
    price: 31.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550317143-b3024d869248?auto=format&fit=crop&q=80&w=400&h=300'
  }
];
