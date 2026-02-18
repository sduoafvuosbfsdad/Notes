import { useState, useEffect, useCallback, lazy, Suspense } from 'react';

// Lazy load BlockMath to reduce initial bundle size
const BlockMath = lazy(() => import('./BlockMath.jsx'));

const METALS = [
    { symbol: 'K', name: 'Potassium', chinese: '钾', reactivity: 'very_high' },
    { symbol: 'Na', name: 'Sodium', chinese: '钠', reactivity: 'very_high' },
    { symbol: 'Ca', name: 'Calcium', chinese: '钙', reactivity: 'high' },
    { symbol: 'Mg', name: 'Magnesium', chinese: '镁', reactivity: 'medium' },
    { symbol: 'Zn', name: 'Zinc', chinese: '锌', reactivity: 'medium_low' },
    { symbol: 'Fe', name: 'Iron', chinese: '铁', reactivity: 'low' },
    { symbol: 'Pb', name: 'Lead', chinese: '铅', reactivity: 'very_low' },
    { symbol: 'Cu', name: 'Copper', chinese: '铜', reactivity: 'none' },
    { symbol: 'Ag', name: 'Silver', chinese: '银', reactivity: 'none' },
];

// Reaction info for table display
const REACTION_TABLE = [
    { element: 'Potassium', water: 'Reacts very violently', steam: 'Reacts explosively', acid: 'Reacts explosively' },
    { element: 'Sodium', water: 'Reacts violently', steam: 'Reacts explosively', acid: 'Reacts explosively' },
    { element: 'Calcium', water: 'Reacts readily', steam: 'Reacts explosively', acid: 'Reacts violently' },
    { element: 'Magnesium', water: 'Reacts very slowly', steam: 'Reacts violently', acid: 'Reacts rapidly' },
    { element: 'Zinc', water: 'N/A', steam: 'Reacts violently', acid: 'Reacts rapidly' },
    { element: 'Iron', water: 'N/A', steam: 'Reacts slowly', acid: 'Reacts slowly' },
    { element: 'Lead', water: 'N/A', steam: 'N/A', acid: 'Reacts with HNO₃ only (protective layer forms)' },
    { element: 'Copper - Silver', water: 'N/A', steam: 'N/A', acid: 'N/A' },
];

const REAGENTS = [
    { id: 'water', name: 'Cold Water', chinese: '冷水', icon: '💧' },
    { id: 'steam', name: 'Steam', chinese: '蒸汽', icon: '☁️' },
    { id: 'hcl', name: 'Dilute HCl', chinese: '稀盐酸', icon: '🧪' },
];

