import React, { useRef } from 'react';

function CustomButton() {
  return (
    <div>
      <button>클릭횟수</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <CustomButton />
    </div>
  )
}

export default App;
