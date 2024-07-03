import request from '@/utils/request'

import type {
    User,
    UserInfo
} from '@/types'


export const register = (params: {
    user: User
}): Promise<{data: {user: UserInfo}}> => request({
    method: 'POST',
    url: '/users',
    data: params,
})

export const getUser = (): Promise<{data: {user: UserInfo}}> => 
request({
    method: 'GET',
    url: '/user',
})


export const updateUser = (params: {
    user: UserInfo
}): Promise<{data: {user: UserInfo}}> => request({
    method: 'PUT',
    url: '/user',
    data: params
})

export const login = (params: {
    user: User
}): Promise<{data: {user: UserInfo}}> => request({
    method: 'POST',
    url: '/users/login',
    data: params
})