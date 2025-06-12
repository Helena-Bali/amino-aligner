import React from 'react';
import { aminoAcidColors } from '../utils/aminoColors';

interface Props {
  seq1: string;
  seq2: string;
}

const AlignmentView: React.FC<Props> = ({ seq1, seq2 }) => {
  if (!seq1 || !seq2) return null;


  const chunkSize = 40;
  const splitChunks = (seq: string) => seq.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  const seq1Chunks = splitChunks(seq1);
  const seq2Chunks = splitChunks(seq2);

  return (
    <div style={{ marginTop: 32 }}>
      {seq1Chunks.map((chunk, idx) => (
        <div key={idx} style={{ marginBottom: 2 }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {chunk.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  background: aminoAcidColors[char] || 'transparent',
                  color: '#222',
                  padding: '2px 6px',
                  borderRadius: 4,
                  margin: 1,
                  fontFamily: 'monospace',
                  fontSize: 18,
                  minWidth: 18,
                  textAlign: 'center',
                  userSelect: 'text',
                }}
              >
                {char}
              </span>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {seq2Chunks[idx]?.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  background: char !== chunk[i] ? (aminoAcidColors[char] || 'transparent') : 'transparent',
                  color: '#222',
                  padding: '2px 6px',
                  borderRadius: 4,
                  margin: 1,
                  fontFamily: 'monospace',
                  fontSize: 18,
                  minWidth: 18,
                  textAlign: 'center',
                  userSelect: 'text',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlignmentView; 