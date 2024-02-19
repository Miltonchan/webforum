import { Link } from "react-router-dom"

const NotFound= () => {

    return (
      <div>
        <h2>Page not found</h2>
        <p> Go to the <Link to ="/login">Login Page</Link>.</p>
      </div>


    )
  }
    
  export default NotFound;