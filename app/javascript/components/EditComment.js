import React, { useState, useEffect } from "react";

const EditComment = (props) => {

  const [comment, setComment] = useState({})

  useEffect(() => {
    const post_id = props.match.params.post_id
    const id = props.match.params.id
    fetch(`/api/v1/posts/${post_id}/comments/${id}`).then(response => response.json()).then(data => setComment(data)).catch(error => console.log("error", error))
  }, [])

  const handleChange = e => {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {    
    e.preventDefault();
    const body = {
      comment: comment
    }

    fetch(`/api/v1/posts/${props.match.params.post_id}/comments/${props.match.params.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(response => response.json()).then(data => props.history.push(`/posts/${props.match.params.post_id}`)).catch(error => console.log("error", error));
  }


  return(
    <div className="container">
      <h2 className="text-center">Update Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="comment">Comment</label>
          <input type="text" className="form-control" name="comment" value={comment.comment} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" title="Update" />
        </div>
      </form>
    </div>
  )
}

export default EditComment;