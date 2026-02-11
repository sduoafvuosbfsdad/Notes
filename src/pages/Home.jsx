import Template from './Template';
import MarkdownNotes from '../components/MarkdownNotes';

// Example notes - replace this with your actual markdown content
const sampleNotes = `# Welcome to Your Study Notes

This is a **beautiful**, non-distracting environment for your notes.

## Features

- ✨ Subtle animated background
- 📝 Clean markdown rendering
- 🎨 Easy on the eyes dark theme
- 📱 Responsive design

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Lists

### Unordered
- First item
- Second item
- Third item

### Ordered
1. Step one
2. Step two
3. Step three

> "The beautiful thing about learning is that no one can take it away from you."
> — B.B. King

---

## Task List

- [x] Create animated background
- [x] Style markdown content
- [ ] Add more notes

Enjoy your study session! 📚
`;

export default function Home() {
    return (
        <Template>
            <MarkdownNotes content={sampleNotes} />
        </Template>
    );
}
