<template>
    <div>
        <div>
            <el-form class="login" ref="formRef" :model="user" :rules="rules" label-width="86px">
                <h3>登录</h3>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input 
                        placeholder="请输入邮箱"
                        prefix-icon="user"
                        v-model="user.email"
                    />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input 
                        type="password"
                        placeholder="请输入密码"
                        prefix-icon="lock"
                        v-model="user.password"
                    />
                </el-form-item>
                <el-form-item label>
                    <el-button
                        type="primary"
                        class="w100p"
                        @click="doLogin"
                    >登录</el-button>
                </el-form-item>
                <div class="txt-r">
                    <router-link to="/register">没有账号？去注册</router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { User } from '@/types';
import { ElMessage } from 'element-plus'
import { login } from '@/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const { setUser } = userStore;



const router = useRouter()

const open = (message) => {
    ElMessage.error(message)
}


const user = reactive<User>({
    email: '',
    password:''
})

const formRef = ref()

const rules = computed(() => {
    return {
        email: [
            {
                required: true,
                message: '请输入邮箱',
                trigger: ['blur']
            }
        ],
        password: [
            {
                required: true,
                min: 6,
                message: '密码长度不得小于 6 位',
                trigger: ['blur']
            }
        ]
    }
})

function doLogin() {
    formRef.value.validate(async (valid: any) => {
        if (!valid) return;
        try {
            const res = await login({user: user})
            setUser(res.data.user)
            router.push('/')
        }catch (error) {
            open(error.message)
        }
    })
}
</script>

<style lang='scss' scoped>

.login {
    width: 480px;
    margin: 200px auto 0;
    text-align: center;
}

</style>