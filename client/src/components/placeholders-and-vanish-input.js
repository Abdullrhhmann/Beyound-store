import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";

export const PlaceholdersAndVanishInput = ({
  placeholders,
  onChange,
  onSubmit,
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const [isFocused, setIsFocused] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        newDataRef.current.forEach((t) => {
            t.draw(ctx, frameCount);
        });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let frameCount = 0;
      let animationFrameId;
      const render = () => {
        frameCount++;
        draw(ctx, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  const getSizingData = (value) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "16px Arial"; // Match font style of input
      const textMetrics = ctx.measureText(value);
      return {
        width: textMetrics.width,
        height: 20, // Approximate height
      };
    }
    return { width: 0, height: 0 };
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      vanishAndSubmit();
      onSubmit && onSubmit(value);
      setValue(""); // Clear input after submit
    }
  };

  const vanishAndSubmit = () => {
    if (!inputRef.current || !canvasRef.current || animating) return;

    setAnimating(true);
    const value = inputRef.current.value;
    if (!value) return;

    const { width, height } = getSizingData(value);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    inputRef.current.style.opacity = "0";
    if (ctx) {
      ctx.font = "16px Arial";
    }

    const textData = ctx.getImageData(0, 0, width, height);

    newDataRef.current = [];
    for (let i = 0; i < textData.data.length; i += 4) {
      if (textData.data[i + 3] > 0) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);
        newDataRef.current.push(new Particle(x, y, textData.data[i], textData.data[i + 1], textData.data[i + 2]));
      }
    }

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.style.opacity = "1";
        inputRef.current.value = "";
      }
      newDataRef.current = [];
      setAnimating(false);
    }, 1000); // Vanishing animation duration
  };

  class Particle {
    constructor(x, y, r, g, b) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.alpha = 1;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
    }

    draw(ctx) {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha *= 0.96;
      ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  return (
    <form
      className={cn("relative w-full")}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChange}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        type="text"
        className="h-10 w-full rounded-lg border border-gray-300 bg-transparent pl-4 pr-10 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <canvas
        className="pointer-events-none absolute inset-0"
        ref={canvasRef}
      ></canvas>

      <AnimatePresence>
        {!value && !isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-start pl-4 text-sm text-gray-400"
          >
            {placeholders[currentPlaceholder]}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-blue-600 hover:bg-gray-100 disabled:opacity-50"
        disabled={!value}
      >
        <svg
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12h14m-7-7 7 7-7 7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}; 