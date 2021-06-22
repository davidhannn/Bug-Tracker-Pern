import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../search-bar/search-bar.component';
import SortBar from '../sort-bar/sort-bar.component';

import { ProjectSortValues } from '../../redux/types';
import {
  sortProjectsBy,
  selectProjectsState,
} from '../../redux/slices/projectSlice';

import { useSearchSortStyles } from '../../styles/muiStyles';

const sortItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most-bugs', label: 'Most Bugs' },
  { value: 'least-bugs', label: 'Least Bugs' },
  { value: 'most-members', label: 'Most Members' },
  { value: 'least-members', label: 'Least Members' },
];

const ProjectsSearchSort: React.FC<{
  searchText: string;
  setSearchText: (searchText: string) => void;
  isMobile: boolean;
}> = ({ searchText, setSearchText, isMobile }) => {
  const classes = useSearchSortStyles();
  const dispatch = useDispatch();
  const { sortBy } = useSelector(selectProjectsState);
  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as ProjectSortValues;
    dispatch(sortProjectsBy(selectedValue));
  };

  return (
    <div>
      <div className={classes.inputWrapper}>
        <div className={classes.searchBar}>
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            label="Projects"
            size={isMobile ? 'small' : 'medium'}
          />
        </div>
        <div className={classes.sortBar}>
          <SortBar
            handleSortChange={handleSortChange}
            sortItems={sortItems}
            sortBy={sortBy}
            label="Projects"
            size={isMobile ? 'small' : 'medium'}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsSearchSort;
