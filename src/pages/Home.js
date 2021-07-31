import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { getApi } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOptions, setSearchOptions] = useState('shows');

  const isSearchShow = searchOptions === 'shows';

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

    return null;
  };

  const onRadioChange = ev => {
    setSearchOptions(ev.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />

      <div>
        <label htmlFor="shows-search">
          shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isSearchShow}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="people-search">
          people
          <input
            id="people-search"
            type="radio"
            value="people"
            checked={!isSearchShow}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
