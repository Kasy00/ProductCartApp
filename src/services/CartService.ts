import axios from 'axios';
import { Cart } from '../models/Cart';

export class CartService {
    private baseUrl = 'http://10.0.2.2:5265/api/v1';
    private userId = '00000000-0000-0000-0000-000000000001'; // Tymczasowo hardkodowane ID użytkownika

    private getHeaders() {
        return {
            'X-User-Id': this.userId,
            'Content-Type': 'application/json',
        };
    }

    async createCart(): Promise<string> {
        try {
            const response = await axios.post(
                `${this.baseUrl}`,
                {},
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }

    async getCart(cartId: string): Promise<Cart> {
        try {
            const response = await axios.get(
                `${this.baseUrl}/${cartId}`,
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    }

    async addItemToCart(cartId: string, productId: string, quantity: number): Promise<void> {
        try {
            await axios.post(
                `${this.baseUrl}/${cartId}/items`,
                { productId, quantity },
                { headers: this.getHeaders() }
            );
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    }

    async removeItemFromCart(cartId: string, productId: string): Promise<void> {
        try {
            await axios.delete(
                `${this.baseUrl}/${cartId}/items/${productId}`,
                { headers: this.getHeaders() }
            );
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    }

    async updateItemQuantity(cartId: string, productId: string, quantity: number): Promise<void> {
        try {
            await axios.put(
                `${this.baseUrl}/${cartId}/items/${productId}`,
                { quantity },
                { headers: this.getHeaders() }
            );
        } catch (error) {
            console.error('Error updating item quantity:', error);
            throw error;
        }
    }

    async finalizeCart(cartId: string): Promise<string> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/${cartId}/finalize`,
                {},
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            console.error('Error finalizing cart:', error);
            throw error;
        }
    }
}
