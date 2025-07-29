import React, { useRef, useEffect } from 'react';
import './InstagramStaticFeed.css';

const posts = [
  {
    image: "https://d2b57pa8jvjkcd.cloudfront.net/8bpjjLAnc2DXTrb5Z/uwJwaZQNCjQcCgzG6AQNQ3gt6gRe_yWrw_40nQQ7JQuxqKFZtjzXUiiYG2UnfXtFtbfP6PJhTbydCXCtHmNjqamKOk0nN1bdo7UMJQG95zGC2x_3QbGTcDMM.mp4",
    caption: "Last day to get your performance pink lemonade 🌺🍋!!  Get yours while supplies last...",
    date: "Jul 13",
  },
  {
    image: "https://d2b57pa8jvjkcd.cloudfront.net/8bpjjLAnc2DXTrb5Z/KgQxRcgWRZkJdkno3AQMcRHQVnKT3owRyOsYqw5vk8ad6B7keHSz-zTwLVi1DYSpRlTCmWorfQZH64ADjLKPpp6rzV8TSkm_m9qt-5m_jicjINhWFGgZHNKk.mp4",
    caption: "#drinkreaction 100 cases live at 2pm pst!",
    date: "Jul 13",
  },
  {
    image: "https://d2b57pa8jvjkcd.cloudfront.net/8bpjjLAnc2DXTrb5Z/TkFm3oqXnXrvHnqJkAQOJJ4nxHTMOSIC5O5bSu6vWD8ZXdz2tpYVVt-y5rw4TAOT05ODW8AeeDqfS7mY81q3vVMdkz7g4_E9eEamBx38D4-hjMsnzb4XCG4Y.mp4",
    caption: "🚨 Dropping this Sunday! 🚨 💥 100 cases of Performance Pink Lemonade go live July 13th at 2PM PST! ⚡️...",
    date: "Jul 11",
  },
  {
    image: "https://d2b57pa8jvjkcd.cloudfront.net/8bpjjLAnc2DXTrb5Z/cdJgSBS7AL8ToN87wAQO-ToEqdAwq4bpm7DHLJ6jQ64zfzrnknRYrRMJJlQi5YZszSB-oI4TvglN-4MF7d-OA6WDKqe3YEj9UFN2mEvveGT8wdv2kLVXN864.mp4",
    caption: "💯cases of “performance pink lemonade” 🏃‍♂️🌺🍋being released Sunday July 13th, 2pm pst...",
    date: "Jul 7",
  },
  {
    image: "https://d2b57pa8jvjkcd.cloudfront.net/8bpjjLAnc2DXTrb5Z/CqsfmEv54cNDPPJiFAQPH_97Xz1BvB_JyD_9fEKOr_4291H3JJBjOBuLdtE5O02alIEYUmVdczHv0ao3jl0-0nn9TvbTmFLSXzEUAYeG8yL_07wJQm2rO9Sc.mp4",
    caption: "⚡️🔋🧸Sour Power Gummy Link in bio #reactionenergydrink #reactionenergy",
    date: "Jun 28",
  },
  {
    image: "https://d2b57pa8jvjkcd.cloudfront.net/8bpjjLAnc2DXTrb5Z/KHTFMd87TpZfdY3HeAQOpZF_E-zcm6kowAEXFJkRDXTPPeg_es1vAhyboZUSGJupmPStSHdtbiLImpsrJ5lkSQ92Fc-eI06Wx9rmj8XOwCjs4DNirUoNn_gY.mp4",
    caption: "😳 Real reactions for 2 of our favorite energy drinks! 🔋⚡️🧸Sour Power Gummy 🔌 🌺🍋 Power Pink...",
    date: "Jun 25",
  }
];
const doubledPosts = [...posts, ...posts];

const InstagramFeed = () => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = scrollRef.current;

    const onMouseDown = (e) => {
      isDragging.current = true;
      slider.classList.add('dragging');
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      slider.classList.remove('dragging');
    };

    const onMouseUp = () => {
      isDragging.current = false;
      slider.classList.remove('dragging');
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      slider.scrollLeft = scrollLeft.current - walk;
    };

    const onTouchStart = (e) => {
      startX.current = e.touches[0].pageX;
      scrollLeft.current = slider.scrollLeft;
    };

    const onTouchMove = (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX.current) * -1;
      slider.scrollLeft = scrollLeft.current + walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);
    slider.addEventListener('touchstart', onTouchStart);
    slider.addEventListener('touchmove', onTouchMove);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      slider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <section className="instagram-feed">
      <h1 className="instagram-title">
        <strong className='hashtag'>#DRINKREACTION</strong>
      </h1>
      <div className="instagram-scroll" ref={scrollRef}>
        {doubledPosts.map((post, index) => (
          <div className="instagram-post" key={index}>
            {post.image.endsWith('.mp4') ? (
              <video src={post.image} autoPlay loop muted playsInline />
            ) : (
              <img src={post.image} alt={post.caption} />
            )}
            <div className="caption-overlay">
              <p>{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;