<template>
  <div>
    <el-card class="userinfo-card">
      <div>
        <div>
          <el-row>
            <el-col :span="12">
              <h4>{{ memberInfo.name }}</h4>
            </el-col>
            <el-col>
              <el-button @click="remove()">从组织中移除</el-button>
            </el-col>
          </el-row>
        </div>

        <div>
          <el-row>
            <el-col :span="12">
              <div class="span-class">
                <span>姓名：{{ memberInfo.name }}</span><br>
                <span>性别：{{ memberInfo.male }}</span><br>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="span-class">
                <span>手机号：{{ memberInfo.phone }}</span><br>
                <span>邮箱：{{ memberInfo.email }}</span><br>
              </div>
            </el-col>
          </el-row>
        </div>

        <div>
          <el-row>
            <el-col :span="12">
              <div class="span-class">
                <span>学历：{{ memberInfo.maxEducation }}</span><br>
                <span>学校：{{ memberInfo.school }}</span><br>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="span-class">
                <span>专业：{{ memberInfo.maxDegree }}</span><br>
                <span>专业资质：{{ memberInfo.professional }}</span><br>
              </div>
            </el-col>
          </el-row>
        </div>

        <div>
          <el-row>
            <div class="span-class">
              <span>个人简介：{{ memberInfo.personalResume }}</span>
            </div>
          </el-row>
        </div>
      </div>
    </el-card>

    <el-card class="safety-card">
      <h3>组织内角色</h3>
      <span>职务：{{ memberInfo.phone }}</span><br>
      <span>办公电话：</span>
      <template>
        <el-button type="text">修改</el-button>
      </template>
    </el-card>
  </div>
</template>


<script>
// import { getUserInfo } from '@/api/user';

export default {
  props: ['memberId'],
  isMember: '',
  data() {
    return {
      memberInfo: {},
      orgId: this.$route.params.orgId,
    }
  },

  created() {
    this.fetchmemberinfo();
  },

  

  methods: {
    // fetchInfo() {
    //   this.id = this.$store.state.id;
    // },

    fetchmemberinfo() {
      this.$axios.get('/org/user/info?orgId=' + this.$route.params.orgId +'&userId=' + this.$route.params.userId).then(res => {
        this.memberInfo = res.data.data;
      })
    },

    remove() {
      this.$confirm('确定要移除成员 "' + this.memberInfo.name + '"吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/org/user/remove', {params: {orgId: this.orgId, userId: this.memberInfo.id}}).then(() =>{
          this.$message.success('删除成功！')
          this.$router.push(`/org/information/${this.orgId}`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });      
      });
    },

    

    
  },
  
}
</script>


<style>
  .span-class {
    text-align: left;
  }
</style>