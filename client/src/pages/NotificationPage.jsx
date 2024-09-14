import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { FaTrash } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { axiosInstance } from '../utils/axios'

const NotificationPage = () => {
  const queryClient = useQueryClient()
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/notification')
        return res.data
      } catch (error) {
        throw new Error(error.response.data)
      }
    },
    onSuccess: (data) => {
      if (data.response) {
        toast.error(data.response.data.msg)
        return
      }
    },
    onError: (error) => {
      toast.error(error.msg)
    },
  })

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosInstance.delete('/notification')
        return res.data
      } catch (error) {
        console.error(error.response.data.msg)
        return error
      }
    },
    onSuccess: () => {
      toast.success('Notifications deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  return (
    <>
      <div className='flex-[4_4_0] border-gray-700 border-r border-l min-h-screen'>
        <div className='flex justify-between items-center border-gray-700 p-4 border-b'>
          <p className='font-bold'>Notifications</p>
          <div className='relative dropdown'>
            <div tabIndex={0} role='button' className='m-1'>
              <FaTrash className='w-4' />
            </div>
            <ul
              tabIndex={0}
              className='right-0 z-[1] bg-base-100 shadow p-2 rounded-box w-52 dropdown-content menu'
            >
              <li>
                <a onClick={deleteNotifications}>Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className='flex justify-center items-center h-full'>
            <LoadingSpinner size='lg' />
          </div>
        )}
        {notifications?.length === 0 && (
          <div className='p-4 font-bold text-center'>No notifications 🤔</div>
        )}
        {notifications?.map((notification) => (
          <div className='border-gray-700 border-b' key={notification._id}>
            <div className='flex gap-2 p-4'>
              {notification.type === 'follow' && (
                <FaUser className='w-7 h-7 text-primary' />
              )}
              {notification.type === 'like' && (
                <FaHeart className='w-7 h-7 text-red-500' />
              )}
              <Link to={`/profile/${notification.from.username}`}>
                <div className='avatar'>
                  <div className='rounded-full w-8'>
                    <img
                      src={
                        notification.from.profileImg ||
                        '/avatar-placeholder.png'
                      }
                    />
                  </div>
                </div>
                <div className='flex gap-1'>
                  <span className='font-bold'>
                    @{notification.from.username}
                  </span>{' '}
                  {notification.type === 'follow'
                    ? 'followed you'
                    : 'liked your post'}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default NotificationPage
