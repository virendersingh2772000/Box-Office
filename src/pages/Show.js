/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getApi } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      setShow(results);
    });
  }, [id]);

  console.log('show', show);

  return <div>x</div>;
};

export default Show;
