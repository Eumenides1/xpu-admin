<template>
    <div>
        <div style="text-align: center; background-color: #000;">
            <span class="cursor" @click="isCollapse=!isCollapse">
                <el-icon color="#fff" v-if="isCollapse">
                    <expand></expand>
                </el-icon>
                <el-icon color="#fff" v-else>
                    <fold></fold>
                </el-icon>
            </span>
        </div>
        <el-menu background-color="#000" text-color="#fff" :default-active="defaultActive" router :collapse="isCollapse">
            <template v-for="item in treeData" :key="item.path">
                <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
                    <template #title>
                        <el-icon v-if="item.meta.icon">
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span class="route">{{ item.name }}</span>
                    </template>
                    <template v-for="(child, ci) in item.children" :key="ci">
                        <el-menu-item :index="child.path">
                            <el-icon>
                                <component :is="child.meta.icon"></component>
                            </el-icon>
                            <span style="font-size: medium;">{{ child.name }}</span>
                        </el-menu-item>
                    </template>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import {computed,ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()

const treeData = router.getRoutes().filter((v) => v.meta && v.meta.requiresAuth);

console.log(treeData);

const defaultActive = computed(() => route.path || treeData.values[0].path)

const isCollapse = ref(false)

</script>

<style lang='scss' scoped>


</style>