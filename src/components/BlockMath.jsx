import 'katex/dist/katex.min.css';
import { BlockMath as KaTeXBlockMath } from 'react-katex';

export default function BlockMath({ children }) {
    return <KaTeXBlockMath math={children} />;
}
