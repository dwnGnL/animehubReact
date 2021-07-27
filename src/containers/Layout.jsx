import React, { useState, useEffect } from "react";
import Slider from "../components/slider/Slider";
import Header from "../components/header/Header";

function Layout(props) {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        fetch('https://swapi.dev/api/people/1')
        .then(response => response.json())
        .then(request => {
          setImages(request.films);
        });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            {images.length && <Slider allImages={images} />}
        </div>
    );
}

export default Layout;
