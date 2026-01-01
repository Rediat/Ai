import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculateCompoundInterest, calculateCompoundTotal } from '../../utils/finance';

const CompoundInterestWidget = () => {
    const [values, setValues] = useState({ principal: '', rate: '', timesPerYear: 12, years: '' });
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const interest = calculateCompoundInterest(values.principal, values.rate, values.timesPerYear, values.years);
        const total = calculateCompoundTotal(values.principal, values.rate, values.timesPerYear, values.years);
        setResult({ interest: interest.toFixed(2), total: total.toFixed(2) });
    };

    const handleChange = (e, field) => {
        setValues({ ...values, [field]: e.target.value });
    };

    return (
        <Card
            title="Compound Interest"
            description="Calculate compound interest and total amount with variable compounding frequency."
            formula="A = P(1 + r/n)^(nt)"
        >
            <div className="space-y-4">
                <Input label="Principal Amount ($)" type="number" value={values.principal} onChange={(e) => handleChange(e, 'principal')} placeholder="1000" />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Annual Rate (%)" type="number" value={values.rate} onChange={(e) => handleChange(e, 'rate')} placeholder="5" />
                    <Input label="Time (Years)" type="number" value={values.years} onChange={(e) => handleChange(e, 'years')} placeholder="5" />
                </div>
                <Select
                    label="Frequency"
                    value={values.timesPerYear}
                    onChange={(e) => handleChange(e, 'timesPerYear')}
                    options={[
                        { label: 'Annually', value: 1 },
                        { label: 'Semi-Annually', value: 2 },
                        { label: 'Quarterly', value: 4 },
                        { label: 'Monthly', value: 12 },
                        { label: 'Daily', value: 365 }
                    ]}
                />

                <Button onClick={handleCalculate} className="w-full">Calculate</Button>
                {result && (
                    <>
                        <Result label="Total Interest" value={result.interest} />
                        <Result label="Total Amount" value={result.total} />
                    </>
                )}
            </div>
        </Card>
    );
};

export default CompoundInterestWidget;
