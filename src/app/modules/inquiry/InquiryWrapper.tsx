import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_everglow/layout/core'
const InquiryPage = () => {
  return <h1>Inquiry page</h1>
}
const InquiryWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.INQUIRY'})}</PageTitle>
      <InquiryPage />
    </>
  )
}
export default InquiryWrapper
