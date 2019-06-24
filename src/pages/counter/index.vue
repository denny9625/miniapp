<template>
  <div @click="clickHandle" class="background">
    <img src="http://resource.hxsup.com/miniapp/bg.png" alt="" class="main" mode="widthFix">
    <div class="bottom" v-if="(teamFlag == 0 && teamRemain == 0) || teamFlag == 1">
      <div class="joinNow" @click="pay">￥49.9 立即参加</div>
      <div class="group" @click="_service">
        <div class="price">0元组队</div>
        <div class="detail">邀请3人免费参加</div>
      </div>
    </div>
    <div
      class="bottom"
    >
      <div class="teamMemberRight">
        <div class="captionName">报名已结束</div>
        <div class="shuoming"><span class="red">{{textde}}</span>个家庭成功加入</div>
        <!-- <div class="captionName" v-if="payFlag == 1">你已成功报名</div> -->
        <!-- <div class="shuoming" v-if="payFlag == 1">点击加入7天训练营</div> -->
      </div>
      <div class="joinTeam" @click="teamMemberIn">更多活动</div>
    </div>
    <div class="toastBox" catchtouchmove v-if="serviceControl" @click="closeServiceControl">
      <div class="hint" catchtap>
        <div class="title">{{ToastTitle}}</div>
        <img :src="hintImg" alt="" mode="widthFix">
        <div class="content">
          进入客服会话 <span class="red1">回复“66”</span> 
          <br>
          扫码添加“思维小秘书”
        </div>
        <button
          open-type="contact"
          form-type="submit"
          @handleContact="bindcontact"
          class="service"
          @click="closeServiceControl"
        >{{btnText}}</button>
      </div>
    </div>
    <!-- <div class="textde">{{textde}}</div>
    <div class="textdecap" v-if="teamFlag == 1">
      点击
      <span class="yellow">0元组队</span>，长按扫码
      <br>关注
      <span class="red">公众号</span>查看组队通知
    </div> -->
    <!-- <div class="textde" v-if="teamFlag != 1">{{textde}}</div> -->
    <div class="toastBox" catchtouchmove v-if="userInfoControl">
      <div class="hint user">
        <div class="title shouquan">需要您的授权</div>
        <div class="content userInfo">为了提供更好的服务</div>
        <div class="content userInfo">请在稍后的提示框中点击“允许”</div>
        <img src="/static/images/userInfo.png" alt="" mode="widthFix" class="userImg">
        <button
          open-type="getUserInfo"
          form-type="submit"
          @getuserinfo="bindGetUserInfo"
          class="sure"
        >我知道了</button>
      </div>
    </div>
    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" background-size="cover">
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover">
      <div class="userinfo-nickname">
        <card :text="formId"></card>
      </div>
    </div>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model">
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy">
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    <form @formSubmit="bindsubmit" report-submit>
      <button
        open-type="getUserInfo"
        form-type="submit"
        @getuserinfo="bindGetUserInfo"
        class="btn"
      >授权用户信息</button>
      <button open-type="contact" form-type="submit" @handleContact="bindcontact" class="btn">客服消息</button>
      <button open-type="share" form-type="submit" class="btn">分享</button>
    </form>
    <official-account></official-account>
    <div class="all">
      <div class="left" @click="pay">支付</div>
    </div>-->
  </div>
</template>

