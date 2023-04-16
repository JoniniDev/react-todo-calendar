import React from 'react';
import { IconButton } from './components/DarkModeButton/IconButton'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { CalendarContainer } from './components/CalendarContainer/CalendarContainer'
import { CalendarWrapper } from './components/CalendarWrapper/CalendarWrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { setLanguage } from './redux/features/language/languageSlice';
import { Dropdown } from './components/Dropdown/Dropdown';

import './App.scss';

function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <CalendarWrapper>
            <IconButton iconColor='' onClick={() => { }} />
            <CalendarContainer />
          </CalendarWrapper>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;