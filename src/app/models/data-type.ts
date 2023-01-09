export interface SignUp {
    name: string,
    password: string,
    email: string
}

export interface Login {
    password: string,
    email: string
}

export interface Product {
    image: string;
    name: string;
    color: string;
    price: number;
    category: string;
    description: string;
    id: number;
    quantity: undefined | number;
    productId: undefined | number;
}

export interface Cart{
    image: string;
    name: string;
    color: string;
    price: number;
    category: string;
    description: string;
    quantity: undefined | number
    id: number | undefined;
    productId: number;
    userId: number;
}

export interface pricedetails{
    price: number;
    discount: number;
    tax: number;
    delivery: number;
    total: number;
}
export interface order{
    email: string;
    contact: string;
    address: string;
    totalPrice: number;
    userId: number;
    id: number | undefined ;
}