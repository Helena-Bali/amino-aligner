import React, { useState } from 'react';

const AMINO_REGEX = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

interface Props {
  onSubmit: (seq1: string, seq2: string) => void;
}

const AminoInputForm: React.FC<Props> = ({ onSubmit }) => {
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!seq1 || !seq2) {
      setError('Оба поля обязательны для заполнения.');
      return false;
    }
    if (!AMINO_REGEX.test(seq1) || !AMINO_REGEX.test(seq2)) {
      setError('Последовательности могут содержать только латинские буквы аминокислот и символ "-".');
      return false;
    }
    if (seq1.length !== seq2.length) {
      setError('Длины последовательностей должны совпадать.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(seq1.toUpperCase(), seq2.toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 'min(400px, 90vw)', margin: '0 auto', padding: '0 16px' }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>
          Последовательность 1:
          <input
            type="text"
            value={seq1}
            onChange={e => setSeq1(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: 'clamp(14px, 2vw, 16px)',
              padding: '8px',
              marginTop: 4,
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>
          Последовательность 2:
          <input
            type="text"
            value={seq2}
            onChange={e => setSeq2(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: 'clamp(14px, 2vw, 16px)',
              padding: '8px',
              marginTop: 4,
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>
      </div>
      {error && (
        <div style={{ color: 'red', marginBottom: 12, fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          fontSize: 'clamp(14px, 2vw, 16px)',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Визуализировать
      </button>
    </form>
  );
};

export default AminoInputForm; 