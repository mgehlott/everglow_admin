import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_everglow/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {WithChildren} from '../../_everglow/helpers'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_everglow/assets/ts/_utils'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper';
const PrivateRoutes = () => {
//   const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
//   const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
//   const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
//   const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
//   const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
//   const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const UserWrapper = lazy(() => import('../modules/users/UserWrapper'))
  const CampaignWrapper = lazy(() => import('../modules/campaigns/CampaignWrapper'))
  const CommentsWrapper = lazy(() => import('../modules/comments/CommentsWrapper'))
  const OccasionWrapper = lazy(() => import('../modules/occasion/OccasionWrapper'))
  const InquiryWrapper = lazy(() => import('../modules/inquiry/InquiryWrapper'))
  const NewFeedPage = lazy(() => import('../modules/newsfeed/NewsFeedPage'))
  const SettingsPage = lazy(() => import('../modules/settings/SettingsPage'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path='users'
          element={
            <SuspensedView>
              <UserWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='campaigns'
          element={
            <SuspensedView>
              <CampaignWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='comments'
          element={
            <SuspensedView>
              <CommentsWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='occasion'
          element={
            <SuspensedView>
              <OccasionWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='inquiry'
          element={
            <SuspensedView>
              <InquiryWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='newsfeed/*'
          element={
            <SuspensedView>
              <NewFeedPage />
            </SuspensedView>
          }
        />
        <Route
          path='settings/*'
          element={
            <SuspensedView>
              <SettingsPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}
const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}
export {PrivateRoutes}
