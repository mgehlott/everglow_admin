import { toast } from 'react-toastify'
type ToastType = 'SUCCESS' | 'ERROR';
export const showToast = (type: ToastType, message: string) => {
  switch (type) {
    case 'SUCCESS':
      toast.success(message, {
        position: 'top-right',
      })
      break
    case 'ERROR':
      toast.error(message, {position: 'top-right'})
      break
    default:
      return false
  }
}
