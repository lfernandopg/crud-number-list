import React from 'react';
import NumberState from './context/NumberState'
import ListNumber from './components/ListNumber'
import FormNumber from './components/FormNumber'

function App() {
  return (
    <NumberState>
      <FormNumber/>
      <ListNumber/>
    </NumberState>
  );
}

export default App;
