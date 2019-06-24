<template>
  <div @click="closeSelect" class="bg_color">
    <div class="leftTime" v-show="scene == 'app' && time > 0">距离活动结束仅剩
      <div class="detailTime1">{{day1}}</div>
      <div class="detailTime2">{{day2}}</div>天
      <div class="detailTime1">{{hour1}}</div>
      <div class="detailTime2">{{hour2}}</div>时
      <div class="detailTime1">{{min1}}</div>
      <div class="detailTime2">{{min2}}</div>分
    </div>
    <!-- <view class="section__title">日期选择器</view> -->
    <img
      :src="scene == 'app' || scene == 'five_minutes_share' || scene == 'DB-fu-Kimi' ? '/static/images/2121.png' : '/static/images/120.png'"
      alt=""
      mode="widthFix"
      :class="scene == 'app' && time > 0 ? 'topImg' : 'topImgunder'"
    >
    <div :class="selectLevel == 8 ? 'bgboxTop' : 'bgboxMiddle'">
      <div class="selectbtn" catchtap @click="selectBtnClick">
        <div class="zindex">
          {{studyLevel}}
          <img
            src="/static/images/jiantou.png"
            alt=""
            :class="isselected ? 'jiantou1' : 'jiantou'"
            mode="widthFix"
          >
        </div>
        <div
          :class="isselected ? 'selected' : 'selectBox'"
          @click="setlevel"
          catchtap
        >{{studyLevel2}}</div>
      </div>
      <img :src="star[0]" alt="" class="star1" mode="widthFix">
      <img :src="star[1]" alt="" class="star2" mode="widthFix">
      <img :src="star[2]" alt="" class="star3" mode="widthFix">
      <div class="classTime classTime1">{{weekday[0]}}&nbsp;群内导学</div>
      <div class="classTime classTime2">{{weekday[1]}}&nbsp;群内导学</div>
      <div class="classTime classTime3">{{weekday[2]}}&nbsp;群内导学</div>
      <div class="studyNum">已有 {{num}} 个小朋友进入学习</div>
      <img :src="lessonimg1" alt="" @click="videobtnClick(1)" class="classdetail">
      <div class="lessonInfo">
        <h3>{{lessonTitle1}}</h3>
        <p>
          {{lessondetail11}}
          <br>
          {{lessondetail12}}
        </p>
      </div>
      <img :src="lessonimg2" alt="" @click="videobtnClick(2)" class="classtry1">
      <div class="lessonInfo lesson1">
        <h3>{{lessonTitle2}}</h3>
        <p>
          {{lessondetail21}}
          <br>
          {{lessondetail22}}
        </p>
      </div>
      <img :src="lessonimg3" alt="" @click="videobtnClick(3)" class="classtry2">
      <div class="lessonInfo lesson2">
        <h3>{{lessonTitle3}}</h3>
        <p>
          {{lessondetail31}}
          <br>
          {{lessondetail32}}
        </p>
      </div>
    </div>
    <img src="/static/images/123_04.png" alt="" class="img-bottom" mode="widthFix">
    <!-- <img src="../../../static/images/bg1.png" alt="" class="background-main" mode="widthFix"> -->
    <div class="videoBox" v-if="showVideo">
      <video
        id="myvideo"
        :class="showVideo? 'show' : ''"
        :src="src"
        @fullscreenchange="exit"
        @ended="videoEnd"
      ></video>
    </div>
    <!-- <button @click="govideo">视频</button> -->
    <div class="pagebottom" @click="openServiceControl">免费领取{{scenetxt}}&nbsp;&nbsp;立即进群学习</div>
    <div class="toastBox" catchtouchmove v-if="userAgeControl">
      <div class="ageBox">
        <img src="../../../static/images/ageTop.png" mode="widthFix" alt="" class="agetop">
        <div class="ageBottom">
          <h2>
            宝宝
            <span>{{age}}</span>
            岁了
          </h2>
          <picker
            mode="date"
            :value="date"
            start="2011-01-01"
            :end="endDate"
            @change="bindDateChange"
          >
            <view class="picker">{{date}}</view>
          </picker>
          <div class="nextBtn" @click="nextride">下一步</div>
          <div class="soon">即将推荐适龄课程</div>
        </div>
      </div>
    </div>
    <div class="toastBox" catchtouchmove v-if="lessonControl" @click="closelessontoast">
      <div class="lessonToastBox" catchtap>
        <img
          src="/static/images/close.png"
          alt=""
          class="closeToast"
          @click="closelessontoast"
          mode="widthFix"
        >
        <img
          src="/static/images/lesson1.png"
          alt=""
          class="lesson"
          mode="widthFix"
          @click="onlyVideo"
        >
        <div class="lessontitle">{{title1}}</div>
        <img
          src="/static/images/lesson2.png"
          alt=""
          class="lesson"
          mode="widthFix"
          @click="videoEnd"
        >
        <div class="lessontitle">{{title2}}</div>
      </div>
    </div>
    <div class="toastBox" catchtouchmove v-if="serviceControl" @click="closeServiceControl">
      <div class="hint" catchtap>
        <div class="title">我要进群学习</div>
        <img :src="gifsrc" alt="" mode="widthFix">
        <div class="content">
          进入客服会话
          <span class="red1">回复“{{reportNum}}”</span>
          <br>扫码立即进入学习群
        </div>
        <button
          open-type="contact"
          form-type="submit"
          @handleContact="bindcontact"
          class="service"
          @click="closeServiceControl"
        >点击按钮 回复“{{reportNum}}”</button>
      </div>
    </div>
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
  </div>
</template>

<script>
import card from "@/components/card";
import { mapState, mapMutations } from "vuex";
import { SET_OPEN_ID } from "../../store/mutation-types.js";
import gifapp from "../../../static/images/gif-app.gif";
import gifunder from "../../../static/images/gif-under.gif";
import gitDB from "../../../static/images/zuixin_DB.gif"
import mlesson1 from "../../../static/images/4-5lesson1.png";
import mlesson2 from "../../../static/images/4-5lesson2.png";
import mlesson3 from "../../../static/images/4-5lesson3.png";
import llesson1 from "../../../static/images/5-7lesson1.png";
import llesson2 from "../../../static/images/5-7lesson2.png";
import llesson3 from "../../../static/images/5-7lesson3.png";
import star_watch from "../../../static/images/star_watch.png";
import star_watched from "../../../static/images/star_watched.png";
export default {
  data() {
    return {
      index: 0,
      age: 5,
      date: "选择出生年月日 > ",
      customItem: "全部",
      endDate: "",
      showVideo: false,
      value: "32322",
      code: '',
      userInfoControl: false,
      userAgeControl: false,
      num: "",
      lessonControl: false,
      serviceControl: false,
      lessonimg1: llesson1,
      lessonimg2: llesson2,
      lessonimg3: llesson3,
      lessonTitle1: "01 小动物排队",
      lessonTitle2: "02 小跳棋",
      lessonTitle3: "03 跷跷板",
      lessondetail11: "找到不同的排队方法",
      lessondetail12: "能力：分析、概括",
      lessondetail21: "通过空间旋转进行推理",
      lessondetail22: "能力：空间、推荐",
      lessondetail31: "小动物的轻重排序",
      lessondetail32: "能力：判断、推理",
      star: [star_watch, star_watch, star_watch],
      src:
        "http://vedio.hxsup.com/thinking_training/%E5%B0%8F%E5%8A%A8%E7%89%A9%E6%8E%92%E9%98%9F.mp4",
      title1: "送小动物回家",
      title2: "数学游戏",
      id: 1,
      selectArea: false,
      studyLevel: "5-7岁思维课",
      studyLevel2: "4-5岁思维课",
      isselected: false,
      selectLevel: 8,
      gifsrc: gifapp,
      reportNum: 66,
      classtime: "05.28",
      day1: 0,
      hour1: 0,
      min1: 0,
      day2: 0,
      event: 0,
      hour2: 0,
      min2: 0,
      scene: "",
      time: 0,
      weekday: ["", "", ""],
      scenetxt: '卡牌'
    };
  },
  watch: {
    studyLevel: function() {
      if (this.studyLevel == "5-7岁思维课") {
        this.studyLevel2 = "4-5岁思维课";
        this.selectLevel = 8;
        this.lessonTitle1 = "01 小动物排队";
        this.lessonTitle2 = "02 小跳棋";
        this.lessonTitle3 = "03 跷跷板";
        this.lessondetail11 = "找到不同的排队方法";
        this.lessondetail12 = "能力：分析、概括";
        this.lessondetail21 = "通过空间旋转进行推理";
        this.lessondetail22 = "能力：空间、推荐";
        this.lessondetail31 = "小动物的轻重排序";
        this.lessondetail32 = "能力：判断、推理";
        this.lessonimg1 = llesson1;
        this.lessonimg2 = llesson2;
        this.lessonimg3 = llesson3;
      } else if (this.studyLevel == "4-5岁思维课") {
        this.studyLevel2 = "5-7岁思维课";
        this.selectLevel = 9;
        this.lessonTitle1 = "01 联想游戏";
        this.lessonTitle2 = "02 漂亮的帽子 ";
        this.lessonTitle3 = "03 披萨游戏";
        this.lessondetail11 = "根据内部属性关联物体 ";
        this.lessondetail12 = "能力：分析、判断";
        this.lessondetail21 = "对帽子进行分类涂色";
        this.lessondetail22 = "能力：方位、分类";
        this.lessondetail31 = "用规律推理棋子位置";
        this.lessondetail32 = "能力：空间、推理";
        this.lessonimg1 = mlesson1;
        this.lessonimg2 = mlesson2;
        this.lessonimg3 = mlesson3;
      }
      this.changestar();
    }
  },

  computed: {
    ...mapState([
      "openId",
      "scene",
      "middleClasswatchd",
      "topClasswatchd",
      "place"
    ])
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
    }
    let path = "pages/index/main?scene=" + this.$store.state.scene;
    return {
      title: "0元报名，一套完整的数学思维课程体验！",
      path: path,
      imageUrl: "http://resource.hxsup.com/miniapp/bbswxk/share.png"
    };
  },
  methods: {
    timeFunction(expireDay) {
      var that = this;
      var day = expireDay / 86400 / 1000;
      var d = Math.floor(day);
      var day1 = Math.floor(day).toString();
      if (day1 < 10) {
        if (day1 < 0) {
          that.day1 = "-";
          that.day2 = day1;
        } else if (day1 == 0) {
          that.day1 = 0;
          that.day2 = 0;
        } else {
          that.day1 = 0;
          that.day2 = day1;
        }
      } else {
        that.day2 = day1.substring(1);
        that.day1 = (day1 - day1.substring(1)) / 10;
      }

      var hour = (expireDay - d * 3600 * 24 * 1000) / 1000 / 3600;
      var h = Math.floor(hour);
      var hour1 = Math.floor(hour).toString();
      if (hour1 < 10) {
        if (hour1 == 0) {
          that.hour1 = 0;
          that.hour2 = 0;
        } else {
          that.hour2 = hour1;
          that.hour1 = 0;
        }
      } else {
        that.hour2 = hour1.substring(1);
        that.hour1 = parseInt(hour1 - hour1.substring(1)) / 10;
      }
      var min =
        (expireDay - d * 3600 * 24 * 1000 - h * 1000 * 3600) / 1000 / 60;
      var min1 = Math.floor(min).toString();
      if (min1 < 10) {
        if (min1 == 0) {
          that.min1 = 0;
          that.min2 = 0;
        } else {
          that.min1 = 0;
          that.min2 = min1;
        }
      } else {
        that.min2 = min1.substring(1);
        that.min1 = parseInt(min1 - min1.substring(1)) / 10;
      }
    },
    timeout(time) {
      var expireDay = time;
      var that = this;
      this.timeFunction(expireDay);
      setInterval(function() {
        expireDay -= 60000;
        that.timeFunction(expireDay);
      }, 60000);
    },
    changestar() {
      if (this.selectLevel == 8) {
        for (let i = 0; i < this.$store.state.topClasswatchd.length; i++) {
          if (this.$store.state.topClasswatchd[i] == 1) {
            this.star[i] = star_watched;
          } else {
            this.star[i] = star_watch;
          }
        }
      } else {
        for (let j = 0; j < this.$store.state.middleClasswatchd.length; j++) {
          if (this.$store.state.middleClasswatchd[j] == 1) {
            this.star[j] = star_watched;
          } else {
            this.star[j] = star_watch;
          }
        }
      }
    },
    onlyVideo() {
      let id = this.id;
      this.lessonControl = false;
      if (this.selectLevel == 8) {
        if (id == 1) {
          this.src =
            "http://vedio.hxsup.com/thinking_training/%E5%B0%8F%E5%8A%A8%E7%89%A9%E6%8E%92%E9%98%9F.mp4";
          this.govideo();
        } else if (id == 2) {
          this.src = "http://vedio.hxsup.com/thinking_training/306.mp4";
          this.govideo();
        } else if (id == 3) {
          this.src =
            "http://vedio.hxsup.com/thinking_training/%E8%B7%B7%E8%B7%B7%E6%9D%BF.mp4";
          this.govideo();
        }
      } else if (this.selectLevel == 9) {
        if (id == 1) {
          this.src =
            "http://vedio.hxsup.com/thinking_training/mid/1%E8%81%94%E6%83%B3%E6%B8%B8%E6%88%8F.mp4";
          this.govideo();
        } else if (id == 2) {
          this.src =
            "http://vedio.hxsup.com/thinking_training/mid/2%E6%BC%82%E4%BA%AE%E7%9A%84%E5%B8%BD%E5%AD%90.mp4";
          this.govideo();
        } else if (id == 3) {
          this.src =
            "http://vedio.hxsup.com/thinking_training/mid/3%E6%8A%AB%E8%90%A8%E6%B8%B8%E6%88%8F.mp4";
          this.govideo();
        }
      }
    },
    closeSelect() {
      this.isselected = false;
    },
    setlevel() {
      let studyLevel = this.studyLevel;
      let studyLevel2 = this.studyLevel2;
      this.studyLevel2 = studyLevel;
      this.studyLevel = studyLevel2;
      this.isselected = false;
    },
    selectBtnClick() {
      this.isselected = !this.isselected;
    },
    openServiceControl() {
      this.serviceControl = true;
    },
    closeServiceControl() {
      this.serviceControl = false;
    },
    closelessontoast() {
      this.lessonControl = false;
    },
    getWeekendDate() {
      let day;
      var Stamp = new Date();
      let month
      let daynow = Stamp.getDate()
      for (let i = 0; i < 3; i++) {
        day = this.getClassTime(i + 2);
        if( day < daynow) {
          month = Stamp.getMonth() + 2
        } else {
          month = Stamp.getMonth() + 1
        }
        this.weekday[i] = month + "月" + day + '日';
      }
    },
    getClassTime(dd) {
      var Stamp;
      Stamp = new Date();
      let day3 = Stamp.getDay()
      if(day3 == 0) {
        day3 = 7
      }
      var num =  7 -  day3 + dd;
      Stamp.setDate(Stamp.getDate() + num);
      var year = Stamp.getFullYear(); //获取完整的年份(4位,1970-????)
      var month = Stamp.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var mvar = "";
      if (month < 10) {
        mvar = "0" + month;
      } else {
        mvar = month + "";
      }
      var day = Stamp.getDate();
      var dvar = "";
      
      // if (day < 10) {
        // dvar = "0" + day;
      // } else {
        dvar = day + "";
      // }
      return dvar;
    },
    videobtnClick(id) {
      this.id = id;
      if (this.selectLevel == 8) {
        if (id == 0) {
          let url = "../counter/main";
          // if (mpvuePlatform === "wx") {
          // mpvue.switchTab({ url });
          // } else {
          mpvue.navigateTo({ url });
        } else if (this.$store.state.topClasswatchd[id - 1] == 0) {
          let topClasswatchd = this.$store.state.topClasswatchd;
          topClasswatchd[id - 1] = 1;
          this.settopClass(topClasswatchd);
          this.changestar();
          if (id == 1) {
            this.src =
              "http://vedio.hxsup.com/thinking_training/%E5%B0%8F%E5%8A%A8%E7%89%A9%E6%8E%92%E9%98%9F.mp4";
            this.title1 = "小动物排队";
            this.govideo();
          } else if (id == 2) {
            this.src = "http://vedio.hxsup.com/thinking_training/306.mp4";
            this.title1 = "小跳棋";
            this.govideo();
          } else if (id == 3) {
            this.src =
              "http://vedio.hxsup.com/thinking_training/%E8%B7%B7%E8%B7%B7%E6%9D%BF.mp4";
            this.title1 = "跷跷板";
            this.govideo();
          }
        } else {
          this.lessonControl = true;
          if(id == 1) {
            this.title1 = '小动物排队'
          } else if(id == 2) {
            this.title1 = '小跳棋'
          } else if(id == 3) {
            this.title1 = '跷跷板'
          }
        }
      } else if (this.selectLevel == 9) {
        if (id == 0) {
          let url = "../counter/main";
          // if (mpvuePlatform === "wx") {
          // mpvue.switchTab({ url });
          // } else {
          mpvue.navigateTo({ url });
        } else if (this.$store.state.middleClasswatchd[id - 1] == 0) {
          let middleClasswatchd = this.$store.state.middleClasswatchd;
          middleClasswatchd[id - 1] = 1;
          this.setmiddleClass(middleClasswatchd);
          this.changestar();
          if (id == 1) {
            this.src =
              "http://vedio.hxsup.com/thinking_training/mid/1%E8%81%94%E6%83%B3%E6%B8%B8%E6%88%8F.mp4";
            this.title1 = "联想游戏";
            this.govideo();
          } else if (id == 2) {
            this.src =
              "http://vedio.hxsup.com/thinking_training/mid/2%E6%BC%82%E4%BA%AE%E7%9A%84%E5%B8%BD%E5%AD%90.mp4";
            this.title1 = "漂亮的帽子";
            this.govideo();
          } else if (id == 3) {
            this.src =
              "http://vedio.hxsup.com/thinking_training/mid/3%E6%8A%AB%E8%90%A8%E6%B8%B8%E6%88%8F.mp4";
            this.title1 = "披萨游戏";
            this.govideo();
          }
        } else {
          this.lessonControl = true;
          if(id == 1) {
            this.title1 = '联想游戏'
          } else if(id == 2) {
            this.title1 = '漂亮的帽子'
          } else if(id == 3) {
            this.title1 = '披萨游戏'
          }
        }
      }
    },
    videoEnd() {
      this.showVideo = false;
      let url =
        "/pages/webview/main?id=" + this.id + "&level=" + this.selectLevel;
      mpvue.navigateTo({ url });
    },
    nextride() {
      if (this.date != "选择出生年月日 > ") {
        this.userAgeControl = false;
        let url = "api/mina/user/addBabyInfo";
        let param = {
          birthday: this.date
        };
        this.$http
          .post(url, param)
          .then(res => {
          })
          .catch(err => {});
      } else {
        wx.showToast({
          title: "请先选择宝宝出生日期哦",
          icon: "none",
          duration: 2000
        });
      }
    },
    govideo() {
      var myvideo = wx.createVideoContext("myvideo", this);
      this.showVideo = true;
      myvideo.requestFullScreen({ direction: 90 });
      myvideo.play();
    },
    exit(e) {
      var myvideo = wx.createVideoContext("myvideo", this);
      if (!e.mp.detail.fullScreen) {
        this.showVideo = false;
        myvideo.stop();
      }
    },
    enddate() {
      var date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.endDate = year + "-" + month + "-" + day;
    },
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      var returnAge;
      var strBirthdayArr = this.date.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth;
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      this.age = returnAge;
      if (this.age < 5) {
        this.studyLevel = "4-5岁思维课";
        this.selectLevel = 9;
        this.studyLevel2 = "5-7岁思维课";
      } else {
        this.selectLevel = 8;
        this.studyLevel = "5-7岁思维课";
        this.studyLevel2 = "4-5岁思维课";
      }
    },
    closeServiceControl() {
      this.serviceControl = false;
    },
    getUserInfo() {
      var that = this;
      wx.getUserInfo({
        success: function(res) {
          that.userInfo = res.userInfo;
          that.rawData = res.rawData;
          that.signature = res.signature;
          that.encryptedData = res.encryptedData;
          that.iv = res.iv;
          let url = "api/mina/user/userInfo";
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
              that.num = res.data.studyNumber;
              that.time = res.data.time;
              that.timeout(res.data.time);
              if (res.data.flag == 0) {
                that.userAgeControl = true;
              } else if (res.data.courseFlag == 8) {
                that.studyLevel = "5-7岁思维课";
                that.studyLevel2 = "4-5岁思维课";
                that.selectLevel = 8;
              } else if (res.data.courseFlag == 9) {
                that.studyLevel = "4-5岁思维课";
                that.studyLevel2 = "5-7岁思维课";
                that.selectLevel = 9;
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
      setScene: "SET_SCENE",
      settopClass: "SET_TOPCLASSWATCHED",
      setmiddleClass: "SET_MIDDLECLASSWATCHED",
      setplace: "SET_PLACE"
    }),
    // 使用了async+await的语法，用同步的方式写异步脚本
    async login(code) {
      let that = this;
      try {
        // const resData = await login({ code: code });
        // if (resData.returnCode == 200) {
        // that.setOpenId(that);
        // }
        // 这里可以把code传给后台，后台用此获取openid及session_key
        let url = "api/mina/user/userLogin";
        // let url = "api/mina/user/info";
        that.code = code;
        let param = {
          code: code
        };
        that.$http
          .get(url, param)
          .then(res => {
            that.sessionKey = res.sessionKey;
            that.setOpenId(res.openid);
            that.getUserInfo();
          })
          .catch(err => {});
      } catch (err) {
      }
    },
    // 拆分wx.login，结构更清晰
    _login() {
      var that = this;
      wx.login({
        success(res) {
          if (res.code) {
            let code = res.code;
            that.login(code);
          }
        }
      });
    },
    bindGetUserInfo(e) {
      var that = this;
      if (e.mp.detail.userInfo) {
        this.userInfoControl = false;
        that.userInfo = e.mp.detail.userInfo;
        that.rawData = e.mp.detail.rawData;
        that.signature = e.mp.detail.signature;
        that.encryptedData = e.mp.detail.encryptedData;
        that.iv = e.mp.detail.iv;
        let url = "api/mina/user/userInfo";
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
            that.num = res.data.studyNumber;
            that.time = res.data.time;
            that.timeout(res.data.time);
            if (res.data.flag == 0) {
              that.userAgeControl = true;
            } else if (res.data.courseFlag == 8) {
              that.studyLevel = "5-7岁思维课";
              that.studyLevel2 = "4-5岁思维课";
              that.selectLevel = 8;
            } else if (res.data.courseFlag == 9) {
              that.studyLevel = "4-5岁思维课";
              that.studyLevel2 = "5-7岁思维课";
              that.selectLevel = 9;
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
    var scene
    if (this.$store.state.scene != "") {
      scene = this.$store.state.scene;
    } else {
      scene = decodeURIComponent(query.scene);
    }
    this.scene = scene;

    if (scene == "app" || scene == 'five_minutes_share') {
      this.reportNum = 88;
      this.gifsrc = gifapp;
      this.scenetxt = '福利'
    } else if(scene == 'DB-fu-Kimi') {
      this.reportNum = 11;
      this.gifsrc = gitDB;
      this.scenetxt = '福利'
    } else {
      this.reportNum = 66;
      this.gifsrc = gifunder;
    }
    if (scene != "undefined") {
      this.setScene(scene);
    }
  },
  created() {
    this._login();
    this.enddate();
    this.changestar();
    this.getWeekendDate();
  }
};
</script>

<style scoped>
.studyNum {
  font-size: 28rpx;
  color: #6d741f;
  position: absolute;
  top: 75rpx;
  left: 35rpx;
  font-weight: 700;
}
.leftTime {
  font-weight: 700;
  color: #aa6f12;
  height: 70rpx;
  font-size: 26rpx;
  text-align: right;
  text-align: center;
  box-sizing: border-box;
  background-color: #f9f195;
  z-index: 7;
  line-height: 70rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.detailTime1 {
  display: inline-block;
  color: #fff;
  width: 46rpx;
  height: 46rpx;
  background-color: #aa6f12;
  font-weight: 700;
  margin-left: 10rpx;
  border-radius: 10rpx;
  /* transform: translateY(-5rpx); */
  line-height: 46rpx;
  box-sizing: border-box;
}
.detailTime2 {
  display: inline-block;
  color: #fff;
  width: 46rpx;
  height: 46rpx;
  background-color: #aa6f12;
  line-height: 46rpx;
  font-weight: 700;
  /* margin-top: -5rpx; */
  margin-left: 10rpx;
  margin-right: 10rpx;
  border-radius: 10rpx;
  /* transform: translateY(-5rpx); */
  box-sizing: border-box;
}
.topImg {
  width: 100%;
  margin-top: 70rpx;
}
.topImgunder {
  width: 100%;
}
.star1 {
  width: 70rpx;
  position: absolute;
  top: 200rpx;
  left: 55rpx;
  z-index: 5;
}
.star2 {
  width: 70rpx;
  position: absolute;
  z-index: 5;
  top: 495rpx;
  right: 245rpx;
}
.star3 {
  width: 70rpx;
  position: absolute;
  z-index: 5;
  top: 814rpx;
  left: 51rpx;
}
.classTime {
  width: 230rpx;
  height: 51rpx;
  box-shadow: 0rpx 8rpx 0rpx 0rpx rgba(0, 0, 0, 0.08);
  border-radius: 26rpx 25rpx 25rpx 24rpx;
  background-color: #ffeea2;
  color: #89661a;
  font-size: 24rpx;
  line-height: 51rpx;
  text-align: center;
  font-weight: 700;
  z-index: 2;
  position: absolute;
}
.classTime1 {
  top: 480rpx;
  left: 50rpx;
}
.classTime2 {
  top: 770rpx;
  right: 83rpx;
}
.classTime3 {
  top: 1088rpx;
  left: 50rpx;
}
.img-bottom {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 92rpx;
}
.bg_color {
  background-color: #fff4bf;
}
.selectbtn {
  width: 260rpx;
  border-radius: 44rpx;
  position: absolute;
  top: 46rpx;
  right: 36rpx;
  font-size: 28rpx;
  color: #8e6801;
  line-height: 88rpx;
  text-align: center;
  /* box-shadow: 0rpx 7rpx 8rpx 0rpx rgba(0, 0, 0, 0.1); */
  /* background: linear-gradient(0deg, #f9d958 0%, #ffef6f 100%); */
  overflow: hidden;
}
@keyframes selectLeave {
  0% {
    margin-top: 0rpx;
    opacity: 1;
    border-radius: 44rpx;
    /* border-top-left-radius: 0rpx;
    border-top-right-radius: 0rpx; */
  }
  100% {
    margin-top: -88rpx;
    opacity: 0;
    border-radius: 44rpx;
    /* border-top-left-radius: 0rpx;
    border-top-right-radius: 0rpx; */
  }
}
@keyframes select {
  0% {
    margin-top: -88rpx;
    opacity: 0;
    border-radius: 44rpx;
    /* border-top-left-radius: 0rpx;
    border-top-right-radius: 0rpx; */
  }
  100% {
    margin-top: 0rpx;
    opacity: 1;
    border-radius: 44rpx;
    /* border-top-left-radius: 0rpx;
    border-top-right-radius: 0rpx; */
  }
}
.selectBox {
  width: 260rpx;
  height: 88rpx;
  font-size: 28rpx;
  color: #8e6801;
  line-height: 88rpx;
  text-align: center;
  border-top: 1rpx solid #fff498;
  margin-top: -88rpx;
  opacity: 0;
  z-index: -1;
  /* box-shadow: 4rpx 7rpx 8rpx 0rpx rgba(0, 0, 0, 0.1); */
  background: linear-gradient(0deg, #f9d958 0%, #ffef6f 100%);
  animation: selectLeave 0.3s linear;
}
.zindex {
  position: relative;
  z-index: 3;
  opacity: 1;
  border-radius: 44rpx;
  /* border-bottom-left-radius: 0rpx;
  border-bottom-right-radius: 0rpx; */
  border: none;
  background: linear-gradient(0deg, #f9d958 0%, #ffef6f 100%);
}
.selected {
  width: 260rpx;
  height: 88rpx;
  font-size: 28rpx;
  color: #8e6801;
  line-height: 88rpx;
  text-align: center;
  border-top: 1rpx solid #fff498;
  border-radius: 44rpx;
  z-index: -1;
  /* border-top-left-radius: 0rpx;
  border-top-right-radius: 0rpx; */
  /* box-shadow: 4rpx 7rpx 8rpx 0rpx rgba(0, 0, 0, 0.1); */
  background-color: #fdffe6;
  z-index: -1;
  animation: select 0.3s linear;
}

@keyframes move {
  0% {
    opacity: 0.5;
    margin-top: -250rpx;
  }
  100% {
    opacity: 1;
    margin-top: 0rpx;
  }
}
.jiantou {
  width: 20rpx;
  transform: rotate(90deg);
  transition: transform 0.5s;
}
.jiantou1 {
  width: 20rpx;
  transform: rotate(180deg);
  transition: transform 0.5s;
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
.lesson {
  width: 240rpx;
  height: 240rpx;
  margin: 0 auto;
  display: block;
  margin-top: 75rpx;
}
.lessontitle {
  margin-top: 28rpx;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
}
.lessonToastBox {
  width: 590rpx;
  height: 840rpx;
  background-image: url("http://resource.hxsup.com/miniapp/bbswxk/in-bg.png");
  background-size: contain;
  position: relative;
}
.closeToast {
  width: 68rpx;
  position: absolute;
  top: -90rpx;
  right: 0;
}
.bottom-right {
  width: 345rpx;
  height: 110rpx;
  margin-top: 19rpx;
  border-radius: 20rpx;
  background-color: #ff6969;
  float: right;
  line-height: 110rpx;
  text-align: center;
  color: #fff;
  font-size: 38rpx;
  margin-right: 30rpx;
}
.bottom-right img {
  width: 59rpx;
  height: 56rpx;
  vertical-align: text-bottom;
  margin-right: 12rpx;
}
.pagebottom {
  height: 98rpx;
  background-color: #ff443b;
  border-radius: 49rpx;
  line-height: 98rpx;
  text-align: center;
  position: fixed;
  bottom: 22rpx;
  left: 77rpx;
  right: 77rpx;
  font-size: 34rpx;
  color: #fff;
  letter-spacing: 6rpx;
  animation: changeClick 2s linear infinite;
  z-index: 6;
  font-weight: 700;
}
@keyframes changeClick {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
.bottom-left {
  line-height: 148rpx;
  font-size: 28rpx;
  color: #333;
  margin-left: 61rpx;
  float: left;
}
.soon {
  font-size: 28rpx;
  color: #aaa;
  text-align: center;
}
.nextBtn {
  width: 510rpx;
  height: 98rpx;
  border-radius: 49rpx;
  background-color: #ff6060;
  line-height: 98rpx;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  margin: 0 auto;
  margin-top: 42rpx;
  margin-bottom: 37rpx;
}
.ageBox {
  width: 80%;
}
.agetop {
  width: 100%;
  vertical-align: bottom;
  font-size: 0rpx;
  padding: 0;
  margin: 0;
}
.ageBottom {
  background-color: #fff;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
  font-size: 0rpx;
  border-radius: 0 0 80rpx 80rpx;
  padding-bottom: 48rpx;
}
.ageBottom h2 span {
  font-size: 56rpx;
  color: #ff6060;
  font-weight: 700;
}
.ageBottom h2 {
  text-align: center;
  font-size: 34rpx;
  color: #333;
}
.picker {
  width: 510rpx;
  height: 98rpx;
  border-radius: 49rpx;
  border: 2rpx solid #e2e2e2;
  margin: 0 auto;
  line-height: 98rpx;
  text-align: center;
  color: #999;
  font-size: 32rpx;
  margin-top: 43rpx;
}
.show {
  animation: move 0.3s linear;
}
.videoBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  /* background-color: rgba(0,0,0,0.5); */
  display: flex;
  align-items: center;
  justify-content: center;
}
.bgboxMiddle {
  width: 750rpx;
  height: 1373rpx;
  background-image: url("http://resource.hxsup.com/miniapp/bbswxk/bg-mid-line.png");
  background-size: cover;
  position: relative;
  margin: 0 auto;
  transform: translateY(-22rpx);
}
.bgboxTop {
  width: 750rpx;
  height: 1373rpx;
  background-image: url("http://resource.hxsup.com/miniapp/bbswxk/bg-top-line.png");
  background-size: cover;
  position: relative;
  margin:  0 auto;
  transform: translateY(-22rpx);
}
.classdetail {
  width: 312rpx;
  height: 352rpx;
  position: absolute;
  top: 178rpx;
  left: 30rpx;
}
.lessonInfo {
  position: absolute;
  top: 254rpx;
  right: 77rpx;
  width: 260rpx;
}
.lessonInfo h3 {
  text-align: left;
  font-size: 28rpx;
  color: #716314;
  font-weight: 700;
  font-family: FZFENSTXJW--GB1-0;
}
.lessonInfo p {
  width: 100%;
  font-size: 26rpx;
  color: #757b27;
  line-height: 36rpx;
  margin-top: 20rpx;
}
.classtry1 {
  position: absolute;
  top: 470rpx;
  right: 20rpx;
  width: 312rpx;
  height: 352rpx;
}
.classtry2 {
  position: absolute;
  top: 787rpx;
  left: 30rpx;
  width: 312rpx;
  height: 352rpx;
}
.classtry3 {
  position: absolute;
  top: 1099rpx;
  right: 70rpx;
  width: 282rpx;
  height: 282rpx;
}
.lesson1 {
  top: 607rpx;
  left: 70rpx;
}
.lesson2 {
  top: 914rpx;
  right: 70rpx;
}
.sure {
  width: 400rpx;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #02bf01;
  border-radius: 44rpx;
  color: #fff;
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
.shouquan {
  margin-bottom: 60rpx;
}
.toastBox .hint img {
  width: 80%;
  margin: 0 auto;
  display: block;
}
.phone_personal {
  width: 100%;
  color: rgb(34, 154, 181);
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}
.phone_one {
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: rgb(239, 239, 239);
  width: 90%;
  height: 100rpx;
  margin: 0 auto;
  border-radius: 10rpx;
  border-bottom: 2rpx solid rgb(255, 255, 255);
}
.person_box {
  position: relative;
}
.phone_select {
  margin-top: 0;
  z-index: 100;
  position: absolute;
}
.select_one {
  text-align: center;
  background-color: rgb(239, 239, 239);
  width: 676rpx;
  height: 100rpx;
  line-height: 100rpx;
  margin: 0 5%;
  border-bottom: 2rpx solid rgb(255, 255, 255);
}
.personal_image {
  z-index: 100;
  position: absolute;
  right: 2.5%;
  width: 34rpx;
  height: 20rpx;
  margin: 40rpx 20rpx 40rpx 0;
  transition: All 0.4s ease;
  -webkit-transition: All 0.4s ease;
}
.rotateRight {
  transform: rotate(180deg);
}
</style>
