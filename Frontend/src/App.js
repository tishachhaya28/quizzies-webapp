import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchHomeData } from './redux-store/slice/homeSlice';
// import { fetchCategoriesData } from './redux-store/slice/categoriesSlice';
// import { fetchContactData } from './redux-store/slice/contactSlice';
// import { fetchLeaderBoardData } from './redux-store/slice/leadeboardSlice';
import { fetchProfileData } from './redux-store/slice/profileSlice';

function App() {
  const dispatch = useDispatch();
  // const state = useSelector(state => state.home); // Accessing the 'home' slice
  // const { isLoading, isError, homeData } = state
  const isLoading = useSelector(state => state.profile.isLoading);
  const isError = useSelector(state => state.profile.isError);
  const profileData = useSelector(state => state.profile.profileData);
  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data.</p>}
      {profileData && <p>{profileData.fname}</p>}
    </div>
  );
}

export default App;