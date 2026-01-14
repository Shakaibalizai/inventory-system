
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Customer, Sale, User, UserRole, CartItem, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CUSTOMERS, DEFAULT_USER, TAX_RATE } from '../constants';

interface AppContextType {
  user: User;
  products: Product[];
  customers: Customer[];
  sales: Sale[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  processSale: (paymentMethod: PaymentMethod, customerId?: string, discount?: number) => Sale | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (customer: Customer) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<User>(DEFAULT_USER);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [sales, setSales] = useState<Sale[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const processSale = (paymentMethod: PaymentMethod, customerId?: string, discount: number = 0) => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax - discount;

    const newSale: Sale = {
      id: `SALE-${Date.now()}`,
      items: [...cart],
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      customerId,
      timestamp: new Date().toISOString(),
      cashierId: user.id
    };

    // Update inventory
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock - cartItem.quantity };
      }
      return p;
    }));

    setSales(prev => [newSale, ...prev]);
    clearCart();
    return newSale;
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    setCustomers(prev => [...prev, { ...customer, id: Date.now().toString() }]);
  };

  const updateCustomer = (customer: Customer) => {
    setCustomers(prev => prev.map(c => c.id === customer.id ? customer : c));
  };

  return (
    <AppContext.Provider value={{
      user, products, customers, sales, cart,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      processSale, addProduct, updateProduct, deleteProduct,
      addCustomer, updateCustomer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
