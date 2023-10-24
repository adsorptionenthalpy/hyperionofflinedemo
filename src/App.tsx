import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import FIOGameUXUsersSignIn from "./pages/FIOGameUXUsersSignIn";
import FIOGameUXUsersEnter from "./pages/FIOGameUXUsersEnter";
import FIOGameUXUsersSubmit from "./pages/FIOGameUXUsersSubmit";
import FIOGameUXUsers from "./pages/FIOGameUXUsers";
import FIOGameUXUsersSpinUp from "./pages/FIOGameUXUsersSpinUp";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/fio-gameux-users-enter":
        title = "";
        metaDescription = "";
        break;
      case "/fio-gameux-users-submit":
        title = "";
        metaDescription = "";
        break;
      case "/fio-gameux-users":
        title = "";
        metaDescription = "";
        break;
      case "/fio-gameux-users-spin-up":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<FIOGameUXUsersSignIn />} />
      <Route path="/fio-gameux-users-enter" element={<FIOGameUXUsersEnter />} />
      <Route
        path="/fio-gameux-users-submit"
        element={<FIOGameUXUsersSubmit />}
      />
      <Route path="/fio-gameux-users" element={<FIOGameUXUsers />} />
      <Route
        path="/fio-gameux-users-spin-up"
        element={<FIOGameUXUsersSpinUp />}
      />
    </Routes>
  );
}
export default App;
