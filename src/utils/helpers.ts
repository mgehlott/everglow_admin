import {ICampaignName} from '../types/response_data/response'
export const getSelectOptions = (options: ICampaignName[]) => {
  return options.map((item) => {
    return {value: item._id, label: item.title}
  })
}
