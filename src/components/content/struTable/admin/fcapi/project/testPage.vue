<template>
	<div  class="wrap">
		<div class="title">
			<span style="font-weight: 600;font-size: 18px">接口测试</span>
		</div>
		<div class="content">
			<div class="con_list">
				<div class="l_title">
					<span>基础信息</span>
					<div class="l_btn">
						<!--interDetailsPage-->
						<!--:to="{path:'interDetailsPage', query:{documentId:documentId}}-->
						<router-link :to="{path:'interDetailsPage', query:{documentId:documentId,projectName:projectName,projectId:projectId}}">
							<el-button type="primary" size="mini">返回接口详情页</el-button>
						</router-link>

					</div>
				</div>
				<div class="formList">
					<el-form :model="checkData"   >
						<div class="flx">
							<el-form-item label="URL" :label-width="formLabelWidth" >
								<el-input v-model="checkData.requestUrl" auto-complete="off" placeholder="请输入url地址"></el-input>
							</el-form-item>
							<el-form-item label="Method" :label-width="formLabelWidth" >
								<el-select v-model="checkData.requestMethod" >
									<el-option
										v-for="item in mthOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item >
								<el-select v-model="basicData.science" >
									<el-option
										v-for="item in sceOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>

						</div>


					</el-form>
				</div>

			</div>
			<div class="con_list">
				<div class="l_title">
					<span>请求头部</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="addHead">+</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form >
						<div class="flx" v-for="(item,index) in checkData.requestHeaders">
							<el-form-item label="Key" :label-width="formLabelWidth" >
								<el-input v-model="item.key" auto-complete="off" ></el-input>
							</el-form-item>
							<el-form-item label="Value" :label-width="formLabelWidth" >
								<el-input v-model="item.value" auto-complete="off" ></el-input>
							</el-form-item>
							<el-form-item >
								<el-button type="primary" size="mini" @click="delHead(index)">-</el-button>
							</el-form-item>

						</div>

					</el-form>
				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>请求参数</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="addParam ">+</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form >
						<div class="flx" v-for="(item,index) in  checkData.queryParams">
							<el-form-item label="参数" label-width="50px" >
								<el-select v-model="item.type" placeholder="请选择">
									<el-option
										v-for="item in paramList"
										:key="item.paraCode"
										:label="item.paraKey"
										:value="item.paraCode">
									</el-option>
								</el-select>


							</el-form-item>
							<el-form-item label="值" label-width="50px" >
								<el-input v-model="item.name" auto-complete="off" placeholder=""></el-input>
							</el-form-item>

							<el-form-item >
								<el-button type="primary" size="mini" @click="delparam(index)">-</el-button>
							</el-form-item>

						</div>


					</el-form>


				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>响应结果</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="save()">保存</el-button>
						<el-button type="primary" size="mini" @click="run()">运行</el-button>
					</div>

				</div>
				<div class="formList">
					<el-form >
						<div class="flx">
							<el-form-item label="响应数据类型(MIME)" label-width="160px"  style="width: 100%">
								<el-radio v-model="checkData.successRespType" label="JSON">JSON</el-radio>
								<el-radio v-model="checkData.successRespType" label="XML">XML</el-radio>
								<el-radio v-model="checkData.successRespType" label="HTML">HTML</el-radio>
								<el-radio v-model="checkData.successRespType" label="TEXT">TEXT</el-radio>
								<el-radio v-model="checkData.successRespType" label="JSONP">JSONP</el-radio>
							</el-form-item>
						</div>

					</el-form>
					<div style="height: 200px;width: 100%;border: 1px solid  #eee">
						<pre id="result">
</pre>

					</div>
				</div>
			</div>

		</div>


	</div>
</template>

