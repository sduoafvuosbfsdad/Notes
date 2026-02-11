import Template from '../Template';
import MarkdownNotes from '../../components/MarkdownNotes';

const overviewNotes = `# Geography Notes

Welcome to your Geography study section.

## Topics Covered

### Physical Geography
- **Tectonics** - Plate boundaries, hazards, and impacts
  - [2.4 Impacts of Tectonic Hazards](/geography/tectonics/2.4)

### Human Geography
- (Add your human geography topics here)

---

*Use the links above to navigate between topics.*
`;

export default function GeographyIndex() {
    return (
        <Template>
            <MarkdownNotes content={overviewNotes} />
        </Template>
    );
}
