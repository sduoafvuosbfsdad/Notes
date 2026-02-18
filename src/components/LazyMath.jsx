import { lazy, Suspense } from 'react';

// Dynamically import KaTeX components to reduce initial bundle size
const BlockMathComponent = lazy(() => import('./BlockMath.jsx'));
const InlineMathComponent = lazy(() => import('./InlineMath.jsx'));
const LatexComponent = lazy(() => import('./Latex.jsx'));

// Loading fallback for math components
function MathLoading() {
    return (
        <span style={{ 
            color: 'rgba(255, 255, 255, 0.5)', 
            fontStyle: 'italic',
            fontSize: '0.9em'
        }}>
            Loading...
        </span>
    );
}

// Lazy BlockMath wrapper
export function BlockMath({ children }) {
    return (
        <Suspense fallback={<MathLoading />}>
            <BlockMathComponent>{children}</BlockMathComponent>
        </Suspense>
    );
}

// Lazy InlineMath wrapper
export function InlineMath({ children }) {
    return (
        <Suspense fallback={<MathLoading />}>
            <InlineMathComponent>{children}</InlineMathComponent>
        </Suspense>
    );
}

// Lazy Latex wrapper
export function Latex({ children, block = false }) {
    return (
        <Suspense fallback={<MathLoading />}>
            <LatexComponent block={block}>{children}</LatexComponent>
        </Suspense>
    );
}
