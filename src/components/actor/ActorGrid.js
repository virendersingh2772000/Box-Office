/* eslint-disable arrow-body-style */
import React from 'react';
import ActorCard from './ActorCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';

const ActorGrid = ({ data }) => {
  return (
    <div>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          id={person.id}
          name={person.name}
          gender={person.gender}
          image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
          country={person.country.name}
          birthday={person.birthday}
          deathday={person.deathday}
        />
      ))}
    </div>
  );
};

export default ActorGrid;
