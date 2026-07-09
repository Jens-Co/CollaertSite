import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Privacy, Terms } from './pages/Legal.jsx';

// Tiny hash-based routing (no dependency, gh-pages friendly). The main site
// uses in-page anchors like #brickbreak; the legal pages live under the
// #/brickbreak/... prefix so the two never collide.
function Root() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    if (hash.startsWith('#/brickbreak/')) window.scrollTo(0, 0);
  }, [hash]);

  if (hash.startsWith('#/brickbreak/privacy')) return <Privacy />;
  if (hash.startsWith('#/brickbreak/terms')) return <Terms />;
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
