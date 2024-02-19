// import context
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

  const { state } = useAuthContext();
  const { isAuthenticated } = state;
    
  return(
    <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-gradient sticky-top" style={{ backgroundColor: '#e3f2fd' }}>
      
      <div className="container-xxl" >

        <a className="navbar-brand" href="/home" >
          <span className="text-dark fw-bold" >
            <h1>AIforfuture Ask!</h1>
          </span>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuthenticated && <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
          <ul className="navbar-nav">

            <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/home"><i className="bi bi-house-door-fill "></i> Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark" href="/profile"><i className="bi bi-person-fill"></i> Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/myQuetionsReplies"><i className="bi bi-chat-dots-fill"></i> My Questions & Replies</a>
            </li>

            <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/leaderboard"><i className="bi bi-trophy-fill"></i> Leaderboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link fw-bold text-dark" href="/logout"><i className="bi bi-door-closed-fill"></i> Logout</a>
            </li>
          </ul>
        </div>}
    </div>
  </nav>   
  )
}

export default Navbar;