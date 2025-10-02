import React from 'react';
import styles from './FilterDropdown.module.scss';

const FilterDropdown = ({ options, selected, onChange }) => {
  return (
    <div className={styles.filterDropdown}>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
