import { FlattenMaps } from "mongoose";
export interface Spice {
    _id: FlattenMaps<unknown>;
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
    _id: FlattenMaps<unknown>;
    name: string;
    shortDescription: string;
    imageUrl: string;
    weight: number;
    price: number;
    category: string;
}
