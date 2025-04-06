import '../styles/globals.css';
import 'katex/dist/katex.min.css';
import { useEffect } from 'react';

let renderMathInElement;
if (typeof window !== 'undefined') {
  renderMathInElement = require('katex/dist/contrib/auto-render');
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
