import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// import component
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";      

// import context
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

// import image
import Discussion from './discussion.png';

const Login = () => {

  const { dispatch } = useAuthContext();
  const { updateUsername } = useUserContext();
  const [redirectToHome, setRedirectToHome] = useState(false); 
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  // After sucessful sign in store the JWT in the local storage, and change the auth global state
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    sessionStorage.setItem('token', response.credential);
    sessionStorage.setItem('isAuthenticated', true);
    dispatch({
      type: 'LOGIN',
      payload: jwtDecode(sessionStorage.getItem("token")).email,
      isAuthenticated: true
    });
    console.log(jwtDecode(response.credential));

    // Check for account created or not & store the username in global state
    const email = jwtDecode(sessionStorage.getItem("token")).email;
    const fetchEmail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/useraccount/getUserInfo?email=${email}`, {
          method: "GET"
        });

        if (response.ok) {
          const data = await response.json();
          const fetchedUsername = data.username;
          updateUsername(fetchedUsername);
          console.log(fetchedUsername);
          setShowDelayMessage(true);
          setTimeout(() => { 
            setShowDelayMessage(false);   // Hide the delay message after 2 seconds
            setRedirectToHome(true);
          },"2000");
        } else {
          setShowSignupForm(true);
        }
      } catch (error) {
        setShowSignupForm(true);
      }
    }
    fetchEmail();         
    // Hide the google sign in button
    document.getElementById('SignInDiv').hidden= true;  
    document.getElementById('Hidden').hidden= true; 
  }


  // Dispaly the google sign in button
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "376472761452-27304ivijd1b87cfudqd314bqlduh2po.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById('SignInDiv'),
      { theme: "outline", size:"large" }
    )

    window.google.accounts.id.prompt();
  }, []);

  return (
    <div className='login'>
      <div className="container-fluid " style={{ marginTop: "10vh" }}>
        <div className="row justify-content-center align-items-center" >
          <div className="col-md-5 text-center text-md-start" id='Hidden'>
            <h1>
              <div className="display-2" >Ask, Learn, Empower</div>
              <div className="display-5 text-muted">Ignite Your AI Journey</div>
            </h1>
            <p className = "lead my-4 text-muted">AI Education Forum, Where Questions Meet Knowledge</p>

            <div className="card border-0" style={{ backgroundColor: '#e3f2fd' }}>
              <div className="card-body text-center py-3" >
                <div className="d-flex justify-content-center " id='SignInDiv'></div>
              </div> 
            </div>
          </div>
          {redirectToHome ? <Navigate replace to="/home" /> : (showSignupForm && <SignupForm />)}
          <div className="col-md-5 d-flex justify-content-center align-items-center d-md-none d-lg-block" >
            <img className="img-fluid" src={Discussion} alt="Discussion"></img>
            {showDelayMessage && (
            <div className="progress my-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '97%'}}>Signing in the account...</div>
            </div>
          )}
          </div>
        </div>
        {!showSignupForm  && <Footer />}
      </div>
    </div>
  )
    
}

export default Login;