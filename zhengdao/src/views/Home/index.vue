<template>
  <div>
    <el-container>
      <el-aside width="180px"><!--aside-->
        <el-row class="tac">
          <el-col :span="12">
            <h5>自定义颜色</h5>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1" @click="toorgmember()">
                <i class="el-icon-menu"></i>
                <span slot="title">组织成员</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>请选择组织</span>
                </template>
                <el-menu-item-group>
                  <template>分组一</template>
                  <el-menu-item v-for="(org, i) in orglist" :key="i" @click="changeorg(org.id)">{{ org.name }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header><!--head-->
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2" to="/mine/info">我的</el-menu-item>
            <el-submenu index="3" style="text-align: right;">
              <template slot="title">我的</template>
              <el-menu-item index="3-1">个人资料</el-menu-item>
              <el-menu-item index="3-2">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-main><!--main-->
          <el-card>
            <div class="information-card">
              <div class="bread-crumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item>
                    <span>hhhhhh</span>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <hr>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名">
                  <el-input class="information-input" v-model="information.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="information.male">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input class="information-input" :disabled="true" v-model="information.phone"></el-input>
                </el-form-item>
                <hr>
                <!--<el-form-item label="手机号：">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item label="最高学历学校">
                  <el-input class="information-input" v-model="information.school"></el-input>
                </el-form-item>
                <el-form-item label="最高学历专业">
                  <el-input class="information-input" v-model="information.maxDegree"></el-input>
                </el-form-item>
                <el-form-item label="专业资质">
                  <el-input class="information-input" v-model="information.professional"></el-input>
                </el-form-item>
                <hr>
                <el-form-item label="个人简介">
                  <el-input type="textarea" style="width: 500px; height: 140px" v-model="information.personalResume"></el-input>
                </el-form-item>
                <hr>
                <el-button type="primary" class="next-step" @click="toCreateTeam()">看信息</el-button>
                <el-button type="primary" class="next-step" @click="fetchInfo()">下一步</el-button>
                <h3>{{ id }}</h3>
              </el-form>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      id: 'yes',
      information: {
        name: '',
        phone: "",
        male: "男",
        maxEducation: "",
        maxDegree: "",
        school: "",
        professional: "",
        personalResume: ""
      },
      orglist: [],
      currentOrg: '',
    }
  },
  created() {
    this.getorglist()
  },

  methods: {
    changeorg(orgId) {
      this.$router.push(`/org/information/${orgId}`)
    },


    getorglist() {
      this.$axios.get('/org/orgList').then(res => {
        this.orglist = res.data.data
      })
    },

    toorgmember(orgId) {
      this.$router.push(`/org/member/${orgId}`)
    },

    toCreateTeam() {
      this.$router.push('/mine/info')
    },

    fetchInfo() {
      this.id = this.$store.state.id
    },

    // phonedefault() {
    //   this.information.phone = this.
    // }
    updateorg() {
      this.$axios.post('/org/update')
    }



  },
  
}
</script>



<style>
  .bread-crumb {
    text-align: right;
  }
  .information-card {
    text-align: left;
  }
  .information-input {
    width: 240px;
    height: 36px;
  }
  .next-step {
    width: 82px;
    margin: 36px;
  }
</style>