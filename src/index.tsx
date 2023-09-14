import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {EverglowI18nProvider} from './_everglow/i18n/Everglow18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_everglow/assets/css/style.rtl.css'
 **/
import './_everglow/assets/sass/style.scss'
import './_everglow/assets/sass/plugins.scss'
import './_everglow/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
setupAxios(axios)
Chart.register(...registerables)
const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <EverglowI18nProvider>
        <AuthProvider>
          <ToastContainer autoClose={1500} pauseOnHover={false} />
          <AppRoutes />
        </AuthProvider>
      </EverglowI18nProvider>
    </QueryClientProvider>
  )
}
