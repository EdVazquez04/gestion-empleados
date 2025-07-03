import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rateLimit, setRateLimit] = useState(0);

  const handleLogin = async () => {
    try {
      if (username === 'admin' && password === 'password') {
        console.log('Login successful!');
        setError(null);
        setRateLimit(0);
      } else {
        setError('Invalid username or password');
        setRateLimit(5);
      }
    } catch (error) {
      setError(error.message);
      setRateLimit(5);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {rateLimit > 0 && <p style={{ color: 'red' }}>Rate limit exceeded!</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '300px',
    margin: 'auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
    cursor: 'pointer',
  }
};

export default Login;
