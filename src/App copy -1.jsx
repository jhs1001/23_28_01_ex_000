import React, {useRef, useState} from "react";

function click() {
  const clickCountRef = useRef(0);
  const [clickCount, setclickCount] = useState(0);

  const buttonClick = () => {
    clickCountRef.current += 1;
    setclickCount(clickCountRef.current);
  };
  
  return(
    <div>
      <button onClick={buttonClick}>클릭</button>
      <p>클릭횟수:{clickCount}</p>
    </div>
  );
}

export default click;