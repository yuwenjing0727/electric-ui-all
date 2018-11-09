<template>
	<div  class="wrap">
		<div class="title">
			<span style="font-weight: 600;font-size: 18px">接口详情</span>
		</div>
		<div class="content">
			<div class="con_list">
				<div class="l_title">
					<span>基础信息</span>
					<div class="l_btn">
						<!--details-->
						<router-link :to="{path:'details', query:{projectId:projectId,projectName:projectName,documentId:documentId}}">
							<el-button type="primary" size="mini">返回接口列表</el-button>
						</router-link>
						<router-link :to="{path:'editPage', query:{projectId:projectId,projectName:projectName,documentId:documentId}}">
							<el-button type="primary" size="mini">修改接口</el-button>
						</router-link>
					</div>
				</div>
				<div class="formList">
					<el-form>
						<div class="flx">
							<el-form-item label="URL：" :label-width="formLabelWidth" >
								<el-select size="mini" style="width: 100px" v-model="science" >
									<el-option
										v-for="item in sceOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
								<span>{{checkData.requestUrl}}</span>

							</el-form-item>
							<el-form-item label="分组：" :label-width="formLabelWidth" >
								<span>{{checkData.groupId}}</span>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="Method:" :label-width="formLabelWidth" >
								<span>{{checkData.requestMethod}}</span>
							</el-form-item>
							<el-form-item label="状态:" :label-width="formLabelWidth" >
                                <span>{{checkData.documentStatus}}</span>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="名称" :label-width="formLabelWidth" >
								<span>{{checkData.documentName}}</span>
							</el-form-item>
							<el-form-item label="等级:" :label-width="formLabelWidth" >
								<span>{{checkData.documentLevel}}</span>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="下载数据转换处理器" :label-width="formLabelWidth" >
								<el-select v-model="checkData.dlmConvertType" placeholder="请选择下载处理器">
									<el-option v-for="(dlmConvertType,index) in dlmConvertTypeList" :key="index" :label="dlmConvertType.paraKey" :value="dlmConvertType.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="上传数据转换处理器" :label-width="formLabelWidth">
								<el-select v-model="checkData.ulmConvertType" placeholder="请选择上传处理器">
									<el-option v-for="(ulmConvertType,index) in ulmConvertTypeList" :key="index" :label="ulmConvertType.paraKey" :value="ulmConvertType.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="数据转换类型" :label-width="formLabelWidth" >
								<el-select v-model="checkData.convertType" placeholder="请选择数据转换类型">
									<el-option v-for="(convertType,index) in convertTypeList" :key="index" :label="convertType.paraKey" :value="convertType.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="接口类型" :label-width="formLabelWidth">
								<el-select v-model="checkData.documentType" placeholder="请选择接口类型">
									<el-option v-for="(documentType,index) in documentTypeList" :key="index" :label="documentType.paraKey" :value="documentType.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="接口数据类型" :label-width="formLabelWidth" >
								<el-select v-model="checkData.documentDataType" placeholder="请选择接口数据类型">
									<el-option v-for="(documentDataType,index) in documentDataTypeList" :key="index" :label="documentDataType.paraKey" :value="documentDataType.paraCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="接口周期类型" :label-width="formLabelWidth">
								<el-select v-model="checkData.documentCycleType" placeholder="请选择接口周期类型">
									<el-option v-for="(documentCycleType,index) in documentCycleTypeList" :key="index" :label="documentCycleType.paraKey" :value="documentCycleType.paraCode"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form-item label="接口适配器处理组件:" label-width="150px" >
								<span>{{checkData.faceAdapter}}</span>

							</el-form-item>
						</div>
					</el-form>
				</div>

			</div>
			<div class="con_list">
				<div class="l_title">
					<span>请求头部</span>
				</div>
				<div class="formList">
					<el-table :data="checkData.requestHeaders" style="width: 100%" border tooltip-effect="dark">
						<el-table-column header-align="center" prop="key" label="头部标签">
						</el-table-column>
						<el-table-column header-align="center" prop="value" label="头部内容">
						</el-table-column>
					</el-table>

				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>请求参数</span>
				</div>
				<div class="formList">
					<el-table :data="checkData.queryParams" style="width: 100%" border tooltip-effect="dark">
						<el-table-column header-align="center" prop="name" label="参数">
						</el-table-column>
						<el-table-column header-align="center" prop="desc" label="说明">
						</el-table-column>
						<el-table-column header-align="center" prop="type" label="类型">
						</el-table-column>
						<el-table-column header-align="center" prop="notNull" label="是否必填">
						</el-table-column>

					</el-table>

				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>响应结果</span>
					<div class="l_btn">
						<el-button type="primary" size="mini"@click="respExample=true" >成功响应结果</el-button>
						<el-button type="primary" size="mini" @click="respExample=false">失败响应结果</el-button>
					</div>
				</div>
				<div class="formList">
					<el-form >
						<div class="flx" >
							<el-form-item label="JSON" :label-width="formLabelWidth" >
							</el-form-item>
						</div>
						<div class="flx">
						<!--	<pre id="result">

