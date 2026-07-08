import BrandLogo from "./components/BrandLogo";
import Hero from "./components/Hero";
import Tracks from "./components/Tracks";
import WhyJoin from "./components/WhyJoin";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import AdminAuth from "./components/AdminAuth";
import AdminDashboard from "./components/AdminDashboard";
import SubmissionResult from "./components/SubmissionResult";
import ClosedPage from "./components/ClosedPage";

const REGISTRATION_URL = "/apply";
const ADMIN_LOGIN_URL = "/admin/login";
const ADMIN_DASHBOARD_URL = "/admin/dashboard";
const SUBMISSION_URL = "/submission";
const CLOSED_URL = "/closed";

export default function App() {
  const pathname = window.location.pathname;
  const isHomePage = pathname === "/";
  const isRegistrationPage = pathname === REGISTRATION_URL;
  const isAdminLoginPage = pathname === ADMIN_LOGIN_URL;
  const isAdminDashboardPage = pathname === ADMIN_DASHBOARD_URL;
  const isSubmissionPage = pathname === SUBMISSION_URL;
  const isClosedPage = pathname === CLOSED_URL;

  const handleApplyClick = () => {
    window.location.href = "/closed";
  };

  const handleBackHome = () => {
    window.location.href = "/";
  };

  const showStudentHeader =
    isHomePage || isRegistrationPage || isSubmissionPage || isClosedPage;

  return (
    <div className="min-h-screen bg-white">
      {showStudentHeader && (
        <header className="bg-white py-5 shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 lg:px-10">
            <BrandLogo />
          </div>
        </header>
      )}
      {isAdminLoginPage ? (
        <AdminAuth onBackHome={handleBackHome} />
      ) : isAdminDashboardPage ? (
        <AdminDashboard onBackHome={handleBackHome} />
      ) : isRegistrationPage ? (
        <RegistrationForm onBackHome={handleBackHome} isRegistrationClosed />
      ) : isSubmissionPage ? (
        <SubmissionResult onBackHome={handleBackHome} />
      ) : isClosedPage ? (
        <ClosedPage onBackHome={handleBackHome} />
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
