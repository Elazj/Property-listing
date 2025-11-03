import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Header from "./components/Header";
import { isLoggedIn } from "./utils/auth";

function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 centered">
      <Header />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/properties" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/properties"
            element={
              <Protected>
                <Properties />
              </Protected>
            }
          />
          <Route
            path="/properties/:id"
            element={
              <Protected>
                <PropertyDetail />
              </Protected>
            }
          />
          <Route path="*" element={<div className="p-6">404 — Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