<script>

	export default {
		name: "basics-m-tab3",
		data() {
			return {
				basicData:{
					url:"",
					group:"",
					science:"线上环境",
				},
				formLabelWidth:"100px",
				/*activeNames: ['1']*/
				mthOptions:[
					{label:"GET",value:"GET"},
					{label:"POST",value:"POST"},
					{label:"HEAD",value:"HEAD"},
					{label:"DELETE",value:"DELETE"},
				],
				sceOptions:[
					{label:"线上环境",value:"线上环境"},
				],
				dataTypeVal:"",
				dataType:[
					{label:"全部",value:"全部"},
					{label:"业务线",value:"业务线"}

				],
				requestHead:[
					{
						key:"",
						value:""
					}
				],
				requestParam:[
					{
						param:"",
						value:"",
					}
				],
				paramType:[
					{label:"LONG",value:"LONG"},
					{label:"SHOPT",value:"SHOPT"}

				],
				required:[
					{label:"必填",value:"必填"},
					{label:"非必填",value:"非必填"}
				],
				mimeType:"",
				documentId:"",
				 checkData:{},
				paramList:[],
				testId:"",
				responseData:"",

			};
		},
		created(){
		    this.documentId=this.$route.query.documentId;
			this.projectId=this.$route.query.projectId;
			this.projectName=this.$route.query.projectName;

			if(this.$route.query.testId){
				this.testId=this.$route.query.testId
			}else{
				this.testId=""
			}

			console.log(this.$route.query.documentId)
			this.$util.dictory.getItemsByDicKey("param_key","paramList",this);

		},
		mounted(){
		   this.getData()
		},
		methods: {
			getData(){
			    if(this.testId){
					this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/test/info/${this.testId}`)
						.then((response) => {
							if(response.data.code == 0){
								console.log(response)
								this.checkData=response.data.data;
								/*this.requestHead = JSON.parse(response.data.data.requestHeaders);
								this.requestParam = JSON.parse(this.checkData.queryParams);*/
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}else{
					this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/document/info/${this.documentId}`)
						.then((response) => {
							if(response.data.code == 0){
								console.log(response)
								this.checkData=response.data.data;

								this.checkData.requestHeaders = JSON.parse(this.checkData.requestHeaders);
								this.checkData.queryParams= JSON.parse(this.checkData.queryParams);
								console.log(typeof this.checkData.requestHeaders)

						}
						})
						.catch(function(error) {
							console.log(error);
						});
			}


			},

			addHead(){
				this.checkData.requestHeaders.push({key:"",value:""})
			},
			delHead(index){
				this.checkData.requestHeaders.splice(index,1)
			},
			addParam(){
				this.checkData.queryParams.push({
					param:"",
					value:""
				})
			},
			delparam(index){
				this.checkData.queryParams.splice(index,1)
			},
			/*响应结果运行*/
			run(){
				var queryParams=JSON.stringify(this.checkData.queryParams);
				 var  requestHeaders= JSON.stringify(this.checkData.requestHeaders);
				var queryParam = {
					code:"0",
					msg:"",
					data: {
						documentId: this.checkData.documentId,
						queryParams: queryParams,
						respType: this.checkData.successRespType,
						requestUrl: this.checkData.requestUrl,
						requestMethod: this.checkData.requestMethod,
						requestHeaders:requestHeaders,
						apiTestHistId:this.testId,
					}
				};

				this.$http.post(`${process.env.NODE_ENV}/admin/fc/project/test/run/`,queryParam)
					.then((response) => {
						console.log("1111")
						console.log(response)
						$('#result').html(this.syntaxHeightlight(response.data.msg));
						//this.responseData=response
						/*if(response.data.code == 0){
						    console.log("1111")
							console.log(response)
							this.responseData=response
							/!*this.success("保存成功！");*!/

						}else{

						}*/
					})
					.catch(function(error) {
						console.log(error);
					});



			},
			save(){
			    console.log( this.checkData)
				var queryParams=JSON.stringify(this.checkData.queryParams);
				var  requestHeaders= JSON.stringify(this.checkData.requestHeaders);
				var queryParam = {
					code:"0",
					msg:"",
					data: {
						documentId: this.checkData.documentId,
						queryParams: queryParams,
						respType: this.checkData.successRespType,
						requestUrl: this.checkData.requestUrl,
						requestMethod: this.checkData.requestMethod,
						requestHeaders: requestHeaders,
						apiTestHistId:this.testId,

						/*点击保存 跳转详情页  详情页的test历史会多一条数据  单机test历史的运行 再跳转到 测试页  此时需要带测试页的Id*/

					}
				};

				this.$http.post(`${process.env.NODE_ENV}/admin/fc/project/test/save/`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							console.log(response)
							this.success("保存成功！");
						}
					})
					.catch(function(error) {
						console.log(error);
					});




			},
			/*json 展示*/
			syntaxHeightlight(json) {
				if (typeof json !== "string") {
					json = JSON.stringify(json, undefined, 2)
				}
				json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g,
					'>');
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
					var cls = 'number';
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = 'key';
						} else {
							cls = 'string';
						}
					} else if (/true|false/.test(match)) {
						cls = 'boolean';
					} else if (/null/.test(match)) {
						cls = 'null';
					}
					return '<span class="' + cls + '">' + match + '</span>';
				});
			}



		},

		watch:{
			/*checkData(newV,oldV){
                    newV.requestHeaders=JSON.parse( newV.requestHeaders)
				    newV.queryParams=JSON.parse( newV.queryParams)
			}*/
		}

	};
</script>

<style lang="less" scoped >
	.wrap{
		min-height: 100%;
		height: auto;
		position: relative;
		.title{
			width: 100%;
			height: 30px;
			line-height: 30px;
			margin-left: 10px;

		}
		.content{
			position: absolute;
			top: 40px;
			bottom: 50px;
			left: 10px;
			right: 10px;

			.con_list{
				width: 100%;
				height:auto;
				border-top: 3px  solid #409EFF;
				background: #fff;
				margin-bottom: 10px;
				border-top-left-radius:5px ;
				border-top-right-radius:5px ;
				.l_title{
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					border-bottom:1px  solid #e5e5e5;
					span{
						margin-left: 10px;
					}
					.l_btn{
						float: right;
						margin-right: 10px;
					}


				}
				.formList{
					padding: 10px;
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
		}

	}



</style>
