import { useNavigate } from "react-router-dom";

const PrivacyPolicy= () => {

  const navigate = useNavigate();

  // Click return and go back to the previous page
  const handleReturn = () => {
    navigate('/login');
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
              Privacy Policy Statement
            </h2>
            <div className="card-body">
              <ol>
                <li>This is a statement to inform you of your rights under the Personal Data (Privacy) Ordinance.</li>
                <li>Personal information is provided by you as an applicant through the completion of application forms designated for various purposes, e.g. for application of the Project, for the promotion of future activities organized by CUHK Jockey Club AI for the Future Project (the Project). Data collected are used specifically for the purposes prescribed in the application forms and will serve as a basis for selection of applicants.</li>
                <li>Personal data will be kept confidential and handled by the Project's staff members. The Project may transfer some of the data to an agent or other persons appointed to undertake some of its functions.</li>
                <li>Your personal data provided in the application may be used by the Project for conducting statistical analyses, research, survey and audit for the purpose of continuous improvement of provisions and other services provided by the University.</li>
                <li>Under the provisions of the Ordinance, you have the right to request the Project to ascertain whether it holds your personal data, to be given a copy, and to apply for correction of the data, if deemed incorrect.</li>
                <li>In accordance with the Personal Data (Privacy) Ordinance, you have the right to request access to and to correct the personal information contained in the application, and the right to request a copy of such data during the data collection.
                    If you wish to access or correct your personal information, please contact aiforfuture@cuhk.edu.hk</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
	)
}
    
export default PrivacyPolicy;