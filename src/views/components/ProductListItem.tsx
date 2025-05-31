import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Product } from '../../models/Product';
import { useNavigation } from '@react-navigation/native';

interface ProductListItemProps {
    product: Product;
    onPress: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onPress }) => (
    <TouchableOpacity onPress={() => onPress(product)} style={styles.productItem}>
        <View style={styles.productContent}>
            <View style={styles.mainInfo}>
                <Text style={styles.productName}>{product.name || 'Unnamed Product'}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>${(product.price || 0).toFixed(2)}</Text>
                <Text style={styles.stockInfo}>
                    {product.isAvailable  ? `In stock` : 'Out of stock'}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    productItem: {
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productContent: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainInfo: {
        flex: 1,
        marginRight: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    priceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2e7d32',
    },
    stockInfo: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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

export { ProductListItem, styles };
