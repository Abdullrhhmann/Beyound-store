import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/logos/logo.png';

const blobFloat1 = {
  animation: 'footerBlobFloat1 10s ease-in-out infinite alternate',
};
const blobFloat2 = {
  animation: 'footerBlobFloat2 12s ease-in-out infinite alternate',
};
const blobFloat3 = {
  animation: 'footerBlobFloat3 14s ease-in-out infinite alternate',
};
const blobFloat4 = {
  animation: 'footerBlobFloat4 11s ease-in-out infinite alternate',
};
const blobFloat5 = {
  animation: 'footerBlobFloat5 16s ease-in-out infinite alternate',
};

// Add keyframes to the page (for demo, in production use a CSS file or Tailwind config)
if (typeof window !== 'undefined' && !document.getElementById('footer-blob-keyframes')) {
  const style = document.createElement('style');
  style.id = 'footer-blob-keyframes';
  style.innerHTML = `
    @keyframes footerBlobFloat1 { 0%{transform:translate(0,0) rotate(0deg) scale(1);} 100%{transform:translate(-60px, 80px) rotate(8deg) scale(1.12);} }
    @keyframes footerBlobFloat2 { 0%{transform:translate(0,0) rotate(0deg) scale(1);} 100%{transform:translate(90px, -60px) rotate(-10deg) scale(1.15);} }
    @keyframes footerBlobFloat3 { 0%{transform:translate(0,0) rotate(0deg) scale(1);} 100%{transform:translate(-50px, 70px) rotate(12deg) scale(1.09);} }
    @keyframes footerBlobFloat4 { 0%{transform:translate(0,0) rotate(0deg) scale(1);} 100%{transform:translate(60px, 60px) rotate(-7deg) scale(1.13);} }
    @keyframes footerBlobFloat5 { 0%{transform:translate(0,0) scale(1) rotate(0deg);} 100%{transform:translate(-40px, 40px) scale(1.18) rotate(6deg);} }
  `;
  document.head.appendChild(style);
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const mainLinks = [
    { name: 'About', id: 'about' },
    { name: 'Products', id: 'products' },
    { name: 'Contact', id: 'footer' },
  ];

  return (
    <footer id="footer" className="bg-black text-white pt-16 pb-8 px-4 w-full rounded-t-[4rem] relative overflow-hidden">
      {/* Decorative SVG Blobs - Colorful & Animated */}
      {/* Top Left Red */}
      <svg style={blobFloat1} className="absolute left-0 top-0 w-64 h-64 opacity-30 z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#a21a2c" d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,69.2,-29.2C74.7,-14.2,78.7,0.8,75.2,14.7C71.7,28.6,60.7,41.4,47.2,50.7C33.7,60,17.8,65.8,2.1,63.6C-13.6,61.4,-27.2,51.2,-38.2,40.1C-49.2,29,-57.7,17,-62.2,2.7C-66.7,-11.6,-67.2,-28.2,-59.7,-39.7C-52.2,-51.2,-36.7,-57.6,-21.1,-63.2C-5.5,-68.8,9.2,-73.6,23.2,-72.2C37.2,-70.8,51.7,-63.2,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
      {/* Bottom Right White */}
      <svg style={blobFloat2} className="absolute right-0 bottom-0 w-80 h-80 opacity-20 z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M38.6,-66.2C51.2,-59.2,62.2,-51.2,68.2,-39.2C74.2,-27.2,75.2,-11.2,73.2,4.7C71.2,20.6,66.2,36.4,56.2,47.2C46.2,58,31.2,63.8,16.2,66.2C1.2,68.6,-13.8,67.6,-27.2,62.2C-40.6,56.8,-52.4,47,-60.2,34.2C-68,21.4,-71.8,5.7,-69.2,-8.7C-66.6,-23.1,-57.6,-36.2,-46.2,-44.2C-34.8,-52.2,-21,-55.2,-7.2,-59.2C6.6,-63.2,13.2,-68.2,25.2,-70.2C37.2,-72.2,51.2,-71.2,38.6,-66.2Z" transform="translate(100 100)" />
      </svg>
      {/* Top Right Blue */}
      <svg style={blobFloat3} className="absolute right-0 top-0 w-48 h-48 opacity-25 z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#2563eb" d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,69.2,-29.2C74.7,-14.2,78.7,0.8,75.2,14.7C71.7,28.6,60.7,41.4,47.2,50.7C33.7,60,17.8,65.8,2.1,63.6C-13.6,61.4,-27.2,51.2,-38.2,40.1C-49.2,29,-57.7,17,-62.2,2.7C-66.7,-11.6,-67.2,-28.2,-59.7,-39.7C-52.2,-51.2,-36.7,-57.6,-21.1,-63.2C-5.5,-68.8,9.2,-73.6,23.2,-72.2C37.2,-70.8,51.7,-63.2,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
      {/* Bottom Left Yellow */}
      <svg style={blobFloat4} className="absolute left-0 bottom-0 w-56 h-56 opacity-20 z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fde047" d="M38.6,-66.2C51.2,-59.2,62.2,-51.2,68.2,-39.2C74.2,-27.2,75.2,-11.2,73.2,4.7C71.2,20.6,66.2,36.4,56.2,47.2C46.2,58,31.2,63.8,16.2,66.2C1.2,68.6,-13.8,67.6,-27.2,62.2C-40.6,56.8,-52.4,47,-60.2,34.2C-68,21.4,-71.8,5.7,-69.2,-8.7C-66.6,-23.1,-57.6,-36.2,-46.2,-44.2C-34.8,-52.2,-21,-55.2,-7.2,-59.2C6.6,-63.2,13.2,-68.2,25.2,-70.2C37.2,-72.2,51.2,-71.2,38.6,-66.2Z" transform="translate(100 100)" />
      </svg>
      {/* Center Purple (behind content) */}
      <svg style={blobFloat5} className="absolute left-1/2 top-1/2 w-96 h-96 opacity-10 z-0 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#a21caf" d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,69.2,-29.2C74.7,-14.2,78.7,0.8,75.2,14.7C71.7,28.6,60.7,41.4,47.2,50.7C33.7,60,17.8,65.8,2.1,63.6C-13.6,61.4,-27.2,51.2,-38.2,40.1C-49.2,29,-57.7,17,-62.2,2.7C-66.7,-11.6,-67.2,-28.2,-59.7,-39.7C-52.2,-51.2,-36.7,-57.6,-21.1,-63.2C-5.5,-68.8,9.2,-73.6,23.2,-72.2C37.2,-70.8,51.7,-63.2,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
      <div className="flex flex-col items-center w-full relative z-20">
        {/* Main Links */}
        <nav className="mb-8 w-full">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 text-base sm:text-lg font-semibold w-full px-4">
            {mainLinks.map(link => (
              <li key={link.name}>
                    <a
                      href={`#${link.id}`}
                  className="hover:text-accent-blue transition-colors duration-200"
                      onClick={e => {
                        e.preventDefault();
                        const el = document.getElementById(link.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      {link.name}
                    </a>
              </li>
                ))}
              </ul>
        </nav>
        {/* Social Icons */}
        <div className="flex gap-4 sm:gap-6 mb-8">
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </a>
          ))}
          </div>
        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-4 w-full">
          &copy; {currentYear} BEYOUND. All rights reserved.
        </div>
        {/* Developer Copyright */}
        <div className="text-center text-gray-500 text-xs mt-2 w-full">
          Developed with ❤️ by <a href="https://github.com/abdullrhhmann" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">@abdullrhhmann</a>
        </div>
        {/* Big Logo at the Bottom Center */}
        <img
          src={logo}
          alt="Company Logo"
          className="w-64 sm:w-80 md:w-96 h-56 sm:h-64 md:h-80 object-contain mt-8 mb-0 drop-shadow-xl mx-auto"
          draggable="false"
        />
      </div>
    </footer>
  );
};

export default Footer; 