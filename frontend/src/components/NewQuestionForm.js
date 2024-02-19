import { useState } from "react";

// import context
import { useQuestionsContext } from "../hooks/useQuestionsContext";

const NewQuestionForm = ({ username }) => { 

  const { dispatch } = useQuestionsContext();
  const [question, setQuestion] = useState('');
  const [chapter, setChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(username,"new question form submitted!");
    const newQuestion = { username, question, chapter };
    const usernameForScore = { username };

    // Perform validation  with the question data
    if (question.trim() === '' && chapter === null) {
      alert('Please fill in all fields');
      return;
    } else if (question.trim() === ''){
      alert('Please fill in the question');
      return;  
    } else if (chapter === null){
      alert('Please select the related chapter');
      return;  
    }
    
    try {
      // CREATE a new question
      fetch('http://localhost:4000/question/newquestion',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newQuestion)
      })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "CREATE_QUESTION", payload: data });
        console.log(data);
        setIsLoading(true);
        setTimeout(() =>{
          setIsLoading(false);
          setShowSuccessMessage(true);
        },"2000")
        setTimeout(() => {
          window.location.reload();
        }, "4000");
      })
      
      // Update the score and numOfQuestionsAsked
      fetch('http://localhost:4000/useraccount/updateScoreAndQuestionsAsked',{
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
  }

  return (
  <div className="container" style={{ marginBottom: '10px'}}>
    <div className="row justify-content-center align-items-center" >
      <form className="newQuestionForm rounded border border-left-5 shadow-sm" style={{ backgroundColor: '#e3f2fd' }} onSubmit={handleSubmit}>
        <h3><i className="bi bi-pencil-square"></i> Write a New Question:</h3>
        <div className="form-group mb-1">
            <textarea
              className="form-control"
              name="textarea"
              rows="3"
              placeholder="Type the question here!"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            ></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 align-items-center">
            <span>Related Chapter: &nbsp;&nbsp;</span>
            <select className="form-select mb-2" onChange={(e) => setChapter(Number(e.target.value))}>
              <option value="">Please Select</option>
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
          
          <div className="col-md-6 d-flex justify-content-end align-items-center">
          <button type="submit" className="btn btn-danger">Ask Question <i className="bi bi-megaphone-fill text-light"></i></button>
          </div>
        </div>

        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2">Posting the question...</span>
          </div>
        )}
        
        {showSuccessMessage && (
          <div className="alert alert-success" role="alert">
            Success, The question has been posted!
          </div>
        )}
      </form>    
    </div>
  </div>

    
  )
}

export default NewQuestionForm;