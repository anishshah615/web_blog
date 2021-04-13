import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reaction from './Reaction'
import { DEFAULT_EMOJI_OPTIONS} from "../lib/emojiConfig";
import CommentReactions from "./CommentReactions"

const Comments = (props) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/api/v1/posts/${props.post_id}/comments`).then(response => response.json()).then(data => setComments(data));
  }, [])


  const handleDelete = (e,comment_id) => {
    e.preventDefault();
    const body = {
      user_id: localStorage.getItem('user')
    }

    fetch(`/api/v1/comments/${comment_id}`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(() => window.location.reload());
  }

  const handleClick = (e, emoji, lable, comment)  => {
    e.preventDefault();
    const body = {
      comment_id: comment.id,
      user_id: localStorage.getItem('user'),
      emoji: emoji,
      label: lable
    }

    fetch(`/api/v1/comments/${comment.id}/reactions`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(response => response.json()).then(window.location.reload()).catch(error => console.log("error", error));
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

                { <CommentReactions reaction={comment.reactions}/> }
              </div>
              {comment.user && <span style={{float: "Left"}}>
       By <small>{comment.user.name}</small>
      </span>}
              <div>
              {DEFAULT_EMOJI_OPTIONS.map(emoji=><Reaction handleClick= {handleClick} comment = {comment} emoji={emoji.emoji}
              label={emoji.label} className=""/>)}
                <span style={{float: "right"}}>
                {
                 localStorage.getItem('user') == comment["user_id"]  &&
                 <span onClick={(e) => handleDelete(e,comment.id)}
                      className="danger pointer" role='button' style={{marginTop: 10, marginRight: 10}}>Delete</span>
                }
                {
                  localStorage.getItem('user') == comment["user_id"]  &&
                  <Link to={`/posts/${props.post_id}/comments/${comment.id}/edit`} className="">Edit</Link>
                }</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments;
