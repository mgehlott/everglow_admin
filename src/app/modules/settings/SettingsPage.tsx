import {Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_everglow/layout/core'
import AboutUs from './components/AboutUs'
import PrivacyPolicy from './components/PrivacyPolicy'
const SettingsPage = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path='aboutus'
          element={
            <>
              <PageTitle breadcrumbs={[]}>About Us</PageTitle>
              <AboutUs />
            </>
          }
        />
        <Route
          path='privacypolicy'
          element={
            <>
              <PageTitle breadcrumbs={[]}>Privacy Policy</PageTitle>
              <PrivacyPolicy />
            </>
          }
        />
      </Route>
    </Routes>
  )
}
export default SettingsPage
