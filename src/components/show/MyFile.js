import React, { useEffect, useState } from 'react';
import { getApi } from '../../misc/config';
import ShowGrid from './ShowGrid';

const MyFile = () => {
  const [shows, setShows] = useState(null);

  useEffect(() => {
    const a = [];
    while (a.length < 5) {
      const r = Math.floor(Math.random() * 10000) + 1;
      if (a.indexOf(r) === -1) a.push(r);
    }
    const promises = a.map(showId => getApi(`/shows/${showId}`));

    Promise.all(promises)
      .then(apiData => apiData.map(show => ({ show })))
      .then(results => {
        setShows(results);
      });
  }, []);

  return <>{shows && <ShowGrid data={shows} />}</>;
};

export default MyFile;
