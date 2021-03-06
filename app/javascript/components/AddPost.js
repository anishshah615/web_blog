import React, { useState } from "react";
import Users from "./Users";

const AddPost = (props) => {
  const [post, setPost] = useState({ title: "", content: "" })

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();    
    const body = {
      post: post,
      user_id: localStorage.getItem('user') 
    }

    fetch("/api/v1/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(response => response.json()).then(data => props.history.push(`/posts/${data.id}`)).catch(error => console.log("error", error));
  }

  return(
    <div className="container">
      <Users/>
      <h2 className="text-center">Add Post Page</h2>
      {localStorage.getItem('user') &&  <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input type="text" className="form-control" name="title" onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">content</label>
          <input type="text_area" className="form-control" name="content" onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" title="Submit" />
        </div>
      </form>
     }
    </div>
  )
}

export default AddPost;