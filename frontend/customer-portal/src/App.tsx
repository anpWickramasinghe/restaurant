import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthCallback from "./pages/auth/AuthCallback";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import PaymentCheckout from "./pages/PaymentCheckout";
import PaymentReturn from "./pages/PaymentReturn";
import PaymentCancel from "./pages/PaymentCancel";
import ReserverTable from "./pages/ReserveTable";
import About from "./pages/About";
import Special from "./pages/special";
import Layout from "./components/Layout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import BookingsPage from "./pages/dashboard/BookingsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import ReviewsPage from "./pages/dashboard/ReviewsPage";
import { AuthProvider } from "./context/AuthContext";
import { TableProvider } from "./context/TableContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { SocketProvider } from "./context/SocketContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <TableProvider>
            <CartProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Landing />
                    </Layout>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <Layout>
                      <Menu />
                    </Layout>
                  }
                />
                <Route
                  path="/reserve-table"
                  element={
                    <Layout>
                      <ReserverTable />
                    </Layout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Layout>
                      <About />
                    </Layout>
                  }
                />
                <Route
                  path="/special"
                  element={
                    <Layout>
                      <Special />
                    </Layout>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route
                  path="/checkout"
                  element={
                    <Layout>
                      <Checkout />
                    </Layout>
                  }
                />
                <Route
                  path="/order-success/:orderId"
                  element={
                    <Layout>
                      <OrderSuccess />
                    </Layout>
                  }
                />
                <Route
                  path="/payment/checkout"
                  element={
                    <Layout>
                      <PaymentCheckout />
                    </Layout>
                  }
                />
                <Route
                  path="/payment/return"
                  element={
                    <Layout>
                      <PaymentReturn />
                    </Layout>
                  }
                />
                <Route
                  path="/payment/cancel"
                  element={
                    <Layout>
                      <PaymentCancel />
                    </Layout>
                  }
                />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<OverviewPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="bookings" element={<BookingsPage />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Redirect unknown routes to landing */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster position="top-right" expand={true} richColors />
            </CartProvider>
          </TableProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

