import React, { useState, useEffect } from 'react';

export default function EventAPI() {
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    values: [],
  });

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      .then((res) => res.json())
      .then((result) => {
        setState({
          isLoaded: true,
          values: result.drinks,
        });
        console.log(result);
      });
  });

  return <ul>{state.map()}</ul>;
}
