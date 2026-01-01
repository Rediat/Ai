import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculateFV } from '../../utils/finance';

const FVWidget = () => {
  const [values, setValues] = useState({ pv: '', rate: '', nper: '' });
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // PMT is 0 for lump sum FV
    const fv = calculateFV(values.rate, values.nper, 0, values.pv, 0);
    setResult(Math.abs(fv).toFixed(2));
  };

  const handleChange = (e, field) => {
    setValues({ ...values, [field]: e.target.value });
  };

  return (
    <Card
      title="Future Value (Lump Sum)"
      description="Calculate the future value of a current lump sum investment."
      formula="FV = PV × (1 + r)^n"
    >
      <div className="space-y-4">
        <Input label="Present Value ($)" type="number" value={values.pv} onChange={(e) => handleChange(e, 'pv')} placeholder="1000" />
        <Input label="Annual Rate (%)" type="number" value={values.rate} onChange={(e) => handleChange(e, 'rate')} placeholder="5" />
        <Input label="Number of Periods" type="number" value={values.nper} onChange={(e) => handleChange(e, 'nper')} placeholder="10" />

        <Button onClick={handleCalculate} className="w-full">Calculate</Button>
        {result !== null && <Result label="Future Value" value={result} />}
      </div>
    </Card>
  );
};

export default FVWidget;
