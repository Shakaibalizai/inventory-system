
import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, ShoppingCart, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { sales, products, customers } = useApp();

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalProfit = sales.reduce((acc, sale) => {
    const saleCost = sale.items.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
    return acc + (sale.subtotal - saleCost);
  }, 0);

  // Group sales by day for the last 7 days (simulated here)
  const salesData = [
    { name: 'Mon', sales: 4000, profit: 2400 },
    { name: 'Tue', sales: 3000, profit: 1398 },
    { name: 'Wed', sales: 2000, profit: 9800 },
    { name: 'Thu', sales: 2780, profit: 3908 },
    { name: 'Fri', sales: 1890, profit: 4800 },
    { name: 'Sat', sales: 2390, profit: 3800 },
    { name: 'Sun', sales: 3490, profit: 4300 },
  ];

  const recentSales = sales.slice(0, 5);

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full custom-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Shop Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, admin. Here is what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold border border-emerald-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            System Online
          </div>
          <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <DollarSign className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Revenue</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-800">${totalRevenue.toFixed(2)}</h3>
              <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <DollarSign className="w-24 h-24" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Net Profit</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-800">${totalProfit.toFixed(2)}</h3>
              <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +8%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Orders</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-800">{sales.length}</h3>
              <span className="text-rose-500 text-xs font-bold mb-1 flex items-center">
                <ArrowDownRight className="w-3 h-3" /> -2%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-violet-50 text-violet-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Stock Items</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-800">{products.length}</h3>
              <span className="text-slate-400 text-xs font-bold mb-1">Stable</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Sales Performance</h2>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Sales</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="flex-1 space-y-6">
            {recentSales.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <ShoppingCart className="w-12 h-12 opacity-20" />
                <p>No sales recorded yet.</p>
              </div>
            ) : (
              recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors">
                      <ShoppingCart className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Sale #{sale.id.slice(-4)}</p>
                      <p className="text-xs text-slate-400">{new Date(sale.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">${sale.total.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase">{sale.paymentMethod}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-50">
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Upgrade Pro</p>
              <p className="text-sm font-medium mb-4">Get advanced multi-store analytics & cloud sync.</p>
              <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-slate-100 transition-colors">
                Learn More
              </button>
              <div className="absolute -bottom-6 -right-6 opacity-10">
                <BarChart3 className="w-24 h-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Required for the Learn More icon
import { BarChart3 } from 'lucide-react';

export default Dashboard;
