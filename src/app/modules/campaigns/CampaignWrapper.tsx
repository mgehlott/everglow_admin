import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_everglow/layout/core'
const CampaignsPage = () => {
  return <h1>CampaignsPage</h1>
}
const CampaignWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.CAMPAIGNS'})}</PageTitle>
      <CampaignsPage />
    </>
  )
}
export default CampaignWrapper
