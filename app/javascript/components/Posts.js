import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Users from "./UserPost"
import Comments from "./Comments";

const Posts = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/v1/posts').then(response => response.json()).then(data => setPosts(data));
  }, [])

  return(
    <div className="container">
      <h2 className="text-center">List Posts</h2>
      <Users history={props.history} />
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4" key={post.id}>
            <div className="card">
              <div className="card-header">
                {post.title}
              </div>
              <div className="card-body">
                <p className="card-text">{post.content}</p>
                <Link to={`/posts/${post.id}`} className="btn btn-secondary">Show</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Posts;