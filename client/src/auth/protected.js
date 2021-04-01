import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRouter = ({component, ...rest}) => {
    var RenderComponents = component;
    var hasToken = JSON.parse(localStorage.getItem('auth'));
    console.log(RenderComponents);
    return(
        <Route
            {...rest}
            render = {
                props => {
                    return hasToken != null ? (
                        <RenderComponents {...props} />
                    ) : (
                        <Redirect 
                            to = {{
                                pathname: '/login'
                            }}
                        />
                    )
                }
            }
        />
    )
}

export default ProtectedRouter;