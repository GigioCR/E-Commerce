import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import conejo from "../assets/conejo.jpg";
import { useAuth } from '../Components/AuthContext';
import axios from 'axios';

const Profile = () => {
    const {user,profile} = useAuth();
    
    const [changedPassword, setChangedPassword] = useState(false);
    const [thereWasAChange, setThereWasAChange] = useState(false);
    const [errors, setErrors] = useState({})

    const HandleChange = async (e) => {
        setNewInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
        await validateField(e.target.name, e.target.value);
        handleThereWasChange()
        if (e.target.name === "newPassword") {
            handleChangePassword()
        }
    }

    const [newInfo, setNewInfo] = useState({
        name: user.name,
        newPhoneNumber: user.phone,
        newEmail: user.email,
        newPassword: user.password,
        newAddress: user.address,
        newConfirmPassword: ''
      })

    const handleCancel = () => {
      let errors = {}
      setErrors(errors)
        setNewInfo({ 
            newPhoneNumber: user.phone,
            newEmail: user.email,
            newPassword: user.password,
            newAddress: user.address,
            newConfirmPassword: '' 
          });
          setChangedPassword(false);
          setThereWasAChange(false);
    }

    const handleThereWasChange = () => {
        setThereWasAChange(true)
    }

    const handleChangePassword = () => {
        setChangedPassword(true)
    }

    const handleSave = async (e) => {
      e.preventDefault();
      try {
        if (Object.keys(errors).length > 0) {
          return;
        }
        
        const response = await axios.put('http://localhost:3001/api/users', {
          name: newInfo.name,
          phone: newInfo.newPhoneNumber,
          email: newInfo.newEmail.toLowerCase(),
          password: newInfo.newPassword,
          address: newInfo.newAddress
        });
        if (response.status === 201) {
          alert("Se actualizaron los datos!")
          const updatedUser = {
            email: newInfo.newEmail.toLowerCase(),
            password: newInfo.newPassword,
            name: newInfo.name,
            phone: newInfo.newPhoneNumber,
            address: newInfo.newAddress
        };
          
          //updateUser(updatedUser);
          
        }
      } catch (error){
        console.log("damn se cayo: " + error)
      }
    }

    const validateField = async (fieldName, value) => {
        let newErrors = { ...errors };
    
        switch (fieldName) {
    
          case "newPhoneNumber":
            const phoneRegex = /^\+506 [2-9]\d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
              newErrors.newPhoneNumber = 'El número de teléfono debe tener el formato siguiente formato: +506 XXXX-XXXX';
            } else {
              delete newErrors.newPhoneNumber;
            }
            break;
    
          case "newPassword":
            const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
            if (!passRegex.test(value)) {
              newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial (@, $, !, %, ?, &). No se permiten puntos ni comas.';
            } else {
              delete newErrors.newPassword;
            }
    
            if (newInfo.newConfirmPassword && newInfo.newConfirmPassword !== value || newInfo.newConfirmPassword.length <= 0) {
              newErrors.newConfirmPassword = 'Las contraseñas no coinciden';
            } else {
              delete newErrors.newConfirmPassword;
            }
            break;
    
          case "newConfirmPassword":
            if (value !== newInfo.newPassword) {
              newErrors.newConfirmPassword = 'Las contraseñas no coinciden';
            } else {
              delete newErrors.newConfirmPassword;
            }
            break;
    
          default:
            break;
        }
        setErrors(newErrors);
      };

    return (
        <>
            <div className="container mx-auto p-4">

                {/*Header*/}
                <div className='flex flex-row justify-center items-center'>
                    <div className='w-full md:w-2/4'>
                        <h1 className="text-2xl font-bold text-black text-center pt-20">Profile</h1>
                        <hr className='border-black pb-4 border-t-3' />
                    </div>
                </div>

                {/*Info de perfil*/}
                <div className='pt-16 flex flex-col md:flex-row justify-center items-center'>

                    {/* Imagen*/}
                    <div className='foto_perfil flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0'>
                        <img className='rounded border border-black w-full h-auto' src={conejo} alt="imagen de perfil" />
                    </div>

                    {/* Datos*/}
                    <div className='info_perfil flex flex-col ml-0 md:ml-24 justify-center space-y-12 w-full md:w-1/4'>
                        <p className='font-bold text-xl'>{profile.full_name}</p>
                        <div>
                            <p className='font-bold'>Phone Number</p>
                            <input className='rounded border border-black text-center' name='newPhoneNumber' value={newInfo.newPhoneNumber} type='text' placeholder={profile.phone_number} onChange={HandleChange} required></input>
                            {errors.newPhoneNumber && <div className="text-red-500 text-sm mt-1">{errors.newPhoneNumber}</div>}
                        </div>
                        <div>
                            <p className='font-bold'>Address</p>
                            <input className='rounded border border-black text-center' type='text' name='newAddress' value={newInfo.newAddress} placeholder={profile.address} onChange={HandleChange} aria-multiline></input>
                            {/* {errors.newAddress && <div className="text-red-500 text-sm mt-1">{errors.newAddress}</div>} */}
                        </div>
                        <div>
                            <p className='font-bold'>Password</p>
                            <input className='rounded border border-black text-center' name='newPassword' type="password" value={newInfo.newPassword} onChange={HandleChange} required></input>
                            {errors.newPassword && <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>}
                        </div>
                        {changedPassword && <div>
                            <p className='font-bold'>Confirm Password</p>
                            <input className='rounded border border-black text-center' type="password" name='newConfirmPassword' value={newInfo.newConfirmPassword} onChange={HandleChange} required={changedPassword}></input>
                            {errors.newConfirmPassword && <div className="text-red-500 text-sm mt-1">{errors.newConfirmPassword}</div>}
                        </div>}
                    </div>
                </div>
                {/* Boton de guardado */}
                
                <div className='flex justify-center items-center pt-24 space-x-5'>
                {thereWasAChange &&
                    <button className='border border-black bg-white w-1/4 justify-center pt-4 pb-4 rounded font-semibold text-center text-black sm: text-sm' onClick={handleCancel}>Cancel All Changes</button>
                }
                    <button className='border border-black bg-[#41d2f2] w-1/4 justify-center pt-4 pb-4 rounded font-semibold text-center text-black sm: text-sm' onClick={handleSave}>Save Information</button>
                </div>
            </div>
        </>
    );
}

export default Profile;