import React, { useRef } from 'react';

function Hbutton() {
  const InputRef = useRef();

  function hBt() {
    console.log(InputRef.current.value);
  }

  return (
    <div>
      <input ref={InputRef} type='text' />
      <button onClick={hBt}>bt</button>
    </div>
  );
}

function App() {
  return (
    <Hbutton />
  );
}

export default App;
