import { makeAutoObservable } from 'mobx';
import { ProductService } from '../services/ProductService';
import { Product } from '../models/Product';

export class ProductListViewModel {
    products: Product[] = [];
    isLoading: boolean = false;
    error: string | null = null;
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
        makeAutoObservable(this);
    }

    async loadProducts() {
        try {
            this.isLoading = true;
            this.error = null;
            this.products = await this.productService.getProducts();
        } catch (error) {
            this.error = 'Failed to load products';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
}

export class ProductDetailViewModel {
    product: Product | null = null;
    isLoading: boolean = false;
    error: string | null = null;
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
        makeAutoObservable(this);
    }

    async loadProduct(id: string) {
        try {
            this.isLoading = true;
            this.error = null;
            this.product = await this.productService.getProductById(id);
        } catch (error) {
            this.error = 'Failed to load product details';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
}
