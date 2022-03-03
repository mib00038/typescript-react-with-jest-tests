import './SearchInput.css';
import SearchIcon from '../icons/search_16px.svg';
import React, {ChangeEvent, ChangeEventHandler, memo, useCallback, useEffect, useMemo} from "react";
import {debounce} from "lodash";

export interface SearchInputProps {
  setSearchString: (s: string) => void
}

const SearchInput = ({ setSearchString }: SearchInputProps) => {
  const handleOnChange: ChangeEventHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchString(event.target.value)
  }, [setSearchString]);

  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChange, 200)
    , [handleOnChange]);

  useEffect(() => () => debouncedChangeHandler.cancel(), [debouncedChangeHandler]);

  return (
    <form className='SearchInput'>
      <input
        data-testid="search-input"
        aria-label="search-input"
        type="search"
        placeholder="Search"
        onChange={debouncedChangeHandler as ChangeEventHandler}
      />
      <SearchMagnifyGlassIcon />
    </form>
  );
};

const SearchMagnifyGlassIcon = memo(() => <img src={SearchIcon} alt='magnify glass'/>);

export default memo(SearchInput);
