
import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Download, Filter, FileText, Calendar, TrendingUp } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Reports: React.FC = () => {
  const { sales, products } = useApp();

  // Aggregate data for Category Sales Pie Chart
  const categoryDataMap = sales.reduce((acc: any, sale) => {
    sale.items.forEach(item => {
      acc[item.category] = (acc[item.category] || 0) + (item.sellingPrice * item.quantity);
    });
    return acc;
  }, {});

  const categoryData = Object.keys(categoryDataMap).map(cat => ({
    name: cat,
    value: categoryDataMap[cat]
  }));

  // Aggregate data for Best Selling Products
  const productSalesMap = sales.reduce((acc: any, sale) => {
    sale.items.forEach(item => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
    });
    return acc;
  }, {});

  const bestSellingProducts = Object.keys(productSalesMap)
    .map(name => ({ name, quantity: productSalesMap[name] }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full custom-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Business Reports</h1>
          <p className="text-slate-500">In-depth analysis of sales, inventory, and profitability.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales by Category */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Sales by Category
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400">No data available yet.</p>
            )}
          </div>
        </div>

        {/* Top 5 Products */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Best Selling Products
          </h2>
          <div className="h-[300px]">
            {bestSellingProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={bestSellingProducts} margin={{ left: 40, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={100} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="quantity" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 flex items-center justify-center h-full">Make your first sale to see stats.</p>
            )}
          </div>
        </div>

        {/* Profit Analysis */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Gross Profit Trend</h2>
            <div className="flex gap-4 items-center">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                 <span className="text-sm text-slate-500">Revenue</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                 <span className="text-sm text-slate-500">Profit</span>
               </div>
            </div>
          </div>
          <div className="h-[350px]">
             {/* Note: This uses simulated data for visualization as we don't have historical data yet */}
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Week 1', revenue: 4000, profit: 1200 },
                  { name: 'Week 2', revenue: 3000, profit: 1398 },
                  { name: 'Week 3', revenue: 2000, profit: 980 },
                  { name: 'Week 4', revenue: 2780, profit: 1908 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Low Stock Warning Summary */}
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-orange-800 text-lg">Inventory Warning</h3>
            <p className="text-orange-600 text-sm">{products.filter(p => p.stock < p.minStock).length} products are running low on stock. Check inventory for details.</p>
          </div>
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-sm">
          Review Stock
        </button>
      </div>
    </div>
  );
};

export default Reports;
