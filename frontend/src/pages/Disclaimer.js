import { useNavigate } from "react-router-dom";

const Disclaimer = () => {

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
              Disclaimer
            </h2>
            <div className="card-body">
            <ol>
              <li>The data, articles, links to third party websites and other information (collectively, “Information”) provided on any website with second level domain name “cuhkjc-aiforfuture” (collectively, “the Website”) is provided on an “as is” basis for information purposes only.</li>
              <li>
                By accessing the Website you acknowledge and agree that:
                <ol type="a">
                  <li>None of CUHK Jockey Club AI for the Future Project (the Project), its affiliates or any other person involved in or related to the compilation of the Information makes any express or implied warranties or representations with respect to the accuracy, timeliness or completeness of the Information or as to the results that may be obtained by the use thereof;</li>
                  <li>The Project expressly disclaim all implied warranties (including, without limitation, the implied warranties of merchantability and fitness for a particular purpose) with respect to the Information;</li>
                  <li>In no event shall the Project have any liability of any kind to any person or entity arising from or related to any actions taken or not taken as a result of any Information;</li>
                  <li>A link or reference to any third party company, service, product or website in the Website (“Third Party Services”) does not in any way amount to or imply endorsement by the Project. Whilst the Project have (at the time of publication) taken reasonable efforts to examine the Third Party Services, the Project make no express or implied warranties or representations with respect to the accuracy, timeliness or completeness of any information contained within such Third Party Services; and</li>
                  <li>In no event shall the Project have any liability of any kind to any person or entity arising from or related to any use of Third Party Services.</li>
                </ol>
              </li>
              <li>If you are in doubt about the contents of this Website, have questions or comments about such content, notice errors or omissions, or believe that the any content can be presented in a clearer way, please send your comments and/or suggestions to aiforfuture@cuhk.edu.hk</li>
              <li>All terms and conditions and disclaimers in respect of use of any part of the Websites are written in Chinese and English. In the event of any inconsistency between the Chinese version and the English, the English shall prevail.</li>
            </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    
	)
}
    
export default Disclaimer;