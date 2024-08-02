import React, { useState } from 'react';
import styles from './modal.module.css';

export const Modal = ({ isOpen, onClose, onSave, modalType }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const taskModal = [
    {
      header: 'Add task',
      fields: [
        {
          label: 'Task name',
          type: 'text',
          id: 'title',
          value: title,
          onChange: setTitle,
        },
        {
          label: 'Select category',
          type: 'text',
          id: 'category',
          value: category,
          onChange: setCategory,
        },
        {
          label: 'Choose date',
          type: 'date',
          id: 'title',
          value: date,
          onChange: setDate,
        },
      ],
    },
  ];
  const categoryModal = [
    {
      header: 'Add category',
      fields: [
        {
          label: 'Category name',
          type: 'text',
          id: 'title',
          value: title,
          onChange: setTitle,
        },
      ],
    },
  ];

  const handleSave = () => {
    onSave({ title, date, category });
    onClose();
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  if (!isOpen) return null;

  const currentModal =
    modalType === 'category' ? categoryModal[0] : taskModal[0];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{currentModal.header}</h2>
        {currentModal.fields.map((field, index) => (
          <div
            key={index}
            className={styles.modalField}
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              value={field.value}
              onChange={handleChange(field.onChange)}
            />
          </div>
        ))}
        <div className={styles.modalButtons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};
