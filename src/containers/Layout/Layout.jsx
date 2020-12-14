import React from "react";
import Header from "../Header/Header";
import Slider from '../../components/Slider/Slider'

function Layout(props) {
    return (
        <div className="wrapper">
            <Header />
            <Slider />
        </div>
    );
}

export default Layout;
