import React, { useState } from 'react';
import AminoInputForm from './components/AminoInputForm';
import AlignmentView from './components/AlignmentView';
import './styles/App.css';

const App: React.FC = () => {
  const [seq1, setSeq1] = useState<string | null>(null);
  const [seq2, setSeq2] = useState<string | null>(null);

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Amino Aligner</h1>
        <AminoInputForm onSubmit={(s1, s2) => { setSeq1(s1); setSeq2(s2); }} />
        {seq1 && seq2 && (
          <div style={{ marginTop: '32px' }}>
            <AlignmentView seq1={seq1} seq2={seq2} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 