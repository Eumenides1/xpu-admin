import type { UserInfo } from "@/types"
import { defineStore } from "pinia"
import {ref } from 'vue'
import { storage } from "@/utils/storage"
import { getUser } from "@/api"

const userStorage = storage('user')

export const useUserStore = defineStore('user', ()=>{
    const userInfo = ref<UserInfo | null>(null);
    const setUser = (user: UserInfo) => {
        userInfo.value = user;
        userStorage.set(user.token)
    };
    const verifyAuth = async () => {
        console.log('userInfo.value',userInfo.value);
        if (!userInfo.value && userStorage.get()) {
            const res = await getUser()
            setUser(res.data.user)
        }
    }
    return {
        userInfo,
        setUser,
        verifyAuth
    }
})