import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tracks from "./components/Tracks";
import WhyJoin from "./components/WhyJoin";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import AdminAuth from "./components/AdminAuth";
import AdminDashboard from "./components/AdminDashboard";
import SubmissionResult from "./components/SubmissionResult";

const REGISTRATION_URL = "/apply";
const ADMIN_LOGIN_URL = "/admin/login";
const ADMIN_DASHBOARD_URL = "/admin/dashboard";
const SUBMISSION_URL = "/submission";

export default function App() {
  const pathname = window.location.pathname;
  const isRegistrationPage = pathname === REGISTRATION_URL;
  const isAdminLoginPage = pathname === ADMIN_LOGIN_URL;
  const isAdminDashboardPage = pathname === ADMIN_DASHBOARD_URL;
  const isSubmissionPage = pathname === SUBMISSION_URL;

  const handleApplyClick = () => {
    window.location.href = REGISTRATION_URL;
  };

  const handleBackHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onApplyClick={handleApplyClick} />
      {isAdminLoginPage ? (
        <AdminAuth onBackHome={handleBackHome} />
      ) : isAdminDashboardPage ? (
        <AdminDashboard onBackHome={handleBackHome} />
      ) : isRegistrationPage ? (
        <RegistrationForm onBackHome={handleBackHome} />
      ) : isSubmissionPage ? (
        <SubmissionResult onBackHome={handleBackHome} />
      ) : (
        <main>
          <Hero onApplyClick={handleApplyClick} />
          <Tracks />
          <WhyJoin />
          <CallToAction onApplyClick={handleApplyClick} />
        </main>
      )}
      <Footer />
    </div>
  );
}
