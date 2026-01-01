import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculateFV } from '../../utils/finance';

const AnnuityWidget = () => {
    const [values, setValues] = useState({ pmt: '', rate: '', nper: '', type: 0 }); // type 0 = end, 1 = begin
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        // Calculate FV of annuity
        // PV is 0
        const fv = calculateFV(values.rate, values.nper, values.pmt, 0, parseInt(values.type));
        setResult(Math.abs(fv).toFixed(2));
    };

    const handleChange = (e, field) => {
        setValues({ ...values, [field]: e.target.value });
    };

    return (
        <Card
            title="Annuity (Future Value)"
            description="Calculate the future value of a series of regular payments."
            formula="FV = P × ((1 + r)^n - 1) / r"
        >
            <div className="space-y-4">
                <Input label="Payment Amount ($)" type="number" value={values.pmt} onChange={(e) => handleChange(e, 'pmt')} placeholder="100" />
                <Input label="Rate per Period (%)" type="number" value={values.rate} onChange={(e) => handleChange(e, 'rate')} placeholder="5" />
                <Input label="Number of Periods" type="number" value={values.nper} onChange={(e) => handleChange(e, 'nper')} placeholder="10" />
                <Select
                    label="Payment Timing"
                    value={values.type}
                    onChange={(e) => handleChange(e, 'type')}
                    options={[
                        { label: 'End of Period (Ordinary)', value: 0 },
                        { label: 'Beginning of Period (Due)', value: 1 }
                    ]}
                />

                <Button onClick={handleCalculate} className="w-full">Calculate</Button>
                {result !== null && <Result label="Future Value of Annuity" value={result} />}
            </div>
        </Card>
    );
};

export default AnnuityWidget;
