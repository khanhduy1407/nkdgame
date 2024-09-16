import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import home from './components/home/home';
import feedback from './components/feedback/feedback';
import privacy from './components/privacy/privacy';
import comments from './components/comments/comments';
import Page_404 from './components/404/404';

function App() {

    return (
        <main>
            <Router>
                <Switch>
                    <Route exact path="/" component={home} />
                    <Route exact path="/feedback" component={feedback} />
                    <Route exact path="/privacy" component={privacy} />
                    <Route exact path="/comments" component={comments} />
                    <Route path="*" component={Page_404} />
                </Switch>
            </Router>
        </main>
    );
}

export default App;