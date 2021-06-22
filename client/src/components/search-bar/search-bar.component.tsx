import React from 'react';

import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const SearchBar: React.FC<{
  searchText: string;
  setSearchText: (searchText: string) => void;
  label: string;
  size?: 'small' | 'medium';
}> = ({ searchText, setSearchText, label, size }) => {
  return (
    <TextField
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      fullWidth
      type="text"
      variant="outlined"
      size={size || 'medium'}
      label={`Search ${label}`}
    />
  );
};

export default SearchBar;
