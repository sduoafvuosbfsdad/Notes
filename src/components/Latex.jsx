import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Inline equation: <Latex>E = mc^2</Latex>
// Block equation: <Latex block>E = mc^2</Latex>

export default function Latex({ children, block = false }) {
    if (block) {
        return <BlockMath math={children} />;
    }
    return <InlineMath math={children} />;
}
