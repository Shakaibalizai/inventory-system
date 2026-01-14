
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShoppingBag, Plus, Minus, Trash2, Printer, CheckCircle } from 'lucide-react';
import { PaymentMethod, Product } from '../types';

const POS: React.FC = () => {
  const { products, cart, addToCart, removeFromCart, updateCartQuantity, processSale, customers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState<any>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subtotal = cart.reduce((acc, item) => acc + (item.sellingPrice * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = (method: PaymentMethod) => {
    if (cart.length === 0) return;
    const sale = processSale(method, selectedCustomerId);
    if (sale) {
      setLastSale(sale);
      setShowReceipt(true);
    }
  };

  if (showReceipt && lastSale) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
          <div className="text-center mb-6">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Payment Successful!</h2>
            <p className="text-slate-500">Receipt #{lastSale.id}</p>
          </div>
          
          <div className="space-y-3 mb-6 border-y border-slate-100 py-4">
            {lastSale.items.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-medium">${(item.sellingPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${lastSale.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Tax (8%)</span>
              <span>${lastSale.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-50">
              <span>Total</span>
              <span>${lastSale.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => { setShowReceipt(false); setLastSale(null); }}
              className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left side: Product Browser */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`flex flex-col text-left bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group relative ${product.stock <= 0 ? 'opacity-60 grayscale' : ''}`}
            >
              <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                <img src={`https://picsum.photos/seed/${product.id}/200`} alt={product.name} className="w-full h-full object-cover" />
                {product.stock < 5 && product.stock > 0 && (
                  <span className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-full border border-orange-200 uppercase tracking-tighter">Low Stock</span>
                )}
                {product.stock <= 0 && (
                  <span className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white text-sm font-bold uppercase tracking-widest">Out of Stock</span>
                )}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm truncate w-full mb-1">{product.name}</h3>
              <p className="text-slate-500 text-xs mb-2">{product.category}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-blue-600 font-bold">${product.sellingPrice}</span>
                <span className="text-[10px] text-slate-400">Qty: {product.stock}</span>
              </div>
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right side: Cart & Checkout */}
      <div className="w-[400px] bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              Current Order
            </h2>
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} Items
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <ShoppingBag className="w-12 h-12 text-slate-200" />
              </div>
              <p className="text-slate-400 font-medium">Cart is empty</p>
              <p className="text-slate-300 text-sm">Add items to start a sale</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-slate-50/50 p-3 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img src={`https://picsum.photos/seed/${item.id}/100`} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-blue-600 text-sm font-bold mb-2">${item.sellingPrice}</p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <div className="ml-auto text-sm font-bold text-slate-800">
                      ${(item.sellingPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</label>
            <select 
              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
            >
              <option value="">Guest Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-slate-500 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-sm">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-800 text-lg font-bold pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button 
              onClick={() => handleCheckout(PaymentMethod.CASH)}
              disabled={cart.length === 0}
              className="bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all text-sm shadow-sm"
            >
              Cash Payment
            </button>
            <button 
              onClick={() => handleCheckout(PaymentMethod.CARD)}
              disabled={cart.length === 0}
              className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all text-sm shadow-sm"
            >
              Card / Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
