import React, { useState, useEffect } from 'react';
import { aminoAcidColors } from '../utils/aminoColors';
import CopyNotification from './CopyNotification';
import '../styles/AlignmentView.css';

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
    const cleanText = text.replace(/\s+/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
      setNotification('Скопировано!');
    });
  };

  const splitChunks = (seq: string) => seq.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  const seq1Chunks = splitChunks(seq1);
  const seq2Chunks = splitChunks(seq2);

  return (
    <div className="alignment-container">
      {seq1Chunks.map((chunk, idx) => (
        <div key={idx} className="alignment-chunk">
          <div
            className="alignment-row-layered"
            onMouseUp={() => {
              const selection = window.getSelection();
              if (selection && selection.toString()) {
                handleCopy(selection.toString());
              }
            }}
          >
            {/* Визуальный слой */}
            <div className="alignment-visual-layer">
              {chunk.split('').map((char, i) => (
                <span
                  key={i}
                  className="alignment-char"
                  style={{ background: aminoAcidColors[char] || 'transparent' }}
                >
                  {char}
                </span>
              ))}
            </div>
            {/* Слой для поиска */}
            <span className="alignment-search-layer">{chunk}</span>
          </div>
          <div
            className="alignment-row-layered"
            onMouseUp={() => {
              const selection = window.getSelection();
              if (selection && selection.toString()) {
                handleCopy(selection.toString());
              }
            }}
          >
            {/* Визуальный слой */}
            <div className="alignment-visual-layer">
              {seq2Chunks[idx]?.split('').map((char, i) => (
                <span
                  key={i}
                  className="alignment-char"
                  style={{ background: char !== chunk[i] ? (aminoAcidColors[char] || 'transparent') : 'transparent' }}
                >
                  {char}
                </span>
              ))}
            </div>
            {/* Слой для поиска */}
            <span className="alignment-search-layer">{seq2Chunks[idx]}</span>
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