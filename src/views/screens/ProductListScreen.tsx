import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ProductListViewModel } from '../../viewmodels/ProductViewModel';
import { ProductListItem, styles } from '../components/ProductListItem';
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
        return <Text style={styles.loadingText}>Loading products...</Text>;
    }

    if (viewModel.error) {
        return <Text style={styles.errorText}>{viewModel.error}</Text>;
    }

    return (
        <View style={styles.container}>            
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
            />
        </View>
    );
});

export default ProductListScreen;
