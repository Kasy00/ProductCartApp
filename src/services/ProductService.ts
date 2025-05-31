import axios from 'axios';
import { Product } from '../models/Product';

export class ProductService {    
    readonly baseUrl = 'http://10.0.2.2:5052/api/v1';

    async getProducts(): Promise<Product[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/Product`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async getProductById(id: string): Promise<Product | null> {
        try {
            const response = await axios.get(`${this.baseUrl}/Product/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            return null;
        }
    }
}