// Bubble intensity: 0-3 (0=none, 1=low, 2=medium, 3=high/vigorous)
const REACTIONS = {
    'K-water': {
        equation: '2K(s) + 2H_2O(l) \\rightarrow 2KOH(aq) + H_2(g)',
        description: 'Reacts very violently with explosion!',
        chineseDesc: '非常剧烈反应并爆炸！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'K-steam': {
        equation: '2K(s) + 2H_2O(g) \\rightarrow 2KOH(aq) + H_2(g)',
        description: 'Reacts explosively!',
        chineseDesc: '爆炸性反应！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'Na-water': {
        equation: '2Na(s) + 2H_2O(l) \\rightarrow 2NaOH(aq) + H_2(g)',
        description: 'Reacts violently with explosion!',
        chineseDesc: '剧烈反应并爆炸！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'Na-steam': {
        equation: '2Na(s) + 2H_2O(g) \\rightarrow 2NaOH(aq) + H_2(g)',
        description: 'Reacts explosively!',
        chineseDesc: '爆炸性反应！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'Ca-water': {
        equation: 'Ca(s) + 2H_2O(l) \\rightarrow Ca(OH)_2(aq) + H_2(g)',
        description: 'Reacts readily',
        chineseDesc: '容易反应',
        explosive: false,
        bubbleIntensity: 3,
        shakeIntensity: 2,
    },
    'Ca-steam': {
        equation: 'Ca(s) + 2H_2O(g) \\rightarrow Ca(OH)_2(aq) + H_2(g)',
        description: 'Reacts explosively!',
        chineseDesc: '爆炸性反应！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'Mg-water': {
        equation: 'Mg(s) + 2H_2O(l) \\rightarrow Mg(OH)_2(aq) + H_2(g)',
        description: 'Reacts very slowly',
        chineseDesc: '反应很慢',
        explosive: false,
        bubbleIntensity: 1,
        shakeIntensity: 0,
    },
    'Mg-steam': {
        equation: 'Mg(s) + H_2O(g) \\rightarrow MgO(s) + H_2(g)',
        description: 'Reacts violently',
        chineseDesc: '剧烈反应',
        explosive: false,
        bubbleIntensity: 3,
        shakeIntensity: 2,
    },
    'Zn-steam': {
        equation: 'Zn(s) + H_2O(g) \\rightarrow ZnO(s) + H_2(g)',
        description: 'Reacts violently',
        chineseDesc: '剧烈反应',
        explosive: false,
        bubbleIntensity: 3,
        shakeIntensity: 2,
    },
    'Zn-hcl': {
        equation: 'Zn(s) + 2HCl(aq) \\rightarrow ZnCl_2(aq) + H_2(g)',
        description: 'Reacts rapidly',
        chineseDesc: '快速反应',
        explosive: false,
        bubbleIntensity: 3,
        shakeIntensity: 2,
    },
    'Fe-steam': {
        equation: '3Fe(s) + 4H_2O(g) \\rightarrow Fe_3O_4(s) + 4H_2(g)',
        description: 'Reacts slowly',
        chineseDesc: '缓慢反应',
        explosive: false,
        bubbleIntensity: 1,
        shakeIntensity: 0,
    },
    'Fe-hcl': {
        equation: 'Fe(s) + 2HCl(aq) \\rightarrow FeCl_2(aq) + H_2(g)',
        description: 'Reacts slowly',
        chineseDesc: '缓慢反应',
        explosive: false,
        bubbleIntensity: 1,
        shakeIntensity: 0,
    },
    'Pb-hcl': {
        equation: '\\text{Reacts with HNO}_3\\text{ only}',
        description: 'Reacts with HNO₃ only (protective layer forms)',
        chineseDesc: '仅与硝酸反应（形成保护层）',
        explosive: false,
        bubbleIntensity: 0,
        shakeIntensity: 0,
    },
    // Acid reactions for reactive metals
    'K-hcl': {
        equation: '2K(s) + 2HCl(aq) \\rightarrow 2KCl(aq) + H_2(g)',
        description: 'Reacts explosively!',
        chineseDesc: '爆炸性反应！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'Na-hcl': {
        equation: '2Na(s) + 2HCl(aq) \\rightarrow 2NaCl(aq) + H_2(g)',
        description: 'Reacts explosively!',
        chineseDesc: '爆炸性反应！',
        explosive: true,
        bubbleIntensity: 3,
        shakeIntensity: 3,
    },
    'Ca-hcl': {
        equation: 'Ca(s) + 2HCl(aq) \\rightarrow CaCl_2(aq) + H_2(g)',
        description: 'Reacts violently',
        chineseDesc: '剧烈反应',
        explosive: false,
        bubbleIntensity: 3,
        shakeIntensity: 2,
    },
    'Mg-hcl': {
        equation: 'Mg(s) + 2HCl(aq) \\rightarrow MgCl_2(aq) + H_2(g)',
        description: 'Reacts rapidly',
        chineseDesc: '快速反应',
        explosive: false,
        bubbleIntensity: 3,
        shakeIntensity: 2,
    },
    'no-reaction': {
        equation: '\\text{No reaction}',
        description: 'No reaction',
        chineseDesc: '没有反应',
        explosive: false,
        bubbleIntensity: 0,
        shakeIntensity: 0,
    },
};

