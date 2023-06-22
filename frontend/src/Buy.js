import React, { useState, useEffect } from 'react';

const Buy = () => {
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    fetch("http://localhost:8080/api/products", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  return (
    <div>
      {allImage.map((data) => (
        <div key={data._id}>
          <img width={100} height={100} src={data.image} alt="Product" />
          <p>Name: {data.name}</p>
          <p>Description: {data.description}</p>
          <p>Price: {data.price}</p>
          <div>
            {data.flag === 0 && <button>Buy</button>}
            {data.flag === 1 && <button>Rent</button>}
            {data.flag === 2 && (
              <div>
                <button>Buy</button>
                <button>Rent</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Buy;
