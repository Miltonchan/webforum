import React, { useState, useEffect, useCallback } from "react";
import { URL } from "../App";

// import context
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

const Leaderboard = () => {

  const { state } = useAuthContext();
  const email = state.email;
  // const { username, updateUsername } = useUserContext();
  const { updateUsername } = useUserContext();
  const [ topStudents, setTopStudents ] = useState([]);
  const [ topTeachers, setTopTeachers ] = useState([]);
  const [ topSchools, setTopSchools] = useState([]);

  // GET the username
  const fetchUsername = useCallback(async () => {
    const response = await fetch(`${URL}/useraccount/getUserInfo?email=${email}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();

    if (response.ok) {
      updateUsername(data.username);
    }
  }, [email, updateUsername]);

  // Get all the user information from students and sort them based on the score
  const fetchAllUserInformation = useCallback(async () => {
    const response = await fetch(`${URL}/useraccount/getAllUserInformation`,
    {
      method: 'GET',
    });
  
    const data = await response.json();
    if (response.ok) {
      const sortedUsers = data.sort((a, b) => b.score - a.score);
      const topStudents = sortedUsers.filter((user) => user.role === 'student').slice(0, 100);
      const topTeachers = sortedUsers.filter((user) => user.role === 'teacher').slice(0, 100);
      setTopStudents(topStudents);
      setTopTeachers(topTeachers);

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
    const fetchData = async () => {
      await fetchUsername();
      await fetchAllUserInformation();
    };
  
    fetchData();
  }, [fetchUsername, fetchAllUserInformation]);

  const calculateTotalScore = (students) => {
    let totalScore = 0;
  
    students.forEach((student) => {
      totalScore += student.score;
    });
  
    return totalScore;
  };




  return (
    
  <div className="container my-3" >
    <nav className="sticky-top rounded shadow-sm" style={{top: '100px',backgroundColor: '#e3f2fd' }} >
      <div className="nav nav-tabs " id="nav-tab" role="tablist">

        <button className="nav-link active rounded fw-bold" id="nav-Student_Ranking-tab" data-bs-toggle="tab" 
        data-bs-target="#nav-Student_Ranking" type="button" role="tab" aria-controls="nav-Student_Ranking" 
        aria-selected="true" >Student Ranking</button>

        <button className="nav-link rounded fw-bold" id="nav-Teacher_Ranking-tab" data-bs-toggle="tab" 
        data-bs-target="#nav-Teacher_Ranking" type="button" role="tab" aria-controls="nav-Teacher_Ranking" 
        aria-selected="false">Teacher Ranking</button>

        <button className="nav-link rounded fw-bold" id="nav-School_Ranking-tab" data-bs-toggle="tab" 
        data-bs-target="#nav-School_Ranking" type="button" role="tab" aria-controls="nav-School_Ranking" 
        aria-selected="false">School Ranking</button>
      </div>
    </nav>

    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active p-3 list-group rounded" id="nav-Student_Ranking" role="tabpanel" aria-labelledby="nav-Student_Ranking-tab">
        <div className="list-group-item rounded">
          <div className="row">
            <div className="col-1">
              <h6 className="fw-bold text-center">Rank</h6>
            </div>
            <div className="col-3">
              <h6 className="fw-bold text-center">Name</h6>
            </div>
            <div className="col-7">
              <h6 className="fw-bold text-center">School</h6>
            </div>
            <div className="col-1">
              <h6 className="fw-bold text-center">Score</h6>
            </div>
          </div>
        </div>

        {topStudents && topStudents.map((topStudent, index) => (
          <div key={topStudent._id} className="list-group-item rounded">
            <div className="row">
              <div className="col-1">
                <h6 className="fw-bold text-center">{index + 1}</h6>
              </div>
              <div className="col-3">
                <h6 className="fw-bold text-center">{topStudent.username}</h6>
              </div>

              <div className="col-7">
                <h6 className="fw-bold text-center">{topStudent.school.split(" | ")[0]}</h6>
              </div>
              <div className="col-1">
                <h6 className="fw-bold text-center">{topStudent.score}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show p-3 list-group rounded" id="nav-Teacher_Ranking" role="tabpanel" aria-labelledby="nav-Teacher_Ranking-tab">
        <div className="list-group-item rounded">
          <div className="row">
            <div className="col-1">
              <h6 className="fw-bold text-center">Rank</h6>
            </div>
            <div className="col-3">
              <h6 className="fw-bold text-center">Name</h6>
            </div>
            <div className="col-7">
              <h6 className="fw-bold text-center">School</h6>
            </div>
            <div className="col-1">
              <h6 className="fw-bold text-center">Score</h6>
            </div>
          </div>
        </div>

        {topTeachers && topTeachers.map((topTeacher, index) => (
          <div key={topTeacher._id} className="list-group-item rounded">
            <div className="row">
              <div className="col-1">
                <h6 className="fw-bold text-center">{index + 1}</h6>
              </div>
              <div className="col-3">
                <h6 className="fw-bold text-center">{topTeacher.username}</h6>
              </div>

              <div className="col-7">
                <h6 className="fw-bold text-center">{topTeacher.school.split(" | ")[0]}</h6>
              </div>
              <div className="col-1">
                <h6 className="fw-bold text-center">{topTeacher.score}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade p-3 list-group rounded" id="nav-School_Ranking" role="tabpanel" aria-labelledby="nav-School_Ranking-tab">
        <div className="list-group-item rounded">
          <div className="row">
            <div className="col-1">
              <h6 className="fw-bold text-center">Rank</h6>
            </div>
            <div className="col-9">
              <h6 className="fw-bold text-center">School</h6>
            </div>
            <div className="col-2">
              <h6 className="fw-bold text-center">Total Score</h6>
            </div>
          </div>
        </div>

        {topSchools && topSchools.map((topSchool, index) => (
          <div key={topSchool._id} className="list-group-item rounded">
            <div className="row">
              <div className="col-1">
                <h6 className="fw-bold text-center">{index + 1}</h6>
              </div>
              <div className="col-9">
                <h6 className="fw-bold text-center">{topSchool.name}</h6>
              </div>
              <div className="col-2">
                <h6 className="fw-bold text-center">{calculateTotalScore(topSchool.students)}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
  );
};

export default Leaderboard;