import { create } from 'zustand';

interface HeaderState {
  searchModalOpen: boolean;
  applicationsMenuOpen: boolean;
  categoriesMenuOpen: boolean;
  environmentsMenuOpen: boolean;
  notificationsMenuOpen: boolean;
  aiMenuOpen: boolean;
  profileMenuOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleApplicationsMenu: () => void;
  toggleCategoriesMenu: () => void;
  toggleEnvironmentsMenu: () => void;
  toggleNotificationsMenu: () => void;
  toggleAiMenu: () => void;
  toggleProfileMenu: () => void;
  closeAllMenus: () => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  searchModalOpen: false,
  applicationsMenuOpen: false,
  categoriesMenuOpen: false,
  environmentsMenuOpen: false,
  notificationsMenuOpen: false,
  aiMenuOpen: false,
  profileMenuOpen: false,
  
  openSearchModal: () => set({ searchModalOpen: true }),
  closeSearchModal: () => set({ searchModalOpen: false }),
  
  toggleApplicationsMenu: () => set((state) => ({
    applicationsMenuOpen: !state.applicationsMenuOpen,
    categoriesMenuOpen: false,
    environmentsMenuOpen: false,
    notificationsMenuOpen: false,
    aiMenuOpen: false,
    profileMenuOpen: false
  })),
  
  toggleCategoriesMenu: () => set((state) => ({
    categoriesMenuOpen: !state.categoriesMenuOpen,
    applicationsMenuOpen: false,
    environmentsMenuOpen: false,
    notificationsMenuOpen: false,
    aiMenuOpen: false,
    profileMenuOpen: false
  })),

  toggleEnvironmentsMenu: () => set((state) => ({
    environmentsMenuOpen: !state.environmentsMenuOpen,
    applicationsMenuOpen: false,
    categoriesMenuOpen: false,
    notificationsMenuOpen: false,
    aiMenuOpen: false,
    profileMenuOpen: false
  })),

  toggleNotificationsMenu: () => set((state) => ({
    notificationsMenuOpen: !state.notificationsMenuOpen,
    applicationsMenuOpen: false,
    categoriesMenuOpen: false,
    environmentsMenuOpen: false,
    aiMenuOpen: false,
    profileMenuOpen: false
  })),
  
  toggleAiMenu: () => set((state) => ({
    aiMenuOpen: !state.aiMenuOpen,
    applicationsMenuOpen: false,
    categoriesMenuOpen: false,
    environmentsMenuOpen: false,
    notificationsMenuOpen: false,
    profileMenuOpen: false
  })),
  
  toggleProfileMenu: () => set((state) => ({
    profileMenuOpen: !state.profileMenuOpen,
    applicationsMenuOpen: false,
    categoriesMenuOpen: false,
    environmentsMenuOpen: false,
    notificationsMenuOpen: false,
    aiMenuOpen: false
  })),
  
  closeAllMenus: () => set({
    applicationsMenuOpen: false,
    categoriesMenuOpen: false,
    environmentsMenuOpen: false,
    notificationsMenuOpen: false,
    aiMenuOpen: false,
    profileMenuOpen: false
  })
}));