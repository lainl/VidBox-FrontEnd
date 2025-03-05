'use client'
import styles from "./page.module.css";
import React, { useState } from 'react';

const API_BASE_URL = 'https://vidbox-backend-7u1k.onrender.com/'

interface LoginResponse {
    token: string;
}

interface ErrorResponse {
    message: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> 
{
  try 
  {
    // Use proper template string syntax for fetch URL:
    const response = await fetch(`${API_BASE_URL}/login`, 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }
    
    if (!response.ok) 
    {
      const errorData: ErrorResponse = await response.json();
      // Use backticks for string interpolation:
      throw new Error(errorData.message || `Login failed: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } 
  catch (error: any) 
  {
    console.error('Login error:', error);
    throw error;
  }
}

export default function LoginPage() 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => 
  {
    event.preventDefault();
    setErrorMessage('');
    try 
    {
      await login(username, password);
      console.log('Login successful!');
      window.location.href = "/page.tsx"; 
    }
    catch (error: any) 
    {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div> <h2>Login Page</h2> </div>
      <div>
        <form id="LoginForm" className="loginForm"onSubmit={handleSubmit}>
          <h2>Login!</h2>

          <label htmlFor="Username">Username:</label>
          <input 
            type="text" 
            id="usernameInput" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />

          <label htmlFor="Password">Password:</label>
          <input 
            type="password" 
            id="passwordInput" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button type="submit">Login</button>
          <a id="signupLink" href="/Signup" style={{ color: 'blue' }}>
            Dont have an account? Sign-up now!
          </a>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </form>
      </div>
    </>
  )
}

//cd vb-frontend