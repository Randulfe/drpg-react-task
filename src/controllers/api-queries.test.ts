import { getUsers, updateUser } from '../http/http-client'
import { getUsersData, updateUserData } from './api-queries'
import { UserData } from '../components/types'
import { UsersResponse } from '../http/types'

const mockUser: UserData = {
  id: 7,
  email: 'michael.lawson@reqres.in',
  firstName: 'Michael',
  lastName: 'Lawson',
  avatar: 'https://reqres.in/img/faces/7-image.jpg'
}

const mockUsers: UsersResponse = {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg'
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Lindsay',
      last_name: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg'
    },
    {
      id: 9,
      email: 'tobias.funke@reqres.in',
      first_name: 'Tobias',
      last_name: 'Funke',
      avatar: 'https://reqres.in/img/faces/9-image.jpg'
    },
    {
      id: 10,
      email: 'byron.fields@reqres.in',
      first_name: 'Byron',
      last_name: 'Fields',
      avatar: 'https://reqres.in/img/faces/10-image.jpg'
    },
    {
      id: 11,
      email: 'george.edwards@reqres.in',
      first_name: 'George',
      last_name: 'Edwards',
      avatar: 'https://reqres.in/img/faces/11-image.jpg'
    },
    {
      id: 12,
      email: 'rachel.howell@reqres.in',
      first_name: 'Rachel',
      last_name: 'Howell',
      avatar: 'https://reqres.in/img/faces/12-image.jpg'
    }
  ]
}

const mockUsersResp = {
  page: 2,
  total: 12,
  data: [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      firstName: 'Michael',
      lastName: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg'
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      firstName: 'Lindsay',
      lastName: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg'
    },
    {
      id: 9,
      email: 'tobias.funke@reqres.in',
      firstName: 'Tobias',
      lastName: 'Funke',
      avatar: 'https://reqres.in/img/faces/9-image.jpg'
    },
    {
      id: 10,
      email: 'byron.fields@reqres.in',
      firstName: 'Byron',
      lastName: 'Fields',
      avatar: 'https://reqres.in/img/faces/10-image.jpg'
    },
    {
      id: 11,
      email: 'george.edwards@reqres.in',
      firstName: 'George',
      lastName: 'Edwards',
      avatar: 'https://reqres.in/img/faces/11-image.jpg'
    },
    {
      id: 12,
      email: 'rachel.howell@reqres.in',
      firstName: 'Rachel',
      lastName: 'Howell',
      avatar: 'https://reqres.in/img/faces/12-image.jpg'
    }
  ]
}

jest.mock('../http/http-client')

// not sure why my linter doesnt recognise getUsers as a mock, would need a bit of extra time to fix the linting issue
describe('getUsersData', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })
  it('Throws an error if the API call fails', async () => {
    await getUsers.mockImplementationOnce(() => {
      throw new Error('getUsers')
    })
    await expect(getUsersData(1)).rejects.toThrow(new Error('getUsersData'))
  })
  it('Returns data well formatted if the API responds with the right data', async () => {
    await getUsers.mockResolvedValueOnce({ data: mockUsers })
    const response = await getUsersData(1)
    expect(response).toMatchObject(mockUsersResp)
  })
})

describe('updateUserData', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })
  it('Throws an error if the API call fails', async () => {
    await updateUser.mockImplementationOnce(() => {
      throw new Error('getUsers')
    })
    await expect(updateUserData(mockUser)).rejects.toThrow(new Error('userUpdate'))
  })
  it('Makes the right call if the API is successful', async () => {
    await updateUser.mockResolvedValueOnce({ data: mockUsers.data[0] })
    const response = await updateUserData(mockUser)
    expect(response).toMatchObject(mockUser)
  })
})
