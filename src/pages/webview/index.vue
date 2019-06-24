<template>
  <div>
    <web-view :src="src"></web-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: "https://www.heqiuguang.cn/game/midthink/build/web-mobile/"
    };
  },
  onLoad(query) {
    let id = query.id;
    let level = query.level;
    if(query.level == 8) {
      if(id == 1) {
      this.src = "https://www.heqiuguang.cn/game/event/top1/build/web-mobile"
    } else if(id == 2) {
      this.src = "https://www.heqiuguang.cn/game/event/top2/build/web-mobile"
    } else if (id == 3 ) {
      this.src = "https://www.heqiuguang.cn/game/event/top3/build/web-mobile"
    }
    } else if(query.level == 9) {
      if(id == 1) {
      this.src = "https://www.heqiuguang.cn/game/event/mid1/build/web-mobile"
    } else if(id == 2) {
      this.src = "https://www.heqiuguang.cn/game/event/mid2/build/web-mobile"
    } else if (id == 3 ) {
      this.src = "https://www.heqiuguang.cn/game/event/mid3/build/web-mobile"
    }
    }
  }
};
</script>


