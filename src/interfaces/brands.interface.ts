export interface IBrand {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}


export interface IBrandDetails {
  data: Data
}

export interface Data {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}