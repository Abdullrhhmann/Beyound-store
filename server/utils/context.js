const path = require('path');

async function getWebsiteContext() {
  const websiteInfo = `
Our story began with a moment of clarity when we realized that for millions, clothing wasn’t a source of confidence, but of daily struggle. We recognized that the roots of our project lie in a problem hidden in plain sight: adaptive clothing was missing, and so were the voices it was meant to serve, while tons of textile waste were being dumped into our environment. We launched our mission turning this problem into potential; creating adaptive clothes from upcycled materials, sewn by strong, underprivileged women, for those who need more than just clothes; they need to be seen.-A purpose-driven social enterprise redefining what fashion can do. Rooted in Egypt and inspired by stories of resilience, We are a team of changemakers, designers, and community builders who believe that clothing should never be a barrier, but a bridge. A bridge to independence, confidence, and dignity.From local production hubs to AI-powered digital accessibility, everything we do is made by the people, for the people, with impact stitched into every seam. At BE YOUnd, we don’t just make clothes. We create change.-We believe that clothing should do more than just cover, it should empower, include, and inspire.-Born in Egypt and built for the region, BE YOUnd is the MENA’s first adaptive clothing brand designed specifically for individuals with mobility challenges, post-surgery needs, and age-related limitations. Every piece is crafted not only for comfort and ease, but for dignity, confidence, and self-expression. By transforming textile waste into high-quality adaptive clothing while creating life-changing opportunities for underprivileged women in rural communities.-By integrating sustainability, inclusion, and technology, we’re rewriting the rules of fashion.Our mission:To Empower. To Include. To BE-YOUnd.We exist to empower individuals with disabilities by designing fashion that adapts to their needs, not the other way around. Our mission is rooted in sustainability, social inclusion, and community-driven innovation. We aim to bridge the gap between functionality and fashion while reducing waste and uplifting marginalized women through meaningful work and skill-building.The need/ The problem:Getting dressed shouldn’t be a daily battle; but for people with mobility, sensory, or physical challenges, it often is. Traditional fashion excludes their needs, adding frustration to already difficult routines. At the same time, the fashion industry generates millions of tons of waste annually, and thousands of women in rural areas remain unemployed despite their skill and potential. A framework that lacks inclusivity at its core, tailored for the majority and stitched without space for the different.Our solution: We Created Clothes That Don’t Just Fit, They Free.BE-YOUnd offers adaptive clothing made from repurposed textile waste, designed to make dressing easier, faster, and more dignified for people with physical limitations. Our clothes include magnetic fastenings, side openings, sensory-friendly fabrics, and more —without compromising style or identity. Each item is crafted by women from overlooked communities, trained by us tolead production with pride and purpose.Join us/ Get involved: Let’s Stitch a Better Future —Together.Simply choose to wear purpose as every action, no matter how small, moves us BE-YOUnd.

Products highlight: Comfort You Can Feel. Style You Can See. Dignity You Can Wear.

We have 3 main products:

1. Pants
- Stylish and comfortable pants designed for everyday wear. Made with premium fabric for maximum comfort and durability.
- Premium fabric material
- Comfortable waistband
- Perfect fit design
- Easy care fabric
- Versatile styling
- Price: 350 EGP
- Sizes: S, M, L

2. Shirt
- Classic shirt with contemporary styling. Perfect for both casual and formal occasions with superior comfort.
- Breathable cotton material
- Classic collar design
- Comfortable fit
- Easy iron fabric
- Versatile styling
- Price: 300 EGP
- Sizes: S, M, L

3. Quarter Zipper
- Premium quarter zipper jacket with modern design and comfortable fit. Perfect for casual and semi-formal occasions.
- High-quality zipper material
- Comfortable fit
- Modern design
- Durable construction
- Easy to maintain
- Price: 300 EGP
- Sizes: S, M, L

Explore our latest collection of adaptive wear; crafted with love, tested for functionality, and designed for real lives. Because clothes should fit you, not limit you.
Contact us: Reach out! We’re always here to listen, connect, and grow. +list the links
  `;
  return websiteInfo;
}

module.exports = { getWebsiteContext }; 