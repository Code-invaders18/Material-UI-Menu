import { useEffect, useRef, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [highlighted, setHighlighted] = useState(null);
  const json = [
    {
      id: self.crypto.randomUUID(),
      label: 'One',
      value: 'one',
    },
    {
      id: self.crypto.randomUUID(),
      label: 'Two',
      value: 'two',
    },
    {
      id: self.crypto.randomUUID(),
      label: 'Three',
      value: 'three',
    },
    {
      id: self.crypto.randomUUID(),
      label: 'Four',
      value: 'four',
    },
    {
      id: self.crypto.randomUUID(),
      label: 'Five',
      value: 'five',
    },
  ];

  const menuRef = useRef(null);

  // Handle outside click
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.code === 'ArrowDown') {
      if (highlighted === null) {
        setHighlighted(0);
      } else {
        let temp = (highlighted + 1) % json.length;
        setHighlighted(temp);
      }
    } else if (e.code === 'ArrowUp') {
      if (highlighted === null) {
        setHighlighted(json.length - 1);
      } else {
        let temp = highlighted - 1;
        if (temp < 0) {
          setHighlighted(json.length - 1);
        } else {
          setHighlighted(temp);
        }
      }
    } else if (e.code === 'Enter' && highlighted !== null) {
      console.log('Selected: ', json[highlighted].label);
      setShowMenu(false);
    }
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listeners on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [highlighted]);

  return (
    <>
      <div>
        <p
          style={{
            border: '1px solid black',
            width: '50px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          ref={menuRef}
          onClick={() => setShowMenu(!showMenu)}
        >
          Menu
        </p>
        {showMenu && (
          <div style={{ border: '1px solid black', width: 'fit-content' }}>
            {json.map((item, i) => (
              <p
                style={{ background: highlighted === i ? 'cyan' : '' }}
                key={item.id}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
