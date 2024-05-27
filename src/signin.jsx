import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', // Ensure you specify the Content-Type
          'projectId': 'tytpcwxgpttd',
        },
        body: JSON.stringify({ email, password, appType: 'bookingportals' }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        if (data.status === 'success') {
          alert('User signed in successfully');
          onSignIn(data.token);
          navigate('/');
        } else if (data.error && data.error === 'User not registered') {
          alert('User not registered. Please register first.');
        } else {
          alert('Sign in failed');
        }
      } else {
        alert('User not registered. Please register first.');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Sign in failed due to network error');
    }
  };

  return (
    <div className="flex bg-green-200 justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Sign In</h2>
        <label
          htmlFor="email"
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <label
          htmlFor="password"
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
        <p className="text-center mt-4">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </form>
    </div>
  );
};

export default SignIn;
