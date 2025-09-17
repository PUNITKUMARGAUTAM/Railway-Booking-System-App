import React from "react";
import { Carousel } from "react-bootstrap";
import './HeroCarousel.css';

export default function HeroCarousel() {
  const slides = ["/vandebharat.jpg", "/train5.jpg","/train3.jpg"];
  return (
    <div className="hero-wrap">
      <Carousel>
        {slides.map((s, i) => (
          <Carousel.Item key={i} interval={3500}>
            <img className="d-block w-100 hero-img" src={s} alt={`slide-${i}`} />
            <Carousel.Caption>
              <h3>Travel with ease</h3>
              <p>Secure, comfortable & affordable train journeys</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
