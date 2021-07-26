import React from "react";
import Header from "../Header/Header";
import Slider from '../../components/Slider/Slider'

function Layout(props) {
    const [images, setImages] = React.useState([]);
    
    React.useEffect(() => {
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
