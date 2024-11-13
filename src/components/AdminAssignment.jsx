import React, { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

const optionsArray = [
    { value: 'Olajide Olatunji', label: 'Olajide Olatunji' },
    { value: 'Hailey Welch', label: 'Hailey Welch' },
    { value: 'Jimmy Donaldson', label: 'Jimmy Donaldson' },
    { value: 'Isis Naija Gaston', label: 'Isis Naija Gaston'},
    { value: 'Nigel Ng', label: 'Nigel Ng'},
  ];




const SearchDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={optionsArray}
      />
    </div>
  );
};

export default SearchDropdown;