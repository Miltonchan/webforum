import { useNavigate } from "react-router-dom";

//date fns
import { formatDistanceToNow } from 'date-fns';

const MyReplyList = ({ replies }) => {

  const navigate = useNavigate();

  const handleClick = (reply) => {
    navigate(`/question/${reply.questionid}`);
  };

  return(
    <div>
      {replies && 
      replies.map((reply) => (
        <div key={reply._id} onClick={() => handleClick(reply)}> 
          <ul className="list-group mb-2">
            <li className="list-group-item" >
              <h5 className="fw-bold">Ans: {reply.answer}</h5>
              <h6>The answer can be found in <b>chapter:{reply.chapter} page:{reply.page} paragraph:{reply.paragraph}</b></h6>
              <small className="text-body-secondary"><i className="bi bi-calendar"></i> {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</small>
              <h2 className="badge border rounded-pill text-dark" style={{ position: "absolute", top: "50px", right: "20px", fontSize: "1rem", padding: "0.5rem"}}>{reply.like.length} <i className="bi bi-hand-thumbs-up"></i></h2>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyReplyList;