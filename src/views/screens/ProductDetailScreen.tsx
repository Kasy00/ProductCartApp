import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ProductDetailViewModel } from '../../viewmodels/ProductViewModel';
import { RouteProp } from '@react-navigation/native';

interface ProductDetailScreenProps {
    viewModel: ProductDetailViewModel;
    route: RouteProp<{ ProductDetail: { productId: string } }, 'ProductDetail'>;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = observer(({ viewModel, route }) => {
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
                <View style={styles.header}>
                    <Text style={styles.name}>{viewModel.product.name}</Text>
                    <Text style={styles.price}>${viewModel.product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.stockBadge}>
                    <Text style={[
                        styles.stockText,
                        { color: viewModel.product.quantity > 0 ? '#2e7d32' : '#d32f2f' }
                    ]}>
                        {viewModel.product.quantity > 0 
                            ? `${viewModel.product.quantity} units available`
                            : 'Out of stock'}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{viewModel.product.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        padding: 16,
    },
    header: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        color: '#2e7d32',
        fontWeight: '700',
    },
    stockBadge: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    stockText: {
        fontSize: 16,
        fontWeight: '500',
    },
    section: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4a4a4a',
    },
    addToCartButton: {
        backgroundColor: '#2e7d32',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        textAlign: 'center',
        padding: 16,
        color: '#666',
        fontSize: 16,
    },
    errorText: {
        textAlign: 'center',
        padding: 16,
        color: '#d32f2f',
        fontSize: 16,
    },
});

export default ProductDetailScreen;
