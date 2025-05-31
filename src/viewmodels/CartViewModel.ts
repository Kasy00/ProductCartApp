import { makeAutoObservable } from 'mobx';
import { CartService } from '../services/CartService';
import { ProductService } from '../services/ProductService';
import { Cart, CartItem } from '../models/Cart';

export class CartViewModel {
    cart: Cart | null = null;
    isLoading: boolean = false;
    error: string | null = null;
    cartId: string | null = null;

    constructor(private cartService: CartService, private productService: ProductService) {
        makeAutoObservable(this);
    }

    async initializeCart() {
        try {
            this.isLoading = true;
            this.error = null;
            this.cartId = await this.cartService.createCart();
            await this.loadCart();
        } catch (error) {
            this.error = 'Failed to initialize cart';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async loadCart() {
        if (!this.cartId) return;
        
        try {
            this.isLoading = true;
            this.error = null;
            this.cart = await this.cartService.getCart(this.cartId);
        } catch (error) {
            this.error = 'Failed to load cart';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async addToCart(productId: string, quantity: number = 1) {
        if (!this.cartId) {
            await this.initializeCart();
        }

        try {
            this.isLoading = true;
            this.error = null;
            await this.cartService.addItemToCart(this.cartId!, productId, quantity);
            await this.loadCart();
        } catch (error) {
            this.error = 'Failed to add item to cart';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async removeFromCart(productId: string) {
        if (!this.cartId) return;

        try {
            this.isLoading = true;
            this.error = null;
            await this.cartService.removeItemFromCart(this.cartId, productId);
            await this.loadCart();
        } catch (error) {
            this.error = 'Failed to remove item from cart';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async updateQuantity(productId: string, quantity: number) {
        if (!this.cartId) return;

        try {
            this.isLoading = true;
            this.error = null;
            await this.cartService.updateItemQuantity(this.cartId, productId, quantity);
            await this.loadCart();
        } catch (error) {
            this.error = 'Failed to update quantity';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    get totalAmount(): number {
        if (!this.cart) return 0;
        return this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get itemCount(): number {
        if (!this.cart) return 0;
        return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}
