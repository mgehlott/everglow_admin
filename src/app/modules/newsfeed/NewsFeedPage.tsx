import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import AddNewsFeed from './components/AddNewsFeed'
import ViewNewsFeed from './components/ViewNewsFeed'
import {PageTitle} from '../../../_everglow/layout/core'
const NewsFeedPage = () => {
  console.log('render')
  console.log(window.location)
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
          path='addnewsfeed'
          element={
            <>
              <PageTitle breadcrumbs={[]}>Add NewsFeed</PageTitle>
              <AddNewsFeed />
            </>
          }
        />
        <Route
          path='viewnewsfeed'
          element={
            <>
              <PageTitle breadcrumbs={[]}>View NewsFeed</PageTitle>
              <ViewNewsFeed />
            </>
          }
        />
        <Route index element={<Navigate to='viewnewsfeed' />} />
      </Route>
    </Routes>
  )
}
export default NewsFeedPage
