import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Game() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      border: 'none'
    }}>
      <iframe 
        src="https://dhyanjain.me/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Color Tiling Game"
      />
    </div>
  );
} 