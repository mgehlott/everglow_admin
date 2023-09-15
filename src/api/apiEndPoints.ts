import * as constants from '../utils/constants'
export const LOGIN = 'admin/login' + ' ' + constants.POST_RAW
export const LOGOUT = 'admin/logout' + ' ' + constants.POST_RAW
export const GETUSERS = 'admin/users' + ' ' + constants.GET_URL_PARAMS
export const GETOCCASIONS = 'admin/getAllOccasion' + ' ' + constants.GET_URL_PARAMS
export const GETNEWSFEED = 'api/newsfeed' + ' ' + constants.GET_URL_PARAMS
export const POSTNEWSFEED = 'admin/addNewsFeed' + ' ' + constants.MULTI_PART_POST
export const DELETE_NEWSFEED = 'admin/deleteNewsFeed' + ' ' + constants.DELETE_ID_PARAMS
export const GET_ALL_CAMPAIGNS = 'admin/campaigns' + ' ' + constants.GET_URL_PARAMS
export const DELETE_CAMPAIGN = 'admin/deleteCampaign' + ' ' + constants.DELETE_ID_PARAMS
