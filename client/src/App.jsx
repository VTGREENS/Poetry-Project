import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import IndexWorksPhysical from "./components/worksPhysical/IndexWorksPhysical";

function App() {
  // TODO Remove sampleToken after implementing AUTH
  let sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2VhYjQ3ZWUxMDRmNjBjMDMwZmVmZCIsImlhdCI6MTY3NDY1OTI1NSwiZXhwIjoxNjc0OTE4NDU1fQ.KteRMKZ0aUfc3iBBjHchvM91JIsZNne1TGcQKFrprOM"
  const [sessionToken, setSessionToken] = useState(sampleToken);

  const updateToken = (newToken) =>{
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(newToken);
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"))
    }
  }, []);



  return (
    <>
    
    <IndexWorksPhysical  token={sessionToken}/>


    
    
  
    </>
  );
}

export default App;
