import React, { useState, useEffect } from 'react';
import CreateDigitalWorks from "./CreateDigitalWorks";

const IndexDigitalWorks = (props) => {
    const [digitalWorks, setDigitalWorks] = useState([]);
    const fetchDigitalWorks = async()=>{
        const url = `http://localhost:4000/digital/`
        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        }
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setDigitalWorks(data.digitalWorks);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchDigitalWorks();
      }, []);
    
      useEffect(() => {
        console.log("digitalWorks state", digitalWorks)
      }, [digitalWorks]);


    return (  
    <>
    <CreateDigitalWorks  token={props.token}
                fetchDigitalWorks={fetchDigitalWorks} />
    </>
    );
};
 
export default IndexDigitalWorks;