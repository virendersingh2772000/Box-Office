import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { getApi } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
// import DefaultShow from '../components/show/DefaultShow';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';
import MyFile from '../components/show/MyFile';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOptions, setSearchOptions] = useState('shows');

  const isSearchShow = searchOptions === 'shows';

  // const myInput = () => {
  //   Math.floor(Math.random() * (10 - 1));
  // };

  // const myFunction = () => {
  //   getApi(`/search/${searchOptions}?q=${myInput}`).then(result => {
  //     setFun(result);
  //   });
  // };

  const onSearch = () => {
    getApi(`/search/${searchOptions}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results Found</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return <MyFile />;
  };

  const onRadioChange = ev => {
    setSearchOptions(ev.target.value);
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="shows"
            id="shows-search"
            type="radio"
            value="shows"
            checked={isSearchShow}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="actors"
            id="people-search"
            type="radio"
            value="people"
            checked={!isSearchShow}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
