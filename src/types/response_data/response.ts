type Creator = {
  name: string
  email: string
  _id: string
}
type Occasion = {
  title: string
  color: string
  icon?: string
  occasionId?: string
}
export interface ICampaign {
  _id: string
  creator: Creator
  occasionType: Occasion
  startDate: Date | string
  duration: number
  imageUrl: string
  title: string
}
export interface IComment {
  _id: string
  name: string
  description: string
  userId?: string
  campaign: string
  campaignId: string
}
export interface ICampaignName {
  _id: string
  title: string
}

export interface IMessage{
  _id: string,
  name: string,
  email: string,
  message: string,
  createdAt:string
}