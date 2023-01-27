import React, { useState, useEffect } from 'react';
import CardDisplayWorksPhysical from './CardDisplayWorksPhysical';
import CreateWorksPhysical from './CreateWorksPhysical';


const IndexWorksPhysical = (props) => {
  const [worksPhysical, setWorksPhysical] = useState([]);
  const fetchWorksPhysical = async () => {
    const url = `http://localhost:4000/physical/`;
    let myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const works = await data.worksPhysical
      setWorksPhysical(await works);
      console.log(worksPhysical)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchWorksPhysical();
  }, []);

  useEffect(() => {
    console.log('worksPhysical state', worksPhysical);
  }, [worksPhysical]);

  return (
    <>
      <h1>Hello From IndexWorksPhysical</h1>
      <CreateWorksPhysical worksPhysical={worksPhysical} token={props.token} />

      {worksPhysical?.map((workPhysical) => (
        <CardDisplayWorksPhysical
          key={workPhysical._id}
          image={workPhysical.image}
          imageAltText={workPhysical.imageAltText}
          title={workPhysical.title}
          attribution={workPhysical.attribution}
          description={workPhysical.description}
          msrp={workPhysical.msrp}
          amazonLink={workPhysical.amazonLink}
          unsolicitedPressLink={workPhysical.unsolicitedPressLink}
          barnesAndNobleLink={workPhysical.barnesAndNobleLink}
          signedPrice={workPhysical.signedPrice}
          signedLink={workPhysical.signedLink}
          _id={workPhysical._id}
          token={props.token}
        />
      ))}
    </>
  );
};

export default IndexWorksPhysical;
