<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登錄</h1>
      <el-card shadow="never" class="login-card">
        <!--登錄-->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="請輸入手機號" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="請輸入密碼" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              用戶平台使用協議
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 350px;" type="primary" @click="login">
              登錄
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        isAgree: false
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '請輸入mobile',
          trigger: 'blur'
        }, {
          pattern: /^(09)\d{8}$|^(\+8869)\d{9}$/,
          message: 'mobile格式錯誤',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '請輸入密碼',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 16,
          message: '密碼長度位於6~16之間',
          trigger: 'blur'

        }],
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule 格式
            // value 值
            // callback ->promise - reject
            // callback ==callback(new Error )
            value ? callback() : callback(new Error('必須勾選'))
          }
        }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(
        (isOK) => {
          if (isOK) {
            this.$store.dispatch('user/login', this.loginForm)
          }
        })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>