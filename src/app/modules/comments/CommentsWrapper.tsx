import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_everglow/layout/core'
const CommentsPage = () => {
  return <h1>comment</h1>
}
const CommentsWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.COMMENTS'})}</PageTitle>
      <CommentsPage />
    </>
  )
}
export default CommentsWrapper
