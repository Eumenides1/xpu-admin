<template>
    <div>
        <el-form  class="reg" ref="formRef" :rules="rules" :model="user" label-width="88px">
            <h2 class="title">用户注册</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon="user"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email" placeholder="请输入邮箱" prefix-icon="message"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user.password" placeholder="请输入密码" prefix-icon="lock" type="password"></el-input>
            </el-form-item>
            <el-form-item label>
                <el-button type="primary" @click="doReg">注册</el-button>
            </el-form-item>
            <div>
                <router-link to="/login">已有账号？去登录</router-link>
            </div>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { ref,computed } from 'vue'
import type { User } from '@/types'
import {register} from "@/api"
import { ElMessage } from 'element-plus'

import { useUserStore } from '@/store/user'
const userStore = useUserStore();
const { setUser } = userStore;

const router = useRouter()
const open = (message) => {
    ElMessage.error(message)
}

const formRef = ref()

const rules = computed(() => {
    return {
        email: {
            required: true,
            message: '邮箱不能为空！',
            trigger: [
                'blur'
            ]
        },
        password: {
            required: true,
            min: 6,
            message: '密码长度至少 6 位',
            trigger: [
                'blur'
            ]
        }
    }
})



const user = ref<User>(
    {
        email: '',
        username: '',
        password: '',
    }
)

const doReg = async () => {
    formRef.value.validate(async (valid: any) => {
        if (!valid) return
        try {
            const res = await register({user: user.value})
            setUser(res.data.user)
            router.push({name: 'Home'})
        } catch (error) {
            open(error.message)
        }
    })
}

</script>

<style  scoped>
.title {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;

}
.reg {
    width: 480px;
    margin: 200px auto 0;
    text-align: center;
}
</style>