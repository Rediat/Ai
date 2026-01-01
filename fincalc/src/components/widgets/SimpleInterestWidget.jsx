import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculateSimpleInterest } from '../../utils/finance';

const SimpleInterestWidget = () => {
    const [values, setValues] = useState({ principal: '', rate: '', time: '' });
    const [result, setResult] = useState(0);

    const handleCalculate = () => {
        const interest = calculateSimpleInterest(values.principal, values.rate, values.time);
        setResult(interest.toFixed(2));
    };

    const handleChange = (e, field) => {
        setValues({ ...values, [field]: e.target.value });
    };

    return (
        <Card
            title="Simple Interest"
            description="Calculate simple interest earned on a principal amount over time."
            formula="I = P × r × t"
        >
            <div className="space-y-4">
                <Input label="Principal Amount ($)" type="number" value={values.principal} onChange={(e) => handleChange(e, 'principal')} placeholder="1000" />
                <Input label="Annual Rate (%)" type="number" value={values.rate} onChange={(e) => handleChange(e, 'rate')} placeholder="5" />
                <Input label="Time (Years)" type="number" value={values.time} onChange={(e) => handleChange(e, 'time')} placeholder="1" />

                <Button onClick={handleCalculate} className="w-full">Calculate</Button>
                <Result label="Total Interest" value={result} />
            </div>
        </Card>
    );
};

export default SimpleInterestWidget;
