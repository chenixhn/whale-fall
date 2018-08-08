<template>
    <p>{{date | formatDate}}</p>
</template>

<script>
const padDate = function (value) {
  return value < 10 ? `0${value}` : value;
};
export default {
  name: 'page4',
  data() {
    return {
      date: new Date()
    };
  },
  filters: {
    formatDate: function (value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = padDate(date.getMonth() + 1);
      const day = padDate(date.getDay());
      const hours = padDate(date.getHours());
      const minutes = padDate(date.getMinutes());
      const seconds = padDate(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  },
  mounted() {
    const _this = this;
    this.timer = setInterval(function () {
      _this.date = new Date();
    }, 1000);
    //array.filter()用法。
     const arr = [1, 2, 3, 4, 5];
        console.log(arr.filter(function (age) {
            return age > 1;
        }));
        console.log(arr);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>
<style scoped>
    p {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        text-align: center;
        line-height: 300px;
        color: #fff;
    }
</style>

