
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexDigitalWorks from './components/digital-works/IndexDigitalWorks';
import EditDigitalWorks from './components/digital-works/EditDigitalWorks';
import IndexWorksPhysical from './components/worksPhysical/IndexWorksPhysical';
import EditWorksPhysical from './components/worksPhysical/EditWorksPhysical';
import IndexPostPoem from './components/postPoem/IndexPostPoem';
import EditPostPoem from './components/postPoem/EditPostPoem';


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
    <Route path="/digital" element={<IndexDigitalWorks token={sessionToken}/>}/>
    <Route path="/digital/update/:id" element={<EditDigitalWorks token={sessionToken}/>}/>
    <Route path="/physical" element={<IndexWorksPhysical token={sessionToken}/> }/>
    <Route path="/physical/update/:id" element={<EditWorksPhysical token={sessionToken}/>}/>
    <Route path="/post" element={<IndexPostPoem token={sessionToken}/>}/>
    <Route path="/post/update/:id" element={<EditPostPoem token={sessionToken}/>}/>
   </Routes>
    </>
  );
}

export default App;
