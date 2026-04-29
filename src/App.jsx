import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import NotificationsCenter from './pages/NotificationsCenter';
import AccountProfile from './pages/AccountProfile';
import UserManagement from './pages/UserManagement';

// Generic Component for pages with no data yet
const GenericModule = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
    <div className="text-6xl mb-4">🔮</div>
    <h1 className="text-2xl font-bold text-[#003566]">{title}</h1>
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
          <Route path="/astrologers" element={<GenericModule title="Astrologer Management" />} />
          <Route path="/chat" element={<GenericModule title="Chat / Call / Video Management" />} />
          <Route path="/wallet" element={<GenericModule title="Wallet & Payments" />} />
          <Route path="/bookings" element={<GenericModule title="Booking & Appointment Management" />} />
          <Route path="/reports" element={<GenericModule title="Reports & Analytics" />} />
          <Route path="/reviews" element={<GenericModule title="Reviews & Ratings" />} />
          <Route path="/cms" element={<GenericModule title="CMS (Content Management System)" />} />
          <Route path="/notifications" element={<NotificationsCenter />} />
          <Route path="/notification-management" element={<GenericModule title="Notifications Management" />} />
          <Route path="/offers" element={<GenericModule title="Offers & Promotions" />} />
          <Route path="/subscriptions" element={<GenericModule title="Subscription & Membership Plans" />} />
          <Route path="/settings" element={<GenericModule title="Settings & Configuration" />} />
          <Route path="/support" element={<GenericModule title="Dispute & Support Management" />} />
          <Route path="/security" element={<GenericModule title="Security & Roles" />} />
          <Route path="/localization" element={<GenericModule title="Multi-language & Localization" />} />
          <Route path="/horoscope" element={<GenericModule title="Horoscope & Kundli Management" />} />
          <Route path="/marketing" element={<GenericModule title="Marketing & Growth Tools" />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
