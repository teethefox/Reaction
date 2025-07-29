import React from 'react';
import '../Hero.css';
import heroVideo from '../assets/hero.mp4';
// import Header from './Header';
import Logo from '../assets/logo4.png';

export default function Hero() {
  return (
    <>
      {/* <Header />  */}
      <section className="hero">

      <video autoPlay loop muted playsInline className="hero-video">

        <source src={heroVideo} type="video/mp4" />
        {/* Your browser does not support the video tag. */}
      </video>

      <div className="hero-content">
        <h1 className='mainText'>Reaction Energy</h1>
        <p>Drink. Win. Repeat.</p>
      </div>
    </section>
    </>
  );
}
