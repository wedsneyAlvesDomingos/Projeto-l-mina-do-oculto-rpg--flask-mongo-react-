import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fazendo um fetch para o endpoint do backend
    fetch('http://192.168.224.2:5000/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to LDO</h1>
        {data ? (
          <p>{data.message}</p>
        ) : (
          <p>Loading data from backend...</p>
        )}
      </header>
    </div>
  );
}

export default App;
