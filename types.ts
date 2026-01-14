
export enum UserRole {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER',
  MANAGER = 'MANAGER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  minStock: number;
  supplier: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  ONLINE = 'ONLINE'
}

export interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  customerId?: string;
  timestamp: string;
  cashierId: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  creditBalance: number;
  joinDate: string;
}

export interface DashboardStats {
  totalSales: number;
  totalProfit: number;
  totalOrders: number;
  lowStockCount: number;
}
