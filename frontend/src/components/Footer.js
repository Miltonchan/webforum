import React from 'react';

// import image
import CUHKLogo from '../pages/CUHK_Logo-1.png';
import HKJCLogo from '../pages/HKJC_Logo-1.png';

const Footer = () => {
  return (
    <footer className="bg-light py-4 fixed-bottom" >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12">
            <div className="row justify-content-center mb-3 mb-md-0" >
              <div className="col-auto">
                <img src={CUHKLogo} className="img-fluid mx-2 d-inline-block" alt="CUHKLogo" />
              </div>
              <div className="col-auto">
                <img src={HKJCLogo} className="img-fluid mx-2 d-inline-block" alt="HKJCLogo" />
              </div>
            </div>
          </div> 
          <div className="col-6">
            <div className="text-center text-md-start mt-3">
              <div className="text-muted">
                版權所有 © 中大賽馬會智為未來計劃
                <br />
                Copyright © CUHK Jockey Club AI for the Future Project.
                All rights reserved.
              </div>
            </div>
          </div>
          <div className="col-2 text-center text-md-start mt-3 text-muted">
            <a href="/contactus">Contact Us</a>
          </div>
          <div className="col-2 text-center text-md-start mt-3 text-muted">
            <a href="/privacypolicy">Privacy Policy</a>
          </div>
          <div className="col-2 text-center text-md-start mt-3 text-muted">
          <a href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;