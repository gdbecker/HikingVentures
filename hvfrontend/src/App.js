import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import AccountActivatePage from './pages/AccountActivatePage';

import LandingPage from './pages/LandingPage';
import TrailsPage from './pages/TrailsPage';
import TrailsDetailPage from './pages/TrailsDetailPage';
import ParksPage from './pages/ParksPage';
import ParksDetailPage from './pages/ParksDetailPage';
import SavedPage from './pages/SavedPage';

import AccountDetailsPage from './pages/AccountDetailsPage';
import AccountReviewsPage from './pages/AccountReviewsPage';
import AccountHistoryPage from './pages/AccountHistoryPage';

import AdminTrailPage from './pages/AdminTrailPage';
import AdminTrailModifyPage from './pages/AdminTrailModifyPage';
import AdminParkPage from './pages/AdminParkPage';
import AdminParkModifyPage from './pages/AdminParkModifyPage';

import Layout from './hocs/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmPage />} />
              <Route path="/activate/:uid/:token" element={<AccountActivatePage />} />

              <Route path="/" element={<LandingPage />} />
              <Route path="/trails" element={<TrailsPage />} />
              <Route path="/trails/:id" element={<TrailsDetailPage />}/>
              <Route path="/parks" element={<ParksPage />} />
              <Route path="/parks/:id" element={<ParksDetailPage />}/>
              <Route path="/saved/" element={<SavedPage />} />

              <Route path="/account/details/" element={<AccountDetailsPage />} />
              <Route path="/account/reviews/" element={<AccountReviewsPage />} />
              <Route path="/account/history/" element={<AccountHistoryPage />} />

              <Route path="/admin/trail" element={<AdminTrailPage />} />
              <Route path="/admin/trail/modify/:id" element={<AdminTrailModifyPage />} />
              <Route path="/admin/park" element={<AdminParkPage />} />
              <Route path="/admin/park/modify/:id" element={<AdminParkModifyPage />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
