import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import dummyData from './dummy-data';
import endpoint from './endpoint';

import './styles.scss';

const initialState = {
  result: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === 'FETCHING') {
    return {
      result: null,
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.result,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

const useFetch = (url) => {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING' });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: { error } });
      }
    };

    fetchUrl();
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setLoading(false);
    //     setResponse(response);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setError(error);
    //   });
  }, []);

  const { result, loading, error } = state;

  return [result, loading, error];
};

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/characters');
  const characters = (response && response.characters) || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p>{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
