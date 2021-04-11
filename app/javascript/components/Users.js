import React, { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Users = () => {  
  const [users, setUsers] = useState([])
  
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

  const userChange = (e) => {
    
    localStorage.setItem('user', e["value"])
    setTimeout(function() {
      document.location.reload()
}, 5000);
  
}

  return(
    <div className="row">
      <div className="col-md-2">
       Your Are
      </div>
      {console.log(user_list, "<==")}
      <div className="col-md-4">
        <Dropdown options={user_list} onChange={e => userChange(e)} value={ user_list[localStorage.getItem('user')-1]} 
          placeholder="Select user" />
      </div>
    </div>
  )
}

export default Users;