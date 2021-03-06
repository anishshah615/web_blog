import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Post from "./Post";
import Posts from "./Posts";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import EditComment from "./EditComment";
import Home from "./Home";
import PostUser from "./Postuser";

const App = () => {
  return(
    <Router>
      <Switch>
      <Route exact path="/" component={Posts} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/users/:user_id/posts" component={PostUser} />
      <Route exact path="/posts/new" component={AddPost} />
      <Route exact path="/posts/:id" component={Post} />
      <Route exact path="/posts/:id/edit" component={EditPost} />
      <Route exact path="/posts/:post_id/comments/:id/edit" component={EditComment} />
      </Switch>
    </Router>
  )
}

export default App;
