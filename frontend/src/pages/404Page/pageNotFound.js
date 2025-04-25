import React from 'react';

const PaginaNaoEncontrada = () => {
  const voltar = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        padding: '20px',
        
      }}
    >
      <div style={{ fontSize: '100px' }}>🚫</div>
      <h1 style={{ fontSize: '64px', margin: '0', color: '#5B1F0F',  fontFamily:'"Esteban", serif', }}>404</h1>
      <p style={{ fontSize: '20px', color: '#6c757d', fontFamily:'"Esteban", serif', }}>
        Opa! Parece que essa página não existe.
      </p>
      <button
        onClick={voltar}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          fontFamily:'"Esteban", serif',
          backgroundColor: '#162A22',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#162A22')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#162A22')}
      >
        Voltar à página anterior
      </button>
    </div>
  );
};

export default PaginaNaoEncontrada;