</pre>-->
							<el-form >
								<div class="flx" v-if="respExample" >
									<el-input
										type="textarea"
										placeholder="请输入内容"
										v-model="checkData.documentDesc">
									</el-input></div>
								<div class="flx" v-else>
									<el-input
										type="textarea"
										placeholder="请输入内容"
										v-model="checkData.failRespExample">
									</el-input></div>

							</el-form>


						</div>
					</el-form>

				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>响应数据类型</span>
				</div>
				<div class="formList">
					<el-form >
						<div class="flx" >
							<el-form-item  :label-width="formLabelWidth" >
								<span>{{dataType.datatypeName}}:</span>
								<span>{{dataType.datatypeDesc}}</span>
							</el-form-item>
						</div>
						<div class="flx">
							<el-form >
								<div class="flx" >
									<ul>
										<li v-for="(item,index)  in  fieldData" >
											{{item.fieldName}} {类型:{{item.fieldDatatypeId }}
											描述:{{item.fieldDesc }}}
										</li>
									</ul>
									</div>
							</el-form>


						</div>
					</el-form>

				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>Mock数据</span>
					<div class="l_btn">
						<el-button type="primary" size="mini" @click="dialogFormVisible=true">+Mock数据</el-button>
					</div>

				</div>
				<div class="formList">
					<el-table :data="mockData" style="width: 100%" border tooltip-effect="dark">
						<el-table-column header-align="center" prop="respType" label="相应数据类型">
						</el-table-column>

						<el-table-column
							fixed="right"
							width="230"
							label="操作">
							<template slot-scope="scope">
								<el-button size="small" @click="mockRun(scope.row)">运行</el-button>
								<el-button @click="mockEdit(scope.row)" type="success" size="small">编辑</el-button>
								<el-button type="danger" size="mini" @click="mockDel(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="con_list">
					<div class="l_title">
					<span>Test历史</span>
					<div class="l_btn">
						<router-link :to="{path:'testPage', query:{documentId:documentId,testId:testId}}">
						<el-button type="primary" size="mini">+接口测试</el-button>
							</router-link>
					</div>
				</div>
				<div class="formList">
					<el-table :data="testData" style="width: 100%" border tooltip-effect="dark">
						<el-table-column header-align="center" prop="createDate" label="创建时间">
						</el-table-column>
						<el-table-column
							fixed="right"
							width="200"
							label="操作">
							<template slot-scope="scope">
								<!--:to="{path:'addPage', query:{projectId:projectId}}-->
								<!--<router-link :to="{path:'testPage', query:{documentId:documentId,testId:testData.apiTestHistId}}">-->
									<el-button size="small" @click="testRun(scope.row)">运行</el-button>
								<!--</router-link>-->

								<el-button type="danger" size="mini" @click="testDel(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="con_list">
				<div class="l_title">
					<span>接口备注</span>
				</div>
				<div class="formList">
					<el-form >
						<div class="flx" >
							<el-input
								type="textarea"
								placeholder="请输入内容"
								v-model="checkData.documentDesc">
							</el-input>
						</div>
					</el-form>
				</div>
			</div>
		</div>
		<el-dialog title="新增Mock数据" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form >
				<div class="flx">
					<el-form-item label="响应数据类型(MIME)" label-width="160px"  style="width: 100%">
						<el-radio v-model="addRes.mimeType" label="JSON">JSON</el-radio>
						<el-radio v-model="addRes.mimeType" label="XML">XML</el-radio>
						<el-radio v-model="addRes.mimeType" label="HTML">HTML</el-radio>
						<el-radio v-model="addRes.mimeType" label="TEXT">TEXT</el-radio>
						<el-radio v-model="addRes.mimeType" label="JSONP">JSONP</el-radio>
					</el-form-item>
				</div>

			</el-form>
			<el-form >
				<div class="flx">
					<el-form-item   style="width: 100%">
						<el-input   type="textarea" v-model="addRes.mimedes" auto-complete="off"  ></el-input>
					</el-form-item>
				</div>

			</el-form>


			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureAdd()">保存</el-button>
			</div>
		</el-dialog>
		<el-dialog title="Mock运行结果" :visible.sync="dialogRunFormVisible" class="elDialog">
			<el-form >
				<div class="flx" >
					<el-input
					type="textarea"
					placeholder="请输入内容"
					v-model="runResult">
				</el-input></div>

			</el-form>
		</el-dialog>
		<el-dialog title="修改Mock数据" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editRes" >
				<div class="flx">
					<el-form-item label="响应数据类型(MIME)" label-width="160px"  style="width: 100%">
						<el-radio v-model="editRes.respType" label="JSON">JSON</el-radio>
						<el-radio v-model="editRes.respType" label="XML">XML</el-radio>
						<el-radio v-model="editRes.respType" label="HTML">HTML</el-radio>
						<el-radio v-model="editRes.respType" label="TEXT">TEXT</el-radio>
						<el-radio v-model="editRes.respType" label="JSONP">JSONP</el-radio>
					</el-form-item>
				</div>

			</el-form>
			<el-form >
				<div class="flx">
					<el-form-item   style="width: 100%">
						<el-input   type="textarea" v-model="editRes.respExample" auto-complete="off"  ></el-input>
					</el-form-item>
				</div>

			</el-form>


			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureMockEdit()">保存</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				science:"线上环境",
				formLabelWidth:"140px",
				sceOptions:[
					{label:"线上环境",value:"线上环境"},
					{label:"预发布环境",value:"预发布环境"},
					{label:"测试环境",value:"测试环境"},

				],
				mimeType:"JSON",
				mockData:[
					{
					  type:"MIME"
					}
				],
				testHistory:[
					{
						date:"2018/8/22 12:57"
					}
				],
				dialogFormVisible:false,
				documentId:"",
				projectId:"",
				checkData:{},
				respExample:"false",
				responseDatatype:[],
				addRes:{
					mimeType:"",
					mimedes:""
				},
				dialogRunFormVisible:false,
				runResult:"",
				dialogEditFormVisible:false,
				editRes:{},
				dataType:{},
				fieldData:[],
				testData:[],
				testId:"",
				dlmConvertTypeList:[],
				ulmConvertTypeList:[],
				convertTypeList:[],
				documentTypeList:[],
				documentDataTypeList:[],
				documentCycleTypeList:[],
		};
		},
		created(){
			this.documentId=this.$route.query.documentId;
			this.projectName=this.$route.query.projectName;
			this.projectId=this.$route.query.projectId;
			console.log(this.$route.query.documentId)
		},
		mounted(){
			this.$util.dictory.getItemsByDicKey("dlm_convert_type","dlmConvertTypeList",this);
			this.$util.dictory.getItemsByDicKey("ulm_convert_type","ulmConvertTypeList",this);
			this.$util.dictory.getItemsByDicKey("convert_type","convertTypeList",this);
			this.$util.dictory.getItemsByDicKey("document_type","documentTypeList",this);
			this.$util.dictory.getItemsByDicKey("document_data_type","documentDataTypeList",this);
			this.$util.dictory.getItemsByDicKey("document_cycle_type","documentCycleTypeList",this);
			this.getData()
			this.getMock()
			this.getTest()

		},
		methods: {
			getData(){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/document/info/${this.documentId}`)
					.then((response) => {
						if(response.data.code == 0){
							this.checkData=response.data.data;
							console.log("111")
							console.log(this.checkData)
							this.getDataType(this.checkData.responseDatatypeId)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getMock(){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/mock/list/${this.documentId}`)
					.then((response) => {
						if(response.data.code == 0){
						    console.log(response)
							this.mockData=response.data.data
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			/*获取数据类型*/
			getDataType(typeID){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/info/${typeID}`)
					.then((response) => {
						if(response.data.code == 0){
							console.log(response)
							this.dataType=response.data.data
							this.getdataField(response.data.data.datatypeId)
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			/*获取数据类型字段*/
			getdataField(typeID){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/filed/list/${typeID}`)
					.then((response) => {
						if(response.data.code == 0){
							console.log(response)
							/*this.dataType=response.data.data.datatypeName*/
                             this.fieldData=response.data.data

						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			/*获取text*/
			getTest(){
				this.$http.post(`${process.env.NODE_ENV}/admin/fc/project/test/list/${this.documentId}`)
					.then((response) => {
						if(response.data.code == 0){
						    this.testData=response.data.data
							this.testId=this.testData.apiTestHistId
							console.log(response)

						}
					})
					.catch(function(error) {
						console.log(error);
					});


			},

			 /*test  运行*/
			testRun(row){
				this.$router.push({
					path:"testPage",
					query:{
						documentId:this.documentId,
						testId:row.apiTestHistId
					},
				})


			},

			/*test  删除*/
			testDel(row){

				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/test/delete/${row.apiTestHistId}`)
						.then((response)=> {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.getTest();
							}else if(response.data.code == 1){
								self.$message({
									type: 'error',
									message: response.data.msg
								});
							}

						})
						.catch(function(error) {
							console.log(error);
						});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});



			},

			/*mock新增确定*/
			sureAdd(){
			    let  self=this;
				let   queryParam={
				  "code": 0,
				  "data": {
					  documentId:this.checkData.documentId,
					  respType:this.addRes.mimeType,
					  respExample:this.addRes.mimedes,
				  },
				  "msg": ""
			  }
				self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/mock/save/`,queryParam)
					.then((response) => {
				    console.log(response)
						if(response.data.code == 0){
							self.success("mock数据添加成功！");
							self.getMock();
							self.mockData = {};
							self.dialogFormVisible = false;
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			/*mock运行*/
			mockRun(row){
                let  self=this;
				self.dialogRunFormVisible = true;
				self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/mock/run/${row.mockUuid}`)
					.then((response) => {
						console.log(response)
						if(response.data.code == 0){
                           self.runResult=response.data.msg
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			/*mock编辑*/
			mockEdit(row){
			    let  self=this
				self.dialogEditFormVisible=true;
				self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/mock/info/${row.mockId}`)
					.then((response) => {
						console.log(response)
						if(response.data.code == 0){
						    self.editRes=response.data.data
							console.log(self.editRes)
							/*self.runResult=response.data.msg*/
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			mockDel(row){
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/mock/delete/${row.mockId}`)
						.then((response) => {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.getMock();
							}
						})
						.catch(function(error) {
							console.log(error);
						});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			sureMockEdit(){
				let  self=this;
				let   queryParam={
					"code": 0,
					"data": self.editRes,
					"msg": ""
				}
				self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/mock/update/`,queryParam)
					.then((response) => {
						console.log(response)
						if(response.data.code == 0){
                                 console.log("修改")
							console.log(response)
							self.success("修改mock数据成功！");
							self.getMock();
							self.editRes = {};
							self.dialogEditFormVisible = false;
						}
					})
					.catch(function(error) {
						console.log(error);
					})

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
			checkData(newV,oldV){
				newV.requestHeaders=JSON.parse( newV.requestHeaders)
				newV.queryParams=JSON.parse( newV.queryParams)
			/*	$('#result').html(this.syntaxHighlight(newV.successRespExample));
				$('#result').html(this.syntaxHighlight(newV.failRespExample));*/

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


	.el-radio+.el-radio {
		margin-left: 23px !important;
	}

</style>
