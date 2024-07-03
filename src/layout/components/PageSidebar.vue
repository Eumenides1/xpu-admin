<template>
    <div>
        <el-menu :default-active="defaultActive" router :collapse="isCollapse">
            <template v-for="item in treeData" :key="item.path">
                <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
                    <template #title>
                        <el-icon v-if="item.meta.icon">
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <template v-for="(child, ci) in item.children" :key="ci">
                        <el-menu-item :index="child.path">
                            <el-icon>
                                <component :is="child.meta.icon"></component>
                                {{ child.name }}
                            </el-icon>
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


const defaultActive = computed(() => route.path || treeData.values[0].path)

const isCollapse = ref(false)

</script>

<style lang='scss' scoped>

</style>