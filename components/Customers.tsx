
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, UserPlus, Phone, Mail, DollarSign, Calendar, ChevronRight } from 'lucide-react';

const Customers: React.FC = () => {
  const { customers, addCustomer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', creditBalance: 0 });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer({ ...newCustomer, joinDate: new Date().toISOString() });
    setShowModal(false);
    setNewCustomer({ name: '', phone: '', email: '', creditBalance: 0 });
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customer Management</h1>
          <p className="text-slate-500">Keep track of your loyal customers and their credit balances</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
        >
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-lg transition-all border-l-4 border-l-blue-600 group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl font-bold text-blue-600">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                {customer.creditBalance > 0 && (
                  <span className="bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1 rounded-full border border-rose-100">
                    Debt: ${customer.creditBalance}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-4">{customer.name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Available Credit</span>
                  <span className="text-slate-800 font-black">${customer.creditBalance}</span>
                </div>
                <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Register New Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Full Name</label>
                <input required type="text" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Phone Number</label>
                <input required type="tel" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Email Address</label>
                <input required type="email" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">Initial Credit Balance ($)</label>
                <input required type="number" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newCustomer.creditBalance} onChange={e => setNewCustomer({...newCustomer, creditBalance: Number(e.target.value)})} />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
