import { useState } from 'react';

export default function TabGroup({
    tabs,
    defaultTab,
    appearance = 'pills',
    className = '',
    tabListClassName = '',
    tabPanelClassName = '',
    onTabChange
}) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    const activeTabData = tabs.find(t => t.id === activeTab);

    return (
        <div className={`tab-group ${className} tab-group--${appearance}`}>
            <div className={`tab-list ${tabListClassName}`} role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`tab-panel-${tab.id}`}
                        id={`tab-${tab.id}`}
                    >
                        {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div
                className={`tab-panel ${tabPanelClassName}`}
                role="tabpanel"
                id={`tab-panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
            >
                {activeTabData?.content}
            </div>
        </div>
    );
}
