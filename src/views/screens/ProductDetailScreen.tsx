import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ProductDetailViewModel } from '../../viewmodels/ProductViewModel';
import { CartViewModel } from '../../viewmodels/CartViewModel';
import { RouteProp } from '@react-navigation/native';

interface ProductDetailScreenProps {
    viewModel: ProductDetailViewModel;
    cartViewModel: CartViewModel;
    route: RouteProp<{ ProductDetail: { productId: string } }, 'ProductDetail'>;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = observer(({ viewModel, cartViewModel, route }) => {
    const { productId } = route.params;

    useEffect(() => {
        viewModel.loadProduct(productId);
    }, [productId]);

    if (viewModel.isLoading) {
        return <Text style={styles.loadingText}>Loading product details...</Text>;
    }

    if (viewModel.error) {
        return <Text style={styles.errorText}>{viewModel.error}</Text>;
    }

    if (!viewModel.product) {
        return <Text style={styles.errorText}>Product not found</Text>;
    }    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.name}>{viewModel.product.name}</Text>
                <Text style={styles.price}>${viewModel.product.price.toFixed(2)}</Text>
                <Text style={styles.quantity}>Available: {viewModel.product.quantity}</Text>
                <Text style={styles.description}>{viewModel.product.description}</Text>                
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={() => {
                        if (viewModel.product) {
                            cartViewModel.addToCart(viewModel.product.id, 1);
                        }
                    }}
                >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: '#2e7d32',
        marginBottom: 16,
    },
    quantity: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 24,
    },
    addToCartButton: {
        backgroundColor: '#2e7d32',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        textAlign: 'center',
        padding: 16,
    },
    errorText: {
        textAlign: 'center',
        padding: 16,
        color: 'red',
    },
});

export default ProductDetailScreen;
