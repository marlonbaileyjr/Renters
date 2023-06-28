import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import house1 from '../assets/images/house1.jpg';
import house2 from '../assets/images/house2.jpg';
import house3 from '../assets/images/house3.jpg';
import '../style/homescreen.css';

const HomeScreen = () => {
  const handleScrollToCarousel = () => {
    const carouselElement = document.getElementById('carousel');
    carouselElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div id="welcome" className='welcomeDiv'>
      <h1>Company Name</h1>
      <button className="button" onClick={handleScrollToCarousel}>
        View Properties
      </button>
      </div>
      <div id="carousel" className="carousel-container">
        <Carousel>
          <div className="carousel-slide">
            <img src={house1} alt="Prop 1" />
            <p className="carousel-legend">Image 1</p>
          </div>
          <div className="carousel-slide">
            <img src={house2} alt="Prop 2" />
            <p className="carousel-legend">Image 2</p>
          </div>
          <div className="carousel-slide">
            <img src={house3} alt="Prop 3" />
            <p className="carousel-legend">Image 3</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HomeScreen;
