export const useShowRolePicker = () => useState('showRolePicker', () => false)

export const useCurrentRole = () => useState<string>('currentRole', () => 'gpt-3.5-turbo')

export const useShowMobileSidebar = () => useState('showMobileSidebar', () => false)

export const useDeleteConversationModal = () => useState('deleteConversationModal', () => false)
