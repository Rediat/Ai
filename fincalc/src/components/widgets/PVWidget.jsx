import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Result from '../ui/Result';
import { calculatePV } from '../../utils/finance';

const PVWidget = () => {
  const [values, setValues] = useState({ fv: '', rate: '', nper: '' });
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // PMT is 0 for lump sum PV
    const pv = calculatePV(values.rate, values.nper, 0, values.fv, 0);
    setResult(Math.abs(pv).toFixed(2));
  };

  const handleChange = (e, field) => {
    setValues({ ...values, [field]: e.target.value });
  };

  return (
    <Card
      title="Present Value (Lump Sum)"
      description="Calculate today's value of a future lump sum payment."
      formula="PV = FV / (1 + r)^n"
    >
      <div className="space-y-4">
        <Input label="Future Value ($)" type="number" value={values.fv} onChange={(e) => handleChange(e, 'fv')} placeholder="1000" />
        <Input label="Annual Rate (%)" type="number" value={values.rate} onChange={(e) => handleChange(e, 'rate')} placeholder="5" />
        <Input label="Number of Periods" type="number" value={values.nper} onChange={(e) => handleChange(e, 'nper')} placeholder="10" />

        <Button onClick={handleCalculate} className="w-full">Calculate</Button>
        {result !== null && <Result label="Present Value" value={result} />}
      </div>
    </Card>
  );
};

export default PVWidget;
