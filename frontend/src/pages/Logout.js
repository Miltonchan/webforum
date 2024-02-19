import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// import component
import Footer from "../components/Footer";  

// import context
import { useAuthContext } from '../hooks/useAuthContext';

import Professor_meng from "./Prof_meng_2.png";

const Logout= () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    sessionStorage.clear();
    dispatch({
      type: 'LOGOUT',
      email: null,
      isAuthenticated: false
    });
    const redirectTimer = setTimeout(() => {
      if (countdown === 1) {
        navigate("/login"); 
      } else {
        setCountdown(prevCountdown => prevCountdown - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [countdown, navigate]);

  return (
    <div className="logout">
      <div className="container-fluid" style={{ marginTop: "10vh" }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5 text-center text-md-start" id="Hidden">
            <h1>
              <div className="display-3">You have successfully logged out!</div>
              <div className="display-5 text-muted">
                Keep exploring, learning, and sharing your insights
              </div>
            </h1>
            <p className="lead my-4 text-muted">
              Redirecting to the login page in {countdown} seconds...
            </p>
          </div>
          <div className="col-md-2 d-flex justify-content-center align-items-center d-md-none d-lg-block">
            <img className="img-fluid" src={Professor_meng} alt="Professor_meng"></img>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Logout;