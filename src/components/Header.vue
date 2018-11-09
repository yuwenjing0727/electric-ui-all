<template>
    <div class="top"  id="top">
        <div class="top-content">
            <p><img src="../../static/img/logo.png" alt=""></p>
            <h1>全国统一电力市场电费结算系统</h1>
            <ul>
               <!-- <li>
					<top-theme></top-theme>
                </li>-->
                <!--<li>
                   <top-lock></top-lock>
                </li>-->
				<li>
					<el-tooltip class="item"
								effect="dark"
								content="特色主题"
								placement="bottom">
        <span class="top-item">
          <top-theme></top-theme>
        </span>
					</el-tooltip>


				</li>
                <li>
                    <i class="el-icon-screen" title="全屏" @click="screenCli()" ></i>
                </li>
                <li>
                    <img class="top-userImg" src="../../static/img/user.png" alt="" title="用户图像" >
                </li>
				<li>

					<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
     {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="tologin()">
							首页
						</el-dropdown-item>
						<el-dropdown-item @click.native="dialogFormVisible = true;">
							修改密码
						</el-dropdown-item>
						<el-dropdown-item @click.native="Signout" divided>退出系统</el-dropdown-item>
					</el-dropdown-menu>
						</el-dropdown>
				</li>
            </ul>
        </div>

		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form" :rules="rules" ref="ruleUpdateForm">
				<div class="flx">
					<el-form-item label="原始密码" :label-width="formLabelWidth" prop="oldPwd">
						<el-input type="password" v-model="form.oldPwd" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
						<el-input type="password" v-model="form.newPwd" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPwd">
						<el-input type="password" v-model="form.confirmPwd" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updatePwd('ruleUpdateForm')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
	import topTheme from "./top/top-theme.vue";
	import topLock from "./top/top-lock.vue"
	import screenfull from 'screenfull'
	/*import { mapGetters } from 'vuex'*/
export default {
  data () {
    return {

		userInfo:{
			username:"admin",
		},
		dialogFormVisible:false,
		formLabelWidth: '150px',
		form:{
			oldPwd:"",
			newPwd:"",
			confirmPwd:""
		},
		rules: {
			oldPwd: [
				{ required: true, message: '请输入原始密码', trigger: 'blur' }
			],
			newPwd: [
				{ required: true, message: '请输入新密码', trigger: 'blur' }
			],
			confirmPwd:[
				{required: true, message: '确认密码', trigger: 'blur'}
			]
		}
    }
  },
  computed:{
	  // 使用对象展开运算符将 getter 混入 computed 对象中
	 /* ...mapGetters(["bg"]),*/
      userName(){
          if(sessionStorage.user){
              return sessionStorage.user
          }
          return "未知用户"
      }

  },
  created() {
      this.settoken()
  },
  components:{
	  topTheme,
	  topLock
  },
  mounted () {
    //   this.Signincurrent()

  },
  methods:{
	  updatePwd(formName){
		  this.$refs[formName].validate((valid) => {
			  if (valid) {
				  let self = this;
				  if(this.form.confirmPwd != this.form.newPwd){
					  self.notice("确认密码与新密码不一致！");
					  return false;
				  }
				  let queryParam = {
					  code:"0",
					  msg:"",
					  data: {
						  userId:"",
						  pwdChange:this.form.oldPwd,
						  userPw:this.form.newPwd
					  }
				  }
				  self.$http.post(`${process.env.NODE_ENV}/user/update`,queryParam)
					  .then((response) => {
						  if(response.data.code == 0){
							  self.success("修改用户密码成功！");
							  self.form = {};
							  self.dialogFormVisible = false;
						  }

					  })
					  .catch(function(error) {
						  console.log(error);
					  });

			  } else {
				  console.log('error submit!!');
				  return false;
			  }
		  });


	  },

      tologin(){
          this.$router.push({path:"/homePage"})
      },
      settoken(){
          if(location.search){
              var strs = location.search.substr(1).split("=");
              sessionStorage.setItem(strs[0],strs[1])
          }
      },
      /*Signincurrent(){
          if(sessionStorage.authorization){
              return
          }else{
              location.href = window._signOut().Ip;
          }
      },*/
      Signout(){
          this.$alert("确定注销登录吗？", "提示", { confirmButtonText: "确定" ,type:"warning"}).then(()=>{
                sessionStorage.removeItem('editableTabs');
                sessionStorage.removeItem('editableTabsValue');
                sessionStorage.removeItem('token');

			  sessionStorage.removeItem('buttons');
			  sessionStorage.removeItem('buttonPermission');
                // location.href = window._signOut().Ip;
			  //清除所有cookie函数
			  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
			  if(keys) {
				  for(var i = keys.length; i--;)
					  document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
			  }

			  this.$http.post(`${process.env.NODE_ENV}/IscLogoutServlet`)
				  .then((response) => {
					  location.href=`${process.env.NODE_ENV}/`+window._signOut().loginout
					  /*if(response.data.code == 0){

					  }*/

				  })
				  .catch(function(error) {
					  console.log(error);
				  });


          })
      },
	  screenCli(){
		  if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
			  this.$message({
				  message: '不支持全屏',
				  type: 'warning'
			  })
			  return false
		  }
		  screenfull.toggle()

	  },
	  handleCommand(command) {
		 /* this.$message('click on item ' + command);*/
	  }
  }
}
</script>
<style lang="less" scoped>
    .top{
        width:100%;
        height:70px;
        /*background-image: url("../../static/img/bg.png");*/
        background-size: 100%;
      /*  background-color: #002140;*/
        border-bottom: 1px solid rgba(238, 221, 218, 0.5);
     /*   box-shadow: 2px 2px 5px #888;*/
        /*position: absolute;*/
       // z-index: 1;
        .top-content{
            height:100%;
            width:100%;
            display: flex;
            p{
                width:180px;
                height:46px;
                margin:auto 10px auto 30px;

            }
            h1{
                font-weight: 500;
                vertical-align: middle;
                font-size: 18px;
                line-height: 70px;
                color: #fff;
                margin-left:20px;
                width:280px;
				font-size: 600;
            }
            ul{
                display: flex;
                height:100%;
                flex:300;
                align-items: center;
                justify-content: flex-end;
                margin-right: 40px;
                li{
                 /* width:30px;*/
                  cursor:pointer;
                  margin:0 10px;
                  &:hover{
                      color:yellow;
                  }
                  span{
                      color: #fff;
                      font-size: 14px;
                      width:100%;
                      display: inline-block;
                      white-space: nowrap;
                  }
                  i{
                      color:#fff;
                      font-size: 14px;

                  }
					.el-icon-screen{
						display: inline-block;
						width: 16px;
						height: 16px;
						background: url("../../static/img/screen.png");
						background-size: 100%  100%;
					}
					.top-userImg {
						margin: 0 8px 0 10px;
						padding: 2px;
						width: 28px;
						height: 28px;
						border-radius: 100%;
						box-sizing: border-box;
						border: 1px solid #eee;
					}
                  img{
                      width:19px;
                      height:19px;
                      border: none;
                      outline: none;
                  }
                }
            }
        }
    }

	// 添加窗口样式
	.elDialog {
		.el-dialog__body {
			.flx {
				display: flex;
				.el-form-item {
					width: 50%;
					padding-right: 30px;
					.el-form-item__label {
						font-weight: 500;
					}
					.el-form-item__content {
						.el-select {
							width: 100%;
						}
					}
				}
				.textArea {
					width: 100%;
					.el-form-item__content {
						margin-left: 100px;
					}
					.el-form-item__label {
						width: 100px;
					}
				}
			}
		}
	}
</style>
<style>


	.el-dropdown {
		display: inline-block;
		position: relative;
		color: #fff !important;
		font-size: 20px !important;
	}
</style>

