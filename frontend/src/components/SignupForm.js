import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from "../App";


// import context
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

// import schoolList
import schoolList from '../schoolList'

const SignupForm = () => {

  const { state } = useAuthContext();
  const { updateUsername } = useUserContext();
  const usernameRef = useRef('');
  const roleRef = useRef('');
  const districtRef = useRef('');
  const schoolRef = useRef('');
  const [usernameError, setUsernameError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  // Function to check the duplication of the input useranme
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`${URL}/useraccount/checkUserName?username=${username}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        return !data.isDuplicate;
      } 

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
  }

  // Function to handle the form submittion
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = usernameRef.current.value;
    const role = roleRef.current.value;
    const district = districtRef.current.value;
    const school = schoolRef.current.value;

    // Perform validation or other actions with the collected data
    if (username.trim() === '' && role.trim() === '' && district.trim() === '' && school.trim() === ''){
      alert('Please fill in all fields');
      return;
    } else if (username.trim() === ''){
      alert('Please fill in your username');
      return;
    } else if (role.trim() === ''){
      alert('Please select your role');
      return; 
    } else if (district.trim() === ''){
      alert('Please select your district');
      return;
    } else if (school.trim() === ''){
      alert('Please select your school');
      return;
    }

    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (!isUsernameAvailable) {
      setUsernameError('Username is already taken ! Please change to a different name !');
      return;
    }

    // Create a new useraccount in db
    const userData = { email: state.email, username: username, role: role, district: district, school: school }
    try{
      fetch(`${URL}/useraccount/newuser`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        updateUsername(username);    // store the username in global state
        console.log(username);
      })
      .catch(error => console.log(error));  
      setShowDelayMessage(true);
      setTimeout(() => { 
        setShowDelayMessage(false);   // Hide the delay message after 2 seconds
        setShowSuccessMessage(true);
      },"3000");
      setTimeout(() => {
        setShowSuccessMessage(false);  // Hide the success message after 2 seconds
        navigate('/home'); // Navigate to the home page
      }, "5000");   


      // Reset the signup form
      usernameRef.current.value = '';
      roleRef.current.value = '';
      districtRef.current.value = '';
      schoolRef.current.value = '';

      
      
    } catch(error) {
      usernameRef.current.value = '';
      roleRef.current.value = '';
      districtRef.current.value = '';
      schoolRef.current.value = '';
      console.log(error);
    }
  }

  

  return (
    <div className='container-lg'>
    <div className="row justify-content-center my-5" > 
      <div className="col-lg-6">
        <form onSubmit={ handleSubmit }>
          
          <label htmlFor="name" className="form-label">Name:</label>
          <div className="mb-4 input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill text-secondary"></i>
            </span>
            <input type="text" id="name" className="form-control" placeholder="e.g. Chris Wong" ref={usernameRef}/>
            <span className="input-group-text">
              <span className="tt" data-bs-placement="bottom" title="Don't use your real name">
                <i className="bi bi-question-circle text-muted"></i>
              </span>
            </span>
          </div>

          <label htmlFor="subject" className="form-label">Role</label>
          <div className="mb-4 input-group">
            <span className="input-group-text">
              <i className="bi bi-person-badge-fill text-secondary"></i>
            </span>
            <select className="form-select" id="subject" ref={roleRef}>
            <option value="">Please Select</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <label htmlFor="subject" className="form-label">School District</label>
          <div className="mb-4 input-group">
            <span className="input-group-text">
              <i className="bi bi-geo-alt-fill text-secondary"></i>
            </span>
            <select className="form-select" onChange={handleDistrictChange} ref={districtRef} id="subject">
              <option value="">Please Select</option>
              <option value="CENTRAL AND WESTERN | 中西區">CENTRAL AND WESTERN | 中西區</option>
              <option value="EASTERN | 東區">EASTERN | 東區</option>
              <option value="ISLANDS | 離島區">ISLANDS | 離島區</option>
              <option value="KOWLOON CITY | 九龍城區">KOWLOON CITY | 九龍城區</option>
              <option value="KWAI TSING | 葵青區">KWAI TSING | 葵青區</option>
              <option value="KWUN TONG | 觀塘區">KWUN TONG | 觀塘區</option>
              <option value="NORTH | 北區">NORTH | 北區</option>
              <option value="SAI KUNG | 西貢區">SAI KUNG | 西貢區</option>
              <option value="SHA TIN | 沙田區">SHA TIN | 沙田區</option>
              <option value="SHAM SHUI PO | 深水埗區">SHAM SHUI PO | 深水埗區</option>
              <option value="SOUTHERN | 南區">SOUTHERN | 南區</option>
              <option value="TAI PO | 大埔區">TAI PO | 大埔區</option>
              <option value="TSUEN WAN | 荃灣區">TSUEN WAN | 荃灣區</option>
              <option value="TUEN MUN | 屯門區">TUEN MUN | 屯門區</option>
              <option value="WAN CHAI | 灣仔區">WAN CHAI | 灣仔區</option>
              <option value="WONG TAI SIN | 黃大仙區">WONG TAI SIN | 黃大仙區</option>
              <option value="YAU TSIM MONG | 油尖旺區">YAU TSIM MONG | 油尖旺區</option>
              <option value="YUEN LONG | 元朗區">YUEN LONG | 元朗區</option>
            </select>
          </div>

          <label htmlFor="subject" className="form-label">School Name</label>
          <div className="mb-4 input-group">
            <span className="input-group-text">
              <i className="bi bi-book-fill text-secondary"></i>
            </span>
            <select className="form-select" id="subject" ref={schoolRef}>
              <option value="" >Please Select</option>
              {schoolList[selectedDistrict]?.map((school, index) => (
                <option key={index} value={school}>
                  {school}
                </option>
                ))}
            </select>
          </div>

          <div className="mb-4 text-center">
            <button type="submit" className="btn btn-outline-danger btn-lg">Create your account</button>
          </div>
          {!usernameError && showDelayMessage && (
            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '80%'}}>Registering the Account...</div>
            </div>
          )}
          {!usernameError && showSuccessMessage && (
          <div className="alert alert-success" role="alert">
            Success, the account has been created! Redirecting to Home Page...
          </div>
          )}
          {usernameError && (
          <div className="alert alert-danger" role="alert">
            {usernameError}
          </div>
          )}
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignupForm;