import { useState } from 'react';

export default function ProcessFlow({
    steps,
    direction = 'horizontal',
    interactive = false,
    connections = 'static',
    className = '',
    stepClassName = '',
    onStepClick
}) {
    const [activeStep, setActiveStep] = useState(null);

    const handleStepClick = (step, index) => {
        if (interactive) {
            setActiveStep(activeStep === index ? null : index);
            onStepClick?.(step, index);
        }
    };

    const isHorizontal = direction === 'horizontal';

    return (
        <div className={`process-flow ${className} process-flow--${direction}`}>
            <div className="process-flow-container">
                {steps.map((step, index) => (
                    <div key={step.id || index} className="process-flow-item-wrapper">
                        {/* Connector line */}
                        {index > 0 && (
                            <div 
                                className={`process-flow-connector ${connections}`}
                                style={{
                                    animationDelay: `${index * 0.2}s`
                                }}
                            />
                        )}
                        
                        {/* Step node */}
                        <div
                            className={`
                                process-flow-step 
                                ${stepClassName} 
                                ${interactive ? 'interactive' : ''} 
                                ${activeStep === index ? 'active' : ''}
                            `}
                            onClick={() => handleStepClick(step, index)}
                        >
                            <div className="process-flow-step-number">
                                {step.icon || index + 1}
                            </div>
                            <div className="process-flow-step-content">
                                <h5 className="process-flow-step-title">{step.title}</h5>
                                {step.description && (
                                    <p className="process-flow-step-description">{step.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Expanded details */}
                        {interactive && activeStep === index && step.details && (
                            <div className={`process-flow-details process-flow-details--${direction}`}>
                                {step.details}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
