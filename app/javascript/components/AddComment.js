import React, { useState } from "react";
import Users from "./Users";

const AddComment = (props) => {
  const [comment, setComment ] = useState({ comment: "" })

  const handleChange = e => {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {    
    e.preventDefault();    
    const body = {
      comment: comment,
      user_id: localStorage.getItem('user'),
      post_id: props.post_id
    }

    fetch(`/api/v1/posts/${props.post_id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(response => response.json()).then(data => props.history.push(`/comments/${data.id}`)).catch(error => console.log("error", error));
  }

  return(
    <div className="container">      
      <h2 className="text-center">Add Comment</h2>
      <Users/>
      {localStorage.getItem('user') &&  <form onSubmit={handleSubmit}>        
        <div className="form-group">          
          <input type="text" className="form-control" placeholder="add comment here.." name="comment" onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" title="Submit" />
        </div>
      </form>
     }
    </div>
  )
}

export default AddComment;