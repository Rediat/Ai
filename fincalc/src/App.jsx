import React from 'react';
import SimpleInterestWidget from './components/widgets/SimpleInterestWidget';
import CompoundInterestWidget from './components/widgets/CompoundInterestWidget';
import PVWidget from './components/widgets/PVWidget';
import FVWidget from './components/widgets/FVWidget';
import AnnuityWidget from './components/widgets/AnnuityWidget';
import IRRWidget from './components/widgets/IRRWidget';
import TVMWidget from './components/widgets/TVMWidget';
import BondWidget from './components/widgets/BondWidget';
import LoanWidget from './components/widgets/LoanWidget';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Financial Dashboard
          </h1>
          <p className="text-white/60 text-lg">Advanced calculations made simple</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TVMWidget />
          <LoanWidget />
          <BondWidget />
          <SimpleInterestWidget />
          <CompoundInterestWidget />
          <PVWidget />
          <FVWidget />
          <AnnuityWidget />
          <IRRWidget />
        </div>

        <footer className="mt-16 text-center text-white/30 text-sm">
          <p>© 2024 Financial Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
