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
    <div style={{
      marginTop: 32,
      maxWidth: '100%',
      overflowX: 'auto',
      padding: '16px',
      background: '#f8f9fa',
      borderRadius: 12,
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    }}>
      {seq1Chunks.map((chunk, idx) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {chunk.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  background: aminoAcidColors[char] || 'transparent',
                  color: '#222',
                  padding: '4px 8px',
                  borderRadius: 6,
                  fontFamily: 'monospace',
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  minWidth: 'clamp(14px, 2vw, 18px)',
                  textAlign: 'center',
                  userSelect: 'text',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => handleCopy(char)}
              >
                {char}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 4 }}>
            {seq2Chunks[idx]?.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  background: char !== chunk[i] ? (aminoAcidColors[char] || 'transparent') : 'transparent',
                  color: '#222',
                  padding: '4px 8px',
                  borderRadius: 6,
                  fontFamily: 'monospace',
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  minWidth: 'clamp(14px, 2vw, 18px)',
                  textAlign: 'center',
                  userSelect: 'text',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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