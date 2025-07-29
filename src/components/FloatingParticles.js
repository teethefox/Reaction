import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import blueCan from '../assets/bluecan.png';
import orangeCan from '../assets/orangecan.png';
import pinkCan from '../assets/pinkcan.png';
import burstImg from '../assets/burst_scaled_optimized.png';

const FloatingParticles = () => {
  const sceneRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    world.gravity.y = -0.03;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
      },
    });

    const canTextures = [blueCan, orangeCan, pinkCan];

    const makeBody = (x, y, radius, texture, label = 'can') => {
      const angle = Math.random() * Math.PI * 2;
      const angularVelocity = (Math.random() - 0.5) * 0.05;

      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 0.9,
        friction: 0.001,
        angle,
        label,
        render: {
          sprite: {
            texture,
            xScale: radius / 120,
            yScale: radius / 120,
          },
        },
      });

      body.spinDirection = Math.random() < 0.5 ? -1 : 1;
      body.spinSpeed = 0.0005 + Math.random() * 0.001;
      Matter.Body.setAngularVelocity(body, angularVelocity);
      body.zIndex = radius; // used for layering (not native Matter.js)

      return body;
    };

    const boundaries = [
      Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true }),
      Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true }),
    ];

    Matter.World.add(world, boundaries);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    Matter.Events.on(engine, 'beforeUpdate', () => {
      particles.current.forEach((body, index) => {
        if (body.label === 'can') {
          Matter.Body.applyForce(body, body.position, { x: 0, y: -0.0005 });
          const wobbleForce = (Math.random() - 0.5) * 0.0004;
          Matter.Body.applyForce(body, body.position, { x: wobbleForce, y: 0 });

          const delta = (Math.random() - 0.5) * 0.00005;
          body.spinSpeed += delta;
          body.spinSpeed = Math.max(0.00005, Math.min(0.0003, body.spinSpeed));

          Matter.Body.setAngularVelocity(
            body,
            body.angularVelocity + body.spinDirection * body.spinSpeed
          );

          if (body.position.y + 60 < 0) {
            Matter.World.remove(world, body);
            particles.current.splice(index, 1);
          }
        }
      });
    });

    const spawnAutoCan = () => {
      const radius = Math.random() * 30 + 20;
      const texture = canTextures[Math.floor(Math.random() * canTextures.length)];

      // custom zones across screen width
      const spawnZones = [
        window.innerWidth * 0.2,
        window.innerWidth * 0.4,
        window.innerWidth * 0.6,
        window.innerWidth * 0.8,
      ];
      const x = spawnZones[Math.floor(Math.random() * spawnZones.length)] + (Math.random() * 40 - 20);
      const y = window.innerHeight + radius + 10;

      const body = makeBody(x, y, radius, texture);
      Matter.World.add(world, body);
      particles.current.push(body);
    };

    const AUTO_SPAWN_INTERVAL = 500;
    const spawnInterval = setInterval(spawnAutoCan, AUTO_SPAWN_INTERVAL);

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;

        const burst = (body) => {
          Matter.World.remove(world, body);
          const burstEffect = Matter.Bodies.circle(body.position.x, body.position.y, 50, {
            isSensor: true,
            render: {
              sprite: {
                texture: burstImg,
                xScale: 1,
                yScale: 1,
              },
            },
          });
          Matter.World.add(world, burstEffect);
          setTimeout(() => {
            Matter.World.remove(world, burstEffect);
          }, 500);
        };

        if (bodyA.label === 'bubble') burst(bodyA);
        if (bodyB.label === 'bubble') burst(bodyB);
      });
    });

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(spawnInterval);
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      if (render.canvas?.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};

export default FloatingParticles;