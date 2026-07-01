import create from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  stats: {
    total: 0,
    sent: 0,
    failed: 0,
    pending: 0,
  },
  loading: false,
  error: null,

  setNotifications: (notifications) => set({ notifications }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
}));

export { useNotificationStore };
