export const useShowRolePicker = useState('showRolePicker', () => false)
export const useCurrentRole = () => {
  return useState<string>('currentRole', () => 'gpt3.5-turbo')
}
