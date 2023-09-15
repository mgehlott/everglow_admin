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
    _id:string,
  creator: Creator
  occasionType: Occasion
  startDate: Date | string
  duration: number
  imageUrl: string
  title: string
}
