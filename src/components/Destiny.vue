<template>
    <div class="root" v-loading="loading" element-loading-text="正在飞速计算中">
        <div v-if="showForm">
            <el-form :model="form" :rules="rules" ref="form" label-width="1px">
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
                                    :editable="false" format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyyMMdd"></el-date-picker>
                </el-form-item>
                <div v-for="item in content" :key=item>
                    <p class="text">{{item}}</p>
                </div>
                <el-form-item class="btn">
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
    import content from '../assets/data/destiny-content.json';
    export default {
        name: 'Destiny',
        mounted(){

        },
        data() {
            return {
                showForm: true,
                loading: false,
                resultName: '',
                content: content,
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
        /*background: url("../assets/img/destiny-bg.gif") no-repeat center;*/
        background-size: cover;
        z-index: -1;
    }

    .title {
        margin-top: 50px;
        margin-bottom: 0px;
        font-weight: 600;
        font-size: large;
    }

    .tips {
        font-size: small;
        color: red;
        font-weight: 500;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .item {
        width: 80%;
    }

    .text {
        width: 80%;
        display: inline-block;
        text-align: center;
        font-size: small;
        margin-top: 0px;
        margin-bottom: 3px;
        font-weight: 300;
    }

    .btn {
        margin: 20px;
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