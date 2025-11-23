import React, { useState } from 'react';
import styles from "./FriutListFilter.module.scss";

const FilteredList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles["filtered-list"]}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className={styles["filtered-list__input"]}
      />

      <ul className={styles["filtered-list__items"]}>
        {filteredItems.map((item, index) => (
          <li key={index} className={styles['filtered-list__item']}>{item}</li>
        ))}
      </ul>

      {filteredItems.length === 0 && (
        <p className={styles["filtered-list__empty"]}>No results found</p>
      )}
    </div>
  );
};

export default FilteredList;