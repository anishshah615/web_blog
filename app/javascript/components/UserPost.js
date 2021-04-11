import React, { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const UserPost = ({handleClick}) => {
  
  const [users, setUsers, posts, setPosts] = useState([])

  var user_list = []
  for ( var k = 0; k < users.length; k++) {
    let hash = {}
    hash["value"] = users[k].id
    hash["label"] = users[k].name 
    user_list.push(hash)
  }

  useEffect(() => {
    fetch('/api/v1/users').then(response => response.json()).then(data => setUsers(data));
  }, [])
  
  return(
    <div className="row">
      <div className="col-md-2">
       View Posts of
      </div>
      <div className="col-md-4">
        <Dropdown options={user_list} onChange={(e) => handleClick(e)}  placeholder="Select user" />
      </div>
    </div>
  )
}

export default UserPost;