function getReactionKey(metal, reagent) {
    const key = `${metal}-${reagent}`;
    if (REACTIONS[key]) return key;
    
    // No reaction cases based on the table
    if (reagent === 'water') {
        if (['Zn', 'Fe', 'Pb', 'Cu', 'Ag'].includes(metal)) {
            return 'no-reaction';
        }
    }
    if (reagent === 'steam') {
        if (['Pb', 'Cu', 'Ag'].includes(metal)) {
            return 'no-reaction';
        }
    }
    if (reagent === 'hcl') {
        // Cu and Ag don't react with HCl
        if (['Cu', 'Ag'].includes(metal)) {
            return 'no-reaction';
        }
    }
    return 'no-reaction';
}

// Get bubble count based on intensity
function getBubbleCount(intensity) {
    switch (intensity) {
        case 3: return 30; // Very vigorous
        case 2: return 18; // Moderate
        case 1: return 8;  // Slow
        default: return 0;
    }
}

// Get shake animation based on intensity
function getShakeAnimation(intensity) {
    switch (intensity) {
        case 3: return 'earthquake-strong 0.5s ease-in-out';
        case 2: return 'earthquake-medium 0.6s ease-in-out';
        case 1: return 'earthquake-weak 0.7s ease-in-out';
        default: return 'none';
    }
}

