import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

export type NotificationStatus = "DELIVERED" | "READ"
export type NotificationType = "ASSIGNED" | "CUSTOMERSUPPORT"

export interface NotificationSchema {
  id: string
  user_id: string
  buisness_id: string
  text: string
  type: NotificationType
  status: NotificationStatus
  created_at: Date
  updated_at: Date
}

interface NotificationState {
  notifications: NotificationSchema[]
}

const initialState: NotificationState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationSchema[]>) => {
      const merged = _.unionBy(action.payload, state.notifications, 'id')
      state.notifications = merged
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = _.find(state.notifications, { id: action.payload })
      if (notif) {
        notif.status = "READ"
      }
    },

    markAllAsRead: (state) => {
      state.notifications.forEach(n => {
        n.status = "READ"
      })
    },
    

    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
} = notificationSlice.actions

export default notificationSlice.reducer
