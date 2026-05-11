import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import NotificationsCenter from './pages/NotificationsCenter';
import AccountProfile from './pages/AccountProfile';
import UserManagement from './pages/UserManagement';
import UserDetails from './pages/UserDetails';
import AstrologerManagement from './pages/AstrologerManagement';
import AstrologerDetails from './pages/AstrologerDetails';
import ChatManagement from './pages/ChatManagement';
import WalletsPayments from './pages/WalletsPayments';
import BookingsManagement from './pages/BookingsManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import ReviewsRatings from './pages/ReviewsRatings';
import CMSDashboard from './pages/CMSDashboard';
import NotificationManagement from './pages/NotificationManagement';
import OffersPromotions from './pages/OffersPromotions';
import SubscriptionManagement from './pages/SubscriptionManagement';
import SupportManagement from './pages/SupportManagement';
import SecurityAccess from './pages/SecurityAccess';
import MarketingGrowth from './pages/MarketingGrowth';
import SettingsConfiguration from './pages/SettingsConfiguration';
import HoroscopeKundli from './pages/HoroscopeKundli';
import Localization from './pages/Localization';

// Generic Component for pages with no data yet
const GenericModule = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
    <div className="text-6xl mb-4">🔮</div>
    <h1 className="text-2xl font-semibold text-[#003566]">{title}</h1>
    <p className="mt-2 text-slate-500">This module is currently under development. Please check back later.</p>
  </div>
);

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/profile" element={<AccountProfile />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/:userId" element={<UserDetails />} />
          <Route path="/astrologers" element={<AstrologerManagement />} />
          <Route path="/astrologers/:id" element={<AstrologerDetails />} />
          <Route path="/chat" element={<ChatManagement />} />
          <Route path="/wallet" element={<WalletsPayments />} />
          <Route path="/bookings" element={<BookingsManagement />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/reviews" element={<ReviewsRatings />} />
          <Route path="/cms" element={<CMSDashboard />} />
          <Route path="/notifications" element={<NotificationsCenter />} />
          <Route path="/notification-management" element={<NotificationManagement />} />
          <Route path="/offers" element={<OffersPromotions />} />
          <Route path="/subscriptions" element={<SubscriptionManagement />} />
          <Route path="/settings" element={<SettingsConfiguration />} />
          <Route path="/support" element={<SupportManagement />} />
          <Route path="/security" element={<SecurityAccess />} />
          <Route path="/localization" element={<Localization />} />
          <Route path="/horoscope" element={<HoroscopeKundli />} />
          <Route path="/marketing" element={<MarketingGrowth />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