<script>
import card from "@/components/card";
import { mapState, mapMutations } from "vuex";
import { SET_OPEN_ID } from "../../store/mutation-types.js";
import _study from "../../../static/images/study.gif";
import _zudui from "../../../static/images/zudui.gif";
import _report from "../../../static/images/zuixin2.gif"
export default {
  data() {
    return {
      motto: "Hello miniprograme",
      userInfo: {},
      code: null,
      iv: null,
      encryptedData: null,
      signature: null,
      rawData: null,
      sessionKey: null,
      formId: null,
      scene: 0,
      ToastTitle: "我要邀请好友组队",
      hintImg: _zudui,
      reportNum: 88,
      serviceControl: false,
      userInfoControl: false,
      textde: "",
      captionName: "",
      teamFlag: 0, //该用户的身份
      teamRemain: 0, //该队伍还剩下几个位置
      idFlag: "邀请好友组队",
      btnText: "点击按钮 回复“66”",
      payFlag: 0
    };
  },
  watch: {
    captionName: function() {
      if (this.captionName.length > 6) {
        this.captionName = this.captionName.slice(0, 6) + "...";
      }
    }
  },
  computed: {
    ...mapState(["openId", "scene"])
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "0元报名，一套完整的数学思维课程体验！",
      path: "pages/index/main",
      imageUrl: "http://resource.hxsup.com/miniapp/share_cover.png"
    };
  },
  methods: {
    teamMemberIn() {
      // this.addStorageNum();
      // this.reportNum = 11;
      this.ToastTitle = "更多活动咨询";
      this.hintImg = _report;
      // this.idFlag = "扫码加入训练营";
      this.btnText = "点击按钮 回复“66”";
      this.serviceControl = true;
      // if (this.payFlag == 0 && this.teamFlag == 0) {
      //   let url = "api/mina/user/join";
      //   this.$http
      //     .get(url)
      //     .then(res => {
      //       console.log(res);
      //       if (res.code == 42) {
      //         this.userInfoControl = true;
      //       } else if (res.code == 43) {
      //         // this.textde = this.captionName + "的组员已满，请重新组队！";
      //         this.teamRemain = 0;
      //         this.reportNum = 88;
      //         this.hintImg = _zudui;
      //         this.ToastTitle = "已满！请重新组队";
      //         this.idFlag = "扫码领取专属海报";
      //         this.btnText = "点击按钮，回复“88”";
      //         this.serviceControl = true;
      //       }
      //     })
      //     .catch(err => {});
      // }
    },
    closeServiceControl() {
      this.serviceControl = false;
    },
    initSeccessNum(value) {
      wx.setStorage({
        key: "num",
        data: value
      });
      // this.textde = "已有" + value + "人成功参与";
    },
    addStorageNum() {
      var that = this;
      that.textde = null;
      try {
        const value = wx.getStorageSync("num");
        if (value) {
          console.log(value);
          // Do something with return value
          var num = parseInt(value) + 1;
          wx.setStorage({
            key: "num",
            data: num
          });
          that.textde = "已有" + num + "人成功参与";
        }
      } catch (e) {
        console.log(e);
        // Do something when catch error
      }
    },
    _service() {
      // this.addStorageNum();
      this.reportNum = 88;
      this.hintImg = _zudui;
      this.ToastTitle = "我要邀请好友组队";
      this.idFlag = "扫码领取专属海报";
      this.btnText = "点击按钮，回复“88”";
      this.serviceControl = true;
    },
    getUserInfo() {
      var that = this;
      wx.getUserInfo({
        success: function(res) {
          console.log("13212", res);
          that.userInfo = res.userInfo;
          that.rawData = res.rawData;
          that.signature = res.signature;
          that.encryptedData = res.encryptedData;
          that.iv = res.iv;
          let url = "api/mina/user/info";
          let param = {
            userInfo: that.userInfo,
            rawData: that.rawData,
            signature: that.signature,
            encryptedData: that.encryptedData,
            iv: that.iv,
            sessionKey: that.sessionKey
          };
          that.$http
            .get(url, param)
            .then(res => {
              console.log("res", res);
              that.teamFlag = res.data.teamFlag;
              that.teamRemain = res.data.teamRemain;
              that.captionName = res.data.leaderNickname;
              that.payFlag = res.data.payFlag;
              that.initSeccessNum(res.data.num);
              that.textde = res.data.num
              if (
                res.data.teamFlag == 0 &&
                res.data.teamRemain == 0 &&
                res.data.leaderNickname.length > 0
              ) {
                // that.textde = that.captionName + "的组员已满，请重新组队！";
                that.reportNum = 88;
                that.hintImg = _zudui;
                that.ToastTitle = "已满！请重新组队";
                that.idFlag = "扫码领取专属海报";
                that.btnText = "点击按钮，回复“88”";
                that.serviceControl = true;
              }
            })
            .catch(err => {});
        },
        fail: function(res) {
          that.userInfoControl = true;
        }
      });
    },
    ...mapMutations({
      setOpenId: "SET_OPEN_ID",
      setScene: "SET_SCENE"
    }),
    // 使用了async+await的语法，用同步的方式写异步脚本
    async login(code) {
      let that = this;
      try {
        // const resData = await login({ code: code });
        // console.log(resData)
        // if (resData.returnCode == 200) {
        // that.setOpenId(that);
        // }
        // 这里可以把code传给后台，后台用此获取openid及session_key
        let url = "api/mina/user/login";
        // let url = "api/mina/user/info";
        that.code = code;
        let param = {
          code: code
        };
        that.$http
          .get(url, param)
          .then(res => {
            // console.log("res", res);
            that.sessionKey = res.sessionKey;
            that.setOpenId(res.openid);
            that.getUserInfo();
          })
          .catch(err => {});
      } catch (err) {
        // console.error(err);
      }
    },
    // 拆分wx.login，结构更清晰
    _login() {
      var that = this;
      wx.login({
        success(res) {
          // console.log(res);
          if (res.code) {
            // console.log("wx.login成功,code:", res.code);
            let code = res.code;
            that.login(code);
          }
        }
      });
    },
    pay() {
      // this.addStorageNum();
      var that = this;
      let url = "api/mina/pay/wxMaPay";
      let timeStamp = "";
      let nonceStr = "";
      let packAge = "";
      let signType = "MD5";
      let paySign = "";
      this.$http
        .get(url)
        .then(res => {
          console.log("res", res);
          timeStamp = res.data.timeStamp;
          nonceStr = res.data.nonceStr;
          packAge = res.data.packageValue;
          signType = "MD5";
          paySign = res.data.paySign;
          console.log(wx);
          wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: packAge,
            signType: "MD5",
            paySign: paySign,
            success(res) {
              that.teamFlag = 2;
              that.payFlag = 1;
            },
            fail(res) {
              that.formId = res;
              console.log(res);
            }
          });
        })
        .catch(err => {});
    },
    bindViewTap() {
      // const url = "../logs/main";
      // if (mpvuePlatform === "wx") {
      // mpvue.switchTab({ url });
      // } else {
      // mpvue.navigateTo({ url });
      // }
    },
    bindcontact(e) {
      console.log(e);
    },

    bindsubmit(e) {
      this.formId = e.target.formId;
      console.log(e);
    },
    clickHandle(ev) {
      // console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    },
    bindGetUserInfo(e) {
      if (e.mp.detail.userInfo) {
        this.userInfoControl = false;
        var that = this;
        that.userInfo = e.mp.detail.userInfo;
        that.rawData = e.mp.detail.rawData;
        that.signature = e.mp.detail.signature;
        that.encryptedData = e.mp.detail.encryptedData;
        that.iv = e.mp.detail.iv;
        let url = "api/mina/user/info";
        let param = {
          userInfo: that.userInfo,
          rawData: that.rawData,
          signature: that.signature,
          encryptedData: that.encryptedData,
          iv: that.iv,
          sessionKey: that.sessionKey
        };
        that.$http
          .get(url, param)
          .then(res => {
            console.log("res", res);
            that.teamFlag = res.data.teamFlag;
            that.teamRemain = res.data.teamRemain;
            that.captionName = res.data.leaderNickname;
            that.payFlag = res.data.payFlag;
            that.initSeccessNum(res.data.num);
              that.textde = res.data.num
            if (
              res.data.teamFlag == 0 &&
              res.data.teamRemain == 0 &&
              res.data.leaderNickname.length > 0
            ) {
              // that.textde = that.captionName + "的组员已满，请重新组队！";
              that.reportNum = 88;
              that.hintImg = _zudui;
              that.ToastTitle = "已满！请重新组队";
              that.idFlag = "扫码领取专属海报";
              that.btnText = "点击按钮，回复“88”";
              that.serviceControl = true;
            }
          })
          .catch(err => {});
      } else {
        wx.showToast({
          title: "为了您更好的体验,请先同意授权",
          icon: "none",
          duration: 2000
        });
      }
    }
  },

  onLoad(query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene);
    if (scene !== "undefined") {
      this.scene = scene;
      this.setScene(scene);
    }
    this.userInfoControl = true;

    this._login();
  },

  created() {},
  mounted() {}
};
</script>

