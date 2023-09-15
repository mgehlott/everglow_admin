/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_everglow/helpers'
import {PageTitle} from '../../../_everglow/layout/core'
import {StatisticsWidget5} from '../../../_everglow/partials/widgets'
const DashboardPage: FC = () => (
  <>
    <div className='row g-5 g-md-8'>
      <div className='col-md-3'>
        <StatisticsWidget5
          className='card-md-stretch mb-md-8'
          svgIcon='/media/icons/duotune/ecommerce/ecm008.svg'
          color='warning2'
          iconColor='warning'
          title='Campaigns'
          titleColor='warning'
          description='230'
          to='/campaigns'
        />
      </div>
      <div className='col-md-3'>
        <StatisticsWidget5
          className='card-md-stretch mb-md-8'
          svgIcon='/media/icons/duotune/general/gen049.svg'
          color='info2'
          iconColor='info'
          titleColor='info'
          title='Users'
          description='146'
          to='/users'
        />
      </div>
      <div className='col-md-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-5 mb-md-8'
          svgIcon='/media/icons/duotune/communication/com002.svg'
          color='danger2'
          iconColor='danger'
          titleColor='danger'
          title='Inquiry'
          description='2'
          to='/inquiry'
        />
      </div>
      <div className='col-md-3'>
        {/* gen016 or gen054*/}
        <StatisticsWidget5
          className='card-xl-stretch mb-md-8'
          svgIcon='/media/icons/duotune/general/gen054.svg'
          color='success2'
          iconColor='success'
          titleColor='success'
          title='NewsFeed'
          description='10'
          to='/newsfeed'
        />
      </div>
    </div>
    <div className='row g-8 g-md-8'>
      <div className='col-md-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-md-8'
          svgIcon='/media/icons/duotune/electronics/elc001.svg'
          color='warning2'
          iconColor='warning'
          title='Occasion'
          titleColor='warning'
          description='6'
          to='/occasion'
        />
      </div>
      <div className='col-md-3'>
        <StatisticsWidget5
          className='card-xl-stretch mb-md-8'
          svgIcon='/media/icons/duotune/communication/com012.svg'
          color='info2'
          iconColor='info'
          titleColor='info'
          title='Comments'
          description='370'
          to='/comments'
        />
      </div>
    </div>
  </>
)
const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}
export {DashboardWrapper}
