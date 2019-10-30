<template>
  <div>
    <!--1-->
    <el-form v-if="currentStep===1">
      <el-form-item label="在资金投放中的角色：">
        <el-radio-group v-model="orgInfo.role">
          <el-row>
            <el-radio :label="0">资金统筹/委托单位（资金投放计划的发起）、统筹或出资单位</el-radio>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-radio :label="1">资金管理单位（资金投放计划的资金管理单位监管、评估单位）</el-radio>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-radio :label="2">项目执行单位</el-radio>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-col>
            <el-button type="primary" style="margin-left: 161px" size="medium" @click="toTwo()">下一步</el-button>
          </el-col>
        </el-form-item>
      </el-row>
    </el-form>

    <!--2-->
    <el-form v-if="currentStep===2">
      <el-row>
        <el-form-item label="组织类型">
          <el-select v-model="orgInfo.meta.basic.type" placeholder="请选择组织类型">
            <el-option
              v-for="tp in orgTypes"
              :key="tp.key"
              :label="tp.value"
              :value="tp.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="组织名称">
          <el-col :xs="24" :md="5">
            <el-input v-model="orgInfo.name" placeholder="请填写注册证件上的组织全称" size="medium"></el-input>
          </el-col>
        </el-form-item>
      </el-row>

      <!--<el-row>
        <el-form-item label="注册地" prop="meta.basic.register_at">
          <el-col :xs="24" :md="5">
            <el-cascader
              :options="allCityList"
              v-model="orgInfo.meta.basic.register_at"
              style="width: 100%"
              size="medium"
              @active-item-change="becameCity"
              @change="setCity"
              :props="props">
            </el-cascader>
          </el-col>
        </el-form-item>
      </el-row>-->

      <el-row>
        <el-form-item>
          <el-col>
            <el-button type="primary" style="margin-left: 161px" size="medium">上一步</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-button type="primary" style="margin-left: 161px" size="medium" @click="toThree()">下一步</el-button>
          </el-col>
        </el-form-item>
      </el-row>












    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      orgInfo: {},
      orgTypes: [
        {key: 'qtzz', value: '群团组织'},
        {key: 'sydw', value: '事业单位'},
        {key: 'shtt', value: '社会团体'},
        {key: 'xsst', value: '学生社团'},
        {key: 'shfw', value: '民办非企业单位'},
      ],
      cityList: [],
    }
  },


  created() {
    this.getInfo()
  },

  methods: {
    // show() {
    //   console.log(this.$route.params.orgId)
    // },

    getCity() {
      //获取城市
    },


    getInfo() {
      //获取对象
      this.$axios.get('/org/info?orgId=' + this.$route.params.orgId).then(res => {
        this.orgInfo = res.data.data
      })
    },

    toTwo() {
      //to第二页
      this.$axios.post('org/update', this.orgInfo).then(() => {
        this.currentStep ++
        // this.getTwo()
      })
    },

    toThree() {
      //to第三页
      this.$axios.post('org/update', this.orgInfo).then(() => {
        this.currentStep++
      })
    },

    getTwo() {
      this.$axios.post('')

    },
  
  }
}
</script>