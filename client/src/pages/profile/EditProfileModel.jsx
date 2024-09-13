import { useState } from 'react'

const EditProfileModal = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    link: '',
    newPassword: '',
    currentPassword: '',
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <button
        className='rounded-full btn btn-outline btn-sm'
        onClick={() =>
          document.getElementById('edit_profile_modal').showModal()
        }
      >
        Edit profile
      </button>
      <dialog id='edit_profile_modal' className='modal'>
        <div className='border-gray-700 shadow-md border rounded-md modal-box'>
          <h3 className='my-3 font-bold text-lg'>Update Profile</h3>
          <form
            className='flex flex-col gap-4'
            onSubmit={(e) => {
              e.preventDefault()
              alert('Profile updated successfully')
            }}
          >
            <div className='flex flex-wrap gap-2'>
              <input
                type='text'
                placeholder='Full Name'
                className='flex-1 border-gray-700 p-2 border rounded input input-md'
                value={formData.fullName}
                name='fullName'
                onChange={handleInputChange}
              />
              <input
                type='text'
                placeholder='Username'
                className='flex-1 border-gray-700 p-2 border rounded input input-md'
                value={formData.username}
                name='username'
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              <input
                type='email'
                placeholder='Email'
                className='flex-1 border-gray-700 p-2 border rounded input input-md'
                value={formData.email}
                name='email'
                onChange={handleInputChange}
              />
              <textarea
                placeholder='Bio'
                className='flex-1 border-gray-700 p-2 border rounded input input-md'
                value={formData.bio}
                name='bio'
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              <input
                type='password'
                placeholder='Current Password'
                className='flex-1 border-gray-700 p-2 border rounded input input-md'
                value={formData.currentPassword}
                name='currentPassword'
                onChange={handleInputChange}
              />
              <input
                type='password'
                placeholder='New Password'
                className='flex-1 border-gray-700 p-2 border rounded input input-md'
                value={formData.newPassword}
                name='newPassword'
                autoComplete='true'
                onChange={handleInputChange}
              />
            </div>
            <input
              type='text'
              placeholder='Link'
              className='flex-1 border-gray-700 p-2 border rounded input input-md'
              value={formData.link}
              name='link'
              autoComplete='true'
              onChange={handleInputChange}
            />
            <button className='rounded-full text-white btn btn-primary btn-sm'>
              Update
            </button>
          </form>
        </div>

        {/* we can use label tag with 'modal-backdrop' class that covers the screen so we can close the modal when clicked outside -> from daisy UI */}
        <form method='dialog' className='modal-backdrop'>
          <button className='outline-none'>close</button>
        </form>
      </dialog>
    </>
  )
}

export default EditProfileModal
