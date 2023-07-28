import React, { useRef } from 'react';

function CustomButton() {
  return (
    <div>
      <button>Click me!</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <CustomButton style={{backgroundColor: 'red', color: 'white'}} />
    </div>
  );
}

export default App;
