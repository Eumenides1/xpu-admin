<template>
    <div class="header-cont">
        <div>
            <h1>
                <router-link to="/">
                    XPU-ADMIN
                </router-link>
            </h1>
        </div>
        <div>
            <template v-if="isLoggedIn">
                <el-dropdown trigger="click" @command="handleCommand">
                    <div class="drop-operate">
                        {{ userInfo.username }}
                        <el-icon>
                            <caret-bottom />
                        </el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="toPersonal">个人信息</el-dropdown-item>
                            <el-dropdown-item command="toLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const { userInfo, isLoggedIn } = storeToRefs(userStore)
const {removeUser} = userStore;

const router = useRouter();

const commands = ({
    toPersonal: ()=> {
        console.log('toPersonal');
        router.push('/personal/me')
    },
    toLogout: () => {
        console.log('toLogout');
        removeUser()
        router.push('/register')
    }
})

function handleCommand(command) {
    commands[command] && commands[command]()
}

</script>

<style lang='scss'>
.header-cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 100%;


    a {
        color: inherit;
        text-decoration: none;
    }

    h1 {
        margin: 0;
        font-size: 20px;
    }
}
.drop-operate {
    color: #fff;
}


</style>