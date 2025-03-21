import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../AppContext';
import axiosInstance from '../../utils/axiosInstance';

const UpdateUserDetails = ({setOpenSettings}) => {

    const [ error, setError ] = useState(null);
    const [ changeType, setChangeType ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');

    const { getUserInfo } = useContext(AppContext);

    const handleCancel = () => {
        setName('');
        setPassword('');
        setChangeType('');
        setOpenSettings(false);
    }

    const handleChangeRequest = async () => {
        if (changeType === 'name') {
            try {
                const response = await axiosInstance.put('/update-name', { newName: name });
                if (!response.data.error) {
                    console.log('name updated successfully');
                    handleCancel();
                    getUserInfo();
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (changeType === 'password') {
            try {
                const response = await axiosInstance.put('/update-password', { newPassword: password });
                if (!response.data.error) {
                    console.log('password updated successfully');
                    handleCancel();
                    getUserInfo();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


  return (
    <div className='mx-5 mt-5 bg-[#ECDCBF] w-65 sm:w-80 p-3 rounded-2xl min-h-20 sm:min-h-14'>
        <div className='mx-auto w-50 sm:w-70'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <p 
                    className={`cursor-pointer  px-2 py-1 rounded-lg transition-all
                    ${changeType === 'name' ? 'bg-[#DCA47C]' : 'bg-[#D6C0B3]' }`} 
                    onClick={()=>setChangeType('name')}
                >
                    Change Name
                </p>
                <p 
                    className={`cursor-pointer  px-2 py-1 rounded-lg transition-all
                    ${changeType === 'password' ? 'bg-[#DCA47C]' : 'bg-[#D6C0B3]' }`} 
                    onClick={()=>setChangeType('password')}
                >
                    Change Password
                </p>
            </div>
        </div>
        {changeType === 'name' && 
            <input 
                type="text"
                className='outline-none ml-5 mt-5 bg-[#F8F2DE] p-2 rounded-lg border-[#FFCDB2] border-1' 
                placeholder='Please enter a Name'
                value={name}
                onChange={({target})=>{setName(target.value)}}
            /> }

        {changeType === 'password' && 
            <input 
                type="password"
                className='outline-none ml-5 mt-5 bg-[#F8F2DE] p-2 rounded-lg border-[#FFCDB2] border-1'  
                placeholder='Please enter a Password'
                value={password}
                onChange={({target})=>setPassword(target.value)}
            /> }

        {error && <p>{error}</p> }

        {changeType && <div className='w-50 flex justify-between mt-5 ml-5'>
            <button className='cursor-pointer px-2 py-1 rounded-lg transition-all bg-[#E9C874]' onClick={handleChangeRequest}>Submit</button>
            <button onClick={handleCancel} className='cursor-pointer px-2 py-1 rounded-lg transition-all bg-[#AF8260]'>Cancel</button>
        </div> }
    </div>
  )
}

export default UpdateUserDetails