import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../../contexts/AuthContext';

const Profile = () => {

    const { user, updateUser, forgetPassword } = useContext(UserContext);

    const passwordResetHandler = () => {
        const email = user.email;
        forgetPassword(email)
            .then(() => {
                toast.success('Password reset link send. Please check your mail and reset your password.');
            })
            .catch(error => console.error(error));
    }

    const updateProfileHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.displayName.value;
        const photoURL = form.photoURL.value;

        if (!name || !photoURL) {
            return;
        }

        updateUser(name, photoURL)
            .then((result) => {
                console.log(result);
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='container mx-auto'>
            <div className='min-h-[500px] my-10'>
                <div className=' w-8/12 mx-auto rounded-md border shadow-lg p-3'>
                    <div className='mt-5'>
                        <div className='w-32 cursor-pointer h-32 rounded-full overflow-hidden mx-auto'><img src={user.photoURL ? user.photoURL : 'https://placeimg.com/192/192/people'} /></div>
                    </div>
                    <div>
                        <form onSubmit={updateProfileHandler} className='mt-10'>
                            <div className='flex gap-2 border px-2 py-3 rounded-md mb-2'>
                                <label className='w-32 font-semibold'>Email</label>
                                <input className='focus:outline-0 ml-2' type='text' value={user?.email} readOnly />
                            </div>
                            <div className='flex items-center gap-2 border px-2 py-3 rounded-md mb-2'>
                                <label className='w-32 font-semibold'>Name</label>
                                <input className='focus:outline-0 focus:bg-slate-100 py-2 focus:px-3 ml-2' type='text' name='displayName' value={user?.displayName} />
                            </div>
                            <div className='flex items-center gap-2 border px-2 py-3 rounded-md mb-2'>
                                <label className='w-32 font-semibold'>Photo Url</label>
                                <input className='focus:outline-0 focus:bg-slate-100 py-2 focus:px-3 ml-2' type='urk' name='photoURL' value={user?.photoURL} />
                            </div>
                            <div className='mt-5 p-3'>
                                <button onClick={passwordResetHandler} type='button' className='hover:underline'>Forget Password</button>
                                <button type='submit' className='hover:bg-transparent hover:text-gray-700 border border-green-500 ml-4 px-4 py-2 bg-green-500 text-slate-50'>Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
