import { useState, useMemo } from 'react';

export default function RelationshipMap({
    nodes,
    connections,
    layout = 'bipartite',
    interactive = true,
    className = '',
    nodeClassName = '',
    onNodeClick
}) {
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    // Get connected nodes
    const getConnectedNodes = (nodeId) => {
        const connected = new Set();
        connections.forEach(conn => {
            if (conn.from === nodeId) connected.add(conn.to);
            if (conn.to === nodeId) connected.add(conn.from);
        });
        return connected;
    };

    // Check if connection should be highlighted
    const isConnectionActive = (conn) => {
        if (!hoveredNode && !selectedNode) return true;
        const activeNode = hoveredNode || selectedNode;
        return conn.from === activeNode || conn.to === activeNode;
    };

    // Check if node should be highlighted
    const isNodeHighlighted = (nodeId) => {
        if (!hoveredNode && !selectedNode) return true;
        const activeNode = hoveredNode || selectedNode;
        if (nodeId === activeNode) return true;
        return getConnectedNodes(activeNode).has(nodeId);
    };

    const handleNodeClick = (node) => {
        if (interactive) {
            setSelectedNode(selectedNode === node.id ? null : node.id);
            onNodeClick?.(node);
        }
    };

    // Separate nodes by type for bipartite layout
    const nodeGroups = useMemo(() => {
        if (layout !== 'bipartite') return { all: nodes };
        
        const types = [...new Set(nodes.map(n => n.type))];
        return types.reduce((acc, type) => {
            acc[type] = nodes.filter(n => n.type === type);
            return acc;
        }, {});
    }, [nodes, layout]);

    // Calculate node positions based on layout
    const getNodePosition = (node, index, total) => {
        const spacing = 100 / (total + 1);
        
        switch (layout) {
            case 'bipartite': {
                const types = Object.keys(nodeGroups);
                const typeIndex = types.indexOf(node.type);
                const x = typeIndex === 0 ? 20 : 80;
                const y = spacing * (index + 1);
                return { x, y };
            }
            case 'radial': {
                const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
                const radius = 35;
                return {
                    x: 50 + radius * Math.cos(angle),
                    y: 50 + radius * Math.sin(angle)
                };
            }
            case 'hierarchical':
            default: {
                const col = index % 3;
                const row = Math.floor(index / 3);
                return {
                    x: 20 + col * 30,
                    y: 15 + row * 25
                };
            }
        }
    };

    return (
        <div className={`relationship-map ${className} relationship-map--${layout}`}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Connection lines */}
                {connections.map((conn, idx) => {
                    const fromNode = nodes.find(n => n.id === conn.from);
                    const toNode = nodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    const fromTypeNodes = nodeGroups[fromNode.type] || nodes;
                    const toTypeNodes = nodeGroups[toNode.type] || nodes;
                    
                    const fromPos = getNodePosition(
                        fromNode, 
                        fromTypeNodes.indexOf(fromNode), 
                        fromTypeNodes.length
                    );
                    const toPos = getNodePosition(
                        toNode, 
                        toTypeNodes.indexOf(toNode), 
                        toTypeNodes.length
                    );

                    const isActive = isConnectionActive(conn);
                    const strokeWidth = conn.strength === 'strong' ? 0.8 : 
                                       conn.strength === 'medium' ? 0.5 : 0.3;

                    return (
                        <line
                            key={idx}
                            x1={fromPos.x}
                            y1={fromPos.y}
                            x2={toPos.x}
                            y2={toPos.y}
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            opacity={isActive ? 0.6 : 0.1}
                            className={`connection ${isActive ? 'active' : ''}`}
                        />
                    );
                })}

                {/* Nodes */}
                {Object.entries(nodeGroups).flatMap(([type, typeNodes]) => 
                    typeNodes.map((node, idx) => {
                        const pos = getNodePosition(node, idx, typeNodes.length);
                        const isHighlighted = isNodeHighlighted(node.id);
                        const isSelected = selectedNode === node.id;

                        return (
                            <g
                                key={node.id}
                                className={`
                                    node 
                                    ${nodeClassName} 
                                    node--${node.type}
                                    ${isHighlighted ? 'highlighted' : 'dimmed'}
                                    ${isSelected ? 'selected' : ''}
                                    ${interactive ? 'interactive' : ''}
                                `}
                                transform={`translate(${pos.x}, ${pos.y})`}
                                onMouseEnter={() => interactive && setHoveredNode(node.id)}
                                onMouseLeave={() => interactive && setHoveredNode(null)}
                                onClick={() => handleNodeClick(node)}
                                style={{ cursor: interactive ? 'pointer' : 'default' }}
                            >
                                <circle
                                    r={isSelected ? 4 : 3}
                                    fill="var(--glass-bg, rgba(255,255,255,0.2))"
                                    stroke="currentColor"
                                    strokeWidth={0.5}
                                />
                                <text
                                    y={6}
                                    textAnchor="middle"
                                    fontSize="3"
                                    fill="currentColor"
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })
                )}
            </svg>

            {/* Legend */}
            <div className="relationship-legend">
                {Object.keys(nodeGroups).map(type => (
                    <span key={type} className={`legend-item legend-item--${type}`}>
                        ● {type}
                    </span>
                ))}
            </div>
        </div>
    );
}
