import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Minus, Plus, Trash2, MessageCircle, Utensils, Clock, RotateCcw } from 'lucide-react';
import { menuItems, Product, Category } from './menuData';

type CartItem = Product & { quantity: number };

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: number;
}

const CATEGORIES: Category[] = ['Especialidades', 'Parrilla', 'Picantes', 'Sopas', 'Pescados', 'Vinos', 'Cervezas', 'Bebidas'];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Especialidades');

  React.useEffect(() => {
    const saved = localStorage.getItem('rioChicoRecentOrders');
    if (saved) setRecentOrders(JSON.parse(saved));
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => 
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const saveOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: cartTotal,
      timestamp: Date.now(),
    };
    const updatedOrders = [newOrder, ...recentOrders].slice(0, 5);
    localStorage.setItem('rioChicoRecentOrders', JSON.stringify(updatedOrders));
    setRecentOrders(updatedOrders);
  };

  const sendOrderToWhatsApp = () => {
    const message = `*Pedido Restaurante Río Chico*%0A%0A` +
      cart.map(item => `- ${item.name} (x${item.quantity}): ${item.price * item.quantity} Bs`).join('%0A') +
      `%0A%0A*Total: ${cartTotal} Bs*`;
    
    saveOrder();
    window.open(`https://wa.me/59170000000?text=${message}`, '_blank');
    setCart([]); // Clear cart after sending
  };

  const clearCart = () => {
    setCart([]);
  };

  const reorder = (orderItems: CartItem[]) => {
    setCart(orderItems);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 pb-[350px]">
      {/* Header */}
      <header className="mb-6 flex flex-col items-center text-center">
        <Utensils className="size-16 text-[#d97706] mb-2" />
        <h1 className="text-3xl font-bold text-[#d97706]">RESTAURANTE RÍO CHICO</h1>
        <p className="text-gray-400">Sabor Tradicional & Especialidades a la Cruz</p>
      </header>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar platos..."
          className="w-full bg-[#1e1e1e] p-3 pl-10 rounded-lg text-white border border-[#333]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === cat ? 'bg-[#d97706] text-white' : 'bg-[#1e1e1e] text-gray-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><Clock className="text-[#d97706]" /> Recientes</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {recentOrders.map(order => (
              <button
                key={order.id}
                onClick={() => reorder(order.items)}
                className="bg-[#1e1e1e] p-3 rounded-lg text-sm border border-[#333] whitespace-nowrap"
              >
                {new Date(order.timestamp).toLocaleDateString()} - {order.total} Bs
                <RotateCcw size={14} className="inline ml-2 text-[#d97706]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-[#1e1e1e] p-4 rounded-lg flex items-center gap-4 border border-[#333]">
            <img 
              src={item.imageUrl || 'https://placehold.co/100x100?text=RioChico'} 
              alt={item.name} 
              className="size-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              {item.description && <p className="text-sm text-gray-400">{item.description}</p>}
              <p className="text-[#d97706] font-bold">{item.price} Bs</p>
            </div>
            <button onClick={() => addToCart(item)} className="bg-[#d97706] p-2 rounded-full">
              <Plus />
            </button>
          </div>
        ))}
      </div>

      {/* Sticky Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-[#1e1e1e] border-t border-[#333] p-4 flex flex-col gap-3 shadow-lg z-50">
          <div className="flex justify-between items-center">
            <span className="font-bold">Total: {cartTotal} Bs</span>
            <div className="flex gap-2">
              <button onClick={clearCart} className="text-gray-400 p-2"><Trash2 size={20} /></button>
              <button onClick={sendOrderToWhatsApp} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg font-bold">
                <MessageCircle size={20} /> Pedir
              </button>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm mb-2 border-b border-[#333] pb-1">
                <span>{item.name} x{item.quantity}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={16} /></button>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={16} /></button>
                  <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-red-500 p-2 cursor-pointer hover:bg-red-900/20 rounded-full"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
