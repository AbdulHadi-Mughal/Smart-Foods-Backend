export interface Spice {
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  weight: number;
  price: number;
  category: string;
  instruction: string;
  inStock: boolean;
}

export interface SpiceCardInfo {
  name: string;
  shortDescription: string;
  imageUrl: string;
  weight: number;
  price: number;
  category: string;
}
