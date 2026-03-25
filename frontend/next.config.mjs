/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to generate a static 'out' folder instead of running a server
  output: 'export',
  
  // Disable the built-in image optimization API because GitHub Pages doesn't support it
  images: {
    unoptimized: true, 
  },

  basePath: '/', // Adjust if your site is served from a subdirectory
};

export default nextConfig;