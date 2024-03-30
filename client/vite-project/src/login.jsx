import React, { useState, useEffect } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getUserRole = () => {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userRole='));
    return cookie ? cookie.split('=')[1] : null;
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/task/tasks', {
        headers: {
          'Authorization': `Bearer ${getUserRole()}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data.tasks);
      } else {
        setError('Error fetching tasks: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/try/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        if (data.userRole) {
          document.cookie = `userRole=${data.userRole}; path=/`;
          fetchTasks();
        } else {
          setError('Error logging in: User role not provided');
        }
      } else {
        setError('Error logging in: ' + (data.message || 'Invalid response from server'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
    }
  };
  

  useEffect(() => {
    const userRoleCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userRole='));
    if (userRoleCookie) {
      fetchTasks();
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <button type="submit">Login</button>
      </form>

      <h2>Tasks Assigned</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>

      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default LoginForm;
