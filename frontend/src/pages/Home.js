import React, { useState, useEffect, useCallback } from "react";

// import components
import AllQuestionList from "../components/AllQuestionList";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import NewQuestionForm from "../components/NewQuestionForm";

// import context
import { useQuestionsContext } from "../hooks/useQuestionsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

const Home = () => {
  const { questions, dispatch } = useQuestionsContext();
  const { username, updateUsername } = useUserContext();
  const { state } = useAuthContext();
  const [selectedChapter, setSelectedChapter] = useState('');
  const email = state.email;
  const [ topStudents, setTopStudents ] = useState([]);
  const [ topSchools, setTopSchools] = useState([]);


  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

    // Get all the user information from students and sort them based on the score
    const fetchAllUserInformation = useCallback(async () => {
      const response = await fetch('http://localhost:4000/useraccount/getAllUserInformation',
      {
        method: 'GET',
      });
    
      const data = await response.json();
      if (response.ok) {
        const sortedUsers = data.sort((a, b) => b.score - a.score);
        const topStudents = sortedUsers.filter((user) => user.role === 'student').slice(0, 100);
        setTopStudents(topStudents);
  
        // Create an object to store school information with an empty students array
        const schoolsMap = {};
  
        // Iterate over each user and group them by school
        data.forEach((user) => {
          if (!schoolsMap[user.school]) {
            schoolsMap[user.school] = {
              _id: user.school, // Replace with the appropriate identifier for your school object
              name: user.school, // Replace with the appropriate property for the school name
              students: [], // Initialize an empty students array
            };
          }
  
          // Push the user to the students array of the corresponding school
          schoolsMap[user.school].students.push(user);
        });
  
        // Convert the schoolsMap object to an array of schools
        const topSchools = Object.values(schoolsMap);
  
        setTopSchools(topSchools);
      }
    }, []);

  useEffect(() => {
    // GET all the questions
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:4000/question", {
        method: "GET",
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ALLQUESTIONS", payload: data });
      }
    };

    // GET the username
    const fetchUsername = async () =>{
      const email = state.email;
      const response = await fetch(`http://localhost:4000/useraccount/getUserInfo?email=${email}`,{
        method:"GET",
      })
      const data = await response.json();

      if (response.ok) {
        updateUsername(data.username);
        
      }
    }

    fetchQuestions();
    fetchUsername();
  }, [dispatch, email, state.email, updateUsername]);

  useEffect(() => { 
    fetchAllUserInformation();
  }, [fetchAllUserInformation]);


  return (
    <div className="container-lg my-3">
      <div className="row">
        <div className="col-md-3 ">
          <LeftBar onChapterClick={handleChapterClick}/>
        </div>
        <div className="col-md-7">
          { username && <NewQuestionForm username = {username}/> }
          { questions && <AllQuestionList questions = {questions} selectedChapter = {selectedChapter}/> }
        </div>
        <div className="col-md-2">
          {topStudents && topSchools &&  <RightBar topStudents={topStudents} topSchools={topSchools} />}
        </div>
      </div>
    </div>
  );
};

export default Home;