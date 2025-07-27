import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.productId === action.payload.productId && item.size === action.payload.size);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => !(item.productId === action.payload.productId && item.size === action.payload.size)),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_CART_OPEN':
      return {
        ...state,
        isCartOpen: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isCartOpen: false,
  });

  const [cartMessage, setCartMessage] = useState(null);
  const [addTrigger, setAddTrigger] = useState(0);

  // Calculate total items
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('cart');
      if (savedItems) {
        const items = JSON.parse(savedItems);
        
        // Migrate old cart format to new format
        const migratedItems = items.map(item => {
          if (item.id && !item.productId) {
            // Old format: convert id to productId
            return {
              ...item,
              productId: item.id,
              id: undefined
            };
          }
          return item;
        }).filter(item => item.productId); // Remove invalid items
        
        dispatch({ type: 'CLEAR_CART' }); // Clear the old cart first
        migratedItems.forEach(item => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      }
    } catch (error) {
      // Silently handle localStorage errors
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems + quantity > 10) {
      setCartMessage('You can only add up to 10 items in total to the cart.');
      setTimeout(() => setCartMessage(null), 3000);
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: product });
    setAddTrigger(prev => prev + 1); // Trigger vibration animation
  };

  const removeFromCart = (productId, size) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });
  };

  const updateQuantity = (productId, quantity, size) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      // Calculate what the new total would be if this item's quantity is updated
      const currentItem = state.items.find(item => item.productId === productId && item.size === size);
      const currentQty = currentItem ? currentItem.quantity : 0;
      const newTotal = state.items.reduce((sum, item) => sum + item.quantity, 0) - currentQty + quantity;
      if (newTotal > 10) {
        setCartMessage('You can only add up to 10 items in total to the cart.');
        setTimeout(() => setCartMessage(null), 3000);
        return;
      }
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, size } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  };

  const clearCartAndStorage = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  };

  const setCartOpen = (isOpen) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen });
  };

  const value = {
    items: state.items,
    isCartOpen: state.isCartOpen,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearCartAndStorage,
    setCartOpen,
    cartMessage,
    addTrigger,
  };

  return (
    <CartContext.Provider value={value}>
      {cartMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[200] bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl shadow-2xl border-2 border-yellow-500 text-lg animate-bounce">
          {cartMessage}
        </div>
      )}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 