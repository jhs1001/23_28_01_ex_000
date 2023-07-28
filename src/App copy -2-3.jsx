import React, { useRef } from 'react';

function ClickMe(props) {
  const ref = useRef();

  function handleClick() {
    ref.current.innerText = "Clicked!";
  }

  return (

      <button {...props} ref={ref} coClick={handleClick}>ClickMe!!</button>

  );
}

function App() {
  return (
    <div>
      <ClickMe style={{backgroundColor: 'red', color: 'white'}}/>
    </div>
  );
}

export default App;
