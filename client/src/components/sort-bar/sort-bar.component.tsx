import React from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

const SortBar: React.FC<{
  handleSortChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  sortItems: { value: string; label: string }[];
  sortBy: string;
  label: string;
  size?: 'small' | 'medium';
}> = ({ handleSortChange, sortItems, sortBy, label, size }) => {
  return (
    <FormControl variant="outlined" fullWidth size={size || 'medium'}>
      <InputLabel>Sort {label} By</InputLabel>
      <Select
        value={sortBy}
        onChange={handleSortChange}
        label={`Sort ${label} By`}
      >
        {sortItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortBar;
