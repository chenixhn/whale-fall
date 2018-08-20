<template>
    <div id='app' v-cloak>
        <!-- <p>{{reText}}</p>
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
        <button class='money' @click='pay(prices)'>结账</button> -->
        <el-table
            :data="list"
            show-summary
            :summary-method="getSummaries"
            @selection-change="handleSelectionChange"
            style="width: 100%;">
            <el-table-column
                type="selection"
                width="80">
            </el-table-column>
            <el-table-column
                type="index"
                width="55">
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="商品名称"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="price"
                label="商品价格"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                label="商品数量">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click='scope.row.count++'>+</el-button>
                    <el-tag size="medium" width="1000">{{ scope.row.count }}</el-tag>
                    <el-button
                    size="mini"
                    @click='scope.row.count>1?scope.row.count--:scope.row.count;'>-</el-button>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="list.splice(scope.$index,1)">移除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div style="text-align:center; margin-top:40px;">
            <el-button type="primary" round @click="pay(totalPrice)">结 账</el-button>
        </div>

        <!-- <template v-if="list.length">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>商品名称</th>
                        <th>商品单价</th>
                        <th>购买数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in list" :key="item.id">
                        <td>{{index + 1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.price}}</td>
                        <td>
                            <button @click='item.count++'>+</button>
                            {{item.count}}
                            <button @click='item.count>1?item.count--:item.count;'>-</button>
                        </td>
                        <td>
                            <button @click="list.splice(index,1)">移除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>总价￥：{{totalPrice}}</div>
        </template>
        <div v-else>购物车为空</div> -->
    </div>
</template>

<script>
export default {
  name: 'page3',
  data() {
    return {
      text: '123,456',
      multipleSelection: [],
      list: [
        {
          name: 'iphone 7',
          price: 6899,
          count: 1
        },
        {
          name: 'iphone x',
          price: 10099,
          count: 1
        },
        {
          name: 'oppo',
          price: 3200,
          count: 1
        },
        {
          name: 'vivo',
          price: 2899,
          count: 1
        }
      ]
    };
  },
  methods: {
      pay(prices) {
          const tips = prices != 0 ? '兜里没钱结个锤子帐' : '一件没买结个锤子帐';
          this.$alert(tips, '浩哥提示');
      },
      getSummaries() {
        const sums = ['总价', '', `${this.totalPrice}元`];
        return sums;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
  computed: {
    totalPrice() {
      const list = this.multipleSelection.length > 0 ? this.multipleSelection : this.list;
      let prices = 0;
      list.forEach((element) => {
        prices += element.price * element.count;
      });
      return prices.toString().replace(/\B(?=(\d{3})+$)/g, ',');
    }
  }
};
</script>
<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }

    table {
        border: 1px solid #e9e9e9;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
    }

    th,
    td {
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: left;
    }

    th {
        background-color: #f7f7f7;
        color: #5c6b77;
        font-weight: 600;
        white-space: nowrap;
    }
</style>
