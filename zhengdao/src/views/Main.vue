<template>
  <div class="home">
    <div>
      <el-container>
        <el-aside width="180px"><!--aside-->
          <el-row class="tac">
            <el-col :span="24">
              <h5>自定义颜色</h5>
              <el-menu
                default-active="1"
                class="aside-menu"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#409EFF">
                <el-menu-item index="1">
                  <template>
                  <el-button type="text" v-popover:popover @click="getOrgList()">当前组织</el-button>
                    <el-popover
                    ref="popover"
                    placement="right"
                    trigger="click">
                      <template>
                        <el-button type="text" @click="toCreateOrg()">创建组织</el-button>
                      </template>
                      <el-menu v-for="(org, i) in orgList" :key="i">
                        <el-menu-item @click="changeOrg(org.id)">{{ org.name }}</el-menu-item>
                      </el-menu>
                      <!--<template v-for="org in orgList">
                        <v-button type="text">{{ org.name }}</v-button><br>
                      </template>-->
                    </el-popover>
                  </template>
                </el-menu-item>
                <el-menu-item index="2" @click="toOrgInfo()">
                  <i class="el-icon-menu"></i>
                  <span slot="title">组织资料</span>
                </el-menu-item>
                <el-menu-item index="3" @click="toOrgMember()">
                  <i class="el-icon-menu"></i>
                  <span slot="title">组织成员</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-menu"></i>
                  <span slot="title">投放管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-menu"></i>
                  <span slot="title">智能天眼</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-header height="50px"><!--header-->
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
              background-color="#FFFFFF"
              text-color="#606266"
              active-text-color="#ffd04b">
              <el-menu-item index="1">
                <template slot="title">
                  <i class="el-icon-date"></i>
                </template>
              </el-menu-item>
              <el-menu-item index="2">
                <template slot="title">
                  <i class="el-icon-bell"></i>
                </template>
              </el-menu-item>
              <el-menu-item index="3">
                <template slot="title">
                  <i class="el-icon-question"></i>
                </template>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title" style="text-align: right">
                  <i class="el-icon-edit"></i>
                </template>
                <el-menu-item index="4-1" @click="toUserInfo()">个人资料</el-menu-item>
                <el-menu-item index="4-2" @click="logout()">退出登录</el-menu-item>
              </el-submenu>
              <!--<template>
                <el-alert
                  class="top-alert"
                  type="warning"
                  style="margin-top: 0"
                  :closable="false">
                  不可关闭的 alert
                </el-alert>
              </template>-->
            </el-menu>
          </el-header>
          <el-main>
            <div><!--root-->
              <router-view/>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      orgList: [],
      currentOrgName: '',
    }
  },
  components: {},


  methods: {
    toUserInfo() {
      //to个人资料
      this.$router.push('/mine/info')
    },

    toOrgMember() {
      //to组织成员
      this.$router.push(`/org/member/${this.$route.params.orgId}`)
    },

    toOrgInfo() {
      //to组织资料
      this.$router.push(`/org/information/${this.$route.params.orgId}`)
    },

    toCreateOrg() {
      //to创建组织
      this.$axios.get('/org/add').then(res => {
        this.$router.push(`/org/form/${res.data.data}`)
      })
    },

    getOrgList() {
      //get组织列表
      this.$axios.get('/org/orgList').then(res => {
        this.orgList = res.data.data
      })
    },

    changeOrg(orgId) {
      //切换组织
      this.$store.commit('SET_CURRENTORGID', orgId)
      this.$router.push(`/org/information/${this.$store.state.currentorgid}`)
      this.$router.go(0)
    },

    logout() {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push('/login')
      })
    },



  },
}
</script>




<style>
  .aside-menu {
    width: 180px;
  }
  .top-alert {
    height: 30px;
    text-align: center;
  }
  .top-icon {
    width: 58px;
    text-align: right;
  }
</style>