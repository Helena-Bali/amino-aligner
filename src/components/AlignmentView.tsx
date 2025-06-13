import React, { useState, useEffect } from 'react';
import { aminoAcidColors } from '../utils/aminoColors';
import CopyNotification from './CopyNotification';

interface Props {
  seq1: string;
  seq2: string;
}

const AlignmentView: React.FC<Props> = ({ seq1, seq2 }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [chunkSize, setChunkSize] = useState(40);

  useEffect(() => {
    const updateChunkSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setChunkSize(20);
      } else if (width < 768) {
        setChunkSize(30);
      } else {
        setChunkSize(40);
      }
    };

    updateChunkSize();
    window.addEventListener('resize', updateChunkSize);
    return () => window.removeEventListener('resize', updateChunkSize);
  }, []);

  if (!seq1 || !seq2) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification('Скопировано!');
    });
  };

  const splitChunks = (seq: string) => seq.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  const seq1Chunks = splitChunks(seq1);
  const seq2Chunks = splitChunks(seq2);

  return (
    <div style={{ marginTop: 32, maxWidth: '100%', overflowX: 'auto' }}>
      {seq1Chunks.map((chunk, idx) => (
        <div key={idx} style={{ marginBottom: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
            {chunk.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  background: aminoAcidColors[char] || 'transparent',
                  color: '#222',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontFamily: 'monospace',
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  minWidth: 'clamp(14px, 2vw, 18px)',
                  textAlign: 'center',
                  userSelect: 'text',
                  cursor: 'pointer',
                }}
                onClick={() => handleCopy(char)}
              >
                {char}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
            {seq2Chunks[idx]?.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  background: char !== chunk[i] ? (aminoAcidColors[char] || 'transparent') : 'transparent',
                  color: '#222',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontFamily: 'monospace',
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  minWidth: 'clamp(14px, 2vw, 18px)',
                  textAlign: 'center',
                  userSelect: 'text',
                  cursor: 'pointer',
                }}
                onClick={() => handleCopy(char)}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      ))}
      {notification && (
        <CopyNotification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default AlignmentView; 