import Template from '@/pages/Template';
import GlassContainer from "@/components/GlassContainer.jsx";
import Latex from "@/components/Latex.jsx";
import BlockMath from "@/components/BlockMath.jsx";
import ReactivityExperiment from "@/components/ReactivityExperiment.jsx";

// Metal data for reference (static rendering below)
// K, Na, Ca, Mg, Al, C, Zn, Fe, Sn, Pb, H, Cu, Ag

const styles = {
    container: {
        margin: '2rem 0',
        padding: '1.5rem',
    },
    seriesContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
    },
    metalItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1',
    },
    symbol: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    symbolMarker: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    name: {
        fontSize: '0.75rem',
        textAlign: 'center',
        color: 'white',
    },
    arrowContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem',
        padding: '0 22px',
    },
    arrowLine: {
        flex: '1',
        height: '4px',
        background: 'linear-gradient(to right, #ff6b6b, #feca57)',
        borderRadius: '2px',
    },
    arrowHead: {
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: '12px solid #feca57',
    },
    arrowLabel: {
        position: 'absolute',
        bottom: '-25px',
        fontSize: '0.85rem',
        color: 'white',
        fontStyle: 'italic',
    },
    thresholdContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '45px',
        margin: '0 0.25rem',
        marginBottom: '2rem',
    },
    thresholdLine: {
        width: '3px',
        height: '60px',
        background: 'linear-gradient(to bottom, #ff6b6b, #feca57)',
        borderRadius: '2px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    thresholdLabel: {
        position: 'absolute',
        top: '-24px',
        fontSize: '0.7rem',
        color: '#feca57',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
};

