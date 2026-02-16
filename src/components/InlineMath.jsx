import 'katex/dist/katex.min.css';
import { InlineMath as KaTeXInlineMath } from 'react-katex';

export default function InlineMath({ children }) {
    return <KaTeXInlineMath math={children} />;
}
