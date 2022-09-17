import { lazy, Suspense } from 'react';

const Loadable = (importFunc,) => {
  const fallback = "";
  const LazyComponent = lazy(importFunc);
  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Loadable;