<style scoped>
@keyframes jianbian {
  0% {
    background-color: #ff2b72;
    box-shadow: 0 0 25rpx #f3e5a1;
    /* transform: scale(0.8); */
  }
  50% {
    background-color: hotpink;
    box-shadow: 0 0 50rpx #ff6969;
    /* transform: scale(1); */
  }
  100% {
    background-color: #ff2b72;
    box-shadow: 0 0 25rpx #f3e5a1;
    /* transform: scale(0.8); */
  }
}
.background {
  background-color: #8dd55b;
}
.teamMemberRight {
  width: 350rpx;
  height: 100%;
  float: left;
  text-align: right;
  padding-top: 40rpx;
}
.joinTeam {
  float: right;
  width: 310rpx;
  height: 110rpx;
  line-height: 110rpx;
  background-color: #ff6969;
  border-radius: 20rpx;
  text-align: center;
  font-size: 38rpx;
  color: #fff;
  margin-top: 20rpx;
  margin-right: 35rpx;
  animation: jianbian 2s linear infinite;
}
.teamMemberRight .captionName {
  font-size: 32rpx;
  color: #333;
  font-weight: 600;
}
.shuoming {
  font-size: 24rpx;
  color: #333;
  margin-top: 10rpx;
}
.textde {
  position: fixed;
  right: 0;
  bottom: 200rpx;
  width: auto;
  height: 88rpx;
  border-radius: 44rpx 0 0 44rpx;
  background-color: #1dd0d0;
  padding-left: 52rpx;
  padding-right: 30rpx;
  line-height: 88rpx;
  font-size: 30rpx;
  color: #fff;
}
.textdecap {
  position: fixed;
  right: 0;
  bottom: 200rpx;
  width: auto;
  border-radius: 44rpx 0 0 44rpx;
  background-color: #1dd0d0;
  padding-left: 52rpx;
  padding-right: 30rpx;
  line-height: 45rpx;
  font-size: 30rpx;
  color: #fff;
  padding-top: 5rpx;
  padding-bottom: 5rpx;
}
.red {
  color: red;
  font-weight: 700;
}
.yellow {
  color: #ffdf4b;
  font-weight: 700;
}
.sure {
  width: 400rpx;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #02bf01;
  border-radius: 44rpx;
  color: #fff;
}
.userImg {
  margin-top: 40rpx;
}
.service {
  width: 370rpx;
  height: 90rpx;
  border-radius: 50rpx;
  background-color: #ff6877;
  margin: 0 auto;
  padding: 0;
  font-size: 28rpx;
  color: #fff;
  text-align: center;
  line-height: 90rpx;
  margin-top: 30rpx;
}
.toastBox .content span {
  color: red;
}
.toastBox .hint .userInfo {
  width: 100%;
  margin-top: 0;
  text-align: center;
}
.toastBox {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toastBox .hint {
  width: 620rpx;
  height: 870rpx;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 30rpx;
}
.toastBox .user {
  width: 620rpx;
  height: 812rpx;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 30rpx;
}
.toastBox .content {
  width: 400rpx;
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 32rpx;
  margin-top: 30rpx;
  color: #666;
}
.hint .title {
  font-size: 38rpx;
  text-align: center;
  color: #000;
  line-height: 115rpx;
}
.red1 {
  color: red;
}
.shouquan {
  margin-bottom: 60rpx;
}
.toastBox .hint img {
  width: 80%;
  margin: 0 auto;
  display: block;
}
.scene {
  width: 100%;
  height: 20rpx;
  color: #000;
  position: fixed;
  right: 0;
  bottom: 200rpx;
}
.main {
  width: 100%;
  margin-bottom: 150rpx;
}
.bottom {
  width: 100%;
  height: 150rpx;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.joinNow {
  width: 310rpx;
  height: 110rpx;
  border-radius: 20rpx;
  background-color: #ffb847;
  color: #fff;
  font-size: 33rpx;
  margin-top: 20rpx;
  float: left;
  line-height: 110rpx;
  text-align: center;
  margin-left: 44rpx;
  padding: 0;
}

.group {
  width: 310rpx;
  height: 110rpx;
  border-radius: 20rpx;
  background-color: #ff6969;
  color: #fff;
  text-align: center;
  margin-top: 20rpx;
  float: right;
  margin-right: 44rpx;
  animation: jianbian 2s linear infinite;
}

.group .price {
  font-size: 38rpx;
  line-height: 38rpx;
  margin: 19rpx 0 14rpx 0;
}
.group .detail {
  font-size: 22rpx;
  line-height: 22rpx;
}
/* .btn {
  width: auto;
  height: 128rpx;
  background-color: yellow;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
} */
</style>
