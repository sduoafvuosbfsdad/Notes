import React from 'react';

export default function Template({ children }) {
    return (
        <>
            {/* Animated Background */}
            <div className="bg-container">
                {/* Slow-moving gradient mesh */}
                <div className="bg-gradient-mesh"></div>

                {/* Subtle floating orbs */}
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <div className="orb orb-4"></div>

                {/* Particle field */}
                <div className="particles">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="particle"></div>
                    ))}
                </div>

                {/* Noise texture for depth */}
                <div className="bg-noise"></div>

                {/* Frosted glass overlay */}
                <div className="bg-glass"></div>
            </div>

            {/* Ambient focus light - subtle spotlight for reading */}
            <div className="ambient-focus-light"></div>

            {/* Main Content */}
            <main>
                {children}
            </main>
        </>
    );
}
