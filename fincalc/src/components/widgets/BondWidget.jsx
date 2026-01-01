import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Result from '../ui/Result';
import { calculateRateTVM } from '../../utils/finance';

const BondWidget = () => {
    const [values, setValues] = useState({
        faceValue: '1000',
        couponRate: '',
        price: '',
        years: '',
        frequency: 2 // Default to Semi-Annual
    });
    const [result, setResult] = useState(null);

    const handleChange = (e, field) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const handleCalculate = () => {
        const face = parseFloat(values.faceValue);
        const coupon = parseFloat(values.couponRate);
        const price = parseFloat(values.price);
        const years = parseFloat(values.years);
        const freq = parseFloat(values.frequency);

        if (isNaN(face) || isNaN(coupon) || isNaN(price) || isNaN(years)) {
            setResult('Invalid Input');
            return;
        }

        const n = years * freq;
        const pmt = (face * (coupon / 100)) / freq;
        const pv = -price; // You pay the price (outflow)
        const fv = face;   // You get the face value back (inflow)

        // Calculate periodic rate
        const periodicRate = calculateRateTVM(n, pmt, pv, fv, 0); // 0 = End type

        if (periodicRate === null) {
            setResult('Error');
        } else {
            // Annualize the rate (Yield to Maturity)
            const ytm = periodicRate * freq;
            setResult(ytm.toFixed(3));
        }
    };

    return (
        <Card
            title="Bond Valuation (YTM)"
            description="Calculate the Yield to Maturity of a bond."
            formula="Find r where PV = Σ C/(1+r)^t + F/(1+r)^n"
        >
            <div className="space-y-4">
                <Input
                    label="Face Value ($)"
                    type="number"
                    value={values.faceValue}
                    onChange={(e) => handleChange(e, 'faceValue')}
                    placeholder="1000"
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Coupon Rate (%)"
                        type="number"
                        value={values.couponRate}
                        onChange={(e) => handleChange(e, 'couponRate')}
                        placeholder="5"
                    />
                    <Input
                        label="Current Price ($)"
                        type="number"
                        value={values.price}
                        onChange={(e) => handleChange(e, 'price')}
                        placeholder="950"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Years to Maturity"
                        type="number"
                        value={values.years}
                        onChange={(e) => handleChange(e, 'years')}
                        placeholder="10"
                    />
                    <Select
                        label="Frequency"
                        value={values.frequency}
                        onChange={(e) => handleChange(e, 'frequency')}
                        options={[
                            { label: 'Annual (1/yr)', value: 1 },
                            { label: 'Semi-Annual (2/yr)', value: 2 },
                            { label: 'Quarterly (4/yr)', value: 4 }
                        ]}
                    />
                </div>

                <Button onClick={handleCalculate} className="w-full">Calculate Yield (YTM)</Button>

                {result !== null && (
                    <Result label="Yield to Maturity (YTM)" value={result + '%'} prefix="" />
                )}
            </div>
        </Card>
    );
};

export default BondWidget;
