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
        <Text style={styles.productName}>{product.name || 'Unnamed Product'}</Text>
        <Text style={styles.productPrice}>${(product.price || 0).toFixed(2)}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    productItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white',
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
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
