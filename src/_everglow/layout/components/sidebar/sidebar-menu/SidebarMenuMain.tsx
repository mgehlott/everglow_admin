/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
const SidebarMenuMain = () => {
  const intl = useIntl()
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/users'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Users'
        fontIcon='bi-layers'
      />
      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      <SidebarMenuItem
        to='/campaigns'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Campaigns'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/comments'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Comments'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/occasion'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Occasion'
        fontIcon='bi-layers'
      />
      <SidebarMenuItemWithSub
        to='/newsfeed'
        title='NewsFeed'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/newsfeed/addnewsfeed' title='Add NewsFeed' hasBullet={true} />
        <SidebarMenuItem to='/newsfeed/viewnewsfeed' title='View NewsFeed' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/inquiry'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Inquiry'
        fontIcon='bi-layers'
      />
      <SidebarMenuItemWithSub
        to='/settings'
        title='Settings'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/settings/aboutus' title='About Us' hasBullet={true} />
        <SidebarMenuItem to='/settings/privacypolicy' title='Privacy Policy' hasBullet={true} />
      </SidebarMenuItemWithSub>
    </>
  )
}
export {SidebarMenuMain}
