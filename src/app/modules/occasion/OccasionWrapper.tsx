import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_everglow/layout/core'
const OccasionPage = () => {
  return <h1>Occasion page</h1>
}
const OccasionWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.OCCASION'})}</PageTitle>
      <OccasionPage />
    </>
  )
}
export default OccasionWrapper
