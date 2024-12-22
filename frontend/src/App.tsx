import { CssVarsProvider } from "@mui/joy/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import Dashboard from "./pages/dashboard/Dashboard";
import MyProfile from "./pages/dashboard/components/MyProfile";
import "./App.css";
import CreateService from "./pages/dashboard/CreateService";
import UserDashboard from "./pages/dashboard/UserDashboard";
import OrderDashboard from "./pages/dashboard/OrderDashboard";
import CreateOrder from "./pages/dashboard/CreateOrder";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <CssVarsProvider>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignInSide />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Dashboard />} />
            <Route path="/orders" element={<OrderDashboard />} />
            <Route path="/create-service" element={<CreateService />} />
          </Route>
          <Route element={<PrivateRoute roles={["user", "admin"]} />}>
            <Route path="/" element={<CreateOrder />} />
            <Route path="/profile-dashboard" element={<MyProfile />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
