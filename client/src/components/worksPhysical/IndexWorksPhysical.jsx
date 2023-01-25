import React, { useState, useEffect } from 'react';
import CardDisplayWorksPhysical from './CardDisplayWorksPhysical';
import CreateWorksPhysical from './CreateWorksPhysical';

import EditWorksPhysical from './EditWorksPhysical';

const IndexWorksPhysical = (props) => {
  const [worksPhysical, setWorksPhysical] = useState([]);
  const fetchWorksPhysical = async () => {
    const url = `https//localhost:4000/physical/`;
    let myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setWorksPhysical(data.worksPhysical);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchWorksPhysical();
  }, []);

  useEffect(() => {
    console.log("worksPhysical state", worksPhysical)
  }, [worksPhysical]);

  return (
    <>
    
      <h1>Hello From IndexWorksPhysical</h1>
      <CreateWorksPhysical />
      <EditWorksPhysical />
      <CardDisplayWorksPhysical />
    </>
  );
};

export default IndexWorksPhysical;
