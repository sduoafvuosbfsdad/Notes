import Template from '@/pages/Template.jsx';
import GlassContainer from '@/components/GlassContainer.jsx';
import { 
    ExpandableSection, 
    TabGroup, 
    DataGrid, 
    InfoCard, 
    ProcessFlow,
    ComparisonView 
} from '@/components/widgets';
import liquefaction from '@/assets/liquefaction-process.png';

// Data definitions for the interactive components
const impactMatrixData = [
    { 
        hazard: 'Ground Shaking', 
        ecosystems: '●●', 
        properties: '●●●', 
        services: '●●●', 
        fatalities: '●●●',
        characteristics: 'Physical and direct damage'
    },
    { 
        hazard: 'Liquefaction', 
        ecosystems: '●●●', 
        properties: '●●●', 
        services: '●●', 
        fatalities: '●●',
        characteristics: 'Soil becomes fluid-like'
    },
    { 
        hazard: 'Landslides', 
        ecosystems: '●●●', 
        properties: '●●●', 
        services: '●●●', 
        fatalities: '●●●',
        characteristics: 'Fast-moving debris buries areas'
    },
    { 
        hazard: 'Tsunamis', 
        ecosystems: '●●●', 
        properties: '●●●', 
        services: '●●●', 
        fatalities: '●●●',
        characteristics: 'Salt water flooding, long-distance'
    },
    { 
        hazard: 'Tephra', 
        ecosystems: '●●●', 
        properties: '●●', 
        services: '●●●', 
        fatalities: '●●',
        characteristics: 'Widespread pollution, suffocation'
    }
];

const impactMatrixColumns = [
    { 
        key: 'hazard', 
        header: 'Hazard Type',
        sortable: true
    },
    { 
        key: 'ecosystems', 
        header: '🌿 Ecosystems',
        sortable: true
    },
    { 
        key: 'properties', 
        header: '🏢 Properties',
        sortable: true
    },
    { 
        key: 'services', 
        header: '⚡ Services',
        sortable: true
    },
    { 
        key: 'fatalities', 
        header: '⚠️ Fatalities',
        sortable: true
    }
];

const tsunamiSteps = [
    { 
        id: 1,
        title: "Undersea Earthquake", 
        description: "Displacement of water creates void",
        icon: "🌊"
    },
    { 
        id: 2,
        title: "Water Lifted", 
        description: "Large waves begin to form",
        icon: "⬆️"
    },
    { 
        id: 3,
        title: "High Speed Movement", 
        description: "Energy transfers efficiently through water",
        icon: "⚡"
    },
    { 
        id: 4,
        title: "Shallow Water", 
        description: "Wave height increases dramatically",
        icon: "🏔️"
    }
];

const caseStudies = [
    {
        id: 'japan-2011',
        title: "Japan 2011",
        subtitle: "M₍w₎ 9.0 Earthquake & Tsunami",
        content: (
            <>
                <p><strong>Tsunami height:</strong> 40 meters</p>
                <p><strong>Impact:</strong> Destroyed homes, carried debris inland, flooded inland areas</p>
                <p><strong>Casualties:</strong> Half of Sendai's population killed</p>
                <p><strong>Environmental:</strong> Large amounts of trees knocked down</p>
            </>
        ),
        related: ['Tsunamis', 'Ground Shaking']
    },
    {
        id: 'sichuan-2008',
        title: "Sichuan 2008",
        subtitle: "M₍w₎ 7.9 Earthquake (汶川地震)",
        content: (
            <>
                <p><strong>Landslides:</strong> 15,000+ triggered</p>
                <p><strong>Damage:</strong> Many buildings and infrastructure destroyed</p>
                <p><strong>Casualties:</strong> Approximately 20,000 deaths</p>
            </>
        ),
        related: ['Landslides', 'Ground Shaking']
    },
    {
        id: 'png-2018',
        title: "Papua New Guinea 2018",
        subtitle: "M₍w₎ 7.5 Earthquake",
        content: (
            <>
                <p><strong>Chain reaction:</strong> Large quantities of debris entered rivers → flooding → destroyed forests</p>
                <p><strong>Primary hazard:</strong> Landslides</p>
            </>
        ),
        related: ['Landslides']
    }
];

