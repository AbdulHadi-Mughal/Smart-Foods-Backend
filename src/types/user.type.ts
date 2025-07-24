export type User = {
  username: string;
  email: string;
  hash: string;
  restaurant: string;
  address: string[];
  favouriteSpices: string[];
  history: Order[];
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: number;
  userEmail: string;
  orderedSpices: OrderedSpice[];
  state:
    | "pending"
    | "accepted"
    | "delivered"
    | {
        type: "rejected";
        reason: string;
      };
  createdAt: Date;
  updatedAt: Date;
};

export type OrderedSpice = {
  spiceName: string;
  weight: number;
  quantity: number;
};
