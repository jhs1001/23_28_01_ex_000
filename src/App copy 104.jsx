import React, { useState } from 'react';

function ChildComponent({ items, selectedItem, setSelectedItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li 
          key={index}
          onClick={(event) => {
            event.stopPropagation();
            setSelectedItem(item.name);
          }}
          style={{ color: selectedItem === item.name ? 'red' : 'black' }}
        >
          {item.name}
          {item.children && 
            <ChildComponent 
              items={item.children} 
              selectedItem={selectedItem} 
              setSelectedItem={setSelectedItem} 
            />
          }
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

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <ChildComponent items={list} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    </div>
  );
}

export default ParentComponent;
