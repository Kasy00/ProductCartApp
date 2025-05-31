export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
}