const earthquakeHazardDetails = {
    groundShaking: {
        ecosystems: [
            "Leakages from oil and chemical factories pollute land and water",
            "Fractures and uprooted trees cause mass deaths, damaging wildlife habitats (roots are damaged)"
        ],
        properties: "Weakening of building, bridge, road, and railway foundations, increasing collapse risks and rescue difficulty.",
        services: "Disruption of water supply, electricity, gas, and communication networks. Underground tubing snaps and breaks.",
        fatalities: "Collapsed buildings and infrastructure trap people under debris causing casualties."
    },
    liquefaction: {
        ecosystems: [
            "Trees on liquefied soil sink in (soil becomes more fluidy)",
            "Liquefied soil enters water bodies, polluting sources and harming aquatic life",
            "Sewage pipes destroyed, releasing sewage into environment"
        ],
        properties: "Weakening of foundations for buildings, bridges, roads, railways - increasing collapse risk.",
        services: "Similar to ground shaking - services disrupted.",
        fatalities: "Collapsed buildings trap people under debris."
    },
    landslides: {
        ecosystems: [
            "Fast-moving debris buries huge areas of forest and wetlands",
            "River pollution from debris (possibly containing chemicals), killing aquatic life",
            "Blocked rivers cause floods damaging nearby ecosystems and properties"
        ],
        properties: "Debris buries villages and farms, destroying properties.",
        services: [
            "Broken piping for water, gas, communication",
            "Roads and railways blocked by debris"
        ],
        fatalities: [
            "People buried or hit by debris",
            "Floods from blocked rivers drown people"
        ]
    },
    tsunamis: {
        ecosystems: [
            "Flooding of coastal wetlands and habitats (salt water!)",
            "Debris carried by waves pollutes natural habitats"
        ],
        properties: "Fast moving water and debris sweeps away buildings and infrastructure.",
        services: [
            "Broken electricity and communication cables",
            "Roads and railways destroyed, difficult rescue"
        ],
        fatalities: [
            "People drown",
            "Debris carried by waves kills on impact"
        ]
    }
};

const volcanicHazardDetails = {
    tephra: {
        ecosystems: [
            "Ash dispersed by winds over thousands of kilometers, causing widespread pollution",
            "Ash suffocates animals, primarily birds",
            "Ash blinds birds by sticking their eyelids together"
        ],
        properties: "Volcanic bombs (up to car size) cause significant damage when they hit buildings.",
        services: [
            "Broken electricity and communication cables",
            "Roads and railways blocked, difficult rescue"
        ],
        fatalities: [
            "Impact from volcanic bombs",
            "Suffocation from ash inhalation"
        ]
    }
};