export default function ReactivityExperiment() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedMetal, setSelectedMetal] = useState(null);
    const [selectedReagent, setSelectedReagent] = useState(null);
    const [isReacting, setIsReacting] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [reaction, setReaction] = useState(null);
    const [explosion, setExplosion] = useState(false);
    const [bubbles, setBubbles] = useState(false);
    const [shakeWidgets, setShakeWidgets] = useState(false);
    const [metalDropped, setMetalDropped] = useState(false);
    const [metalDissolved, setMetalDissolved] = useState(false);

    const toggleExpand = useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    const startExperiment = useCallback(() => {
        if (!selectedMetal || !selectedReagent) return;
        
        const reactionKey = getReactionKey(selectedMetal.symbol, selectedReagent.id);
        const reactionData = REACTIONS[reactionKey];
        
        setReaction(reactionData);
        setIsReacting(true);
        
        // Drop metal animation
        setMetalDropped(true);
        
        // After metal drops, check for reaction
        setTimeout(() => {
            if (reactionData.explosive) {
                setExplosion(true);
                setTimeout(() => setExplosion(false), 1000);
            }
            
            if (reactionData.bubbleIntensity > 0 && reactionKey !== 'no-reaction') {
                setBubbles(true);
            }
            
            // Metal dissolves during reaction
            if (reactionKey !== 'no-reaction') {
                setMetalDissolved(true);
            }
            
            // Trigger widget shake if there's any reaction
            if (reactionData.shakeIntensity > 0) {
                setShakeWidgets(true);
                setTimeout(() => setShakeWidgets(false), 700);
            }
        }, 600); // Wait for drop animation
        
        setTimeout(() => {
            setShowResult(true);
        }, 2500);
    }, [selectedMetal, selectedReagent]);

    const reset = useCallback(() => {
        setSelectedMetal(null);
        setSelectedReagent(null);
        setIsReacting(false);
        setShowResult(false);
        setReaction(null);
        setExplosion(false);
        setBubbles(false);
        setShakeWidgets(false);
        setMetalDropped(false);
        setMetalDissolved(false);
    }, []);



    const styles = {
        container: {
            margin: '2rem 0',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: shakeWidgets ? getShakeAnimation(reaction?.shakeIntensity || 0) : 'none',
            overflow: 'hidden',
        },
        header: {
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.03)',
            transition: 'background 0.2s ease',
        },
        headerHover: {
            background: 'rgba(255, 255, 255, 0.08)',
        },
        headerTitle: {
            fontSize: '1.3rem',
            color: '#fff',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        expandIcon: {
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.6)',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        },
        content: {
            maxHeight: isExpanded ? '2000px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease-out, padding 0.3s ease',
            padding: isExpanded ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem',
        },
        title: {
            fontSize: '1.5rem',
            color: '#fff',
            marginBottom: '1rem',
            textAlign: 'center',
        },
        subtitle: {
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            marginBottom: '1.5rem',
        },
        section: {
            marginBottom: '1.5rem',
            animation: shakeWidgets ? getShakeAnimation(reaction?.shakeIntensity || 0) : 'none',
        },
        sectionTitle: {
            fontSize: '1rem',
            color: '#feca57',
            marginBottom: '0.75rem',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0.75rem',
        },
        metalButton: {
            padding: '0.75rem',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'center',
        },
        metalButtonSelected: {
            borderColor: '#feca57',
            boxShadow: '0 0 20px rgba(254, 202, 87, 0.4)',
            transform: 'scale(1.05)',
        },
        reagentGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.75rem',
        },
        reagentButton: {
            padding: '1rem',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
        },
        reagentButtonSelected: {
            borderColor: '#ff6b6b',
            boxShadow: '0 0 20px rgba(255, 107, 107, 0.4)',
            background: 'rgba(255, 107, 107, 0.2)',
        },
        reagentIcon: {
            fontSize: '1.5rem',
        },
        experimentArea: {
            marginTop: '2rem',
            padding: '2rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '250px',
            position: 'relative',
            overflow: 'visible',
            animation: shakeWidgets ? getShakeAnimation(reaction?.shakeIntensity || 0) : 'none',
        },
        beakerWrapper: {
            position: 'relative',
            width: '120px',
            height: '200px',
        },
        beaker: {
            position: 'absolute',
            bottom: 0,
            width: '120px',
            height: '160px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: 'none',
            borderRadius: '0 0 20px 20px',
            background: 'rgba(200, 230, 255, 0.1)',
            overflow: 'visible',
            zIndex: 10,
        },
        liquid: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: selectedReagent ? '70%' : '0%',
            background: selectedReagent?.id === 'hcl' 
                ? 'rgba(255, 255, 200, 0.6)' 
                : selectedReagent?.id === 'steam'
                ? 'linear-gradient(to top, rgba(200, 200, 200, 0.3) 0%, rgba(240, 240, 240, 0.1) 50%, transparent 100%)'
                : 'rgba(100, 180, 255, 0.5)',
            transition: 'height 0.5s ease',
            borderRadius: '0 0 16px 16px',
        },
        steamEffect: {
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '40px',
            opacity: selectedReagent?.id === 'steam' && isReacting ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
        },
        metalSample: {
            position: 'absolute',
            left: '50%',
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            zIndex: 20,
            opacity: selectedMetal && !metalDissolved ? 1 : 0,
            transform: 'translateX(-50%)',
            top: metalDropped ? '90px' : '-20px',
            transition: metalDropped ? 'top 0.5s ease-in, opacity 0.5s ease' : 'top 0.3s ease-out, opacity 0.3s ease',
        },
        bubble: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)',
            zIndex: 15,
        },
        explosion: {
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ff6b6b 0%, #feca57 30%, transparent 70%)',
            animation: 'explode 0.5s ease-out forwards',
            pointerEvents: 'none',
            zIndex: 25,
        },
        actionButton: {
            marginTop: '1.5rem',
            padding: '0.75rem 2rem',
            borderRadius: '25px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: selectedMetal && selectedReagent ? 'pointer' : 'not-allowed',
            opacity: selectedMetal && selectedReagent ? 1 : 0.5,
            transition: 'all 0.2s ease',
        },
        resetButton: {
            marginTop: '1rem',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer',
        },
        // Translucent overlay over experimentArea
        resultOverlay: {
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            animation: 'overlay-fade-in 0.3s ease-out',
            padding: '2rem',
        },

        overlayTitle: {
            fontSize: '1.2rem',
            color: '#feca57',
            marginBottom: '0.5rem',
            textAlign: 'center',
            cursor: 'pointer',
        },
        overlayDescription: {
            fontSize: '0.95rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.75rem',
            textAlign: 'center',
            lineHeight: '1.5',
            cursor: 'pointer',
        },
        overlayEquation: {
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            margin: '0.75rem 0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '100%',
            cursor: 'pointer',
        },

    };

    // Generate bubbles with variable intensity - starting from liquid surface
    const renderBubbles = () => {
        if (!bubbles || !reaction) return null;
        
        const count = getBubbleCount(reaction.bubbleIntensity);
        const sizes = reaction.bubbleIntensity === 3 ? [6, 12, 18] : 
                      reaction.bubbleIntensity === 2 ? [5, 10, 14] : [4, 8, 10];
        
        return Array.from({ length: count }).map((_, i) => {
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const startLeft = 20 + Math.random() * 60; // Random position across beaker width
            const travelHeight = 120 + Math.random() * 80; // Float up above beaker
            const delay = Math.random() * 2;
            const duration = 1 + Math.random() * 1.5;
            
            return (
                <div
                    key={i}
                    className="bubble"
                    style={{
                        ...styles.bubble,
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${startLeft}px`,
                        bottom: '50px',
                        '--travel-height': `-${travelHeight}px`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            );
        });
    };

    return (
        <div style={styles.container}>
            {/* Collapsible Header */}
            <div 
                style={styles.header} 
                onClick={toggleExpand}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
            >
                <h3 style={styles.headerTitle}>
                    🧪 Reactivity Experiment 反应性实验
                </h3>
                <span style={styles.expandIcon}>▼</span>
            </div>

            {/* Collapsible Content */}
            <div style={styles.content}>
                <p style={styles.subtitle}>
                    Select a metal and a reagent to observe the reaction<br/>
                    选择金属和试剂来观察反应
                </p>

                {/* Metal Selection */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>1. Select Metal 选择金属</h4>
                    <div style={styles.grid}>
                        {METALS.map((metal) => (
                            <button
                                key={metal.symbol}
                                style={{
                                    ...styles.metalButton,
                                    ...(selectedMetal?.symbol === metal.symbol ? styles.metalButtonSelected : {}),
                                }}
                                onClick={() => {
                                    setSelectedMetal(metal);
                                    setIsReacting(false);
                                    setShowResult(false);
                                    setBubbles(false);
                                    setMetalDropped(false);
                                    setMetalDissolved(false);
                                }}
                            >
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{metal.symbol}</div>
                                <div style={{ fontSize: '0.7rem' }}>{metal.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reagent Selection */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>2. Select Reagent 选择试剂</h4>
                    <div style={styles.reagentGrid}>
                        {REAGENTS.map((reagent) => (
                            <button
                                key={reagent.id}
                                style={{
                                    ...styles.reagentButton,
                                    ...(selectedReagent?.id === reagent.id ? styles.reagentButtonSelected : {}),
                                }}
                                onClick={() => {
                                    setSelectedReagent(reagent);
                                    setIsReacting(false);
                                    setShowResult(false);
                                    setBubbles(false);
                                    setMetalDropped(false);
                                    setMetalDissolved(false);
                                }}
                            >
                                <span style={styles.reagentIcon}>{reagent.icon}</span>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{reagent.name}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{reagent.chinese}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Experiment Area */}
                <div style={styles.experimentArea}>
                    <div style={styles.beakerWrapper}>
                        <div style={styles.beaker}>
                            <div style={styles.liquid} />
                        </div>
                        {selectedMetal && (
                            <div style={{
                                ...styles.metalSample,
                                transition: metalDropped 
                                    ? 'top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease 1s' 
                                    : 'top 0.3s ease-out, opacity 0.3s ease',
                            }} />
                        )}
                        {renderBubbles()}
                        {explosion && <div style={styles.explosion} />}
                        {/* Steam effect */}
                        {selectedReagent?.id === 'steam' && (
                            <div style={styles.steamEffect}>
                                <div className="steam-wisp" style={{ left: '20%', animationDelay: '0s' }} />
                                <div className="steam-wisp" style={{ left: '50%', animationDelay: '0.3s' }} />
                                <div className="steam-wisp" style={{ left: '80%', animationDelay: '0.6s' }} />
                            </div>
                        )}
                    </div>

                    {!isReacting ? (
                        <button
                            style={styles.actionButton}
                            disabled={!selectedMetal || !selectedReagent}
                            onClick={startExperiment}
                        >
                            Start Experiment 开始实验
                        </button>
                    ) : (
                        <button style={styles.resetButton} onClick={reset}>
                            Reset 重置
                        </button>
                    )}
                    
                    {/* Result Overlay over experimentArea */}
                    {showResult && reaction && (
                        <div style={styles.resultOverlay} onClick={() => setShowResult(false)}>
                            <h4 style={styles.overlayTitle}>
                                {reaction.explosive ? '💥 ' : reaction.equation === '\\text{No reaction}' ? '❌ ' : '✅ '}
                                Reaction Result 反应结果
                            </h4>
                            <p style={styles.overlayDescription}>
                                {reaction.description}<br/>
                                {reaction.chineseDesc}
                            </p>
                            <div style={styles.overlayEquation}>
                                <Suspense fallback={<span style={{color: 'rgba(255,255,255,0.5)'}}>...</span>}>
                                    <BlockMath>{reaction.equation}</BlockMath>
                                </Suspense>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <style>{`
                .bubble {
                    animation-name: bubble-rise-up;
                    animation-timing-function: ease-out;
                    animation-iteration-count: infinite;
                }
                @keyframes bubble-rise-up {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 0.8;
                    }
                    20% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(var(--travel-height, -150px)) scale(0.4);
                        opacity: 0;
                    }
                }
                .steam-wisp {
                    position: absolute;
                    bottom: 0;
                    width: 20px;
                    height: 60px;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: steam-rise 2s ease-out infinite;
                    filter: blur(4px);
                }
                @keyframes steam-rise {
                    0% {
                        transform: translateY(0) scaleX(1);
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 0.4;
                    }
                    100% {
                        transform: translateY(-80px) scaleX(2);
                        opacity: 0;
                    }
                }
                @keyframes explode {
                    0% {
                        transform: translateX(-50%) scale(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translateX(-50%) scale(1.2);
                        opacity: 0.9;
                    }
                    100% {
                        transform: translateX(-50%) scale(2.5);
                        opacity: 0;
                    }
                }
                @keyframes overlay-fade-in {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                /* Earthquake shake animations for widgets */
                @keyframes earthquake-weak {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    10% { transform: translate(-2px, 1px) rotate(-0.5deg); }
                    20% { transform: translate(2px, -1px) rotate(0.5deg); }
                    30% { transform: translate(-1px, 2px) rotate(-0.3deg); }
                    40% { transform: translate(1px, -2px) rotate(0.3deg); }
                    50% { transform: translate(-2px, -1px) rotate(-0.5deg); }
                    60% { transform: translate(2px, 1px) rotate(0.5deg); }
                    70% { transform: translate(-1px, -2px) rotate(-0.3deg); }
                    80% { transform: translate(1px, 2px) rotate(0.3deg); }
                    90% { transform: translate(-2px, 1px) rotate(-0.5deg); }
                }
                @keyframes earthquake-medium {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    10% { transform: translate(-4px, 2px) rotate(-1deg); }
                    20% { transform: translate(4px, -2px) rotate(1deg); }
                    30% { transform: translate(-3px, 3px) rotate(-0.8deg); }
                    40% { transform: translate(3px, -3px) rotate(0.8deg); }
                    50% { transform: translate(-4px, -2px) rotate(-1deg); }
                    60% { transform: translate(4px, 2px) rotate(1deg); }
                    70% { transform: translate(-3px, -3px) rotate(-0.8deg); }
                    80% { transform: translate(3px, 3px) rotate(0.8deg); }
                    90% { transform: translate(-4px, 2px) rotate(-1deg); }
                }
                @keyframes earthquake-strong {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    10% { transform: translate(-8px, 4px) rotate(-2deg); }
                    20% { transform: translate(8px, -4px) rotate(2deg); }
                    30% { transform: translate(-6px, 6px) rotate(-1.5deg); }
                    40% { transform: translate(6px, -6px) rotate(1.5deg); }
                    50% { transform: translate(-8px, -4px) rotate(-2deg); }
                    60% { transform: translate(8px, 4px) rotate(2deg); }
                    70% { transform: translate(-6px, -6px) rotate(-1.5deg); }
                    80% { transform: translate(6px, 6px) rotate(1.5deg); }
                    90% { transform: translate(-8px, 4px) rotate(-2deg); }
                }
            `}</style>
        </div>
    );
}
