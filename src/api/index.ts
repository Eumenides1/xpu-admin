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