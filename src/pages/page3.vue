<template>
  <div class="muc_box">
    <el-container>
        <el-header>
            <div class="logo">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinzhi"></use>
                </svg>
            </div>
            <div class="logo1">仔仔云音乐，与你同行</div>
            <!-- <el-input
                ref="search"
                placeholder="请输入音乐名或歌手名搜索"
                :clearable="true"
                prefix-icon="el-icon-search"
                v-model="search"
                @input="input"
                class="so">
            </el-input> -->
            <el-select
                prefix-icon="el-icon-search"
                class="so"
                @change="getSong"
                ref="search"
                v-model="search"
                filterable
                remote
                reserve-keyword
                placeholder="搜索音乐，歌手，歌词"
                :remote-method="remoteMethod"
                :default-first-option="true"
                :loading="loading">
                <el-option
                    v-for="item in options4"
                    :key="item.HintInfo"
                    :label="item.HintInfo"
                    :value="item.HintInfo">
                </el-option>
            </el-select>
        </el-header>
        <el-container v-if="!showSongDetail" class="muc_content">
            <el-aside width="223px">
                    <div class="asi_tle">推荐</div>
                    <ul class="list_box">
                        <li @click="showType = 1" :class="{act : showType == 1}"><div><i class="iconfont icon-huanyuangequxinxi"></i> 发现音乐</div></li>
                    </ul>
                    <div class="asi_tle">我的音乐</div>
                    <ul class="list_box">
                        <li @click="showType = 2" :class="{act : showType == 2}">
                            <div><i class="iconfont icon-zhuanji"></i> 搜索列表</div>
                        </li>
                        <li><div><i class="iconfont icon-xiangsituijian"></i> 下载的音乐</div></li>
                        <li><div><i class="iconfont icon-geshou"></i> 我的歌手</div></li>
                    </ul>
                    <div class="asi_tle">创建de歌单</div>
                    <ul class="list_box">
                        <li><div><i class="iconfont icon-xihuan"></i> 我喜欢</div></li>
                    </ul>
                    <div class="muc_qta">
                        <div class="muc_left">
                            <img class="avatar" :src="avatar">
                            <div class="tips" @click="showSongDetail = true;"><i class="el-icon-d-caret"></i></div>
                        </div>
                        <div class="muc_right">
                            <div class="muc_top">
                                <span class="muc_name">{{muc_name}}</span>
                                <i class="iconfont icon-fenxiang"></i>
                            </div>
                            <div class="muc_bom">
                                <span class="muc_singer">{{muc_singer}}</span>
                                <i class="iconfont icon-tubiao" :class="{act:toXi}" @click="toXi = !toXi;"></i>
                            </div>
                        </div>
                    </div>
            </el-aside>
            <el-main>
                <div v-if="showType == 1">
                    <div class="muc_tle">
                        <span>推荐音乐</span>
                    </div>
                    <div class="ban_box">
                        <swiper :options="swiperOption" ref="mySwiper">
                            <!-- slides -->
                            <swiper-slide v-for="i in imgs" :key="i">
                                <img :src="i" alt="banner">
                            </swiper-slide>
                            <div class="swiper-pagination"  slot="pagination"></div>
                        </swiper>
                    </div>
                    <div class="muc_tle">
                        <span>热门精选</span>
                    </div>
                </div>
                <div v-else-if="showType == 2">
                    <div class="muc_tle">
                        <span>单曲列表</span>
                    </div>
                    <el-table
                        @row-click="toPlay"
                        :height="400"
                        :max-height="400"
                        tooltip-effect="dark"
                        :row-class-name="tableRowClassName"
                        :data="songList"
                        stripe
                        style="width: 100%;">
                        <el-table-column
                        type="index"
                        :index="fIndex"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="SongName"
                        label="歌曲名"
                        width="280">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="SingerName"
                        label="歌手名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="AlbumName"
                        label="专辑">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="Duration"
                        :formatter="formatRole"
                        label="时长"
                        width="100">
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else-if="showType == 3"></div>
            </el-main>
        </el-container>
        <el-container v-else class="muc_content">
            <el-row class="detail_box">
                <el-col :span="12">
                    <div class="song_detail">
                            <p>{{muc_name}}</p>
                            <el-row>
                                <el-col :span="12">
                                    专辑：<span>{{albumName}}</span>
                                </el-col>
                                <el-col :span="12">
                                    歌手：<span>{{muc_singer}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    <div class="grid-content bg-purple">
                        <div class="lrc_box" ref="lrcBox" :style="{transform: 'translateY(-' + translateY + 'px)', color: defaultColor}">
                            <p
                                :style="{color: curLrcIndex === index ? activeColor : ''}"
                                :startTime="lrcObj.startTime"
                                v-for="(lrcObj, index) of curPlayLrcArr"
                                :key='index'
                            >
                                {{ lrcObj.curLrc }}
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <div class="avatar_box rotate" :class="{paused: !iPlay}">
                            <img :src="avatar" />
                        </div>
                        <div class="detail_close" @click="showSongDetail = false;">
                            <i class="el-icon-circle-close"></i>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-container>
        <el-footer>
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg> -->
            <div class="audio">
                <audio :src="audioSrc" ref="audio" @canplay="canplay" @ended="ended"></audio>
            </div>
            <el-row>
                <el-col :span="4">
                    <i @click="setPlayType(num > 0 ? --num : 0)" class="iconfont icon-xiayige to_tip"></i>
                    <i v-if="iPlay" @click="stop" class="iconfont icon-bofang play"></i>
                    <i v-else @click="start" class="iconfont icon-zanting play"></i>
                    <i @click="setPlayType(num < 20 ? ++num : 0)" class="iconfont icon-shangyige to_tip"></i>
                </el-col>
                <el-col :span="14" class="slider_box">
                    <el-slider ref="sli" @change="setSlide" :show-tooltip="false" class="play_slider" v-model="playTime"></el-slider>
                    <span class="timer"><span style="display:inline-block; width:32px;">{{nowTime}}</span>/{{allTime}}</span>
                </el-col>
                <el-col :span="6" class="slider_box">
                    <div class="grid-content bg-purple">
                        <i v-if="vol" @click="clearVol" class="iconfont icon-icon-test4 vol"></i>
                        <i v-else class="iconfont icon-icon-test2 vol"></i>
                        <el-slider :show-tooltip="false" @change="setVol" class="play_slider vol_slider" v-model="vol"></el-slider>
                        <div class="muc_zp">
                            <i v-if="playType == 1" @click="playType = 2" class="iconfont icon-xunhuan play_type"></i>
                            <i v-else @click="playType = 1" class="iconfont icon-icon-- play_type"></i>
                            <!-- <i v-else @click="playType = 1" class="iconfont icon-iconfontdanquxunhuan2eps play_type big"></i> -->
                            <i class="iconfont icon-SanMiAppoutlinei3 yun"></i>
                            <i @click="showSongList" class="iconfont icon-SanMiAppoutlinei yun muc_list"></i>
                            <i class="muc_num">{{muc_num}}</i>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <transition name="el-zoom-in-bottom">
                <div v-show="isShowSongList" class="song_list">
                    <div class="_close" @click="isShowSongList = false;">
                            <i class="el-icon-circle-close"></i>
                    </div>
                    <el-table
                        @row-click="toPlay"
                        :height="240"
                        :max-height="240"
                        tooltip-effect="dark"
                        :row-class-name="tableRowClassName"
                        :data="songList"
                        stripe
                        style="width: 100%;">
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="SongName"
                        label="歌曲名"
                        width="220">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="SingerName"
                        label="歌手名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                        prop="Duration"
                        :formatter="formatRole"
                        label="时长"
                        width="100">
                        </el-table-column>
                    </el-table>
                </div>
            </transition>
        </el-footer>
    </el-container>
  </div>
</template>

<script>

import {search, getSongInfo, goPlay} from '@/service/get_data';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';
import avatar from '../assets/images/singer-default.jpg';

/**
 * 将秒转换为 分:秒
 * s int 秒数
*/
function sToHs(val) {
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    let h;
    let s = Math.floor(val) % 60;
    h = Math.floor(val / 60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    //将变量转换为字符串
    h += '';
    s += '';
    //如果只有一位数，前面增加一个0
    h = (h.length == 1) ? `0${h}` : h;
    s = (s.length == 1) ? `0${s}` : s;
    return `${h}:${s}`;
}

export default {
    name: 'carrousel',
    data() {
      return {
        isShowSongList: false,
        albumName: '默认',
        translateY: 0,
        curLrcIndex: 0,
        activeColor: '#e62739',
        defaultColor: 'rgb(43, 127, 142)',
        curPlayLrcArr: [],
        showSongDetail: false,
        muc_singer: '默认',
        muc_name: '默认',
        avatar: avatar,
        hashs: [],
        num: null,
        loop: 'loop',
        audioSrc: '',
        showType: 1,
        search: '',
        toXi: false,
        muc_num: 0,
        playType: 1,
        vol: 100,
        allTime: '00:00',
        nowTime: '00:00',
        iPlay: false,
        playTime: 0,

        options4: [],
        value9: [],
        list: [],
        songList: [],
        loading: false,
        imgs: [banner1, banner2, banner3],
        swiperOption: {
            effect: 'coverflow',
            slideToClickedSlide: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: '2',
            loopedSlides: 3,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            speed: 600,
            touchRatio: 0,
            coverflowEffect: {
                rotate: 50,
                stretch: 180,
                depth: 400,
                modifier: 1,
                slideShadows: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        }
      };
    },
    methods: {
        showSongList() {
            if (this.muc_num == 0) return;
            this.isShowSongList = !this.isShowSongList;
        },
        toSetSlide() {
            clearInterval(this._timer);
        },
        clearVol() {
            this.vol = 0;
            this.$refs.audio.volume = 0;
        },
        setVol(num) {
            this.$refs.audio.volume = num / 100;
        },
        stop() {
            this.iPlay = false;
            this.$refs.audio.pause();
        },
        start() {
            this.iPlay = true;
            this.allTime != '00:00' && this.$refs.audio.play();
        },
        fIndex(index) {
            return index < 9 ? `0${index + 1}` : index + 1;
        },
        tableRowClassName(val) {
            const obj = val;
            //把每一行的索引放进row
            obj.row.index = obj.rowIndex;
        },
        canplay() {
            this.allTime = sToHs(this.$refs.audio.duration);
            this.lrcRoll();
        },
        ended() {
            clearInterval(this._timer);
            this.setPlayType(this.num + 1);
        },
        setPlayType(num) {
            if (this.playType == 1) {
                this.isPlay(num);
            } else {
                this.num = Math.ceil(Math.random() * 20) - 1;
                this.isPlay(this.num);
            }
        },
        setSlide(num) {
            this.$refs.audio.currentTime = this.$refs.audio.duration * (num / 100);
            this.playSlide(this.$refs.audio);
        },
        playSlide(obj) {
            const _this = this;
            this._timer = setInterval(function () {
                _this.nowTime = sToHs(obj.currentTime);
                _this.playTime = (obj.currentTime / obj.duration) * 100;
            }, 0);
        },
        toPlay(row) {
            this.num = row.index;
            this.albumName = row.AlbumName;
            this.isPlay(this.num);
        },
        setCurPlayLrcArr(lyrics) {
            if (lyrics.length === 0) {
            return;
            }
            const lrc = lyrics.replace(/\n/g, '').split('[').slice(1);
            const curPlayLrcArr = [];
            lrc.forEach((item, index) => {
            const times = item.split(']')[0].replace('.', ':').split(':');
            const time = (Number(times[0]) * 60) + (Number(times[1]) + (Number(times[2]) / 1000));
            const obj = {
                index,
                startTime: time.toFixed(2),
                curLrc: item.split(']')[1]
            };
            curPlayLrcArr.push(obj);
            });
            this.curPlayLrcArr = curPlayLrcArr;
        },
        lrcRoll() {
            const audio = this.$refs.audio;
            const curPlayLrcArr = this.curPlayLrcArr;
            const currentTime = Number(audio.currentTime.toFixed(2));
            curPlayLrcArr.forEach((ele, ind) => {
                if (currentTime > ele.startTime) {
                    this.curLrcIndex = ind;
                }
            });
            if (currentTime < audio.duration) {
                this.rollTimer = setTimeout(() => {
                    this.lrcRoll();
                }, 100);
            }
        },
        isPlay(num) {
            const params = {
                r: 'play/getdata',
                hash: this.hashs[num],
                album_id: this.songList[num].AlbumID,
                dfid: '3w02R13628O70M9Vhg1bxPnu',
                mid: '365f35938b5475fad9a1ca5ad997c536',
                platid: 4
            };
            goPlay(params)
                .then((res) => {
                    this.audioSrc = res.data.play_url;
                    this.avatar = res.data.img;
                    this.muc_singer = res.data.author_name;
                    this.muc_name = res.data.song_name;
                    const aAudio = this.$refs.audio;
                    const _this = this;
                    aAudio.load();
                    this.setCurPlayLrcArr(res.data.lyrics);
                    setTimeout(function () {
                        aAudio.play();
                        _this.playSlide(aAudio);
                        _this.iPlay = true;
                    }, 30);
                });
        },
        formatRole: function (row) {
            return sToHs(row.Duration);
        },
        getSong() {
            this.showSongDetail = false;
            const page = 1;
            const params = {
                page,
                pagesize: 20,
                keyword: this.search,
                platform: 'WebFilter',
                userid: -1,
                iscorrection: 1,
                privilege_filter: 0,
                filter: 2
            };
            getSongInfo(params)
                .then((res) => {
                    this.songList = res.data.lists;
                    this.hashs = [];
                    this.muc_num = this.songList.length;
                    this.songList.forEach((ele) => {
                        this.hashs.push(ele.FileHash);
                    });
                    this.showType = 2;
                });
        },
        remoteMethod(query) {
            if (query !== '') {
            this.loading = true;
                search({keyword: query})
                    .then((res) => {
                        this.options4 = res.data[0].RecordDatas;
                        this.loading = false;
                    });
            } else {
            this.options4 = [];
            }
        }
    },
    watch: {
        curLrcIndex(newCurLrcIndex) {
            if (!this.showSongDetail) return;

            const lrcBoxHeight = 318;
            const childHeight = 50;
            const curShowNum = Math.floor(lrcBoxHeight / childHeight);
            if (newCurLrcIndex >= curShowNum - 1) {
                this.translateY = 34 * ((newCurLrcIndex - curShowNum) + 1);
            } else {
                this.translateY = 0;
            }
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      const _this = this;
      this.$refs.audio.volume = this.vol / 100;
      this.$refs.sli.$el.children[0].onclick = function () {
        _this.toSetSlide();
      };
      this.swiper.slideTo(1, 1000, false);
    //   this.$refs.search.$el.children[1].onclick = function () {
    //       _this.sss();
    //   };
    },
    destroyed() {
        clearInterval(this._timer);
    }
  };
</script>
<style lang="scss" scoped>
    .muc_box {
        min-width: 1200px;
        border-radius: 10px;
        background-color: #f1ece8;
        .muc_tle {
            min-width: 918px;
            height: 44px;
            line-height: 41px;
            font-size: 20px;
            border-bottom: 1px solid #b7b4b4;
            color: #4a4a4a;
            margin-bottom: 20px;
            span {
                display: inline-block;
                border-bottom: 3px solid #d6d1ce;
            }
        }
        header {
            border-radius: 10px 10px 0 0;
            background-color: #c20c0c;
            position: relative;
            .logo {
                position: absolute;
                left: 6px;
                top: 50%;
                transform: translate(0, -50%);
                .icon {
                    font-size: 46px;
                }
            }
            .logo1 {
                position: absolute;
                left: 50px;
                top: 28px;
                font-family: cursive;
                font-size: 16px;
                color: #fff;
            }
            .so {
                position: absolute;
                left: 30%;
                top: 50%;
                transform: translate(0, -50%);
                width: 240px;
                height: 30px;
            }
        }
        aside {
            position: relative;
            background-color: #eae8e8;
            ul,
            li {
                list-style: none;
            }
            .asi_tle {
                color: #4a4a4a;
                font-size: 12px;
                padding: 10px;
            }
            .list_box {
                margin: 0;
                padding-left: 0;
                li {
                    height: 24px;
                    line-height: 24px;
                    cursor: pointer;
                    position: relative;
                    padding: 4px 0 4px 0;
                    font-size: 13px;
                    color: #4a4a4a;
                    div {
                        padding-left: 48px;
                    }
                    &.act {
                        background-color: #ded5d5;
                        div {
                            border-left: 3px solid #c20c0c;
                        }
                    }
                }
                .iconfont {
                    font-size: 16px;
                    position: absolute;
                    left: 24px;
                }
            }
            .muc_qta {
                position: absolute;
                bottom: 0;
                height: 80px;
                width: 100%;
                border-top: 1px solid #b7b4b4;
                border-bottom: 1px solid #b7b4b4;
                background-color: #eae8e8;
                .muc_left {
                    position: relative;
                    float: left;
                    width: 60px;
                    height: 60px;
                    margin: 10px;
                    border-radius: 5px;
                    border: 1px solid #b7b4b4;
                    .tips {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        color: #fff;
                        font-size: 36px;
                        opacity: 0.3;
                        background-color: #000;
                        display: none;
                        i {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%) rotate(45deg);
                        }
                    }
                    &:hover .tips {
                        display: block;
                    }
                    .avatar {
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                }
                .muc_right {
                    float: left;
                    .muc_name {
                        position: relative;
                        display: inline-block;
                        width: 90px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding-top: 20px;
                        font-size: 14px;
                        color: #313131;
                    }
                    .iconfont {
                        position: absolute;
                        right: 5px;
                        top: 19px;
                    }
                    .muc_top,
                    .muc_bom {
                        position: relative;
                        width: 120px;
                    }
                    i.act {
                        color: #c20c0c;
                    }
                    .muc_bom {
                        span {
                            font-size: 12px;
                            color: #847e7e;
                        }
                        i {
                            font-size: 12px;
                            top: -1px;
                        }
                    }
                }
            }
        }
        footer {
            position: relative;
            border-radius: 0 0 10px 10px;
            background-color: #ebebeb;
            padding: 0;
            .song_list {
                position: absolute;
                top: -241px;
                right: 0;
                width: 500px;
                height: 240px;
                background-color: #217e9c;
                z-index: 1;
                border-radius: 5px 5px 0 0;
                overflow: auto;
                ._close {
                    position: absolute;
                    right: 2px;
                    top: 4px;
                    width: 40px;
                    height: 24px;
                    border-radius: 5px;
                    z-index: 1;
                    i.el-icon-circle-close {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #cebfbf;
                        &:hover {
                            color: #bbadad;
                        }
                    }
                }
            }
            .to_tip {
                font-size: 32px;
                color: #c20c0c;
                margin-left: 20px;
            }
            .play {
                color: #c20c0c;
                font-size: 36px;
                position: relative;
                top: 2px;
                margin-left: 20px;
            }
            .slider_box {
                position: relative;
            }
            .play_slider {
                position: absolute;
                top: 13px;
                left: 34px;
                width: 510px;
            }
            .vol_slider {
                left: 24px;
                width: 110px;
            }
            .timer {
                position: absolute;
                top: 1px;
                left: 554px;
                width: 100px;
                color: #a2a2a2;
                font-size: 12px;
            }
            .muc_zp {
                width: 142px;
                position: absolute;
                top: 0;
                left: 150px;
                height: 60px;
                i.play_type {
                    color: #4a4a4a;
                    font-size: 32px;
                    &.big {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 22px;
                    }
                }
                .yun {
                    position: absolute;
                    font-size: 26px;
                    color: #4a4a4a;
                    margin-left: 10px;
                    &.muc_list {
                        left: 70px;
                    }
                }
                .muc_num {
                    position: absolute;
                    top: 50%;
                    transform: translate(0, -9px);
                    padding: 0 6px;
                    // width: 24px;
                    left: 108px;
                    height: 18px;
                    background-color: #b7b4b4;
                    border-radius: 13px;
                    line-height: 18px;
                    font-size: 10px;
                    color: #fff;
                    text-align: center;
                }
            }
            .vol {
                font-size: 18px;
                color: #4a4a4a;
            }
        }
    }

    .ban_box {
        position: relative;
        width: 820px;
        height: 230px;
        margin: 0 auto;
        overflow: hidden;
    }

    .swiper-container {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        width: 1000px;
        padding-bottom: 30px;
        margin: 0 auto;
    }

    .swiper-slide {
        height: 200px;
        border-radius: 5px;
        opacity: 0.1;
        img {
            width: 100%;
            border-radius: 5px;
        }
        &.swiper-slide-active,
        &.swiper-slide-prev,
        &.swiper-slide-next {
            opacity: 1;
        }
    }

    .detail_box {
        background: url('~@/assets/images/cp.png') no-repeat;
        background-size: cover;
        background-position: 0 -406px;
        height: 505px;
        width: 100%;
        .song_detail {
            margin-bottom: 10px;
            padding: 10px 40px;
            color: #217e9c;
            border-bottom: 1px solid;
            p {
                margin: 20px 0;
                font-size: 22px;
                color: #4a4a4a;
            }
        }
        .bg-purple {
            height: 318px;
            overflow: hidden;
            .lrc_box {
                text-align: center;
            }
        }
        .bg-purple-light {
            position: relative;
            .detail_close {
                position: absolute;
                right: 30px;
                top: 20px;
                width: 40px;
                height: 24px;
                border: 1px solid #a2a2a2;
                border-radius: 5px;
                &:hover {
                    background-color: rgba(103, 67, 67, 0.1);
                }
                .el-icon-circle-close {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #b7b4b4;
                }
            }
            .avatar_box {
                position: absolute;
                left: 198px;
                top: 210px;
                width: 120px;
                height: 120px;
                border-radius: 100%;
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .rotate {
                animation-name: rotate;
                animation-duration: 15s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
            }
            .paused {
                animation-play-state: paused;
            }
        }
    }

    .muc_content {
        height: 505px;
    }

    @keyframes rotate {
        form {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

