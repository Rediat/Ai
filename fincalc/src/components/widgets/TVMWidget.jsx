import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Result from '../ui/Result';
import { calculatePV, calculateFV, calculatePMT, calculateNPER, calculateRateTVM } from '../../utils/finance';

const TVMWidget = () => {
    const [values, setValues] = useState({
        n: '',
        iy: '',
        pv: '',
        pmt: '',
        fv: '',
        type: 0 // 0 = End, 1 = Begin
    });
    const [solveFor, setSolveFor] = useState('fv');
    const [result, setResult] = useState(null);

    const handleChange = (e, field) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const handleCalculate = () => {
        const { n, iy, pv, pmt, fv, type } = values;
        let res = 0;

        switch (solveFor) {
            case 'fv':
                res = calculateFV(iy, n, pmt, pv, type);
                break;
            case 'pv':
                res = calculatePV(iy, n, pmt, fv, type);
                break;
            case 'pmt':
                res = calculatePMT(iy, n, pv, fv, type);
                break;
            case 'n':
                res = calculateNPER(iy, pmt, pv, fv, type);
                break;
            case 'iy':
                res = calculateRateTVM(n, pmt, pv, fv, type);
                break;
            default:
                break;
        }
        setResult(res !== null ? res.toFixed(4) : 'Error');
    };

    const inputFields = [
        { id: 'n', label: 'N (Periods)' },
        { id: 'iy', label: 'I/Y (Rate %)' },
        { id: 'pv', label: 'PV (Present Value)' },
        { id: 'pmt', label: 'PMT (Payment)' },
        { id: 'fv', label: 'FV (Future Value)' }
    ];

    return (
        <Card
            title="Time Value of Money (TVM)"
            description="Universal solver for N, I/Y, PV, PMT, FV. Enter 4 knowns to solve for the 5th."
            formula="TVM Equation"
            className="md:col-span-2 lg:col-span-3"
        >
            <div className="space-y-6">
                <div className="flex flex-wrap gap-4 items-center justify-between bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-4 flex-1">
                        <label className="text-white/80 font-medium whitespace-nowrap">Solve For:</label>
                        <Select
                            value={solveFor}
                            onChange={(e) => setSolveFor(e.target.value)}
                            options={inputFields.map(f => ({ label: f.label, value: f.id }))}
                            className="w-full md:w-48"
                        />
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                        <label className="text-white/80 font-medium whitespace-nowrap">Mode:</label>
                        <Select
                            value={values.type}
                            onChange={(e) => handleChange(e, 'type')}
                            options={[
                                { label: 'End (Ordinary)', value: 0 },
                                { label: 'Begin (Due)', value: 1 }
                            ]}
                            className="w-full md:w-48"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {inputFields.map((field) => (
                        <div key={field.id} className={solveFor === field.id ? 'opacity-50 pointer-events-none' : ''}>
                            <Input
                                label={field.label}
                                type="number"
                                value={values[field.id]}
                                onChange={(e) => handleChange(e, field.id)}
                                placeholder={solveFor === field.id ? 'Solving...' : '0'}
                                className={solveFor === field.id ? 'border-purple-500/50 bg-purple-500/10' : ''}
                            />
                        </div>
                    ))}
                </div>

                <Button onClick={handleCalculate} className="w-full py-3 text-lg">Calculate {inputFields.find(f => f.id === solveFor)?.label.split(' ')[0]}</Button>

                {result !== null && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl border border-white/10 text-center animate-in fade-in slide-in-from-bottom-4">
                        <span className="text-white/60 block mb-1">Result ({inputFields.find(f => f.id === solveFor)?.label})</span>
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                            {result}
                            {solveFor === 'iy' ? '%' : ''}
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default TVMWidget;
