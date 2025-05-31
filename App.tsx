/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import ProductListScreen from './src/views/screens/ProductListScreen';
import ProductDetailScreen from './src/views/screens/ProductDetailScreen';
import { ProductService } from './src/services/ProductService';
import { ProductListViewModel, ProductDetailViewModel } from './src/viewmodels/ProductViewModel';

type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Initialize services
const productService = new ProductService();

// Initialize view models
const productListViewModel = new ProductListViewModel(productService);
const productDetailViewModel = new ProductDetailViewModel(productService);

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen 
            name="ProductList" 
            options={{ title: 'Products' }}
          >
            {props => <ProductListScreen {...props} viewModel={productListViewModel} />}
          </Stack.Screen>
          <Stack.Screen 
            name="ProductDetail" 
            options={{ title: 'Product Details' }}
          >
            {props => (
              <ProductDetailScreen 
                {...props} 
                viewModel={productDetailViewModel} 
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
