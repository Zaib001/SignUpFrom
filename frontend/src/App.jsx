import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage('All fields are required.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoadingSignup(true);
    setErrorMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      alert('Signup Success!');
    } catch (error) {
      setErrorMessage('Signup failed, please try again.');
      console.error('Signup Error:', error);
    } finally {
      setLoadingSignup(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoadingLogin(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      alert('Login Success!');
    } catch (error) {
      setErrorMessage('Login failed, please try again.');
      console.error('Login Error:', error);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/20 p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <h1 className="text-4xl text-center mb-6 text-white font-bold">Sign Up / Login</h1>

        {/* Sign Up Form */}
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {errorMessage && <motion.p className="text-red-400 text-center">{errorMessage}</motion.p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loadingSignup}
            className="w-full py-3 bg-indigo-600 rounded-md text-white hover:bg-indigo-500 transition-all"
          >
            {loadingSignup ? <Loader /> : 'Sign Up'}
          </motion.button>
        </form>

        <p className="text-center text-white mt-6">Already have an account?</p>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogin}
          disabled={loadingLogin}
          className="w-full py-3 mt-4 bg-green-600 rounded-md text-white hover:bg-green-500 transition-all"
        >
          {loadingLogin ? <Loader /> : 'Login'}
        </motion.button>
      </motion.div>
    </div>
  );
};

const Loader = () => (
  <motion.div
    className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1 }}
  />
);

export default App;
