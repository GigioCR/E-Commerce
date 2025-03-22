import React, { useState } from 'react';
import { useAuth } from '../Components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 

const Login = () => {
  const correo_electronicoRegex = /^(?=.{1,254}$)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');
    setLoading(true);

    const lowercaseEmail = email.toLowerCase();

    if (!correo_electronicoRegex.test(lowercaseEmail)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Invalid password format');
      setLoading(false);
      return;
    }

    try {
      await login(lowercaseEmail, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-4">
        <div className="mb-4">
          <div className="text-[#101011] text-xl font-semibold font-['Public Sans'] leading-loose">Welcome Back</div>
          <div className="text-[#a8aabd] text-base font-medium font-['Public Sans'] leading-relaxed">Login with email</div>
        </div>
        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input 
              type="text" 
              className="w-full h-10 pl-2 border border-black" 
              placeholder="Email"
              name="email" 
              value={email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="mb-4 relative">
            <input 
              type={showPassword ? "text" : "password"}
              className="w-full h-10 pl-2 pr-10 border border-black" 
              placeholder="Password" 
              name='password'
              value={password}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="w-5 h-5 border border-black mr-2" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <div className="text-[#979797] text-sm font-normal font-['Public Sans']">Remember me</div>
            </div>
            <a href="#" className="text-[#979797] text-sm font-bold font-['Public Sans']">Forgot Password?</a>
          </div>
          <div className="flex justify-center mb-4">
            <button 
              type="submit"
              className="w-28 h-8 bg-black rounded-lg flex items-center justify-center" 
              disabled={loading}
            >
              <div className="text-white text-sm font-normal font-['Public Sans']">
                {loading ? 'Loading...' : 'Log In'}
              </div>
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to='/register'>
            <span className="text-[#a8aabd] text-sm font-medium font-['Poppins']">Or create an </span>
            <span className="text-[#a8aabd] text-sm font-bold font-['Poppins']">account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;