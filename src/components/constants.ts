import { UserData } from './types'

export const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const regexImageUrl =
  '^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*.(gif|jpe?g|png|webp)$'

const userLoadingField: UserData = {
  id: 0,
  firstName: 'loading...',
  lastName: 'loading...',
  email: 'loading...',
  avatar: 'https://unsplash-assets.imgix.net/empty-states/photos.png'
}

// eslint-disable-next-line no-sparse-arrays
const arrayLoadingFields: Array<UserData | undefined> = [, , , , ,]

export const loadingFields = {
  data: arrayLoadingFields.fill(userLoadingField, 0, 5),
  page: 0,
  total: 0
}
