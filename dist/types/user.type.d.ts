export type User = {
    username: string;
    email: string;
    hash: string;
    city: string;
    phoneNumber?: string;
    restaurant?: string;
    address: string[];
    favouriteSpices: string[];
    history: number[];
};
export type Order = {
    id: number;
    userEmail: string;
    orderedSpices: OrderedSpice[];
    state: "pending" | "accepted" | "delivered" | {
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
export type SignUpForm = {
    username: string;
    email: string;
    password: string;
    cityName: string;
    phoneNumber?: string;
};
export type Address = {
    _id: string;
    userId: string;
    house_building: string;
    street_area: string;
    city: string;
    province: "Punjab" | "Sindh" | "Khyber Pakhtunkhwa" | "Balochistan" | "Islamabad Capital Territory" | "Gilgit-Baltistan" | "Azad Jammu and Kashmir";
    postalCode: string;
};
