import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(saved);
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Purchase History
      </h1>

      {orders.length === 0 ? (
        <div className="text-white/60">
          No orders found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1A1A1A] rounded-xl border border-white/10 p-5 mb-4"
          >
            <div className="flex justify-between">
              <h3 className="text-white font-bold">
                Order #{order.id}
              </h3>

              <span className="text-orange-400">
                ₹{order.total}
              </span>
            </div>

            <p className="text-white/50 text-sm">
              {new Date(order.date).toLocaleString()}
            </p>

            <p className="text-green-400 mt-2">
              {order.status}
            </p>

            <div className="mt-3 space-y-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-white/70"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>

                  <span>
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrdersPage;
