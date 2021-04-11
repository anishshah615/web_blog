import React from 'react';
const CommentReaction = (props) => {  
  var arr =[]  
  var groupedReactions = groupBy(props.reaction, 'emoji');
  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  } 
  
  const clickReaction = (e, reaction) => {    
    e.preventDefault();
    if(reaction.find(d => d.user_id == localStorage.getItem('user')))  {
      const body = {
        user_id: localStorage.getItem('user'),
        label: reaction[0].label,
        comment_id: reaction[0].comment_id
      }      
      fetch(`/api/v1/comments/${reaction[0].comment_id}/reactions/${reaction[0].id}`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
        }
      }).then(() => window.location.reload());

      
    }
    else{
      addReaction(e,reaction);      
    }
  }

  const addReaction = (e,reaction)  => {    
    e.preventDefault();    
    const body = {
      comment_id: reaction[0].comment_id,
      user_id: localStorage.getItem('user'),
      emoji:reaction[0].emoji,
      label: reaction[0].label
    }

    fetch(`/api/v1/comments/${reaction[0].comment_id}/reactions`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(response => response.json()).then(data => window.location.reload()).catch(error => console.log("error", error));
    
  }

  return(
    <div className="container">      
        {Object.keys(groupedReactions).map(emoji => (
          <div key={emoji["id"]}>
            <span style={{float: 'left', cursor:'pointer'}} >
            <span onClick={(e) => clickReaction(e,groupedReactions[emoji])}>{emoji }</span>
            
            <span>
            {groupedReactions[emoji].length}
            </span>
           
            </span>
          </div>
        ))}

    </div>
  )
}
export default CommentReaction;