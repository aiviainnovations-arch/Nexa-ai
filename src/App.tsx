import { Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import { Nav } from './components/Nav';
import { CursorGlow } from './components/ui/CursorGlow';
import { Hero } from './sections/Hero';

// Everything below the fold is code-split and loaded after the hero renders.
const ProductDashboard = lazy(() => import('./sections/ProductDashboard').then((m) => ({ default: m.ProductDashboard })));
const Solutions = lazy(() => import('./sections/Solutions').then((m) => ({ default: m.Solutions })));
const Workspace = lazy(() => import('./sections/Workspace').then((m) => ({ default: m.Workspace })));
const Features = lazy(() => import('./sections/Features').then((m) => ({ default: m.Features })));
const Workflow = lazy(() => import('./sections/Workflow').then((m) => ({ default: m.Workflow })));
const Analytics = lazy(() => import('./sections/Analytics').then((m) => ({ default: m.Analytics })));
const Security = lazy(() => import('./sections/Security').then((m) => ({ default: m.Security })));
const CTA = lazy(() => import('./sections/CTA').then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

const Placeholder = ({ h }: { h: number }) => <div aria-hidden="true" style={{ minHeight: h }} />;

export default function App() {
  return (
    // reducedMotion="user": framer-motion skips transform/layout animations for people who prefer reduced motion
    <MotionConfig reducedMotion="user">
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <Suspense fallback={<Placeholder h={900} />}><ProductDashboard /></Suspense>
        <Suspense fallback={<Placeholder h={900} />}><Solutions /></Suspense>
        <Suspense fallback={<Placeholder h={900} />}><Workspace /></Suspense>
        <Suspense fallback={<Placeholder h={1400} />}><Features /></Suspense>
        <Suspense fallback={<Placeholder h={900} />}><Workflow /></Suspense>
        <Suspense fallback={<Placeholder h={900} />}><Analytics /></Suspense>
        <Suspense fallback={<Placeholder h={700} />}><Security /></Suspense>
        <Suspense fallback={<Placeholder h={600} />}><CTA /></Suspense>
      </main>
      <Suspense fallback={<Placeholder h={400} />}><Footer /></Suspense>
    </MotionConfig>
  );
}
