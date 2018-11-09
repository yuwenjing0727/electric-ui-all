<template>
	<div  class="wrap">
		<div class="title">
			<span style="font-weight: 600;font-size: 18px">更新接口</span>
		</div>
		<div class="content">
			<div class="con_list">
				<div class="l_title">
					<span>基础信息</span>
					<div class="l_btn">
						<router-link :to="{path:'details', query:{projectId:projectId,projectName:projectName}}">
							<el-button type="primary" size="mini">返回接口列表</el-button>
						</router-link>
						<router-link :to="{path:'interDetailsPage',query:{documentId:documentId,projectId:projectId,projectName:projectName}}">
							<el-button type="primary" size="mini">接口详情页</el-button>
						</router-link>
						<el-button type="primary" size="mini" @click="updateDocument">更新接口</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form :model="basicData"   >
						<div class="flx">
							<el-form-item label="URL" :label-width="formLabelWidth" >
								<el-input v-model="basicData.requestUrl" auto-complete="off" placeholder="请输入接口URL(相对地址)"></el-input>
							</el-form-item>
							<el-form-item label="分组" :label-width="formLabelWidth">
								<el-select v-model="basicData.groupId" placeholder="请选择分组">
									<el-option v-for="(group,index) in groupList" :key="index" :label="group.NAME" :value="group.ID"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="Method" :label-width="formLabelWidth">
								<el-select v-model="basicData.requestMethod" placeholder="请选择方法">
									<el-option v-for="(method,index) in methodList" :key="index" :label="method.NAME" :value="method.ID"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="状态" :label-width="formLabelWidth" >
								<el-radio v-model="basicData.documentStatus" v-for="(status,index) in statusList" :key="index" :label="status.paraCode">{{status.paraKey}}</el-radio>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="名称" :label-width="formLabelWidth" >
								<el-input v-model="basicData.documentName" auto-complete="off" placeholder="请输入接口名称"></el-input>
							</el-form-item>
							<el-form-item label="等级" :label-width="formLabelWidth">
								<el-select v-model="basicData.documentLevel" placeholder="请选择等级">
									<el-option v-for="(level,index) in levelList" :key="index" :label="level.paraKey" :value="level.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="下载数据转换处理器" :label-width="formLabelWidth" >
								<el-select v-model="basicData.dlmConvertType" placeholder="请选择下载处理器">
									<el-option v-for="(dlmConvertType,index) in dlmConvertTypeList" :key="index" :label="dlmConvertType.paraKey" :value="dlmConvertType.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="上传数据转换处理器" :label-width="formLabelWidth">
								<el-select v-model="basicData.ulmConvertType" placeholder="请选择上传处理器">
									<el-option v-for="(ulmConvertType,index) in ulmConvertTypeList" :key="index" :label="ulmConvertType.paraKey" :value="ulmConvertType.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="数据转换类型" :label-width="formLabelWidth" >
								<el-select v-model="basicData.convertType" placeholder="请选择数据转换类型">
									<el-option v-for="(convertType,index) in convertTypeList" :key="index" :label="convertType.paraKey" :value="convertType.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="接口类型" :label-width="formLabelWidth">
								<el-select v-model="basicData.documentType" placeholder="请选择接口类型">
									<el-option v-for="(documentType,index) in documentTypeList" :key="index" :label="documentType.paraKey" :value="documentType.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="接口数据类型" :label-width="formLabelWidth" >
								<el-select v-model="basicData.documentDataType" placeholder="请选择接口数据类型">
									<el-option v-for="(documentDataType,index) in documentDataTypeList" :key="index" :label="documentDataType.paraKey" :value="documentDataType.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="接口周期类型" :label-width="formLabelWidth">
								<el-select v-model="basicData.documentCycleType" placeholder="请选择接口周期类型">
									<el-option v-for="(documentCycleType,index) in documentCycleTypeList" :key="index" :label="documentCycleType.paraKey" :value="documentCycleType.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="接口适配器处理组件" :label-width="formLabelWidth" >
								<el-input v-model="basicData.faceAdapter" auto-complete="off" placeholder="请输入接口适配器处理组件"></el-input>
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
						<div class="flx" v-for="(item,index) in requestHead">
							<el-form-item label="Key" :label-width="formLabelWidth">
								<el-select v-model="item.key" placeholder="请选择KEY">
									<el-option v-for="(requestHeadKey,index) in requestHeadKeyList" :key="index" :label="requestHeadKey.paraKey" :value="requestHeadKey.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="Value" :label-width="formLabelWidth" >
								<el-input v-model="item.value" auto-complete="off"></el-input>
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
						<div class="flx" v-for="(item,index) in requestParam">
							<el-form-item label="参数" label-width="50px" >
								<el-input v-model="item.name" auto-complete="off" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="说明" label-width="50px" >
								<el-input v-model="item.desc" auto-complete="off" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="类型" label-width="50px" >
								<el-select v-model="item.type" placeholder="请选择">
									<el-option
										v-for="(item,index) in paramType"
										:key="index"
										:label="item.DATATYPENAME"
										:value="item.DATATYPEID">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item >
								<el-select v-model="item.notNull" placeholder="必填">
									<el-option
										v-for="item in required"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
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
						<el-button type="primary" size="mini" @click="showSuccessFlag = true">成功响应结果</el-button>
						<el-button type="primary" size="mini" @click="showSuccessFlag = false">失败响应结果</el-button>
					</div>

				</div>
				<div class="formList" v-show="showSuccessFlag">
					<el-form >
						<div class="flx">
							<el-form-item label="响应数据类型(MIME)" label-width="160px"  style="width: 100%">
								<el-radio v-model="basicData.successRespType" v-for="(responseType,index) in responseTypeList" :key="index" :label="responseType.id">{{responseType.name}}</el-radio>
							</el-form-item>
						</div>

					</el-form>
					<div style="height: 180px;width: 100%;border: 1px solid  #eee">
						<el-input type="textarea" v-model="basicData.successRespExample" rows="8"></el-input>
					</div>
				</div>
				<div class="formList" v-show="!showSuccessFlag">
					<el-form >
						<div class="flx">
							<el-form-item label="响应数据类型(MIME)" label-width="160px"  style="width: 100%">
								<el-radio v-model="basicData.failRespType" v-for="(responseType,index) in responseTypeList" :key="index" :label="responseType.id">{{responseType.name}}</el-radio>
							</el-form-item>
						</div>

					</el-form>
					<div style="height: 180px;width: 100%;border: 1px solid  #eee">
						<el-input type="textarea" v-model="basicData.failRespExample" rows="8"></el-input>
					</div>
				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>响应数据类型</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="$router.push({path:'datatypeAdd'})">+新增数据类型</el-button>
					</div>

				</div>
				<div class="formList">
					<el-form>
						<el-form-item label="数据类型" :label-width="formLabelWidth" >
							<el-select v-model="basicData.responseDatatypeId" placeholder="请选择数据类型">
								<el-option
									v-for="(item,index) in dataType"
									:key="index"
									:label="item.DATATYPENAME"
									:value="item.DATATYPEID">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>接口备注</span>
				</div>
				<div class="formList">
					<textarea id="TextArea1" cols="20" rows="2" class="ckeditor" v-model="basicData.documentDesc"></textarea>
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
				projectId:this.$route.query.projectId,
				projectName:this.$route.query.projectName,
				documentId:this.$route.query.documentId,
				groupList:[
					{ID:"0", NAME:"默认分组"},
				],
				methodList:[
					{ID:"0", NAME:"POST"},
					{ID:"1", NAME:"GET"},
					{ID:"2", NAME:"PUT"},
					{ID:"3", NAME:"DELETE"},
					{ID:"4", NAME:"HEAD"},
					{ID:"5", NAME:"OPTIONS"},
					{ID:"6", NAME:"PATCH"}
				],
				statusList:[],
				levelList:[],
				basicData:{
					projectId:this.$route.query.projectId,
					requestUrl:"",
					groupId:"",
					requestMethod:"",
					documentStatus:"",
					documentName:"",
					documentLevel:"",
					dlmConvertType:"",
					ulmConvertType:"",
					convertType:"",
					documentType:"",
					documentDataType:"",
					documentCycleType:"",
					faceAdapter:"",
					requestHeaders:[{key:"",value:""}],
					queryParams:[{notNull:true,type:"STRING",name:"k1",desc:"姓名"}],
					successRespType:"",
					successRespExample:"",
					failRespType:"",
					failRespExample:"",
					responseDatatypeId:"",
					documentDesc:""
				},
				requestHeadKeyList:[],
				requestHead:[],
				formLabelWidth:"100px",

				dataType:[
					/*{label:"STRING",value:"STRING"},
					{label:"BOOLEAN",value:"BOOLEAN"},
					{label:"SHOPT",value:"SHOPT"},
					{label:"INT",value:"INT"},
					{label:"LONG",value:"LONG"},
					{label:"FLOAT",value:"FLOAT"},
					{label:"DOUBLE",value:"DOUBLE"},
					{label:"DATETIME",value:"DATETIME"},
					{label:"JSON",value:"JSON"},
					{label:"BYTE",value:"BYTE"}*/
				],
				requestHeaders:[
					{
						key:"",
						value:""
					}
				],
				requestParam:[
					{
						name:"",
						desc:"",
						type:"",
						notNull:""
					}
				],
				paramType:[
					/*{label:"STRING",value:"STRING"},
					{label:"BOOLEAN",value:"BOOLEAN"},
					{label:"SHOPT",value:"SHOPT"},
					{label:"INT",value:"INT"},
					{label:"LONG",value:"LONG"},
					{label:"FLOAT",value:"FLOAT"},
					{label:"DOUBLE",value:"DOUBLE"},
					{label:"DATETIME",value:"DATETIME"},
					{label:"JSON",value:"JSON"},
					{label:"BYTE",value:"BYTE"},*/
				],
				required:[
					{label:"必填",value:true},
					{label:"非必填",value:false}
				],
				showSuccessFlag:true,
				responseTypeList:[
					{id:"JSON",name:"JSON"},
					{id:"XML",name:"XML"},
					{id:"HTML",name:"HTML"},
					{id:"TEXT",name:"TEXT"},
					{id:"JSONP",name:"JSONP"},
				],
				dlmConvertTypeList:[],
				ulmConvertTypeList:[],
				convertTypeList:[],
				documentTypeList:[],
				documentDataTypeList:[],
				documentCycleTypeList:[],
			};
		},
		mounted(){
			this.getGroupList();
			this.$util.dictory.getItemsByDicKey("document_status","statusList",this);
			this.$util.dictory.getItemsByDicKey("param_key","requestHeadKeyList",this);
			this.$util.dictory.getItemsByDicKey("document_level","levelList",this);
			this.$util.dictory.getItemsByDicKey("dlm_convert_type","dlmConvertTypeList",this);
			this.$util.dictory.getItemsByDicKey("ulm_convert_type","ulmConvertTypeList",this);
			this.$util.dictory.getItemsByDicKey("convert_type","convertTypeList",this);
			this.$util.dictory.getItemsByDicKey("document_type","documentTypeList",this);
			this.$util.dictory.getItemsByDicKey("document_data_type","documentDataTypeList",this);
			this.$util.dictory.getItemsByDicKey("document_cycle_type","documentCycleTypeList",this);
			this.getDataType();
			this.getDataType();
			this.getDetailById();
		},
		methods: {
			//获取分组树
			getGroupList(){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/group/list/${this.projectId}`)
					.then((response) => {
						if(response.data.code == 0){
							this.groupList = [
								{ID:"0", NAME:"默认分组"}
							];
							this.groupList = this.groupList.concat(response.data.data);
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			//获取数据类型
			getDataType(){
				let self = this;
				self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/getAllIdAndName`)
					.then((response) => {
						if(response.data.code == 0){
							self.dataType = response.data.data;
							self.paramType = response.data.data;
						}

					})
					.catch(function(error) {
						console.log(error);
					});
			},

			getDetailById(){
				let self = this;
				self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/document/info/${this.documentId}`)
					.then((response) => {
						if(response.data.code == 0){
							self.basicData = response.data.data;
							self.requestHead = JSON.parse(self.basicData.requestHeaders);
							self.requestParam = JSON.parse(self.basicData.queryParams);
							CKEDITOR.instances.TextArea1.setData(self.basicData.documentDesc);
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},

			//更新接口
			updateDocument(){
				let self = this;
				self.basicData.requestHeaders = JSON.stringify(self.requestHead);
				self.basicData.queryParams = JSON.stringify(self.requestParam);
				self.basicData.documentDesc = CKEDITOR.instances.TextArea1.getData();

				var queryParam = {
					code:"0",
					msg:"",
					data:self.basicData
				};
				self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/document/update`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("更新接口成功！");
							self.goBack();
							self.basicData = {};
						}

					})
					.catch(function(error) {
						console.log(error);
					});


			},
			addHead(){
				this.requestHead.push({key:"",value:""})
			},
			delHead(index){
				this.requestHead.splice(index,1)
			},
			addParam(){
				this.requestParam.push({
					name:"",
					desc:"",
					type:"",
					notNull:""
				})
			},
			delparam(index){
				this.requestParam.splice(index,1)
			},

			goBack(){
				this.$router.push({path:'details', query:{projectId:this.projectId,projectName:this.projectName}});
			}


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
	.el-input__inner{
		padding: 0 44px !important;
	}


</style>
<style lang="less">
	.elDialog .el-dialog__body .flxRadio .el-form-item {
		width: 100%;
		padding-right: 30px;
	}
	// 添加窗口样式
	.elDialog {
		.el-dialog__body {
			.flx {
				display: flex;
				.el-form-item {
					width: 50%;
					padding-right: 30px;
					margin-right: 10px;
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
