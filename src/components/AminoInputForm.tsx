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
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, color: '#2c3e50', fontWeight: '500' }}>
          Последовательность 1:
          <input
            type="text"
            value={seq1}
            onChange={e => setSeq1(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: 'clamp(14px, 2vw, 16px)',
              padding: '12px',
              marginTop: 8,
              borderRadius: 8,
              border: '2px solid #e0e0e0',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#4CAF50'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, color: '#2c3e50', fontWeight: '500' }}>
          Последовательность 2:
          <input
            type="text"
            value={seq2}
            onChange={e => setSeq2(e.target.value)}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: 'clamp(14px, 2vw, 16px)',
              padding: '12px',
              marginTop: 8,
              borderRadius: 8,
              border: '2px solid #e0e0e0',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#4CAF50'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>
      </div>
      {error && (
        <div style={{
          color: '#e74c3c',
          marginBottom: 16,
          fontSize: 'clamp(12px, 1.5vw, 14px)',
          padding: '8px',
          background: '#fde8e8',
          borderRadius: 8,
          border: '1px solid #fbd5d5',
        }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        style={{
          padding: '12px 24px',
          fontSize: 'clamp(14px, 2vw, 16px)',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          width: '100%',
          fontWeight: '600',
          transition: 'background-color 0.3s, transform 0.2s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#45a049'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Визуализировать
      </button>
    </form>
  );
};

export default AminoInputForm; 