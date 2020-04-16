<template>
    <div class="root" v-loading="loading" element-loading-text="正在飞速计算中">
        <div v-if="showForm">
            <el-form :model="form" :rules="rules" ref="form" label-width="1px" >
                <p class="title">配对缘分测算</p>
                <p class="tips">请务必填写真实信息！</p>
                <el-form-item label="" prop="name">
                    <el-input class="item" v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="" prop="sex">
                    <el-select class="item" v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="m"></el-option>
                        <el-option label="女" value="f"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="birthday">
                    <el-date-picker v-model="form.birthday" placeholder="请选择生日" style="width: 80%" type="date"
                                    :editable="false" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd"></el-date-picker>
                </el-form-item>
                <p class="text">用姓名测试爱情，80%准确率！<br/>
                    俗话说，名如其人，缘分就是人生的后半生，为了寻找真缘分的大有人在，因此也就有了姓名缘分测试。<br/>
                    您现在是不是也正在心动犹豫，也想要一个属于自己的名字配对缘分测试了呢？那就请您赶紧行动吧！<br/>
                    存在即有理，没有用的东西也是不会存在的，天以适者生存，姓名作为人与事物的接触外延，在人生中起着一个支柱桥梁的作用。<br/>
                    名字就像是一个人的影子，这个影子的好坏将会直接影响到整个事物本身，因为如影随形。<br/>
                    雁过留声，人过留名，大家都知道中国人的姓名是由中国的汉字组成，没有汉字根本就不存在中国的姓名学，这是姓名学当中一个最根本、最直接的道理。<br/>
                    我们的名字离不开阴阳五行和八卦，读音和意境联系着我们的命运，每一笔一画都暗藏玄机，你和你心目中的他（她）是不是天生的一对，能不能够白头偕老，你们之间到底有怎样的姻缘，都能在你们的姓名中找到答案。
                </p>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即测算</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="!showForm" class="result">
            <p>{{resultName}}</p>
            <el-button type="primary" @click="backForm()">重新测算</el-button>
        </div>
    </div>
</template>
<script>
    import sources1 from '../assets/data/destiny-source1.json';
    import sources2 from '../assets/data/destiny-source2.json';
    import targets from '../assets/data/destiny-target.json';
    export default {
        name: 'Destiny',
        mounted(){

        },
        data() {
            return {
                showForm: true,
                loading: false,
                resultName: '',
                form: {
                    name: '',
                    sex: '',
                    birthday: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {required: true, min: 2, max: 8, message: '请输入正确的姓名', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    birthday: [
                        {required: true, message: '请选择生日', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        this.loading = true;
                        this.interval = setInterval(this.showResult, 3000);
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.form.name = '';
                this.form.sex = '';
                this.form.birthday = '';
            },
            showResult(){
                clearInterval(this.interval);
                this.loading = false;
                this.showForm = false;
                this.resultName = this.getResultName();
            },
            getResultName(){
                for (let target of targets) {
                    if (target.name === this.form.name && target.sex === this.form.sex && target.birthday === this.form.birthday) {
                        console.log(target.result);
                        return target.result;
                    }
                }
                let name = this.getRandomName();
                console.log(name);
                return name;
            },
            backForm(){
                this.showForm = true;
                this.resetForm();
            },
            getRandomName(){
                let nameCount = (Math.random() % 2 == 0) ? "2" : "3";
                let name1 = sources1[Math.floor(Math.random() * sources1.length)];
                let name2 = sources2[Math.floor(Math.random() * sources2.length)];
                if (nameCount === "2") {
                    let name = name1 + name2;
                    return name;
                }
                else (nameCount === "3")
                {
                    let name3 = sources2[Math.floor(Math.random() * sources2.length)];
                    let name = name1 + name2 + name3;
                    return name;
                }
            }
        }
    }
</script>
<style scoped>
    .root {
        height: 1000px;
        background: url("../assets/img/destiny-bg.gif") no-repeat center;
        background-size: cover;
        z-index: -1;
    }

    .title {
        margin-bottom: 30px;
        font-weight: bold;
    }

    .tips {
        font-size: small;
        color: red;
        font-weight: 500;
    }

    .item {
        width: 80%;
    }

    .text {
        width: 90%;
        display: inline-block;
        text-align: left;
        font-size: small;
        font-weight: 300;
    }

    .result {
        position: fixed;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -100px;
    }
</style>