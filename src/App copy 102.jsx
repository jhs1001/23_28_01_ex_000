import React, { useState } from 'react';

function ChildComponent({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.name}
          {item.children && <ChildComponent items={item.children} />}
        </li>
      ))}
    </ul>
  );
}

function ParentComponent() {
  const [list, setList] = useState([
    {
      name: "Item 1",
      children: [
        { name: "Item 11" },
        { name: "Item 12" },
        { name: "Item 13" },
        { name: "Item 14" },
      ]
    }, 
    { name: "Item 2" }, 
    { name: "Item 3" }
  ]);

  return (
    <div>
      <ChildComponent items={list} />
    </div>
  );
}

export default ParentComponent;
