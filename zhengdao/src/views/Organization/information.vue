<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-card class="orginfo-card">
          <div>
            <span style="text-align: left">{{ orgInfo.name }}</span>
            <el-tag type="warning" size="mini" v-if="orgInfo.state===1">待审核</el-tag>
            <el-tag type="success" size="mini" v-if="orgInfo.state===2">已认证</el-tag>
            <el-tag type="warning" size="mini" v-if="orgInfo.state===3">补充资料</el-tag>
            <el-tag type="danger" size="mini" v-if="orgInfo.state===4">不通过</el-tag>
            <el-tag type="warning" size="mini" v-if="orgInfo.state===5">待补充更新资料</el-tag>
            <el-tag type="warning" size="mini" v-if="orgInfo.state===6">更新审核中</el-tag>
            <el-tag type="warning" size="mini" v-if="orgInfo.state===7">更新审核中</el-tag>
            <el-tag type="danger" size="mini" v-if="orgInfo.state===8">已过期</el-tag>
            <el-tag type="danger" size="mini" v-if="orgInfo.state===9">已认证(需补充资料)</el-tag>
            <hr>
            <div>
              <div><!--1-->
                <el-row>
                  <el-col :span="12">
                    <div>
                      <span>组织名称：{{ orgInfo.name }}</span><br>
                      <span>社会信用代码：</span><br>
                      <span>注册地：{{ orgInfo.locations }}</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <span>组织类型：</span><br>
                      <span>成立时间：</span><br>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div><!--2-->
                <el-row>
                  <el-col :span="12">
                    <div>
                      <span>合法注册证明文件：</span><br>
                      <span>注册证件到期日：</span><br>
                      <span>合法年检证明文件：</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <span>发证机关：</span><br>
                      <span>最近一年年检结论：</span><br>
                        <el-tag type="success" size="mini" v-if="orgInfo.meta.basic.check_result===0">合格</el-tag>
                        <el-tag type="danger" size="mini" v-if="orgInfo.meta.basic.check_result===1">不合格</el-tag>
                        <el-tag type="info" size="mini" v-if="orgInfo.meta.basic.check_result===2">未参与</el-tag>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div><!--3-->
                <el-row>
                  <el-col :span="12">
                    <div>
                      <span>社会组织等级：</span><br>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <span>社会组织等级评估证书：</span><br>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <hr>
            <div><!--4-->
              <el-row>
                <el-col :span="12">
                  <div>
                    <span>法定代表人：{{ orgInfo.meta.basic.owner_name }}</span><br>
                    <span>增值税税率：</span><br>
                    <span>银行账户名称：{{ orgInfo.meta.basic.account_name }}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <span>纳税人资格：</span><br>
                    <span>开户行名称：</span><br>
                    <span>银行账号：</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <hr>

          <div>
            <div><!--1-->
              <el-row>
                <el-col :span="24">
                  <div>
                    <span>组织Logo：</span><br>
                    <span>业务范围：
                      <el-tag
                        v-for="(tag, index) in orgInfo.meta.basic2.scope"
                        :key="index">
                        {{tag | getScope}}
                      </el-tag>
                    </span><br>
                  </div>
                </el-col>
              </el-row>
            </div>
            <hr>
            <div><!--2-->
              <el-row>
                <el-col :span="12">
                  <div>
                    <span>是否为民政部认定的慈善组织：
                      <span v-if="orgInfo.meta.basic2.is_ngo == 1">是</span>
                      <span v-if="orgInfo.meta.basic2.is_ngo == 0">否</span>
                    </span><br>
                    <span>慈善组织公开募捐资格证书：</span>						
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <span>是否拥有公募资格：
                      <span v-if="orgInfo.meta.basic2.can_fund == 1">是</span>
                      <span v-if="orgInfo.meta.basic2.can_fund == 0">否</span>
                    </span><br>
                  </div>
                </el-col>
              </el-row>
            </div>
            <hr>
            <div><!--3-->
              <el-row>
                <el-col :span="24">
                  <div>
                    <span>公益慈善性质证明材料：</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <hr>
            <div><!--4-->
              <el-row>
                <el-col :span="12">
                  <div>
                    <span>办公电话：{{ orgInfo.meta.basic2.office_tel }}</span><br>
                    <span>官方微信：</span><br>
                    <span>通讯地址：</span><br>				
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <span>官方邮箱：</span><br>
                    <span>官方网站：</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <hr>
            <div><!--5-->
              <el-row>
                <el-col :span="24">
                  <div>
                    <span>组织简介：</span><br>
                    {{ orgInfo.meta.basic2.description }}
                    <br>
                    <span>组织荣誉：</span><br>
                    {{ orgInfo.meta.basic2.honor }}
                    <br>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="orgtype-card">
          <div>
            <h4 style="text-align: left">角色信息</h4><br>
            <el-row>
              <el-col>
                <span>角色：</span>
              </el-col>
              <el-col>
                <span v-if="orgInfo.role==0">资金统筹/委托单位（资金投放计划的发起、统筹或出资单位）</span>
                <span v-if="orgInfo.role==1">资金管理单位（资金投放计划的资金管理单位监管、评估单位）</span>
                <span v-if="orgInfo.role==2">项目执行单位</span>
              </el-col>

            </el-row>
            <br>
          </div>
        </el-card>
        <el-card class="manager-card">
          <div>
            <span>姓名：{{ orgInfo.meta.manager.name }}</span><br>
            <span>手机：{{ orgInfo.meta.manager.phone }}</span><br>
            <!--<el-button v-for="(file, index) in idCardFiles" @click="toIdCardFile(index)">身份证：{{ file.name }}</el-button><br>-->
            <span>组织代表授权书：</span><br>
            <el-button type="text" @click="show()">try</el-button>
            <br>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
// import { getUserInfo } from '@/api/user';
import { scope } from '@/constants/tag.js';

export default {
  data() {
    return {
      orgInfo: {},
      idCardFiles: [],
    }
  },

  created() {
    this.fetchorginfo();
  },


  filters: {
    getScope(key) {
      //get业务范围标签
      let type
      scope.forEach(data => {
        if (data.key == key) {
          type = data.value
        }
      })
      return type
    }
  },


  methods: {
    // show() {
    //   console.log(this.idCardFiles)
    // },

    // toIdCardFile(index) {
    //   this.$router.push('https://npi-zdyx-test.oss-cn-shanghai.aliyuncs.com/file' + index.url)
    // },

    fetchorginfo() {
      //get组织资料
			this.$axios.get('/org/info?orgId=' + this.$route.params.orgId).then(res => {
				this.orgInfo = res.data.data
        //this.idCardFiles = res.data.data.meta.manager.authorization_upload
			})
    },
    
    


  },
  
}
</script>


<style>
  .orginfo-card {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 10px;
  }
  .orgtype-card {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 20px;
  }
  .manager-card {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 20px;
  }
  .span-class {
    text-align: left;
  }
</style>