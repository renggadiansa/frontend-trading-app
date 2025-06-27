import { useState } from "react";
import axios from "axios";

export default function WebhookTester() {
  const [payload, setPayload] = useState({
    symbol: "BTCUSDT",
    plusDI: 30,
    minusDI: 10,
    adx: 25,
    timeframe: "5m"
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    try {
      const res = await axios.post("https://backend-trading-app-production.up.railway.app/webhook", payload);
      setResult(res.data);
    } catch (err) {
      setResult({ error: "❌ Gagal mengirim sinyal." });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🧪 Simulasi Sinyal TradingView</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["symbol", "plusDI", "minusDI", "adx", "timeframe"].map((key) => (
          <div key={key}>
            <label className="block text-sm font-semibold capitalize mb-1 text-gray-700">{key}</label>
            <input
              name={key}
              value={payload[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSend} className="mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded">
        Kirim Sinyal
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded border">
          <h3 className="font-semibold mb-2">📨 Respon dari Backend</h3>
          <pre className="text-sm bg-white p-3 rounded overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
