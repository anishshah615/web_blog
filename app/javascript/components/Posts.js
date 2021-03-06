import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Users from "./UserPost"

const Posts = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/v1/posts').then(response => response.json()).then(data => setPosts(data));
  }, [])

  const handleClick = e => {
    props.history.push(`/users/${e["value"]}/posts`);
    get_posts(e["value"])
  };
  const get_posts = user_id => {
    fetch(`/api/v1/users/${user_id}/posts`).then(response => response.json()).then(data => setPosts(data))
    .catch(error => console.log("error", error))
  }

  return(
    <div className="container">
         <h2 className="text-center">List Posts</h2>
      <Users history={props.history} handleClick={handleClick} />
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
      <Link to={`/posts/new`} className="">Create New </Link>
    </div>
  )
}

export default Posts;