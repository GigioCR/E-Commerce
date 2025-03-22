import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../config/config';
import { Eye, EyeOff } from 'lucide-react';
import Toast from '../Components/Toast';

const api = axios.create({
  baseURL: config.BACKEND_URL
});

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    address: '',
    full_name: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const fieldName = name === 'name' ? 'full_name' :
      name === 'phone' ? 'phone_number' :
        name;

    setFormData({ ...formData, [fieldName]: value });
    await validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      await validateField(key, value);
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const userData = {
        email: formData.email.toLowerCase(),
        password: formData.password,
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        address: formData.address
      };

      const response = await api.post('/auth/signup', userData);

      if (response.data.success || response.status === 201) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setErrors({
          ...errors,
          general: 'Unable to complete registration. Please try signing in or use a different email address.'
        });
      } else if (error.response?.status === 401) {
        setErrors({
          ...errors,
          general: 'Please provide both email and password.'
        });
      } else if (error.response?.status === 400) {
        setErrors({
          ...errors,
          general: 'Please check your information and try again.'
        });
      } else if (error.request) {
        setErrors({
          ...errors,
          general: 'Unable to connect to the server. Please try again later.'
        });
      } else {
        setErrors({
          ...errors,
          general: 'An error occurred during registration. Please try again.'
        });
      }
  
    }
  };

  const validateField = async (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        const nameRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)*$/;
        if (!nameRegex.test(value)) {
          newErrors[fieldName] = 'Debe comenzar con una letra mayúscula y contener solo letras de la A a la Z';
        } else {
          delete newErrors[fieldName];
        }
        break;

      case "phone":
        const phoneRegex = /^[2-9]\d{3}-\d{4}$/;
        if (!phoneRegex.test(value)) {
          newErrors.phone = 'El número de teléfono debe tener el formato siguiente formato: 8888-8888';
        } else {
          delete newErrors.phone;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@(?!pf\.|admin\.).+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'El formato del correo electrónico no es válido.';
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!passRegex.test(value)) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial (@, $, !, %, ?, &). No se permiten puntos ni comas.';
        } else {
          delete newErrors.password;
        }

        if (formData.confirmPassword && formData.confirmPassword !== value) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white border rounded-lg">
        <div className="mb-4">
          <div className="text-[#101011] text-xl font-semibold font-['Public Sans'] leading-loose">Register</div>
          <div className="text-[#a8aabd] text-base font-medium font-['Public Sans'] leading-relaxed">Start your journey with us!</div>
        </div>
        {errors.general && <div className="text-red-500 mb-4">{errors.general}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              className="w-full h-10 border border-black px-4"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="w-full h-10 border border-black px-4"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          <div className="mb-4"> 
            <div className="relative flex items-center"> 
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full h-10 border border-black pl-4 pr-10"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="absolute right-3 inset-y-0 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full h-10 border border-black pl-4 pr-10"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="absolute right-3 inset-y-0 flex items-center">
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="flex space-x-4">
            <div className="relative w-1/3">
              <select className="w-full h-10 border border-[#1c275a] px-4" disabled>
                <option value="506">506</option>
              </select>
            </div>
            <div className="relative w-2/3">
              <input
                type="tel"
                name="phone"
                className="w-full h-10 border border-black px-4"
                placeholder="Cellphone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="address"
              className="w-full h-10 border border-black px-4"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="w-28 h-10 bg-black text-white rounded-full">Sign Up</button>
          </div>
        </form>
        {showToast && <Toast message="Registration successful!" onClose={() => setShowToast(false)} />}
      </div>
    </div>
  );
};

export default Register;