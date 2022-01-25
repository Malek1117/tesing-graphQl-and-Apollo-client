import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Home (){
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(JSON.parse(localStorage.getItem('currentUser'))===null){
            navigate('/');
        }
    },[]);

    const handleSignOut = ()=>{
        localStorage.removeItem('currentUser');
        navigate('/');
    }

    return (
        <>
            <h1>Welcome to web page</h1>
            <button onClick={handleSignOut} >Sign Out</button>
        </>
    )
}