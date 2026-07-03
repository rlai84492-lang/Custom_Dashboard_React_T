import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

// A tiny hand-rolled client-side router (no external dependency available in
// this offline build). Supports pushState navigation, back/forward, and a
// couple of dynamic ":id" style segments via matchPath().

const RouterContext = createContext(null);

function normalize(path) {
  if (!path) return '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname || '/'));

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname || '/'));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, opts = {}) => {
    const p = normalize(to);
    if (p === normalize(window.location.pathname)) return;
    if (opts.replace) window.history.replaceState({}, '', p);
    else window.history.pushState({}, '', p);
    setPath(p);
    window.scrollTo(0, 0);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

// Matches a pattern like "/campaigns/:id/:tab?" against the current path.
export function matchPath(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  const params = {};
  let pi = 0;
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    const optional = part.endsWith('?');
    const clean = optional ? part.slice(0, -1) : part;
    if (clean.startsWith(':')) {
      if (pi < pathParts.length) {
        params[clean.slice(1)] = decodeURIComponent(pathParts[pi]);
        pi++;
      } else if (!optional) {
        return null;
      }
    } else {
      if (pathParts[pi] !== clean) return null;
      pi++;
    }
  }
  if (pi < pathParts.length) return null;
  return params;
}

export function Link({ to, children, className, onClick, ...rest }) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
