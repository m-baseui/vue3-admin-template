<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" :is-active="opened" @toggleClick="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <Screenfull class="screenfull" />
      </el-tooltip>
      <el-dropdown class="avatar-container">
        <span class="el-dropdown-link avatar-wrapper">
          <img src="/img/default.png" class="user-avatar" />
          <span class="user-name">张三丰</span>
          <el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
            <el-dropdown-item divided @click="editPossword">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Screenfull from './Screenfull.vue'
import { CaretBottom } from '@element-plus/icons-vue'

const router = useRouter()
const store = useStore()
const opened = computed(() => store.state.app.sidebar.opened)
const avatar = computed(() => store.state.user.avatar)

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}

const editPossword = () => {
  ElMessage.warning('请联系管理员')
}

const loginOut = () => {
  ElMessageBox.confirm('退出登录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.push('/login')
      })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 50px;
    padding: 0 10px;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
    }

    .international {
      vertical-align: top;
    }

    .theme-switch {
      vertical-align: 15px;
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-dropdown-link{
          display: flex;
        }
        .user-avatar {
          width: 30px;
          height: 30px;

          border-radius: 10px;
        }
        .user-name{
          display: inline-block;
          padding-left: 5px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          top: 20px;
          right: -16px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
