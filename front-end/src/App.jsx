import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tracks from "./components/Tracks";
import WhyJoin from "./components/WhyJoin";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import AdminAuth from "./components/AdminAuth";

const REGISTRATION_URL = "/apply";
const ADMIN_LOGIN_URL = "/admin/login";

export default function App() {
  const isRegistrationPage = window.location.pathname === REGISTRATION_URL;
  const isAdminLoginPage = window.location.pathname === ADMIN_LOGIN_URL;

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
      ) : isRegistrationPage ? (
        <RegistrationForm onBackHome={handleBackHome} />
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
