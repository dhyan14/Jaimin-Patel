import { useEffect, useRef } from 'react';
import katex from 'katex';

export default function MathEquation({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(children, containerRef.current, {
        throwOnError: false,
        displayMode: true
      });
    }
  }, [children]);

  return <div ref={containerRef} className="math-equation text-sm sm:text-xl md:text-2xl" />;
}
