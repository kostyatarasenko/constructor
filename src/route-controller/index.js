import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Courses from '@routes/courses';
import Course from '@routes/course';
import Lesson from '@routes/lesson';

const RouteController = () => {
  const { pathname } = window.location;

  return (
    <Router>
      <Switch>
        <Route
          path="/courses"
          component={Courses}
        />
        <Route
          path="/course/:courseId"
          component={Course}
        />
        <Route
          path="/lesson/:lessonId"
          component={Lesson}
        />
      </Switch>
      {
        pathname === '/' ? (
          <Redirect to="/courses"/>
        ) : null
      }
    </Router>
  );
};

export default RouteController;
