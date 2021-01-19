import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://thumbs.dreamstime.com/b/liver-detox-diet-food-concept-fruits-vegetables-nuts-olive-oil-garlic-cleansing-body-healthy-eating-top-view-flat-lay-liver-166983115.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Lovely Leftovers</h3>
          <p>Generic Food image, also we do stuff with food you don't want.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default About;
