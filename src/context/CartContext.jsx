import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // If adding item from a different restaurant, clear cart first
      if (state.restaurantId && state.restaurantId !== action.payload.restaurantId) {
        return {
          restaurantId: action.payload.restaurantId,
          items: [{ ...action.payload, qty: 1 }],
        };
      }
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          restaurantId: action.payload.restaurantId,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        restaurantId: action.payload.restaurantId,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { restaurantId: null, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { restaurantId: null, items: [] });
  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.items.reduce((sum, i) => sum + i.qty, 0);
  return (
    <CartContext.Provider value={{ cart, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
