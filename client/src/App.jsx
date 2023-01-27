import IndexWorksPhysical from './components/worksPhysical/IndexWorksPhysical';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import EditWorksPhysical from './components/worksPhysical/EditWorksPhysical';


 function App() {
  // TODO Remove sampleToken after implementing AUTH aasdf
  let sampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2VhYjQ3ZWUxMDRmNjBjMDMwZmVmZCIsImlhdCI6MTY3NDgzNDM0OCwiZXhwIjoxNjc1MDkzNTQ4fQ.eooB-ITJU71ikuA2617X8ck6DYslReTueXZc6fuBz0U';
  const [sessionToken, setSessionToken] = useState(sampleToken);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);


  return (
    <>
    <Routes>
    <Route path="/physical" element={<IndexWorksPhysical token={sessionToken}/> }/>
    <Route path="/physical/update/:id" element={<EditWorksPhysical token={sessionToken}/>}/>
    </Routes>
    
  
    </>
  );
}

export default App;
