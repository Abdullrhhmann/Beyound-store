import React from 'react';

const SlidingTextSeparator = ({ text = 'ABOUT US' }) => {
  return (
    <div className="bg-gradient-to-br from-red-900/80 via-black/80 to-gray-900/80 py-0.5 overflow-hidden">
      <div 
        className="flex whitespace-nowrap animate-scroll"
        style={{
          direction: 'ltr',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {/* Duplicate the text multiple times for seamless loop */}
        {[...Array(40)].map((_, index) => (
          <span 
            key={index}
            className="text-xl md:text-4xl lg:text-5xl font-bold text-white mx-8 tracking-wider"
            style={{
              unicodeBidi: 'plaintext'
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlidingTextSeparator;