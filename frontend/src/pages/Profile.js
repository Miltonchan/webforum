import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {

  const { state } = useAuthContext();
  const email = state.email;
  const [userInfo, setuserInfo] = useState({});

  useEffect (() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/useraccount/getUserInfo?email=${email}`,{
          method:"GET",
        })
        const data = await response.json();
        if (response.ok) {
          setuserInfo(data);
        }
      } catch (error) {
      console.error(error)
      }   
    }

    fetchProfile();
  }, [email])


  return (

      <div className="container-lg my-3">
        <div className="card">
          <h2 className="card-header" style={{ backgroundColor: '#e3f2fd' }}>
            Profile
          </h2>
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-person-fill"></i> Username: {userInfo.username}</h5>
            <h5 className="card-title"><i className="bi bi-envelope-fill"></i> Email: {userInfo.email}</h5>
            <h5 className="card-title"><i className="bi bi-person-badge-fill"></i> Role: {userInfo.role}</h5>
            <h5 className="card-title"><i className="bi bi-geo-alt-fill"></i> School District: {userInfo.district}</h5>
            <h5 className="card-title"><i className="bi bi-book-fill"></i> School Name: {userInfo.school}</h5>
          </div>
        </div>
        <div className="card my-3">
          <h2 className="card-header" style={{ backgroundColor: '#e3f2fd' }}>
            Scores and Statistics
          </h2>
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-star-fill"></i> Your Score: {userInfo.score}</h5>
            <h5 className="card-title"><i className="bi bi-question-circle-fill"></i> Number of Questions Asked (5 points): {userInfo.numOfQuestionsAsked} </h5>
            <h5 className="card-title"><i className="bi bi-chat-left-dots-fill"></i> Number of Replies Sent (10 points): {userInfo.numOfRepliesSent} </h5>
            <h5 className="card-title"><i className="bi bi-hand-thumbs-up-fill"></i> Number of Likes Received (2 points): {userInfo.numOfLikesReceived} </h5>
            <h5 className="card-title"><i className="bi bi-hand-thumbs-up"></i> Number of Likes Given (2 points): {userInfo.numOfLikesGave} </h5>
          </div>
        </div>
      </div>
  )
}
  
export default Profile;

