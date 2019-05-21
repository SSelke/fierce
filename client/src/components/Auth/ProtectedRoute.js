import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest}) => {
   return (
       <Route {...rest} 
           render={(props) => (
               !rest.auth.isAuthenticated() ? (
                   <Redirect to="/" />
               ) : (
                       <Component auth={rest.auth} {...props} />
                   )
           )}
        />
   ); 
}