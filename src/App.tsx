import React, { useState } from 'react';
import AminoInputForm from './components/AminoInputForm';
import AlignmentView from './components/AlignmentView';

const App: React.FC = () => {
  const [seq1, setSeq1] = useState<string | null>(null);
  const [seq2, setSeq2] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Amino Aligner</h1>
      <AminoInputForm onSubmit={(s1, s2) => { setSeq1(s1); setSeq2(s2); }} />
      {seq1 && seq2 && (
        <AlignmentView seq1={seq1} seq2={seq2} />
      )}
    </div>
  );
};

export default App; 