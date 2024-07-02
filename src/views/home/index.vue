<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
const userStore = useUserStore()

const {userInfo} = storeToRefs(userStore);
</script>

<template>
    <div>
        {{ userInfo?.username }}这就是首页
    </div>
    <div class="txt-p">
        <router-link to="/register">没有账号?去注册</router-link>
    </div>
</template>

<style scoped>

</style>