export default function ReactivitySeries() {
    return (
        <Template>
            <GlassContainer>
                <div id="title">
                    <h1>12 Reactivity Series 金属活动性顺序</h1>
                    <hr/>
                </div>
                <div id="12.1">
                    <h2>12.1 The Reactivity Series 金属活动性顺序是什么？</h2>
                    <p>
                        In chemistry, reactivity of a metal refers to the ease at which metal atoms form a positive ion through losing electrons.
                        A metal that looses electrons more readily is said to be more reactive.
                    </p>
                    <p>
                        在化学中，金属的活动性指的是金属失去电子并形成阳离子的倾向。更倾向于失去电子的金属拥有更高的活动性。
                    </p>

                    {/* Note: Tin (Sn) and Aluminium (Al) are not required in the reactivity series */}
                    <div id="ReactivitySeries" style={styles.container}>
                        <div style={styles.seriesContainer}>
                            {/* Potassium */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>K</div>
                                <div style={styles.name}>Potassium<br/>(钾)</div>
                            </div>
                            {/* Sodium */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Na</div>
                                <div style={styles.name}>Sodium<br/>(钠)</div>
                            </div>
                            {/* Calcium */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Ca</div>
                                <div style={styles.name}>Calcium<br/>(钙)</div>
                            </div>
                            {/* Magnesium */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Mg</div>
                                <div style={styles.name}>Magnesium<br/>(镁)</div>
                            </div>
                            {/* Carbon (Marker) */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbolMarker}>C</div>
                                <div style={styles.name}>Carbon<br/>(碳)</div>
                            </div>
                            {/* Zinc */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Zn</div>
                                <div style={styles.name}>Zinc<br/>(锌)</div>
                            </div>
                            {/* Iron */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Fe</div>
                                <div style={styles.name}>Iron<br/>(铁)</div>
                            </div>
                            {/* Steam Reaction Threshold */}
                            <div style={styles.thresholdContainer}>
                                <div style={styles.thresholdLine}></div>
                                <div style={styles.thresholdLabel}>Steam reaction threshold</div>
                            </div>
                            {/* Lead */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Pb</div>
                                <div style={styles.name}>Lead<br/>(铅)</div>
                            </div>
                            {/* Hydrogen (Marker) */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbolMarker}>H</div>
                                <div style={styles.name}>Hydrogen<br/>(氢)</div>
                            </div>
                            {/* Copper */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Cu</div>
                                <div style={styles.name}>Copper<br/>(铜)</div>
                            </div>
                            {/* Silver */}
                            <div style={styles.metalItem}>
                                <div style={styles.symbol}>Ag</div>
                                <div style={styles.name}>Silver<br/>(银)</div>
                            </div>
                        </div>
                        <div style={styles.arrowContainer}>
                            <div style={styles.arrowLine}></div>
                            <div style={styles.arrowHead}></div>
                            <span style={styles.arrowLabel}>Decreasing Reactivity 活动性递减</span>
                        </div>
                    </div>

                    <p>
                        The reactivity series can be used to predict how a metal behaves chemically and its position in the reactivity series.
                        Methods include conducting various experiments. 金属活动性顺序可以帮助我们预测金属的化学属性和他在金属活动性顺序里的位置。
                        我们可以用以下的实验取得金属在金属活动性顺序里的位置。
                        <ol>
                            <li>
                                Metals + Cold water 金属 + 冷水
                                <div id="Reaction-of-metals-with-cold-water">
                                    <BlockMath>Na(s) + H_2O(l) → NaOH(aq) + H_2(g)</BlockMath>
                                    <span>Metals more reactive than carbon</span>
                                </div>
                            </li>
                            <li>
                                Metal + Steam 金属 + 蒸汽
                                <div id="Reaction-of-metals-with-steam">
                                    <BlockMath>Zn(s) + H_2O(g) → ZnO(s) + H_2(g)</BlockMath>
                                </div>
                            </li>
                            <li>
                                Metals + Acid 金属 + 酸
                                <div id="Reaction-of-metals-with-acid">
                                    <BlockMath>Fe(s) + HCl(aq) → FeCl_2(s) + H_2(g)</BlockMath>
                                </div>
                            </li>
                        </ol>
                    </p>
                </div>
                <div id="12.2">
                    <h2>12.2 Impact of reactivity of metals on oxidisation 金属活动性对于氧化反应烈度的影响</h2>
                    <p>
                        The higher the metal is in the reactivity series, the more reactive it is, therefore it reacts more vigorously.=
                    </p>
                    <ReactivityExperiment />
                    
                    {/* Reactivity Summary Table */}
                    <div style={{marginTop: '2rem', overflowX: 'auto'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Element</th>
                                    <th>Cold Water</th>
                                    <th>Steam</th>
                                    <th>Acid</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Potassium</td>
                                    <td>Reacts very violently</td>
                                    <td rowSpan="3">Reacts explosively</td>
                                    <td rowSpan="2">Reacts explosively</td>
                                </tr>
                                <tr>
                                    <td>Sodium</td>
                                    <td>Reacts violently</td>
                                </tr>
                                <tr>
                                    <td>Calcium</td>
                                    <td>Reacts readily</td>
                                    <td>Reacts violently</td>
                                </tr>
                                <tr>
                                    <td>Magnesium</td>
                                    <td>Reacts very slowly</td>
                                    <td rowSpan="2">Reacts violently</td>
                                    <td rowSpan="2">Reacts rapidly</td>
                                </tr>
                                <tr>
                                    <td>Zinc</td>
                                    <td>N/A</td>
                                </tr>
                                <tr>
                                    <td>Iron</td>
                                    <td>N/A</td>
                                    <td>Reacts slowly</td>
                                    <td>Reacts slowly</td>
                                </tr>
                                <tr>
                                    <td>Lead</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>Reacts with HNO₃ only</td>
                                </tr>
                                <tr>
                                    <td>Copper - Silver</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="12.3">
                    <h2>12.3 Impact of reactivity of metals on the reduction of metal oxides 金属活动性对于还原氧化金属的影响</h2>
                    <p>The more reactive a metal is, the more stable its compound is and the more difficult to reduce the metal oxide</p>
                    <div id="12.3.1">
                        <h3>12.3.1 Reduction of Metal Oxides with Carbon and Hydrogen</h3>
                        <p>
                            Carbon would reduce metal oxides that have a lower reactivity than carbon.
                            Hydrogen would reduce metal oxides that have a lower reactivity than Zinc.
                            Only Silver can be reduced by heating.
                        </p>

                        <ol>
                            <li>
                                Reduction with carbon - Produces metal and oxygen
                                <BlockMath>2ZnO(s) + C(s) → 2Zn(s) + O_2(g)</BlockMath>
                            </li>
                            <li>
                                Reduction with hydrogen - Produces metal and hydrogen
                                <p>
                                    <BlockMath>CuO(s) + H_2(g) → Cu(s) + H_2O(g)</BlockMath>
                                </p>
                            </li>
                            <li>
                                Reduction by heating - Produces metal and oxygen
                                <br/>
                                <small className="red">Applies to Silver only!!!</small>
                                <BlockMath>2Ag_2O(s) → 4Ag(s) + O_2(g)</BlockMath>
                            </li>
                        </ol>

                    </div>
                    <div id="12.3.2">
                        <h3>12.3.2 Metal displacement reactions 金属置换反应</h3>
                        <p>A more reactive metal displaces another metal from its compound. 活动性较强的金属能把活动性较弱的金属从其盐溶液中置换出来。</p>

                    </div>
                </div>

            </GlassContainer>
        </Template>
    )
}
