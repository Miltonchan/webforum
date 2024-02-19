import { useNavigate } from "react-router-dom";

//date fns
import { formatDistanceToNow } from 'date-fns';

// List all the questions in the home page
const AllQuestionList = ({ questions, selectedChapter }) => {

  const navigate = useNavigate();

  // Filter the questions
  const filteredQuestions = selectedChapter
    ? questions.filter((question) => question.chapter === selectedChapter)
    : questions;

  // Handle the click
  const handleClick = (question) => {
    navigate(`/question/${question._id}`);
  };
  
  return(
    <div className='question-list'>
      <div className="list-group">
        <h4 className="list-group-item rounded shadow-sm" style={{ backgroundColor: '#e3f2fd' }}><i className="bi bi-chat-dots-fill"></i> Question List</h4>
        {filteredQuestions && filteredQuestions.map((question) => (
          <div className="card mb-2" key={question._id} onClick={() => handleClick(question)}>
            <div className="card-header fw-bold" style={{ backgroundColor: '#e3f2fd' }}>
            Chapter {question.chapter}
            </div>
            <div className="card-body" >
              <h3 className="fw-bold">Q: {question.question}</h3>
              <small className="text-body-secondary"><i className="bi bi-calendar"></i> {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</small>
              <h2 className="badge border rounded-pill text-dark" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }}> <i className="bi bi-chat-left-text bold"></i> {question.repliesId.length}</h2>
          </div>
          </div>
        ))} 
      </div>
    </div>
  );
}

export default AllQuestionList;