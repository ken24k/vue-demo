<template>
    <div class="root" v-loading="isLoading" element-loading-text="加载中…">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#ffffff"
                 text-color="#1d0e16" active-text-color="#ff9800">
            <el-menu-item index="1">天气预报</el-menu-item>
            <el-menu-item index="2">星座配对</el-menu-item>
        </el-menu>
        <div class="weather" v-if="showWeather">
            <div class="top">
                <p class="text1">{{weatherData.result.city}}</p>
                <p class="text2">{{weatherData.result.realtime.info}}</p>
                <p class="text1">{{weatherData.result.realtime.temperature}}°</p>
            </div>
            <div class="bottom">
                <ul>
                    <li class="text3" v-for="(item,index) in weatherData.result.future" :key=index>
                        {{item.date}} {{item.temperature}} {{item.weather}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="zodiac" v-if="showZodiac">
            <el-form :model="zodiacForm" :rules="zodiacRules" ref="zodiacForm" label-width="1px">
                <p class="text2">请输入星座</p>
                <div class="item">
                    <el-form-item label="" prop="men">
                        <el-select v-model="zodiacForm.men" placeholder="请选择男生星座">
                            <el-option v-for="(item,index) in entertainmentZodiac" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="women">
                        <el-select v-model="zodiacForm.women" placeholder="请选择女生星座">
                            <el-option v-for="(item,index) in entertainmentZodiac" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitZodiacForm('zodiacForm')">速配计算</el-button>
                </el-form-item>
                <p class="text4" v-if="showZodiac2">配对指数：{{zodiacData.result.zhishu}}<br/>
                    两情相悦指数：{{zodiacData.result.xiangyue}}<br/>
                    天长地久指数：{{zodiacData.result.tcdj}}<br/>
                    恋爱建议：{{zodiacData.result.lianai}}<br/>
                    注意事项：{{zodiacData.result.zhuyi}}<br/>
                </p>
            </el-form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import entertainmentZodiac from '../assets/data/entertainment-zodiac.json';
    export default {
        name: 'Entertainment',
        data() {
            return {
                activeIndex: '1',
                isLoading: false,

                showWeather: false,
                weatherData: {
                    "reason": "查询成功",
                    "result": {
                        "city": "上海",
                        "realtime": {
                            "temperature": "4",
                            "humidity": "82",
                            "info": "阴",
                            "wid": "02",
                            "direct": "西北风",
                            "power": "3级",
                            "aqi": "80"
                        },
                        "future": [
                            {
                                "date": "2019-02-22",
                                "temperature": "1/7℃",
                                "weather": "小雨转多云",
                                "wid": {
                                    "day": "07",
                                    "night": "01"
                                },
                                "direct": "北风转西北风"
                            },
                            {
                                "date": "2019-02-23",
                                "temperature": "2/11℃",
                                "weather": "多云转阴",
                                "wid": {
                                    "day": "01",
                                    "night": "02"
                                },
                                "direct": "北风转东北风"
                            },
                            {
                                "date": "2019-02-24",
                                "temperature": "6/12℃",
                                "weather": "多云",
                                "wid": {
                                    "day": "01",
                                    "night": "01"
                                },
                                "direct": "东北风转北风"
                            },
                            {
                                "date": "2019-02-25",
                                "temperature": "5/12℃",
                                "weather": "小雨转多云",
                                "wid": {
                                    "day": "07",
                                    "night": "01"
                                },
                                "direct": "东北风"
                            },
                            {
                                "date": "2019-02-26",
                                "temperature": "5/11℃",
                                "weather": "多云转小雨",
                                "wid": {
                                    "day": "01",
                                    "night": "07"
                                },
                                "direct": "东北风"
                            }
                        ]
                    },
                    "error_code": 0
                },

                showZodiac: false,
                showZodiac2:false,
                zodiacForm: {
                    "men": "",
                    "women": ""
                },
                zodiacData: {
                    "reason": "success",
                    "result": {
                        "men": "白羊座",
                        "women": "金牛座",
                        "zhishu": "70", /*配对指数*/
                        "bizhong": "54:46", /*配对比重*/
                        "xiangyue": "4", /*两情相悦指数*/
                        "tcdj": "3", /*天长地久指数*/
                        "jieguo": "小吵小闹的一对 ", /*结果描述*/
                        "lianai": "白羊座性急，金牛座慢半拍，这两个星座在一起就像龟兔赛跑，牛儿永远跟在羊儿身后。你们在一起更多的互补作用，金牛座总是无怨无悔地为性急的白羊座收拾善后，默默地付出。有时你们也会像一对童心未泯的孩子，童心很重，在一定程度，牛儿还蛮依赖羊儿。", /*恋爱建议*/
                        "zhuyi": "白羊座和金牛座在一起，其实也是一对孩子气蛮重的组合，他们都有着童心未泯的个性。牛儿虽然很能容忍、不妒忌，但占有欲强，羊儿个性豪迈，喜欢交际，牛儿若爱上羊儿，可以在一定程度上给予对方更大的自由和空间。同时牛儿也不必时时为羊儿善后，不妨放开心胸促使不要学习平稳冷静，带着羊儿向前，在生活上学习取长补短。"/*注意事项*/
                    },
                    "error_code": 0
                },
                zodiacRules: {
                    men: [
                        {required: true, message: '请选择男生星座', trigger: 'blur'}
                    ],
                    women: [
                        {required: true, message: '请选择女生星座', trigger: 'blur'}
                    ]
                },
                entertainmentZodiac: entertainmentZodiac
            }
        },
        mounted(){
        },
        methods: {
            handleSelect(key) {
                if (key === '1') {
                    this.showWeatherData();
                } else if (key === '2') {
                    this.showZodiacData();
                }
            },
            showWeatherData(){
                this.readyToLoading();
                this.interval = setInterval(this.getWeatherData, 3000);
            },
            getWeatherData(){
                clearInterval(this.interval);
                axios.post('api/simpleWeather/query',
                    qs.stringify({
                        city: '上海',
                        key: '8c0cea0f8d3201d975f4b34136b8b835' + '111'
                    })
                ).then(response => {
                    console.log(JSON.stringify(response.data))
                    if (response.data.error_code !== 0) {
                        console.log("查询失败：" + response.data.reason);
                    } else {
                        this.weatherData = JSON.parse(JSON.stringify(response.data));
                    }
                    this.isLoading = false;
                    this.showWeather = true;
                }).catch(error => {
                    console.log("error：" + error);
                    this.isLoading = false;
                    this.showWeather = true;
                })
            },
            showZodiacData(){
                this.readyToLoading();
                this.isLoading = false;
                this.showZodiac = true;
            },
            submitZodiacForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.readyToLoading();
                        this.showZodiac = true;
                        this.interval = setInterval(this.getZodiacData, 3000);
                    } else {
                        return false;
                    }
                });
            },
            getZodiacData(){
                clearInterval(this.interval);
                axios.post('api/xzpd/query',
                    qs.stringify({
                        men: this.zodiacForm.men,
                        women: this.zodiacForm.women,
                        key: '2b36c893de760033240ad43d49c95ae4'
                    })
                ).then(response => {
                    console.log(JSON.stringify(response.data))
                    if (response.data.error_code !== 0) {
                        console.log("查询失败：" + response.data.reason);
                    } else {
                        this.zodiacData = JSON.parse(JSON.stringify(response.data));
                    }
                    this.isLoading = false;
                    this.showZodiac2 = true;
                }).catch(error => {
                    console.log("error：" + error);
                    this.isLoading = false;
                    this.showZodiac2 = true;
                })
            },
            readyToLoading(){
                this.showWeather = false;
                this.showZodiac = false;
                this.showZodiac2 = false;
                this.isLoading = true;
            }
        }
    }
</script>
<style scoped>
    .root {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .weather {
        background: deepskyblue;
        background-size: cover;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .top {
        margin-top: 50px;
    }

    .bottom {
        position: absolute;
        top: 50%;
        left: 10%;
    }

    .text1 {
        margin: 0;
        padding-top: 10px;
        color: white;
        font-size: xx-large;
        text-align: center;
    }

    .text2 {
        margin: 0;
        padding-top: 5px;
        color: white;
        font-size: large;
        text-align: center;
    }

    .text3 {
        margin: 0;
        padding-top: 3px;
        color: white;
        font-size: medium;
        text-align: left;
    }

    .text4 {
        margin: 0;
        padding-top: 1px;
        padding-right: 10px;
        padding-left: 10px;
        color: white;
        font-size: small;
        text-align: center;
    }

    .item {
        margin-top: 20px;
    }

    .zodiac {
        padding-top: 50px;
        background: indianred;
        background-size: cover;
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>