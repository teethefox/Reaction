import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import blueCan from '../assets/bluecan.png';
import pinkCan from '../assets/pinkcan.png';
import orangeCan from '../assets/orangecan.png';

const fizzColors = ['#ffffff', '#addfff']; // white and light blue

const FloatingFizz = () => {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const engine = useRef(Matter.Engine.create());
  const cans = useRef([]);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Body, Events, Mouse, MouseConstraint } = Matter;

    const engineInstance = engine.current;
    const world = engineInstance.world;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engineInstance,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engineInstance);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engineInstance, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    const leftWall = Bodies.rectangle(-10, height / 2, 20, height * 2, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height * 2, { isStatic: true, render: { visible: false } });
    World.add(world, [leftWall, rightWall]);

    class FizzParticle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 10;
        this.y = y + (Math.random() - 0.5) * 10;
        this.depth = Math.random() < 0.4 ? 0 : 1;
        this.size = this.depth === 1 ? 3 + Math.random() * 4 : 1.5 + Math.random() * 2.5;
        this.speed = this.depth === 1 ? 0.5 : 0.3;
        this.alpha = this.depth === 1 ? 0.9 : 0.5;
        this.color = fizzColors[Math.floor(Math.random() * fizzColors.length)];
        this.popped = false;
      }
      update() {
        this.y -= this.speed;
        this.alpha -= 0.012;
      }
      draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const canTextures = [blueCan, pinkCan, orangeCan];

    const spawnCan = () => {
      const size = 40 + Math.random() * 20;
      const x = Math.random() * width;
      const texture = canTextures[Math.floor(Math.random() * canTextures.length)];

      const can = Bodies.rectangle(x, height + size, size, size * 2, {
        render: {
          sprite: {
            texture,
            xScale: size / 100,
            yScale: (size * 2) / 200,
          },
        },
        frictionAir: 0.02,
        restitution: 0.9,
      });

      Body.setVelocity(can, {
        x: (Math.random() - 0.5) * 1.2,
        y: -2 - Math.random() * 1.5,
      });

      cans.current.push(can);
      World.add(world, can);
    };

    let spawnRate = 700;
    let lastScrollY = window.scrollY;

    const adjustSpawnRate = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      spawnRate = Math.max(200, 1000 - delta * 20);
    };

    let spawnIntervalId;
    const startSpawnLoop = () => {
      spawnIntervalId = setInterval(() => {
        spawnCan();
        clearInterval(spawnIntervalId);
        adjustSpawnRate();
        startSpawnLoop();
      }, spawnRate);
    };

    startSpawnLoop();
    window.addEventListener('scroll', adjustSpawnRate);

    const bubbles = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cans.current.forEach((can) => {
        if (Math.random() < 0.5) {
          bubbles.push(new FizzParticle(can.position.x, can.position.y + 20));
        }
      });

      for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update();

        for (let j = 0; j < cans.current.length; j++) {
          const can = cans.current[j];
          const dx = can.position.x - bubbles[i].x;
          const dy = can.position.y - bubbles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20) {
            bubbles[i].popped = true;
            bubbles[i].alpha = 0;
            break;
          }
        }

        bubbles[i].draw(ctx);
        if (bubbles[i].alpha <= 0) {
          bubbles.splice(i, 1);
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    function handleResize() {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(spawnIntervalId);
      Matter.Render.stop(render);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engineInstance);
      render.canvas.remove();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', adjustSpawnRate);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div ref={sceneRef} className="fixed inset-0 pointer-events-none z-10" />
    </>
  );
};

export default FloatingFizz;
