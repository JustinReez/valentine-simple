import './globals.css';
import Navigation from '../components/Navigation';

export const metadata = {
  title: 'For My Valentine 💕',
  description: 'A special Valentine\'s Day surprise',
  icons: {
    icon : 'heart-icon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;600&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}