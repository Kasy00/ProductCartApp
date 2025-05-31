import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CartViewModel } from '../../viewmodels/CartViewModel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartItem } from '../../models/Cart';

interface CartScreenProps {
    viewModel: CartViewModel;
}

const CartScreen: React.FC<CartScreenProps> = observer(({ viewModel }) => {
    if (viewModel.isLoading) {
        return <Text style={styles.messageText}>Loading cart...</Text>;
    }

    if (viewModel.error) {
        return <Text style={styles.errorText}>{viewModel.error}</Text>;
    }

    if (!viewModel.cart || viewModel.cart.items.length === 0) {
        return <Text style={styles.messageText}>Your cart is empty</Text>;
    }

    const renderItem: ListRenderItem<CartItem> = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity 
                    onPress={() => viewModel.updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                >
                    <Icon name="remove-circle-outline" size={24} color={item.quantity <= 1 ? '#ccc' : '#000'} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity 
                    onPress={() => viewModel.updateQuantity(item.productId, item.quantity + 1)}
                >
                    <Icon name="add-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => viewModel.removeFromCart(item.productId)}
                    style={styles.removeButton}
                >
                    <Icon name="delete-outline" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={viewModel.cart.items}
                renderItem={renderItem}
                keyExtractor={item => item.productId}
            />
            <View style={styles.summary}>
                <Text style={styles.totalText}>Total: ${viewModel.totalAmount.toFixed(2)}</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    cartItem: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 8,
        elevation: 2,
    },
    itemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 16,
        fontSize: 16,
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        marginLeft: 'auto',
    },
    summary: {
        backgroundColor: 'white',
        padding: 16,
        elevation: 4,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    checkoutButton: {
        backgroundColor: '#2e7d32',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageText: {
        textAlign: 'center',
        padding: 16,
        fontSize: 16,
    },
    errorText: {
        textAlign: 'center',
        padding: 16,
        color: 'red',
        fontSize: 16,
    },
});

export default CartScreen;
