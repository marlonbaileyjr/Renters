import React from 'react';
import '../style/aboutus.css';

const AboutUs = () => {
  return (
    <div className="container">
      <h1>About Us</h1>
      <div className="content">
        <img
          className="profile-image"
          src="/path/to/profile-image.jpg"
          alt="Profile"
        />
        <div className="description">
          <h2>Our Story</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            dapibus tincidunt magna, in tempus lacus eleifend a. Duis non
            lobortis dolor. Vivamus venenatis, enim id luctus tempus, ipsum
            ligula feugiat neque, vel commodo tortor est vitae enim. Nam
            fringilla sapien ut enim laoreet, id aliquam dui rhoncus.
          </p>
          <p>
            Proin accumsan augue id sapien fermentum, eget pretium neque
            fringilla. Pellentesque posuere, justo sed maximus faucibus, enim
            massa aliquet purus, in sagittis orci leo at nulla. Mauris at dui
            vel mi semper vestibulum ut at felis. Fusce id semper nisl, non
            tincidunt orci. Integer non varius lacus. Curabitur pellentesque
            semper enim vitae sagittis. Sed auctor lacus eu massa varius, non
            lobortis nibh consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
