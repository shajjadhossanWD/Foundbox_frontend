import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PublicLayout from "./Components/Layout/PublicLayout";
import { Toaster } from "react-hot-toast";
// Login
import Login from "./pages/Authentications/Login";
import Register from "./pages/Authentications/Register";
import Otp from "./Components/Auth/Otp";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import Loader from "./Components/Shared/Loader";
import UserRoutes from "./Components/UserRoute/UserRoutes";
import FinancialData from "./pages/Dashboard/Financial-score/Financial_main/FinancialData";
import UserDashboard from "./pages/Dashboard/UserDashboard/UserDashboard";



export const ProductContext = createContext();
function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  console.log(location.pathname?.split("/")[1], "the first part of the route");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const [pageYOffset, setPageYOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => setPageYOffset(window.pageYOffset);
  });

  if (isLoading) {
    return <Loader/>
  }

  return (
    <>
     
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/*************************** Login System ****************************** */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Register />} />
        
        <Route
          path="/admin/otp/:activationToken"
          element={<Otp expiryTimestamp={time} />}
        />
        
        {/*************************** Dashboard Start************************** */}
        <Route
          path="/admin"
          element={
            <UserRoutes>
              <Dashboard />
            </UserRoutes>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />

          {/*************************** Financial  ***************************/}
          <Route path="financial-data" element={<FinancialData />} />

        </Route>
        {/*************************** Dashboard End************************** */}
      </Routes>

      {/* Scroll to top and bottom */}
      <div
        className={`${location.pathname?.split("/")[1] === "admin" ? "d-none" : "d-block"
          }`}
      >
        {pageYOffset > 200 ? (
          <KeyboardArrowUpIcon
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="upperArrowIcon"
            style={{
              zIndex: '1',
              fontSize: `${window.screen.width > 500 ? "40px" : "35px"}`,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            className="upperArrowIcon"
            style={{
              zIndex: '1',
              fontSize: `${window.screen.width > 500 ? "40px" : "35px"}`,
            }}
          />
        )}
      </div>

      <Toaster />
    </>
  );
}

export default App;
