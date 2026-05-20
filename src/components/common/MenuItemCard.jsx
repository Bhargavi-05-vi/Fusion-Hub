import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const MenuItemCard = ({ item }) => {
  const { cart, dispatch } = useCart();
  const cartItem = cart.items.find(i => i.id === item.id);
  const qty = cartItem ? cartItem.qty : 0;

  const add = () => dispatch({ type: 'ADD_ITEM', payload: item });
  const inc = () => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: qty + 1 } });
  const dec = () => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: qty - 1 } });

  return (
    <div className="flex gap-4 p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all duration-300 group">
      <div className="relative flex-shrink-0 w-28 h-24 rounded-xl overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {item.isBestseller && (
          <div className="absolute top-1 left-1 bg-yellow-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-md">★ BEST</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-sm border-2 flex-shrink-0 ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                <div className={`w-1.5 h-1.5 rounded-full m-0.5 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              <span className="font-semibold text-white text-sm truncate">{item.name}</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-2">{item.desc}</p>
            <p className="text-white font-bold text-sm">₹{item.price}</p>
          </div>
          <div className="flex-shrink-0">
            {qty === 0 ? (
              <button onClick={add} className="flex items-center gap-1 border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30">
                <FiPlus className="text-sm" /> ADD
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-1">
                <button onClick={dec} className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"><FiMinus className="text-xs" /></button>
                <span className="text-white font-bold text-sm w-5 text-center">{qty}</span>
                <button onClick={inc} className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors"><FiPlus className="text-xs" /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
