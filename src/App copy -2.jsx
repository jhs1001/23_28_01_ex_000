import React, { useRef } from 'react';

function CustomButton(props) {
  const ref = useRef();

  function handleClick() {
    ref.current.innerText = "Clicked!";
  }

  return <button {...props} ref={ref} onClick={handleClick}>Click me!</button>;
}

function App() {
  return (
    <div>
      <CustomButton style={{backgroundColor: 'red', color: 'white'}} />
    </div>
  );
}

export default App;
