import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculateIRR } from '../../utils/finance';

const IRRWidget = () => {
    const [cashFlows, setCashFlows] = useState('-1000, 200, 300, 400, 500'); // Comma separated string
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const flows = cashFlows.split(',').map(v => parseFloat(v.trim())).filter(n => !isNaN(n));
        if (flows.length > 1) {
            const irr = calculateIRR(flows);
            setResult(irr !== null ? irr.toFixed(2) : 'No Solution');
        } else {
            setResult(null);
        }
    };

    return (
        <Card
            title="Internal Rate of Return (IRR)"
            description="Calculate the specific discount rate where NPV equals zero."
            formula="NPV = Σ [C / (1+r)^t] = 0"
        >
            <div className="space-y-4">
                <p className="text-sm text-white/60">Enter cash flows separated by commas. First value is usually negative (investment).</p>
                <Input
                    label="Cash Flows"
                    value={cashFlows}
                    onChange={(e) => setCashFlows(e.target.value)}
                    placeholder="-1000, 200, 300..."
                />

                <Button onClick={handleCalculate} className="w-full">Calculate</Button>
                {result !== null && <Result label="IRR" value={result + '%'} prefix="" />}
            </div>
        </Card>
    );
};

export default IRRWidget;
