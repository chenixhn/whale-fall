<template>
    <div id='app'>
        <!-- <p>{{reText}}</p> -->
        <div class='box'>
            <div class='package1' v-for='(item, index, k) in packages' :key='index'>
                <p>购物车（{{k+1}}）</p>
                <div v-for='(child,ind) in item' :key='ind' style='border-bottom: 1px solid #ff0;'>
                    <p>商品名：{{child.name}}</p>
                    <p>价格：{{child.price}}</p>
                    <p>购买数量：{{child.count}}</p>
                    <button @click='child.count++'>+</button>
                    <button @click='child.count>0?child.count--:child.count;'>-</button>
                </div>
            </div>
        </div>
        <p>购物总价格为：{{prices}}</p>
        <button class='money' @click='pay(prices)'>结账</button>
    </div>
</template>

<script>
export default {
  name: 'page3',
  data() {
    return {
      text: '123,456',
      package1: [
        {
          name: 'iphone 7',
          price: 6899,
          count: 0
        },
        {
          name: 'iphone x',
          price: 10099,
          count: 0
        }
      ],
      package2: [
        {
          name: 'oppo',
          price: 3200,
          count: 0
        },
        {
          name: 'vivo',
          price: 2899,
          count: 0
        }
      ],
      packages: {
        //
      }
    };
  },
  created() {
    this.$set(this, 'packages', {
      package1: this.package1,
      package2: this.package2
    });
  },
  methods: {
      pay(prices) {
          const tips = prices ? '兜里没钱结个锤子帐' : '一件没买结个锤子帐';
          this.$alert(tips, '浩哥提示');
      }
  },
  computed: {
    reText() {
      return this.text
        .split(',')
        .reverse()
        .join(',');
    },
    prices() {
      let prices = 0;
      this.package1.forEach((element) => {
        prices += element.price * element.count;
      });
      this.package2.forEach((element) => {
        prices += element.price * element.count;
      });
      return prices;
    }
  }
};
</script>
