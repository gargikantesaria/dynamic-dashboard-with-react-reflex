import React, { useState, useEffect, useRef } from 'react';
import './AutocompleteDropdown.css';

const AutocompleteDropdown = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState(options[0] || 'select asset');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const handleInputChange = e => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = option => {
    setInputValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleInputKeyDown = e => {
    if (e.key === 'Enter') {
      const match = options.find(
        option => option.toLowerCase() === inputValue.toLowerCase()
      );
      if (match) {
        setInputValue(match);
        onSelect(match);
        setIsOpen(false);
      }
    }
  };

  const handleClickOutside = e => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container mr-4" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="dropdown-input"
      />
      {isOpen && (
        <ul className="dropdown-list">
          {filteredOptions.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="dropdown-list-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteDropdown;
