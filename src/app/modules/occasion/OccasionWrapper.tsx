import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_everglow/layout/core'
import Occasions from './components/Occasions'
const OccasionPage = () => {
  return (
    <>
      <Occasions />
    </>
  )
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
