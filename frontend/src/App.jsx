import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Wallet from "./pages/Wallet";
import Ranks from "./pages/Ranks";
import Profile from "./pages/Profile";
import MainLayout from "./layout/MainLayout";
import TeenPattiGame from "./pages/TeenPattiGame";
import AddCash from "./pages/AddCash";
import AddMoneyOffer from "./pages/AddMoneyOffer";
import WalletHistory from "./pages/WalletHistory";
import Withdraw from "./pages/Withdraw";
import WithdrawHistory from "./pages/WithdrawHistory";
import EditProfile from "./pages/EditProfile";
import Offers from "./pages/Offers";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (NO header / nav) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected layout routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/ranks' element={<Ranks />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/game/teen-patti" element={<TeenPattiGame />} />
          <Route path="/wallet/add-cash" element={<AddCash />} />
          <Route path="/wallet/add-money" element={<AddMoneyOffer />} />
          <Route path="/wallet/history" element={<WalletHistory />} />
          <Route path="/wallet/withdraw" element={<Withdraw />} />
          <Route path="/wallet/withdraw-history" element={<WithdrawHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />





        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
