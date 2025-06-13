import React, { useState } from 'react';
import AminoInputForm from './components/AminoInputForm';
import AlignmentView from './components/AlignmentView';

const App: React.FC = () => {
  const [seq1, setSeq1] = useState<string | null>(null);
  const [seq2, setSeq2] = useState<string | null>(null);

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(to bottom, #f5f7fa, #c3cfe2)',
      minHeight: '100vh',
      boxSizing: 'border-box',
    }}>
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: '24px',
          textAlign: 'center',
          fontWeight: '600',
        }}>
          Amino Aligner
        </h1>
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