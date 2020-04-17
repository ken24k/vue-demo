<template>
    <div>
        <div>
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#ffffff"
                     text-color="#1d0e16" active-text-color="#ff9800">
                <el-menu-item index="1">天气</el-menu-item>
                <el-menu-item index="2">新闻</el-menu-item>
            </el-menu>
        </div>
        <div v-if="showWeather" class="weather">
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
        <div v-if="showNews" class="news">
            <p class="text3">{{newsData.result.data.title}}</p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    export default {
        name: 'NewsAndWeather',
        data() {
            return {
                activeIndex: '1',
                showWeather: true,
                showNews: false,
                weatherData: {
                    "reason": "查询成功",
                    "result": {
                        "city": "苏州",
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
                newsData: {
                    "reason": "成功的返回",
                    "result": {
                        "stat": "1",
                        "data": [
                            {
                                "uniquekey": "6c4caa0c3ba6e05e2a272892af43c00e",
                                "title": "杨幂的发际线再也回不去了么？网友吐槽像半秃",
                                "date": "2017-01-05 11:03",
                                "category": "yule",
                                "author_name": "腾讯娱乐",
                                "url": "http://mini.eastday.com/mobile/170105110355287.html?qid=juheshuju",
                                "thumbnail_pic_s": "http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_1_mwpm_03200403.jpeg",
                                "thumbnail_pic_s02": "http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_2_mwpm_03200403.jpeg",
                                "thumbnail_pic_s03": "http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_3_mwpm_03200403.jpeg"
                            }]
                    }
                }
            }
        },
        mounted(){
            this.showWeatherData();
        },
        methods: {
            handleSelect(key) {
                if (key === '1') {
                    this.showWeatherData();
                } else if (key === '2') {
                    this.showNewsData();
                }
            },
            showWeatherData(){
                this.showWeather = true;
                this.showNews = false;
                this.getWeatherData();
            },
            showNewsData(){
                this.showWeather = false;
                this.showNews = true;
                this.getNewsData();
            },
            getWeatherData(){
                axios.post('api/simpleWeather/query',
                    qs.stringify({
                        city: '上海',
                        key: '8c0cea0f8d3201d975f4b34136b8b835'
                    })
                ).then(response => {
                    console.log(JSON.stringify(response.data))
                    if (response.data.error_code !== 0) {
                        alert("查询失败：" + response.data.reason);
                    } else {
                        this.weatherData = JSON.parse(JSON.stringify(response.data));
                    }
                }).catch(error => {
                    console.log("error：" + error);
                })
            },
            getNewsData(){
                axios.get('api2/toutiao/index',
                    qs.stringify({
                        key: 'd227e1e69dfd1e680bd7afe04ed6e536'
                    })
                ).then(response => {
                    console.log(JSON.stringify(response.data))
                    if (response.data.result.stat !== 1) {
                        alert("查询失败");
                    } else {
                        this.newsData = JSON.parse(JSON.stringify(response.data));
                    }
                }).catch(error => {
                    console.log("error：" + error);
                })
            }
        }
    }
</script>
<style scoped>
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

    .news {
        background: blue;
        height: 200px;
    }
</style>