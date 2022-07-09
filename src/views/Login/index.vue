<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <template #left>
        <van-icon color="#fff" name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        name="mobile"
        required
      >
        <template #left-icon>
          <toutiao-icon icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        placeholder="密码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <toutiao-icon icon="yanzhengma" />
        </template>
        <template #button>
          <van-count-down
            v-if="isShowcount"
            :time="5000"
            format="ss s"
            @finish="isShowcount = false"
          />
          <van-button
            v-else
            :loading="isDisabled"
            @click="sendSmsCode"
            class="send-sms-btn"
            size="mini"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Logins, getCodes } from "@/api/user";
import { Toast } from "vant";
export default {
  data() {
    return {
      isDisabled: false,
      isShowcount: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[13456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    // goMy() {
    //   this.$router.push("./my");
    // },
    async onSubmit() {
      try {
        const res = await Logins(this.user);
        console.log(res);
        this.$store.commit("setUser", res.data.data);
        Toast.success("登陆成功");
        this.$router.push("/my");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true;
        await getCodes(this.user.mobile);
        this.isShowcount = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        this.$toast.fail(e.response.data.message || "出错了");
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style scope lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
