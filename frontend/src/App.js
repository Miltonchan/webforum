import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & componets
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import Question from "./pages/Question";
import MyQuetionsReplies from "./pages/MyQuetionsReplies";
import Leaderboard from "./pages/Leaderboard";
import Logout from "./pages/Logout"
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";

// auth context
import { AuthContextProvider } from "./contexts/authContext";
import { useAuthContext } from "./hooks/useAuthContext";

// user context
import { UserContextProvider } from "./contexts/userContext";

//question context
import { QuestionsContextProvider } from "./contexts/questionsContext";

export const URL = process.env.REACT_APP_SERVER_URL;


function WrappedApp() {

  const { state } = useAuthContext();
  const { isAuthenticated } = state;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={!isAuthenticated ? <Navigate replace to="/login" /> : <Home />}
          />
        <Route 
          path="/question/:id" 
          element={!isAuthenticated ? <Navigate replace to="/login" /> : <Question />} 
          />
        <Route
          path="/profile"
          element={!isAuthenticated ? <Navigate replace to="/login" /> : <Profile />}
        />
        <Route
          path="/myQuetionsReplies"
          element={!isAuthenticated ? <Navigate replace to="/login" /> : <MyQuetionsReplies />}
        />
        <Route
          path="/leaderboard"
          element={!isAuthenticated ? <Navigate replace to="/login" /> : <Leaderboard />}
        />
        <Route
          path="/logout"
          element={<Logout />}
        />
        <Route
          path="/disclaimer"
          element={<Disclaimer />}
        />
        <Route
          path="/privacypolicy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/contactus"
          element={<ContactUs />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <AuthContextProvider>
    <UserContextProvider>
      <QuestionsContextProvider>
        <WrappedApp />
      </QuestionsContextProvider>
    </UserContextProvider>
  </AuthContextProvider>
);

export default App;
