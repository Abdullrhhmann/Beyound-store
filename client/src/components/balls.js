import React, { useEffect, useRef, useState } from 'react';

class Ball {
    constructor(x, y, radius, logo) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'white';
        
        // Logo properties
        this.logo = null;
        this.logoLoaded = false;

        // Load logo if provided
        if (logo) {
            this.loadLogo(logo);
        }
        
        // Physics
        this.dx = Math.random() * 4 - 2;
        this.dy = Math.random() * 4 - 2;
        this.gravity = 0.2;
        this.friction = 0.99;
        this.bounce = 0.7;

        // Drag properties
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;

        this.settleTimer = 0;
        this.isSettled = false;
    }

    loadLogo(logoSrc) {
        this.logo = new Image();
        this.logo.onload = () => {
            this.logoLoaded = true;
        };
        this.logo.src = logoSrc;
    }

    update(canvas, dt = 16.67) {
        // Only apply physics if not dragging and not settled
        if (!this.isDragging && !this.isSettled) {
            // Gravity
            this.dy += this.gravity;

            // Position update
            this.x += this.dx;
            this.y += this.dy;

            // Boundary collisions
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.dx *= -this.bounce;
            }
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.dx *= -this.bounce;
            }
            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.dy *= -this.bounce;
            }
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.dy *= -this.bounce;
            }

            // Friction
            this.dx *= this.friction;
            this.dy *= this.friction;

            // Settle logic
            const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            if (speed < 0.15) {
                this.settleTimer += dt;
                if (this.settleTimer > 2000) { // 2 seconds
                    this.dx = 0;
                    this.dy = 0;
                    this.isSettled = true;
                }
            } else {
                this.settleTimer = 0;
            }
        }
    }

    draw(ctx) {
        // --- Realistic radial gradient fill ---
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, '#f8f8f8'); // highlight
        gradient.addColorStop(0.5, '#e0e0e0'); // mid
        gradient.addColorStop(1, '#b0b0b0'); // shadow

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowColor = 'rgba(80,80,80,0.25)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // --- Glossy highlight ---
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.35, Math.PI * 1.1, Math.PI * 1.9, false);
        ctx.lineWidth = this.radius * 0.18;
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.shadowColor = 'rgba(255,255,255,0.5)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        // --- Ball outline ---
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(180,180,180,0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Draw logo if loaded
        if (this.logoLoaded) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 2);
            ctx.clip();

            // Calculate logo scaling
            const scale = Math.min(
                (this.radius * 2 - 20) / this.logo.width, 
                (this.radius * 2 - 20) / this.logo.height
            );
            const logoWidth = this.logo.width * scale;
            const logoHeight = this.logo.height * scale;
            ctx.drawImage(
                this.logo, 
                this.x - logoWidth / 2, 
                this.y - logoHeight / 2, 
                logoWidth, 
                logoHeight
            );
            ctx.restore();
        }
    }

    isPointInside(x, y) {
        // Check if point is inside the ball
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.radius;
    }

    startDrag(x, y) {
        this.isDragging = true;
        this.dragStartX = x;
        this.dragStartY = y;
        this.dx = 0;
        this.dy = 0;
        this.isSettled = false; // Wake up on drag
    }

    drag(x, y) {
        if (this.isDragging) {
            // Calculate drag velocity
            const dragMultiplier = 1;
            this.dx = (x - this.dragStartX) * dragMultiplier;
            this.dy = (y - this.dragStartY) * dragMultiplier;

            // Update position
            this.x = x;
            this.y = y;

            // Update drag start for next move
            this.dragStartX = x;
            this.dragStartY = y;
        }
    }

    stopDrag() {
        this.isDragging = false;
    }

    isColliding(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + other.radius;
    }

    wakeUp() {
        this.isSettled = false;
        this.settleTimer = 0;
    }
}

class BallSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.balls = [];
        this.draggedBall = null;

        // PNG Logo URLs (REPLACE THESE WITH YOUR ACTUAL PNG FILES)
        const logos = [
            require('../assets/partners-images/1.png'),
            require('../assets/partners-images/2.png'),
            require('../assets/partners-images/3.png'),
            require('../assets/partners-images/4.PNG'),
            require('../assets/partners-images/5.png'),
            require('../assets/partners-images/6.png'),
            require('../assets/partners-images/7.png'),
            require('../assets/partners-images/8.png'),
            require('../assets/partners-images/9.png'),
            require('../assets/partners-images/10.png'),
            require('../assets/partners-images/11.png'),
            require('../assets/partners-images/12.png'),
            require('../assets/partners-images/13.png'),
        ];

        // Reduce ball count and size for better performance
        const ballCount = isMobile() ? 13 : 26;
        this.createBalls(ballCount, logos);
    }

    createBalls(count, logos) {
        for (let i = 0; i < count; i++) {
            // Smaller balls for better performance
            const radius = isMobile() ? (Math.random() * 20 + 30) : (Math.random() * 40 + 50);
            const x = Math.random() * (this.canvas.width - radius * 2) + radius;
            const y = Math.random() * (this.canvas.height / 2);
            const logo = logos[i % logos.length];
            this.balls.push(new Ball(x, y, radius, logo));
        }
    }

    checkCollisions() {
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                const ball1 = this.balls[i];
                const ball2 = this.balls[j];
                if (Math.abs(ball1.x - ball2.x) > ball1.radius + ball2.radius + 20 ||
                    Math.abs(ball1.y - ball2.y) > ball1.radius + ball2.radius + 20) {
                    continue;
                }
                if (ball1.isColliding(ball2)) {
                    // Collision resolution
                    const dx = ball2.x - ball1.x;
                    const dy = ball2.y - ball1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const overlap = ball1.radius + ball2.radius - distance;

                    // Separate balls
                    const angle = Math.atan2(dy, dx);
                    const separationX = overlap * Math.cos(angle) / 2;
                    const separationY = overlap * Math.sin(angle) / 2;

                    ball1.x -= separationX;
                    ball1.y -= separationY;
                    ball2.x += separationX;
                    ball2.y += separationY;

                    // Velocity exchange
                    const tempDx = ball1.dx;
                    const tempDy = ball1.dy;
                    
                    ball1.dx = ball2.dx;
                    ball1.dy = ball2.dy;
                    ball2.dx = tempDx;
                    ball2.dy = tempDy;

                    // Wake up both balls on collision
                    ball1.wakeUp();
                    ball2.wakeUp();
                }
            }
        }
    }

    animate(dt = 16.67) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.balls.forEach(ball => {
            ball.update(this.canvas, dt);
            ball.draw(this.ctx);
        });
        this.checkCollisions();
    }

    handleMouseDown(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Find ball to drag
        for (let ball of this.balls) {
            if (ball.isPointInside(x, y)) {
                ball.startDrag(x, y);
                this.draggedBall = ball;
                break;
            }
        }
    }

    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Drag ball if one is selected
        if (this.draggedBall) {
            this.draggedBall.drag(x, y);
        }
    }

    handleMouseUp() {
        // Stop dragging
        if (this.draggedBall) {
            this.draggedBall.stopDrag();
            this.draggedBall = null;
        }
    }

    applyFloorMovement(scrollDelta) {
        // Move all balls horizontally based on scrollDelta (simulate floor movement)
        // Negative scrollDelta = scroll up = move balls right, positive = scroll down = move balls left
        const movement = -scrollDelta * 0.5; // adjust multiplier for effect strength
        this.balls.forEach(ball => {
            ball.dx += movement / 20; // add a bit of velocity for smoothness
        });
    }
}

const isMobile = () => window.innerWidth <= 768;

const AnimatedBallsComponent = () => {
    const canvasRef = useRef(null);
    const simulationRef = useRef(null);
    const lastScrollY = useRef(window.scrollY);
    const [scrollDelta, setScrollDelta] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        function resizeCanvas() {
            // Use parent size for canvas, fallback to window size
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }
        resizeCanvas();

        // Create simulation
        const simulation = new BallSimulation(canvas);
        simulationRef.current = simulation;

        // Throttle animation loop to 30 FPS
        let animationFrameId;
        let lastTime = performance.now();
        const fps = 60;
        const frameDuration = 1000 / fps;
        const animateLoop = (now) => {
            const dt = now - lastTime;
            if (dt > frameDuration) {
                simulation.animate(dt);
                lastTime = now;
            }
            animationFrameId = requestAnimationFrame(animateLoop);
        };
        animationFrameId = requestAnimationFrame(animateLoop);

        // Mouse events
        canvas.addEventListener('mousedown', (e) => simulation.handleMouseDown(e));
        canvas.addEventListener('mousemove', (e) => simulation.handleMouseMove(e));
        canvas.addEventListener('mouseup', () => simulation.handleMouseUp());
        canvas.addEventListener('mouseout', () => simulation.handleMouseUp());
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                simulation.handleMouseDown({
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
            }
        });
        canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                simulation.handleMouseMove({
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
            }
        });
        canvas.addEventListener('touchend', () => simulation.handleMouseUp());
        canvas.addEventListener('touchcancel', () => simulation.handleMouseUp());
        window.addEventListener('resize', resizeCanvas);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('mousedown', simulation.handleMouseDown);
            canvas.removeEventListener('mousemove', simulation.handleMouseMove);
            canvas.removeEventListener('mouseup', simulation.handleMouseUp);
            canvas.removeEventListener('mouseout', simulation.handleMouseUp);
            canvas.removeEventListener('touchstart', simulation.handleMouseDown);
            canvas.removeEventListener('touchmove', simulation.handleMouseMove);
            canvas.removeEventListener('touchend', simulation.handleMouseUp);
            canvas.removeEventListener('touchcancel', simulation.handleMouseUp);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    // Responsive container and canvas style
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: isMobile() ? '100vh' : '100vh',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        touchAction: 'none', // Prevent scrolling while dragging on mobile
    };
    const canvasStyle = {
        backgroundColor: 'transparent',
        cursor: 'pointer',
        display: 'block',
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        touchAction: 'none',
    };

    return (
        <div style={containerStyle}>
            <canvas 
                ref={canvasRef} 
                style={canvasStyle}
            />
        </div>
    );
};

export default AnimatedBallsComponent;