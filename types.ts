
export interface Snack {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Burgers' | 'Hot Dogs' | 'Acompanhamentos' | 'Bebidas';
  image: string;
}

export interface CartItem extends Snack {
  quantity: number;
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
}
