import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem : (item)=> {},
    removeItem: (id) => {},
    resetItem: 0,
});

export default CartContext;