import { useNavigate } from "react-router-dom";
import { URL } from "../App";

const ContactUs= () => {

	const navigate = useNavigate();

  // Click return and go back to the previous page
  const handleReturn = () => {
    navigate(`${URL}/login`);
  };

	return (
		<div className="container-lg my-3">
      <button className="btn btn-light mb-2 btn-lg"  onClick={handleReturn}>
        <i className="bi bi-arrow-return-left"></i> Return to Login 
      </button>   
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="card">
            <h2 className="card-header" style={{ backgroundColor: '#e3f2fd' }}>
              Contact Us
            </h2>
            <div className="card-body">
							<h5>
								<i className="bi-geo-alt-fill"></i> Location: AI Education and Exploration Lab
								Room 1105, William M.W. Mong Engineering Building (ERB),
								The Chinese University of Hong Kong, Shatin
							</h5>
							<h5>
								<i className="bi-telephone-fill"></i> Telephone: 3943 0479
							</h5>
							<h5>
								<i className="bi-envelope-fill"></i> Email: aiforfuture@cuhk.edu.hk
							</h5>
							<h5>
								<i class="bi-question-circle-fill"></i> Support: <a href="https://sso-ai.keep.edu.hk/supports/" target="_blank" rel="noreferrer">sso-ai.keep.edu.hk/supports/</a>
							</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
	)
}
    
  export default ContactUs;