import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeData } from './redux-store/slice/homeSlice';

function App() {
  const dispatch = useDispatch();
  // const state = useSelector(state => state.home); // Accessing the 'home' slice
  // const { isLoading, isError, homeData } = state
  const isLoading = useSelector(state => state.home.isLoading);
  const isError = useSelector(state => state.home.isError);
  const homeData = useSelector(state => state.home.homeData);
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data.</p>}
      {homeData && <p>{homeData.map(d => d.heading)}</p>}
    </div>
  );
}

export default App;