/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addNotification, NotificationSchema } from '@/store/features/notificationslice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useGetNotificationsQuery } from '@/store/features/apislice';
import { useDispatch } from 'react-redux';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}



export function Notification({ isOpen, onClose }: NotificationProps) {
  const session:any = useSession();
  const user = session?.data?.user?.user
  const { data: notificationsData } = useGetNotificationsQuery(user?.id);
 const notifications = useSelector((state: RootState) => state.notifications.notifications);
 const dispatch = useDispatch();
 console.log("ssjoj",notificationsData)
 useEffect(() => {
   if (notificationsData) {
     dispatch(addNotification(notificationsData));
   }
 },[notificationsData,dispatch])
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed md:absolute top-0 md:top-full right-0 mt-0  sm:mt-2 w-full sm:w-[calc(100vw-2rem)] md:w-[28rem] h-screen sm:h-auto max-h-screen sm:max-h-[calc(100vh-6rem)] bg-[#1a1a1a] rounded-none sm:rounded-lg shadow-lg overflow-hidden z-50"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#242424] border-b border-gray-700 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-medium">Notification</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="overflow-y-auto no-scrollbar scrollbar-thumb-gray-600 scrollbar-track-transparent h-[calc(100vh-4rem)] sm:h-auto sm:max-h-[28rem]">
            {notifications.map((notification:NotificationSchema) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3 border-b border-gray-700 hover:bg-[#2a2a2a] transition-colors duration-150"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start space-x-3 min-w-0">
                    <div className="flex-shrink-0 pt-0.5">
                      <Bell className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{notification.type==="ASSIGNED"?"Assigned notifications":"Customer Support"}</p>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-3">{notification.text}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{new Date(notification.created_at).toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


