import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact}) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/tweets" />
        )
        )} 
    />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
    }
    />
);

const mapStateToProps = state => (
    {loggedIn: state.session.isAuthenticated}
);

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);