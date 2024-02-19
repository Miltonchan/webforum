import { useNavigate } from "react-router-dom";

//date fns
import { formatDistanceToNow } from 'date-fns';

const MyQuestionList = ({ username, questions }) => {

  const navigate = useNavigate();

  const handleClick = (question) => {
    navigate(`/question/${question._id}`);
  };

  return (
    <div>
      {questions && 
        questions.filter((question) => question.username === username)
        .map((question) => (
        <div 
        key={question._id}
        >
          <div className="card mb-2" onClick={() => handleClick(question)}>
            <div className="card-header fw-bold" style={{ backgroundColor: '#e3f2fd' }}>
            Chapter {question.chapter}
            </div>
            <div className="card-body" >
              <h3 className="fw-bold">Q: {question.question}</h3>
              <small className="text-body-secondary"><i className="bi bi-calendar"></i> {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</small>
              <h2 className="badge border rounded-pill text-dark" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem" }}><i className="bi bi-chat-left-text bold"></i> {question.repliesId.length}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyQuestionList;
