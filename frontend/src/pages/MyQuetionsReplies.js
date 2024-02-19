import React, { useState, useEffect, useCallback } from "react";

// import components
import MyQuestionList from "../components/MyQuestionList";
import MyReplyList from "../components/MyReplyList";

// import context
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';
import { useQuestionsContext } from '../hooks/useQuestionsContext';

const MyQuetionsReplies= () => {

  const { state } = useAuthContext();
  const email = state.email;
  const { username, updateUsername } = useUserContext();
  const { questions, dispatch } = useQuestionsContext();
  const [replies, setReplies] = useState([]);

  // GET the username
  const fetchUsername = useCallback(async () => {
    const response = await fetch(`http://localhost:4000/useraccount/getUserInfo?email=${email}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();

    if (response.ok) {
      updateUsername(data.username);
    }
  }, [email, updateUsername]);

  // GET all the questions to be filtered by username
  const fetchQuestions = useCallback(async () => {
    const response = await fetch('http://localhost:4000/question', {
      method: 'GET',
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'SET_ALLQUESTIONS', payload: data });
    }
  }, [dispatch]);

  // Get the replies based on the user
  const fetchReplies = useCallback(async () => { 
    const response = await fetch(`http://localhost:4000/reply/user/${username}`,{
      method: 'GET',
    });

    const data = await response.json();
    if (response.ok) {
      setReplies(data)
    } 
  },[username]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsername();
      await fetchQuestions();
      await fetchReplies();
    };
  
    fetchData();
  }, [fetchUsername, fetchQuestions, fetchReplies]);

  return (
    <div className="container my-3" >
      <nav className="sticky-top rounded shadow-sm" style={{top: '100px',backgroundColor: '#e3f2fd' }} >
        <div className="nav nav-tabs " id="nav-tab" role="tablist" >

          <button className="nav-link active rounded fw-bold" id="nav-myQuestions-tab" data-bs-toggle="tab" 
          data-bs-target="#nav-myQuestions" type="button" role="tab" aria-controls="nav-questions" 
          aria-selected="true" >My Questions</button>

          <button className="nav-link rounded fw-bold" id="nav-myReplies-tab" data-bs-toggle="tab" 
          data-bs-target="#nav-myReplies" type="button" role="tab" aria-controls="nav-reply" 
          aria-selected="false">My Replies</button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-myQuestions" role="tabpanel" aria-labelledby="nav-myQuestions-tab">
          {username && questions &&<MyQuestionList username={username} questions={questions}/>}
        </div>
      </div>

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade p-3" id="nav-myReplies" role="tabpanel" aria-labelledby="nav-myReplies-tab">
          <MyReplyList replies= {replies} />         
        </div>
      </div>
    </div>
  )
}
    
export default MyQuetionsReplies;