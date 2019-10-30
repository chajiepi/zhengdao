<template>
  <div>
    <el-card class="userinfo-card">
      <el-row class="content">

        <el-row class="title">
          <div class="org-num">组织成员(共{{ memberQuantity }}人)</div>
          <el-button type="primary" size="small" @click="openInvite()" class="add-btn">添加新成员</el-button>
        </el-row>


        <el-dialog  :close-on-click-modal='false'  title="添加新成员" width="500px" :visible.sync="inviteVisible">
          <el-row style="font-size: 14px;color: #909399;margin-top: -20px;margin-bottom: 20px">
            受邀用户会收到短信通知，他们只需要用手机号登录系统，完善个人资料之后即可自动加入组织。
          </el-row>
          <el-form>
            <div v-for="(inviteobj, index) in inviteList" :key="index">
              <el-form-item>
                <el-input v-model="inviteobj.name" style="width: 200px;" placeholder="请输入姓名"></el-input>
                <el-input v-model="inviteobj.phone" style="width: 200px;" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <div>
                <el-button @click="addObj()"><i class="el-icon-circle-plus"></i>再加一个</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="openInvite()" size="small">取 消</el-button>
            <el-button type="primary" @click="invite()" size="small" :disabled="!inviteValid">发送邀请</el-button>
          </div>
        </el-dialog>



        <el-row>
          <el-form :model="search">
            <el-form-item label="姓名：">
              <el-input v-model="search.name" size="small" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机：">
              <el-input v-model="search.phone" size="small" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" plain @click="searchMember()">搜索</el-button>
              <el-button type="primary" size="small" plain @click="refresh()">刷新</el-button>
            </el-form-item>
          </el-form>
        </el-row>

      </el-row>

      <el-row>
        <template>
          <el-table :data="memberlist" style="width: 100%">
            <el-table-column
              label="姓名"
              width="170">
              <template slot-scope="scope">
                <el-button type="text" @click="tomemberinfo(scope.row.userId)" :memberId="scope.row.userId">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              width="170">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="邮箱"
              width="170">
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="role">
              <template slot="header">
                <el-tooltip class="item" effect="light" placement="top">
                  <div style="max-width:340px;" slot="content">
                    <h4>成员权限</h4>
                    <h4>组织管理员</h4>
                    组织创建者，拥有所有权限，可以指定组织管理员<br/>
                    <h4>管理员</h4>
                    可以管理组织成员；可以管理和查看所有计划和项目<br/>
                    <h4>成员</h4>
                    可以被加入计划和项目中，只能操作和查看自己被分配到的任务
                  </div>
                  <div style="margin-top:4px;">
                    <span style="font-weight: bold;font-size:15px;">角色</span>
                    <span style="color:#909399;font-size:12px;">成员权限</span>
                    <i class="el-icon-question"></i>
                  </div>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <span v-if="scope.row.role==='organization_admin'">超级管理员</span>
                <span v-if="scope.row.role==='admin'">管理员</span>
                <span v-if="scope.row.role==='member'">成员</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-delete" @click="removemember(scope.row)" style="color: red"></el-button>
              </template>
            </el-table-column>                 
          </el-table>
        </template>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentpage"
          :page-sizes="[10, 20, 30, 50, 100, 200, 300]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="memberQuantity">
        </el-pagination>
      </el-row>

    </el-card>
  </div>
</template>


<script>
// import { getUserInfo } from '@/api/user';


export default {
  data() {
    return {
      memberlist: [],
      memberQuantity: '',
      currentpage: 1,
      limit: 10,
      inviteVisible: false,
      // dialogVisible: false,
      // addDialogForm: false,
      // formLabelWidth: '120px',
      // invitemember: {},
      search: {
        name: '',
        phone: '',
      },
      inviteList: [
        {phone: '', name: ''}
      ],
      orgId: this.$route.params.orgId,
    }
  },
  // components: {
  //   'el-button': 
  // },

  created() {
    //this.show();
    this.getMember({organizationId: this.$route.params.orgId, page: this.currentpage, limit: this.limit});
  },

  methods: {
    // show() {
    //   console.log(this.name)
    // },

    handleSizeChange(perpage) {
      //每页显示多少条
      this.limit = perpage;
      this.getMember({organizationId: this.orgId, page: this.currentpage, limit: this.limit})
    },

    handleCurrentChange(page) {
      //当前页码
      this.currentpage = page;
      this.getMember({organizationId: this.orgId, page: this.currentpage, limit: this.limit})
    },

    tomemberinfo(userId) {
      //to成员信息
      this.$router.push(`/org/member/${this.$route.params.orgId}/user/${userId}`)
    },


    getMember(member) {
      //get成员列表&数量
      this.$axios.get('/org/user/list', {params: member}).then(res => {
        this.memberlist = res.data.data.rows
        this.memberQuantity = res.data.data.total
      })
    },

    openInvite() {
      //开关邀请
      this.inviteVisible = !this.inviteVisible
    },

    addObj() {
      //再加一个
      this.inviteList.push({
        value: ''
      })
    },

    invite() {
      //邀请成员
      this.$axios.get('/org/user/invite', {params: {phones: JSON.stringify(this.inviteList), orgId: this.orgId}}).then(() => {
        this.$message.success('成员添加成功')
        this.inviteVisible = false
        this.searchMember()
      })
    },

    searchMember() {
      //搜索用户
      let memberobj = {
        organizationId: this.$route.params.orgId,
        page: this.currentpage,
        limit: this.limit,
      }
      if (this.search.name) {
        memberobj.name = this.search.name
      }
      if (this.search.phone) {
        memberobj.phone = this.search.phone
      }
      this.getMember(memberobj)
      // this.$axios.get('/org/user/list', memberobj).then(res => {
      //   this.searchlist = res.data.data.rows
      // })
    },

    refresh() {
      //刷新
      this.getMember({organizationId: this.$route.params.orgId, page: this.currentpage, limit: this.limit});
    },

    removemember(member) {
      //删除成员
      this.$confirm('确定要移除成员 "' + member.name + '"吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/org/user/remove', {params: {orgId: this.orgId, userId: member.userId}}).then(() =>{
          this.$message.success('删除成功！')
          this.getMember({organizationId: this.$route.params.orgId, page: this.currentpage, limit: this.limit})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });      
      });
    },


  },

  computed: {
    inviteValid() {
      //添加成员合法
      let vm
      this.inviteList.forEach(data => {
        vm = data
      })
      return String(vm.phone).match(/^1\d{10}$/) && String(vm.name).length > 0
    },
  },
}
</script>

<style>
</style>