import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Post = (props) => {
  
  const [post, setPost] = useState({})

  useEffect(() => {
    const id = props.match.params.id
    fetch(`/api/v1/posts/${id}`).then(response => response.json()).then(data => setPost(data)).catch(error => console.log("error", error))
  }, [])

  const handleDelete = () => {
    const id = props.match.params.id
    fetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(() => props.history.push("/posts"));
  }

  return(
    <div className="container" style={{marginTop: 50}}>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              {console.log("post", post)}{post.title}
            </div>
            <div className="card-body">
              <p className="card-text">{post.content}</p>
            </div>
          </div>
        </div>
      </div>
      <Link to="/posts">Go Back</Link>
      {
        localStorage.getItem('user') == post["user_id"]  &&
        <button onClick={handleDelete} className="btn btn-danger" style={{marginTop: 10, marginRight: 10}}>Delete</button>
      }
      {
        localStorage.getItem('user') == post["user_id"]  && 
        <Link to={`/posts/${props.match.params.id}/edit`} className="btn btn-secondary">Edit</Link>
      }
      <AddComment post_id={props.match.params.id} />
      <Comments post_id={props.match.params.id} />

    </div>
  )
}

export default Post;