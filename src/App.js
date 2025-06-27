
import { useState, useEffect } from "react";
import ConfigForm from "./components/ConfigForm";
import OrderList from "./components/OrderList";
import WebhookTester from "./components/WebhookTester";
import LoginForm from "./components/LoginForm";

export default function App() {
  const [tab, setTab] = useState("config");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <nav className="flex gap-4">
          <button
            onClick={() => setTab("config")}
            className={tab === "config" ? "font-bold underline" : ""}
          >
            Konfigurasi
          </button>
          <button
            onClick={() => setTab("orders")}
            className={tab === "orders" ? "font-bold underline" : ""}
          >
            Order
          </button>
          <button
            onClick={() => setTab("webhook")}
            className={tab === "webhook" ? "font-bold underline" : ""}
          >
            Simulasi Webhook
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="text-sm text-red-500 underline"
        >
          Logout
        </button>
      </div>

      {tab === "config" && <ConfigForm />}
      {tab === "orders" && <OrderList />}
      {tab === "webhook" && <WebhookTester />}
    </div>
  );
}
