<template>
    <el-row class="tac">
        <el-col>
            <el-menu
                :unique-opened="true"
                :default-active="activeMenuIndex"
                class="el-menu-vertical-demo"
                :router="true"
                @open="handleOpen"
                @close="handleClose">
                <el-submenu v-for="(item,key) in menu" :key="key" :index="item.router">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.groupTitle}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                            v-for="(children,key) in item.children"
                            :key="key"
                            :index="children.router"
                            :disabled="children.disabled">
                            {{children.title}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'sidebar',
        data: function () {
            return {
                menu: [
                    {
                        groupTitle: '应用实例',
                        router: '/router11',
                        children: [
                            {router: '/page1', title: 'vTable', disabled: false},
                            {router: '/page2', title: '粒子特效', disabled: false},
                            {router: '/page3', title: '计算属性-购物车', disabled: false},
                            {router: '/page4', title: 'filter-时间格式化', disabled: false}
                        ]
                    },
                    {
                        groupTitle: '导航2',
                        router: '/router21',
                        children: [
                            {router: '/router21', title: '选项21', isDisable: true},
                            {router: '/router22', title: '选项22', isDisable: true}
                        ]
                    }
                ]
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {
            activeMenuIndex() {
                // debugger
                return this.$route.path;
            }
        }
    };
</script>
