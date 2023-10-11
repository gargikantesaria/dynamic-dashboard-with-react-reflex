import {Route, Routes} from "react-router-dom";
import Workbench from "../pages/workbench";
import Dashboard from "../pages/Dashboard";
import Screener from "../pages/screener";
import Settings from "../pages/settings"
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import VerificationMail from "../pages/auth/verification";
import ResetPassword from "../pages/auth/reset-password";
import ResendEmail from "../pages/auth/resend-email";
import ForgotPassword from "../pages/auth/forgotpassword";
import CheckEmail from "../pages/auth/check-email";
import BackToLogin from "../pages/auth/back-to-login";
import Share from "../pages/share";
import TradePanel from "../Dashboard/CustomDashboard/CustomTradePanel/TradePanel";
import { Navigate} from 'react-router';

export default function MainRoute() {
  return (
   
    <Routes>
      {/*Auth*/}
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<VerificationMail />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/resend-email" element={<ResendEmail />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/check-email" element={<CheckEmail />} />
        <Route path="/auth/back-to-login" element={<BackToLogin />} />
      {/* main */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workbench" element={<Workbench/>} />
      <Route path="/screener" element={<Screener />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/trade-panel" element={<TradePanel />} />
      {/* share */}
      <Route path="/share" element={<Share />} />
      {/* <Route path="*" element={<NotFoundPage />} />  */}
    </Routes>
  );
}