export default function Tectonics_2_4() {
    return (
        <Template>
            <GlassContainer>
                <div id="title">
                    <h1>2.4 Impacts of Tectonic Hazards</h1>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
                        Negative impacts on natural and human systems
                    </p>
                    <hr />
                </div>

                {/* Introduction */}
                <section className="widget-section">
                    <h3>2.4.1 Overview</h3>
                    <p>
                        This section explores the <b>negative impacts</b> of different tectonic hazards 
                        on natural and human systems. We'll examine four impact categories across 
                        earthquake and volcanic hazards.
                    </p>
                </section>

                {/* Interactive Impact Matrix */}
                <section className="widget-section">
                    <DataGrid 
                        columns={impactMatrixColumns}
                        data={impactMatrixData}
                        sortable={true}
                        title="📊 Impact Severity Matrix"
                        rowDetailRenderer={(row) => (
                            <div>
                                <p><strong>Characteristics:</strong> {row.characteristics}</p>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                    ● = Low impact | ●● = Medium impact | ●●● = High impact
                                </p>
                            </div>
                        )}
                    />
                </section>

                {/* Tabbed Content: Earthquakes vs Volcanic */}
                <section className="widget-section">
                    <h3 className="widget-section-title">Hazard Types</h3>
                    <TabGroup 
                        tabs={[
                            {
                                id: 'earthquakes',
                                label: '🌍 Earthquake Hazards',
                                icon: '🌍',
                                content: (
                                    <div style={{ marginTop: '1rem' }}>
                                        <ExpandableSection 
                                            title="2.4.2 Ground Shaking"
                                            summary="Physical and direct damage to structures"
                                            icon="🏚️"
                                            defaultExpanded={true}
                                        >
                                            <p>{earthquakeHazardDetails.groundShaking.ecosystems}</p>
                                            <table>
                                                <thead>
                                                    <tr><th>Impact</th><th>Explanation</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>🌿 Ecosystems</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.groundShaking.ecosystems.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>🏢 Properties</td>
                                                        <td>{earthquakeHazardDetails.groundShaking.properties}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚡ Services</td>
                                                        <td>{earthquakeHazardDetails.groundShaking.services}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚠️ Fatalities</td>
                                                        <td>{earthquakeHazardDetails.groundShaking.fatalities}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </ExpandableSection>

                                        <ExpandableSection 
                                            title="2.4.3 Soil Liquefaction"
                                            summary="Soil transforms to fluid-like state"
                                            icon="🌊"
                                        >
                                            <p>
                                                Liquefaction refers to transforming of the soil to become a thick fluid 
                                                after violent shaking where it <b>becomes more saturated, loose soil</b>.
                                            </p>
                                            <img src={liquefaction} alt="Liquefaction Process" style={{ maxWidth: '300px' }} />
                                            <p>
                                                The shaking causes the soil to lose its porous structure, 
                                                turning into something like sand.
                                            </p>
                                            <table>
                                                <thead>
                                                    <tr><th>Impact</th><th>Explanation</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>🌿 Ecosystems</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.liquefaction.ecosystems.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>🏢 Properties</td>
                                                        <td>{earthquakeHazardDetails.liquefaction.properties}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚡ Services</td>
                                                        <td>{earthquakeHazardDetails.liquefaction.services}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚠️ Fatalities</td>
                                                        <td>{earthquakeHazardDetails.liquefaction.fatalities}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </ExpandableSection>

                                        <ExpandableSection 
                                            title="2.4.4 Landslides"
                                            summary="Fast-moving debris buries everything"
                                            icon="⛰️"
                                        >
                                            <p>
                                                During violent earthquakes, cracks form on steep slopes, 
                                                making rocks and soil loose. When loose enough, they slide 
                                                downslope (not enough friction). Landslides <b>bury things</b> 
                                                and introduce soil where it shouldn't be.
                                            </p>
                                            <table>
                                                <thead>
                                                    <tr><th>Impact</th><th>Explanation</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>🌿 Ecosystems</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.landslides.ecosystems.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>🏢 Properties</td>
                                                        <td>{earthquakeHazardDetails.landslides.properties}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚡ Services</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.landslides.services.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚠️ Fatalities</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.landslides.fatalities.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </ExpandableSection>

                                        <ExpandableSection 
                                            title="2.4.5 Tsunamis"
                                            summary="Destructive ocean waves from undersea earthquakes"
                                            icon="🌊"
                                        >
                                            <p>
                                                Tsunami = series of waves caused by underwater earthquake. 
                                                Water's higher density means energy transfer is more efficient, 
                                                allowing tsunamis to travel long distances with less energy loss.
                                            </p>
                                            
                                            <h4>Formation Process:</h4>
                                            <ProcessFlow 
                                                steps={tsunamiSteps}
                                                direction="horizontal"
                                                interactive={true}
                                            />
                                            
                                            <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                                                <b>⚠️ Warning Sign:</b> Water recedes from beaches before tsunami arrival. 
                                                This happens because water fills the void from displacement.
                                            </p>

                                            <table>
                                                <thead>
                                                    <tr><th>Impact</th><th>Explanation</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>🌿 Ecosystems</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.tsunamis.ecosystems.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>🏢 Properties</td>
                                                        <td>{earthquakeHazardDetails.tsunamis.properties}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚡ Services</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.tsunamis.services.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚠️ Fatalities</td>
                                                        <td>
                                                            <ul>
                                                                {earthquakeHazardDetails.tsunamis.fatalities.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </ExpandableSection>
                                    </div>
                                )
                            },
                            {
                                id: 'volcanic',
                                label: '🌋 Volcanic Hazards',
                                icon: '🌋',
                                content: (
                                    <div style={{ marginTop: '1rem' }}>
                                        <ExpandableSection 
                                            title="2.4.6 Tephra"
                                            summary="Erupted volcanic material and bombs"
                                            icon="💥"
                                            defaultExpanded={true}
                                        >
                                            <p>
                                                <b>Tephra</b> = matter ejected from volcano during eruption.<br/>
                                                <b>Volcanic bombs</b> = molten rock fragments ejected during eruption.
                                            </p>
                                            <table>
                                                <thead>
                                                    <tr><th>Impact</th><th>Explanation</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>🌿 Ecosystems</td>
                                                        <td>
                                                            <ul>
                                                                {volcanicHazardDetails.tephra.ecosystems.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>🏢 Properties</td>
                                                        <td>{volcanicHazardDetails.tephra.properties}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚡ Services</td>
                                                        <td>
                                                            <ul>
                                                                {volcanicHazardDetails.tephra.services.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>⚠️ Fatalities</td>
                                                        <td>
                                                            <ul>
                                                                {volcanicHazardDetails.tephra.fatalities.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </ExpandableSection>
                                    </div>
                                )
                            }
                        ]}
                        appearance="pills"
                    />
                </section>

                {/* Case Studies */}
                <section className="widget-section">
                    <h3 className="widget-section-title">🌍 Real World Examples</h3>
                    <div className="widget-grid">
                        {caseStudies.map(study => (
                            <InfoCard
                                key={study.id}
                                variant="expand"
                                front={{
                                    title: study.title,
                                    subtitle: study.subtitle
                                }}
                                back={{
                                    content: study.content,
                                    related: study.related
                                }}
                            />
                        ))}
                    </div>
                </section>

                {/* Hazard Comparison */}
                <section className="widget-section">
                    <h3 className="widget-section-title">⚖️ Hazard Comparison</h3>
                    <ComparisonView 
                        mode="side-by-side"
                        itemA={{
                            title: "Ground Shaking",
                            icon: "🏚️",
                            content: (
                                <p>Direct physical damage from seismic waves. Affects foundations and structural integrity.</p>
                            ),
                            meta: {
                                speed: "Instant",
                                range: "Local",
                                duration: "Seconds",
                                warning: "None"
                            }
                        }}
                        itemB={{
                            title: "Tsunami",
                            icon: "🌊",
                            content: (
                                <p>Ocean waves traveling at high speeds, causing flooding and destruction far from source.</p>
                            ),
                            meta: {
                                speed: "~800 km/h",
                                range: "Trans-oceanic",
                                duration: "Hours",
                                warning: "Minutes to hours"
                            }
                        }}
                        showDifferences={true}
                    />
                </section>

                <hr />
                <small style={{ color: '#64748b' }}>
                    Use the interactive elements above to explore each hazard type in detail.
                </small>
            </GlassContainer>
        </Template>
    );
}
