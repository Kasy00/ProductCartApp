import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ProductListViewModel } from '../../viewmodels/ProductViewModel';
import { ProductListItem } from '../components/ProductListItem';
import { Product } from '../../models/Product';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: string };
};

type ProductListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProductListScreenProps {
    viewModel: ProductListViewModel;
}

const ProductListScreen: React.FC<ProductListScreenProps> = observer(({ viewModel }) => {
    const navigation = useNavigation<ProductListScreenNavigationProp>();

    useEffect(() => {
        viewModel.loadProducts();
    }, []);    

    const handleProductPress = (product: Product) => {
        navigation.navigate('ProductDetail', { productId: product.id });
    };

    if (viewModel.isLoading) {
        return <Text style={localStyles.loadingText}>Loading products...</Text>;
    }

    if (viewModel.error) {
        return <Text style={localStyles.errorText}>{viewModel.error}</Text>;
    }

    return (
        <View style={localStyles.container}>            
            <FlatList
                data={viewModel.products}
                renderItem={({ item }) => (
                    <ProductListItem
                        key={item.id}
                        product={item}
                        onPress={handleProductPress}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={localStyles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
});

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    listContent: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    loadingText: {
        textAlign: 'center',
        padding: 16,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        padding: 16,
        fontSize: 16,
        color: '#d32f2f',
    },
});

export default ProductListScreen;
