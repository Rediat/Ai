/**
 * Financial Calculation Utilities
 */

// Simple Interest: I = P * r * t
export const calculateSimpleInterest = (principal, rate, time) => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    if (isNaN(p) || isNaN(r) || isNaN(t)) return 0;
    return p * r * t;
};

// Compound Interest: A = P(1 + r/n)^(nt)
export const calculateCompoundInterest = (principal, rate, timesPerYear, years) => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(timesPerYear);
    const t = parseFloat(years);
    if (isNaN(p) || isNaN(r) || isNaN(n) || isNaN(t)) return 0;

    const amount = p * Math.pow(1 + r / n, n * t);
    return amount - p; // Return just the interest, or total amount? Let's return object.
};

export const calculateCompoundTotal = (principal, rate, timesPerYear, years) => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(timesPerYear);
    const t = parseFloat(years);
    if (isNaN(p) || isNaN(r) || isNaN(n) || isNaN(t)) return 0;
    return p * Math.pow(1 + r / n, n * t);
}

// Future Value of a Lump Sum: FV = PV * (1 + r)^n
export const calculateFV = (rate, nper, pmt, pv, type = 0) => {
    // Excel-like FV function
    // type: 0 = end of period, 1 = beginning of period
    const r = parseFloat(rate) / 100;
    const n = parseFloat(nper);
    const p = parseFloat(pmt); // Payment each period
    const v = parseFloat(pv);  // Present Value

    if (r === 0) return -(v + p * n);

    const term = Math.pow(1 + r, n);
    let fv;
    if (type === 1) { // Beginning
        fv = -v * term - (p * (1 + r) * (term - 1) / r);
    } else { // End
        fv = -v * term - (p * (term - 1) / r);
    }
    return fv;
};

// Present Value: PV similar to Excel
export const calculatePV = (rate, nper, pmt, fv, type = 0) => {
    const r = parseFloat(rate) / 100;
    const n = parseFloat(nper);
    const p = parseFloat(pmt);
    const f = parseFloat(fv);

    if (r === 0) return -(f + p * n);

    const term = Math.pow(1 + r, n);
    let pv;
    if (type === 1) { // Beginning
        pv = -(f + (p * (1 + r) * (term - 1) / r)) / term;
    } else {
        pv = -(f + (p * (term - 1) / r)) / term;
    }
    return pv;
};

// Internal Rate of Return (IRR)
// Uses Newton-Raphson approximation
export const calculateIRR = (values, guess = 0.1) => {
    // values is array of cash flows [-1000, 200, 300...]
    const maxIter = 100;
    const tolerance = 0.00001;
    let x = guess;

    for (let i = 0; i < maxIter; i++) {
        let npv = 0;
        let dNpv = 0; // derivative of NPV

        for (let j = 0; j < values.length; j++) {
            const v = values[j];
            npv += v / Math.pow(1 + x, j);
            dNpv -= (j * v) / Math.pow(1 + x, j + 1);
        }

        if (Math.abs(npv) < tolerance) return x * 100; // Return percentage

        if (dNpv === 0) return null; // Avoid division by zero

        const newX = x - npv / dNpv;
        if (Math.abs(newX - x) < tolerance) return newX * 100;
        x = newX;
    }
    return null; // No solution found
};

// PMT: Payment for a loan or annuity
export const calculatePMT = (rate, nper, pv, fv = 0, type = 0) => {
    const r = parseFloat(rate) / 100;
    const n = parseFloat(nper);
    const p = parseFloat(pv);
    const f = parseFloat(fv);

    if (isNaN(r) || isNaN(n) || isNaN(p) || isNaN(f)) return 0;

    if (r === 0) return -(p + f) / n;

    const term = Math.pow(1 + r, n);
    let pmt;
    if (type === 1) { // Beginning
        pmt = -(f + p * term) / ((1 + r) * (term - 1) / r);
    } else { // End
        pmt = -(f + p * term) / ((term - 1) / r);
    }
    return pmt;
};

// NPER: Number of periods
export const calculateNPER = (rate, pmt, pv, fv = 0, type = 0) => {
    const r = parseFloat(rate) / 100;
    const p = parseFloat(pmt);
    const v = parseFloat(pv);
    const f = parseFloat(fv);

    if (isNaN(r) || isNaN(p) || isNaN(v) || isNaN(f)) return 0;

    if (r === 0) return -(v + f) / p;

    let num, den;
    if (type === 1) { // Beginning
        num = p * (1 + r) / r - f;
        den = v + p * (1 + r) / r;
    } else { // End
        num = p / r - f;
        den = v + p / r;
    }

    // NPER = log(num / den) / log(1 + r)
    // Validate log arguments > 0
    if (num / den <= 0) return 0; // Error case

    return Math.log(num / den) / Math.log(1 + r);
};

// RATE: Interest rate (Iterative Newton-Raphson)
export const calculateRateTVM = (nper, pmt, pv, fv = 0, type = 0, guess = 0.1) => {
    const n = parseFloat(nper);
    const p = parseFloat(pmt);
    const v = parseFloat(pv);
    const f = parseFloat(fv);

    const maxIter = 100;
    const tolerance = 0.000001;
    let r = guess;

    for (let i = 0; i < maxIter; i++) {
        let f_r, df_r;
        const term = Math.pow(1 + r, n);

        if (type === 1) { // Beginning
            // y = pv * (1+r)^n + pmt * (1+r) * ((1+r)^n - 1)/r + fv
            f_r = v * term + p * (1 + r) * (term - 1) / r + f;
            // Derivative is complex, using approximation or explicit if possible.
            // Simplified derivative or secant method is often easier but let's try difference quotient for simplicity/robustness if direct derivative is error prone.
            // Let's use strict derivative for better convergence if possible, or robust generic solver.
            // For now, let's implement the standard formula derivative approximation for robustness
            // Actually, let's use the Secant method as it doesn't require derivative derivation
            // Not implemented in this step to keep it simple, will use small perturbation for derivative
        } else { // End
            // y = pv * (1+r)^n + pmt * ((1+r)^n - 1)/r + fv
            f_r = v * term + p * (term - 1) / r + f;
        }

        // Numerical derivative
        const delta = 0.00001;
        let r_delta = r + delta;
        let term_delta = Math.pow(1 + r_delta, n);
        let f_r_delta;
        if (type === 1) {
            f_r_delta = v * term_delta + p * (1 + r_delta) * (term_delta - 1) / r_delta + f;
        } else {
            f_r_delta = v * term_delta + p * (term_delta - 1) / r_delta + f;
        }

        df_r = (f_r_delta - f_r) / delta;

        if (Math.abs(f_r) < tolerance) return r * 100;
        if (Math.abs(df_r) < 1e-9) break;

        const new_r = r - f_r / df_r;
        if (Math.abs(new_r - r) < tolerance) return new_r * 100;
        r = new_r;
    }
    return null;
};
