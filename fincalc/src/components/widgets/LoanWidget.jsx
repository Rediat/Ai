import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculatePMT, calculateFV } from '../../utils/finance';

const LoanWidget = () => {
    const [values, setValues] = useState({
        amount: '10000',
        rate: '5',
        term: '5', // Years
        paymentsMade: '12' // Months
    });
    const [result, setResult] = useState(null);

    const handleChange = (e, field) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const handleCalculate = () => {
        const p = parseFloat(values.amount);
        const r = parseFloat(values.rate);
        const t = parseFloat(values.term);
        const made = parseFloat(values.paymentsMade);

        if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(made)) {
            setResult(null);
            return;
        }

        // Monthly Rate and Total Months
        const ratePerMonth = r / 12; // passed as percentage to functions usually, but calculatePMT takes annual %
        // Wait, calculatePMT takes (rate, nper, ...). finance.js expects rate as percent (e.g. 5).
        // So monthly rate input to utility should be (5 / 12).
        
        const monthlyRatePct = r / 12;
        const totalMonths = t * 12;

        // 1. Calculate Monthly Payment (EMI)
        // PV = Loan Amount (positive), FV = 0
        const emi = calculatePMT(monthlyRatePct, totalMonths, -p, 0, 0); 
        // Note: PV passed as negative to standard formula usually implies inflow? 
        // Let's check logic: if rate=0, pmt = -(p+f)/n. if p is -1000, pmt = 1000/n (positive payment).
        // So passing -p gives positive PMT. 

        // 2. Calculate Outstanding Balance
        // We want FV after 'made' payments
        // PV = -p (same convention), PMT = emi (positive), N = made
        const balance = calculateFV(monthlyRatePct, made, emi, -p, 0);

        setResult({
            emi: emi.toFixed(2),
            balance: Math.abs(balance).toFixed(2),
            progress: ((made / totalMonths) * 100).toFixed(1)
        });
    };

    return (
        <Card 
            title="Loan Calculator" 
            description="Calculate monthly payments and outstanding loan balance."
            formula="Bal = FV(Rate, N, Pmt, -Loan)"
        >
            <div className="space-y-4">
                <Input 
                    label="Loan Amount ($)" 
                    type="number" 
                    value={values.amount} 
                    onChange={(e) => handleChange(e, 'amount')} 
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input 
                        label="Annual Rate (%)" 
                        type="number" 
                        value={values.rate} 
                        onChange={(e) => handleChange(e, 'rate')} 
                    />
                    <Input 
                        label="Term (Years)" 
                        type="number" 
                        value={values.term} 
                        onChange={(e) => handleChange(e, 'term')} 
                    />
                </div>
                <Input 
                    label="Payments Made (Months)" 
                    type="number" 
                    value={values.paymentsMade} 
                    onChange={(e) => handleChange(e, 'paymentsMade')} 
                />

                <Button onClick={handleCalculate} className="w-full">Calculate Balance</Button>
                
                {result && (
                    <>
                        <Result label="Monthly Payment" value={result.emi} />
                        <Result label="Outstanding Balance" value={result.balance} />
                        <div className="mt-2 text-xs text-white/50 text-center">
                            Loan Progress: {result.progress}% time elapsed
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default LoanWidget;
