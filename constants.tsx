
import { Product, Customer, UserRole, User } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', sku: 'ELEC001', name: 'iPhone 15 Pro', category: 'Electronics', purchasePrice: 900, sellingPrice: 1099, stock: 15, minStock: 5, supplier: 'Apple Inc.' },
  { id: '2', sku: 'ELEC002', name: 'Samsung S24 Ultra', category: 'Electronics', purchasePrice: 850, sellingPrice: 1199, stock: 8, minStock: 3, supplier: 'Samsung Electronics' },
  { id: '3', sku: 'GROC001', name: 'Organic Coffee Beans', category: 'Grocery', purchasePrice: 12, sellingPrice: 24, stock: 50, minStock: 10, supplier: 'Wholesale Foods' },
  { id: '4', sku: 'GROC002', name: 'Premium Olive Oil', category: 'Grocery', purchasePrice: 8, sellingPrice: 15, stock: 2, minStock: 5, supplier: 'Wholesale Foods' },
  { id: '5', sku: 'ACC001', name: 'USB-C Fast Charger', category: 'Accessories', purchasePrice: 5, sellingPrice: 19, stock: 100, minStock: 20, supplier: 'Global Parts' },
  { id: '6', sku: 'ACC002', name: 'Wireless Mouse', category: 'Accessories', purchasePrice: 10, sellingPrice: 29, stock: 4, minStock: 10, supplier: 'Global Parts' },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Walk-in Customer', phone: '-', email: '-', creditBalance: 0, joinDate: '2024-01-01' },
  { id: 'c2', name: 'John Doe', phone: '555-0101', email: 'john@example.com', creditBalance: 50, joinDate: '2024-02-15' },
  { id: 'c3', name: 'Jane Smith', phone: '555-0102', email: 'jane@example.com', creditBalance: 0, joinDate: '2024-03-10' },
];

export const DEFAULT_USER: User = {
  id: 'u1',
  name: 'Admin User',
  email: 'admin@omnipos.com',
  role: UserRole.ADMIN
};

export const TAX_RATE = 0.08; // 8%
