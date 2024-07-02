import type { UserInfo } from "@/types"
import { defineStore } from "pinia"
import {ref } from 'vue'
export const useUserStore = defineStore('user', ()=>{
    const userInfo = ref<UserInfo | null>(null);
    const setUser = (user: UserInfo) => {
        userInfo.value = user;
    };
    return {
        userInfo,
        setUser
    }
})