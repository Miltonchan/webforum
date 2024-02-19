import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import context
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserContext } from '../hooks/useUserContext';

//date fns
import { formatDistanceToNow } from 'date-fns';

const Question = () => {
  const { id } = useParams();
  const { state } = useAuthContext();
  const email = state.email;
  const { username, updateUsername } = useUserContext();
  const [question, setQuestion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [likedReplies, setLikedReplies] = useState([]);
  const [replyNum, setReplyNum] = useState(null);   
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const ansRef = useRef('');
  const chapterRef = useRef();
  const pageRef = useRef();
  const paragraphRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {

    // GET the username
    const fetchUsername = async () => {
      const response = await fetch(`http://localhost:4000/useraccount/getUserInfo?email=${email}`,{
        method:"GET",
      })
      const data = await response.json();

      if (response.ok) {
        updateUsername(data.username);
      }
    };

    // Get the corresponding question information
    const fetchQuestion = async () => {
        const response = await fetch(`http://localhost:4000/question/${id}`,{
          method:'GET',
        });
        const questiondata = await response.json();

        if (response.ok) {
         setQuestion(questiondata);
        }
    };

    // Fetch the replies of the corresponding quesiton
    const fetchReply = async () => {
      const response = await fetch(`http://localhost:4000/reply/${id}`, {
        method: "GET",
      });
      const data = await response.json();
    
      if (response.ok) {
        setReplies(data);
        setReplyNum(data.length);  //delele

        // Fetch the replies' id that has been liked by user
        const likedResponse = await fetch(`http://localhost:4000/reply/liked/${id}?username=${username}`, {
          method: 'GET',
        });
        const likedData = await likedResponse.json();

        if (likedResponse.ok) {
          const likedReplyIds = likedData.map((likedReply) => likedReply._id);
          setLikedReplies(likedReplyIds);

        }
      }
    };

    fetchUsername();
    fetchQuestion();
    fetchReply();

  }, [id, username, email, updateUsername ]);

  // handle the reply submittion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const answer = ansRef.current.value;
    const chapter = chapterRef.current.value;
    const page = pageRef.current.value;
    const paragraph = paragraphRef.current.value;
    const replyData = { questionid: id, username: username, answer: answer, chapter: chapter, page: page, paragraph: paragraph };
    const usernameForScore = { username };

    if (answer.trim() === '' && chapter.trim() === '' && page.trim() === '' && paragraph.trim() === '') {
      alert('Please fill in all fields');
      return;
    } else if (answer.trim() === '') {
      alert('Please fill in your answer');
      return;
    } else if (chapter.trim() === '') {
      alert('Please fill in the chapter');
      return;
    } else if (page.trim() === '') {
      alert('Please fill in the page');
      return;
    } else if (paragraph.trim() === '') {
      alert('Please fill in the paragraph');
      return;
    }
    
    // Save the reply message to replymodel in db
    try {
      fetch('http://localhost:4000/reply/newreply',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(replyData)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setReplies((prevReplies) => [data, ...prevReplies])

        // Make a request to update the question with the new replyId        
        const repliesId = data._id; 
        console.log(repliesId);
        try { 
          fetch(`http://localhost:4000/question/addReplyId/${id}`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({repliesId})
          })
          .then (res => res.json())
          .then(data => {
            console.log(data);
            setReplyNum(currentReplyNumber => {
              return currentReplyNumber + 1
            })
            setIsLoading(true);
            setTimeout(() =>{
              setIsLoading(false);
              setShowSuccessMessage(true);
            },"1000")
            setTimeout(() =>{
              setShowSuccessMessage(false);
              ansRef.current.value = '';
              chapterRef.current.value = '';
              pageRef.current.value = '';
              paragraphRef.current.value = '';
            },"2000")
            // Reset the input fields

          })
          .catch(error => console.log(error));
        } catch (error) {
          console.log(error);
        }

        // Update the score and numOfRepliesSent
        try {
          fetch('http://localhost:4000/useraccount/updateScoreAndRepliesSent',{
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usernameForScore)
          })
          .then(res => res.json())
          .then(data => { 
            console.log(data)
          })
        } catch (error) {
          console.log(error);
        }

      })
      .catch(error => console.log(error));

    } catch (error) { 
      console.log(error);
    } 

  }

  // Handle the user like-click
  const handleLike = async (replyId, replyUserName) => {
    try {
      const usernameForScore = { username };
      const replyusernameForScore = { replyUserName };

      // Update a reply when like clicked
      const response = await fetch(`http://localhost:4000/reply/like/${replyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
  
      if (response.ok) {
        setLikedReplies([...likedReplies, replyId]);
        const updatedReplies = replies.map((reply) => {
          if (reply._id === replyId) {
            return { ...reply, like: [...reply.like, username] };
          }
          return reply;
        });
        console.log(updatedReplies)
        setReplies(updatedReplies);
      }

      // Update the score and numOfLikesGave
      fetch('http://localhost:4000/useraccount/updateScoreAndLikesGave',{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usernameForScore)
      })
      .then(res => res.json())
      .then(data => { 
        console.log(data)
      })

      // Update the score and numOfLikesReceied
      fetch('http://localhost:4000/useraccount/updateScoreAndLikesReceived',{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(replyusernameForScore)
      })
      .then(res => res.json())
      .then(data => { 
        console.log(data)
      })


    } catch (error) {
      console.log(error);
    }
  };

  // Click return and go back to the previous page
  const handleReturn = () => {
    navigate(-1);
  };
  
  return (
    // Display the selected question, reply form and replies 
    <div className="container my-3">  
      <button className="btn btn-light mb-2 btn-lg" onClick={handleReturn} >
        <i className="bi bi-arrow-return-left"></i> Back
      </button>   
      {question && (
      <div className="card mb-2"> 
        <div className="card-header fw-bold" style={{ backgroundColor: '#e3f2fd' }}>
            Chapter {question.chapter}
        </div>
        <div className="card-body" >
          <h3 className="fw-bold">Q: {question.question}</h3>
          <small className="text-body-secondary"><i className="bi bi-calendar"></i> {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</small>
          <h2 className="badge border rounded-pill text-dark" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }}><i className="bi bi-chat-left-text bold"></i> { replyNum && replyNum  }</h2>
        </div>
      </div>
      )}
      <div className="card mb-2" > 
        <div className="card-header fw-bold" style={{ backgroundColor: '#e3f2fd' }}> 
          Your Reply
        </div>
        <div className="card-body">  
            <form onSubmit={ handleSubmit }>
              <textarea className="form-control mb-3" type="text" placeholder="Type your reply here!" rows="3" ref={ansRef}></textarea>
              
              <div className="row">
                <div className="col-md-4 align-items-center">
                  Ans found in Chapter: 
                  <select className="form-select" placeholder="Select the Chapter Number" ref={chapterRef}>
                  <option value="">Select the Chapter Number</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  </select>
                </div>
                <div className="col-md-3 align-items-center">
                  Page: 
                  <input type="number" className="form-control"  placeholder="Enter Page Number" ref={pageRef}/>
                </div>
                <div className="col-md-3 align-items-center">
                  Paragraph: 
                  <input type="number" className="form-control"  placeholder="Enter Paragraph Number" ref={paragraphRef}/>
                </div>   
                <div className="col-md-2 d-grid justify-content-md-end ">
                  <br />
                  <button type="submit" className="btn btn-outline-danger me-md-2">Reply</button>
                </div>    
              </div>

              {isLoading && (
                <div className="d-flex justify-content-center my-2">
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ms-2">Posting the reply...</span>
                </div>
              )}
        
              {showSuccessMessage && (
                <div className="alert alert-success my-2" role="alert">
                  Success, The reply has been posted!
                </div>
              )}

            </form>
        </div>
      </div>

      <div className="replies">
        {replies && replies.map((reply) => (
          <div className="replies" key={reply._id}>
            <ul className="list-group mb-2">
              <li className="list-group-item" >
                <h5 className="fw-bold">Ans: {reply.answer}</h5>
                <h6>The answer can be found in <b>chapter:{reply.chapter} page:{reply.page} paragraph:{reply.paragraph}</b></h6>
                <small className="text-body-secondary"><i className="bi bi-calendar"></i> {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</small>

                {likedReplies.length === 0 && !likedReplies.includes(reply._id) && reply.username !== username && (
                 <h2 className="btn badge border rounded-pill text-dark" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }} onClick={() => handleLike(reply._id, reply.username)}>{reply.like.length} <i className="bi bi-hand-thumbs-up"></i></h2>
                )}
                {reply.username === username && (
                  <h2 className="btn badge border rounded-pill text-dark disabled" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }}> {reply.like.length} <i className="bi bi-hand-thumbs-up"></i></h2>
                )}
                {likedReplies.length === 1 && likedReplies.includes(reply._id) && reply.username !== username && (
                  <h2 className="btn badge border rounded-pill bg-success" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }}> {reply.like.length} <i className="bi bi-hand-thumbs-up text-light"></i></h2>
                )}
                {likedReplies.length === 1 && !likedReplies.includes(reply._id) && reply.username !== username && (
                  <h2 className="btn badge border rounded-pill text-dark disabled" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }}> {reply.like.length} <i className="bi bi-hand-thumbs-up"></i></h2>
                )}

              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;