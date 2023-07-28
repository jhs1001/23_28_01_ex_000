import React, { useState } from 'react';

function ChildComponent({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function ParentComponent() {
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3"]);

  return (
    <div>
      <ChildComponent items={list} />
    </div>
  );
}

export default ParentComponent;
