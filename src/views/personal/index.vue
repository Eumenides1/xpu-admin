<template>
    <div class="main-body">
        <el-form ref="formRef" :model="user" label-width="86px" class="profile-form">
            <h3 class="title">个人信息</h3>
            <el-form-item label="用户名">
                <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon="user"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-input v-model="user.image" placeholder="请更新头像链接" prefix-icon="message"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="user.bio" placeholder="请输入简介" prefix-icon="user"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="user.email" placeholder="请输入邮箱" prefix-icon="chat-square"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input  type="password" v-model="user.password" placeholder="请更新密码" prefix-icon="chat-square"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="w100p" @click="handleUpdateUser">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UserInfo } from '@/types';
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateUser } from '@/api';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { setUser } = userStore;

const open = (message) => {
    ElMessage.error(message)
}


const user = ref<UserInfo>({
    email: '',
    username: '',
    password: '',
    bio: '',
    image: ''
})

const handleUpdateUser = async () => {
    try{
        const res = await updateUser({user: user.value});
        setUser(res.data.user)
        ElMessageBox.alert('修改成功', '修改用户', {
            confirmButtonText: 'OK'
        })
    }catch (error) {
        open(error.message)
    }
}

onMounted(() => {
    if (userInfo.value) {        
        user.value = {
            email: userInfo.value.email,
            username: userInfo.value.username,
            password: userInfo.value.password,
            bio: userInfo.value.bio,
            image: userInfo.value.image
        }
    }
})



</script>

<style lang='scss' scoped>
.profile-form {
    width: 60%;
    margin-right: auto;
}

</style>