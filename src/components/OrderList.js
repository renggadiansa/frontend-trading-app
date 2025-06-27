
import { useEffect, useState } from "react";
import axios from "axios";


export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://backend-trading-app-production.up.railway.app/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Riwayat Order Simulasi</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">Belum ada order yang disimulasikan.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o, i) => (
            <div key={i} className="p-4 border border-gray-300 rounded-md bg-gray-50">
              <div className="font-semibold">
                🟢 {o.action} <span className="text-blue-600">{o.symbol}</span>
              </div>
              <div><strong>💰 Entry:</strong> {o.price_entry}</div>
              <div><strong>🎯 TP:</strong> {o.tp_price} | <strong>🛑 SL:</strong> {o.sl_price}</div>
              <div><strong>⚡ Leverage:</strong> {o.leverage}</div>
              <div><strong>⏱️ Timeframe:</strong> {o.timeframe}</div>
              <div className="text-sm text-gray-500 mt-1">🕒 {new Date(o.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
