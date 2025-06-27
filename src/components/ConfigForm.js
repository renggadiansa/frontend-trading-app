
import { useState, useEffect } from 'react';
import axios from 'axios';

const defaultConfig = {
  symbol: 'BTCUSDT',
  timeframe: '5m',
  plusDIThreshold: 25,
  minusDIThreshold: 20,
  adxMinimum: 20,
  takeProfitPercent: 2,
  stopLossPercent: 1,
  leverage: '10x'
};

export default function ConfigForm() {
  const [config, setConfig] = useState(defaultConfig);
  const [saved, setSaved] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("https://backend-trading-app-production.up.railway.app/config").then(res => {
      setConfig(res.data);
      setSaved(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("https://backend-trading-app-production.up.railway.app/config", config);
    setSaved(config);
    setShowModal(true);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  return (
    <div className="relative">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Konfigurasi Strategi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(defaultConfig).map(([key, _]) => (
            <div key={key}>
              <label className="block text-sm font-semibold capitalize mb-1 text-gray-700">{key}</label>
              <input
                name={key}
                value={config[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded">
            Simpan
          </button>
          <button onClick={handleReset} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded">
            Reset
          </button>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold mb-2">Konfigurasi Aktif</h3>
          <pre className="text-sm text-gray-800 bg-white p-3 rounded overflow-x-auto">{JSON.stringify(saved, null, 2)}</pre>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-sm w-full p-6 text-center relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl font-bold">
              ×
            </button>
            <div className="text-green-600 text-4xl mb-2"></div>
            <h3 className="text-lg font-semibold">Konfigurasi Berhasil Disimpan</h3>
            <p className="text-sm text-gray-600 mt-1">Semua perubahan telah tersimpan.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
