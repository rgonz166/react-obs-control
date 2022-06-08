import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const TwitchAuth = ({token, setToken}) => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { hash } = useLocation();
    const location = useLocation();

    useEffect(() => {
        getParams();
    })

    useEffect(() => {
        console.log('token', token)
        if (error) {
            localStorage.setItem('twitchToken', JSON.stringify(token));
            navigate('/settings')
        } else if (!error && token && token !== undefined) {
            localStorage.setItem('twitchToken', JSON.stringify(token));
            navigate('/settings')
        }
    }, [token, error, navigate])
    
    const getParams = () => {
        const isError = new URLSearchParams(location.search).get('error')
        if (isError === 'access_denied') {
            setError(true)
            setToken('')
        } else {
            setError(false)
            const currentToken = hash.split('&')[0].split('=')[1];
            setToken(currentToken)
        }
    }

  return (
    <div>
      <h3>ID: {token}</h3>
      <button onClick={() => getParams()}>Click</button>
    </div>
  );
}

export default TwitchAuth;