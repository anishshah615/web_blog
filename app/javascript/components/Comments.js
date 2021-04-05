import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Comments = (props) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/api/v1/posts/${props.post_id}/comments`).then(response => response.json()).then(data => setComments(data));
  }, [])

  const handleDelete = (e,comment_id) => {
    e.preventDefault();
    fetch(`/api/v1/posts/${props.post_id}/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(() => props.history.push("/posts"));
  }
  return(
    <div className="container">
      <h2 className="left">List Comments</h2>
      <div className="row">
        {comments.map(comment => (
          <div className="col-md-4" key={comment.id}>
            <div className="card">
              <div className="card-header">
                {comment.comment}
                {                  
                 localStorage.getItem('user') == comment["user_id"]  &&
                 <button onClick={(e) => handleDelete(e,comment.id)} className="btn btn-danger" style={{marginTop: 10, marginRight: 10}}>Delete</button>
                }
                {
                  localStorage.getItem('user') == comment["user_id"]  && 
                  <Link to={`/posts/${props.post_id}/comments/${comment.id}/edit`} className="btn btn-secondary">Edit</Link>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments;