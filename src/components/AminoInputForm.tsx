import React, { useState } from 'react';
import '../styles/AminoInputForm.css';

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
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">
          Последовательность 1:
          <input
            type="text"
            value={seq1}
            onChange={e => setSeq1(e.target.value)}
            className="form-input"
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Последовательность 2:
          <input
            type="text"
            value={seq2}
            onChange={e => setSeq2(e.target.value)}
            className="form-input"
            autoComplete="off"
            spellCheck={false}
            required
          />
        </label>
      </div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <button type="submit" className="submit-button">
        Визуализировать
      </button>
    </form>
  );
};

export default AminoInputForm; 