import React, { useState, useEffect, useRef } from "react";

const revealText = [
  "When You Buy from BEYOUND, You Wear Change."
];

const TYPE_SPEED = 90; // ms per character
const BLINK_SPEED = 500; // ms for cursor blink

const ScrollRevealSection = () => {
  const [revealedSegments, setRevealedSegments] = useState(0); // How many segments to show
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  const segmentRefs = useRef([]);

  // Reveal more segments as you scroll further
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const visible = Math.max(0, windowHeight - rect.top);
      // Reveal first segment when top is in view, second when scrolled halfway, etc.
      let segmentsToShow = 0;
      if (visible > sectionHeight * 0.5) segmentsToShow = 1;
      setRevealedSegments(segmentsToShow);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect for the currently revealed segment
  useEffect(() => {
    if (revealedSegments === 0) {
      setDisplayed("");
      setTyping(false);
      return;
    }
    const fullText = revealText.slice(0, revealedSegments).join(" ");
    if (displayed.length < fullText.length) {
      setTyping(true);
      const timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(timeout);
    } else {
      setTyping(false);
    }
  }, [revealedSegments, displayed]);

  // Blinking cursor
  useEffect(() => {
    if (revealedSegments === 0) return;
    const blink = setInterval(() => {
      setShowCursor(c => !c);
    }, BLINK_SPEED);
    return () => clearInterval(blink);
  }, [revealedSegments]);

  // Reset typing if new segment is revealed
  useEffect(() => {
    const fullText = revealText.slice(0, revealedSegments).join(" ");
    if (displayed.length > fullText.length) {
      setDisplayed(fullText);
    }
    if (displayed.length < fullText.length) {
      setTyping(true);
    }
  }, [revealedSegments]);

  return (
    <section
      ref={ref}
      className="w-full h-screen flex items-center justify-center bg-transparent relative"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center flex flex-col items-center justify-center w-full h-full">
        <h2
          className="font-extrabold tracking-wide select-none"
          style={{
            fontFamily: "'Courier New', Courier, 'Lucida Console', monospace",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "#fff",
            textShadow: "0 4px 24px rgba(0,0,0,0.25)",
            lineHeight: 1.1,
            maxWidth: "900px"
          }}
        >
          {displayed}
          <span
            style={{
              display: "inline-block",
              width: "1ch",
              color: "#fff",
              fontWeight: 900,
              verticalAlign: "bottom",
              animation: "none"
            }}
          >
            {(typing || showCursor) ? "|" : " "}
          </span>
        </h2>
      </div>
    </section>
  );
};

export default ScrollRevealSection; 