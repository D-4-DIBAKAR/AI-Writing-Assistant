import React from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { Navigate } from 'react-router-dom'
// This component is used to protect routes that require authentication
const PrivateRoute = (
     { children } // This is the component that will be rendered if the user is authenticated
) => {
     const { authenticated, ready } = usePrivy()
     // Check if the user is authenticated
     if (!ready) return <div>Loading...</div>
     // If the user is not authenticated, redirect them to the login page
     // If the user is authenticated, render the children components
     return authenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute