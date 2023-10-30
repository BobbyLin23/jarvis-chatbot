export const useShowRolePicker = () => useState('showRolePicker', () => false)

export const useCurrentRole = () => useState<string>('currentRole', () => 'gpt3.5-turbo')

export const useShowMobileSidebar = () => useState('showMobileSidebar', () => false)
