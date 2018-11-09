<template>
	<div id="all">
		<div class="btnBox">
			<el-select v-model="busLine" clearable placeholder="请选择业务线">
				<el-option
					v-for="item in busOptions"
					:key="item.ID"
					:label="item.NAME"
					:value="item.ID">
				</el-option>
			</el-select>
			<el-input placeholder="项目名称" style="width:200px;" v-model="projectName"></el-input>
			<el-button type="primary" @click="searchForPage">搜索</el-button>
			<el-button type="primary" @click="dialogFormVisible=true">新增项目</el-button>

		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column header-align="center" prop="projectName" label="项目名称">
					</el-table-column>
					<el-table-column header-align="center" prop="projectDesc" label="项目描述">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="250">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
							<router-link :to="{path:'details', query:{projectId:scope.row.projectId,projectName:scope.row.projectName}}">
								<el-button type="primary" size="mini"  >进入项目</el-button>
							</router-link>

						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
							   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form"  :rules="rules" ref="ruleAddForm">
				<div class="flx">
					<el-form-item label="业务线" :label-width="formLabelWidth">
						<el-select v-model="form.bizId" clearable placeholder="请选择业务线">
							<el-option
								v-for="item in busOptions"
								:key="item.ID"
								:label="item.NAME"
								:value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="名称" :label-width="formLabelWidth" prop="projectName">
						<el-input v-model="form.projectName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="描述" class="textArea" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="form.projectDesc"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="根地址(线上)" label-width="110px" prop="baseUrlProd">
						<el-input v-model="form.baseUrlProd" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="根地址(预发布)" label-width="110px">
						<el-input v-model="form.baseUrlPpe" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="根地址(测试)" label-width="110px">
						<el-input v-model="form.baseUrlQa" auto-complete="off"></el-input>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureAdd('ruleAddForm')">保存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm"  :rules="rules" ref="ruleUpdateForm">
				<div class="flx">
					<el-form-item label="业务线" :label-width="formLabelWidth">
						<el-select v-model="editForm.bizId" clearable placeholder="请选择业务线">
							<el-option
								v-for="item in busOptions"
								:key="item.ID"
								:label="item.NAME"
								:value="item.ID">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="名称" :label-width="formLabelWidth" prop="projectName">
						<el-input v-model="editForm.projectName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="描述" class="textArea" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="editForm.projectDesc"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="根地址(线上)" label-width="110px" prop="baseUrlProd">
						<el-input v-model="editForm.baseUrlProd" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="根地址(预发布)" label-width="110px">
						<el-input v-model="editForm.baseUrlPpe" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="根地址(测试)" label-width="110px">
						<el-input v-model="editForm.baseUrlQa" auto-complete="off"></el-input>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureEdit('ruleUpdateForm')">修改</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList:[],
				pageSizes:[5, 10, 50,100],
				// 弹窗显隐
				dialogFormVisible: false,
				dialogEditFormVisible:false,
				// 新增数据
				form: {
					bizId:"",
					projectName:"",
					projectDesc:"",
					baseUrlProd:"",
					baseUrlPpe:"",
					baseUrlQa:"",
				},
				/*编辑数据*/
				editForm:{},
				formLabelWidth: "100px",
				busOptions:[],
				projectName:"",
				busLine:"",
				rules: {
					projectName: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					],
					baseUrlProd: [
						{ required: true, message: '请输入根地址(线上)', trigger: 'blur' }
					]
				}
			};
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			this.getBusOptions();
			this.getPageData();
		},
		methods: {

			/*新增界面 确定*/
			sureAdd(formName){
				let  self = this;
				self.$refs[formName].validate((valid) => {
				 if (valid) {
					 var queryParam = {
						 code:"0",
						 msg:"",
						 data:{
							 projectName:self.form.projectName,
							 projectDesc:self.form.projectDesc,
							 baseUrlProd:self.form.baseUrlProd,
							 baseUrlPpe:self.form.baseUrlPpe,
							 baseUrlQa:self.form.baseUrlQa,
							 baseUrlDev:"",
							 bizId:self.form.bizId
						 }

					 };
					 self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/save`,queryParam)
						 .then((response) => {
							 if(response.data.code == 0){
								 self.success("添加项目成功！");
								 self.searchForPage();
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

			//修改页面
			sureEdit(formName){
				let  self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:"0",
							msg:"",
							data:self.editForm
						}
						self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/update`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("修改项目成功！");
									self.searchForPage();
									self.editForm = {};
									self.dialogEditFormVisible = false;
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
			// 删除弹窗
			del(s) {
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/delete/${s.projectId}`)
						.then((response) => {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.searchForPage();
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

			handleClick(row) {
				this.dialogEditFormVisible=true
				console.log(row);
				let self = this;
				self.dialogEditFormVisible = true;
				self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/info/${row.projectId}`)
					.then((response) => {
						if(response.data.code == 0){
							self.editForm = response.data.data.project;
						}

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getPageData();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.getPageData();
			},
			searchForPage(){
				this.currentPage = 1;
				this.getPageData();
			},
			getPageData() {
				var queryParam = {
					code:"0",
					msg:"",
					data:{
						filter_parameters:{
							bizId:this.busLine,
							projectName:this.projectName
						},
						page: this.currentPage,
						limit: this.pageSize
					}

				};
				this.$http.post(`${process.env.NODE_ENV}/admin/fc/project/list`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							this.total = response.data.data.total;
							this.pageSize = response.data.data.size;
							this.tableData = response.data.data.records;
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			//获取业务线
			getBusOptions(){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/addbefore`)
					.then((response) => {
						if(response.data.code == 0){
							this.busOptions = response.data.data.listBiz;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}

		},
		watch:{
			pageSizesObjectList(newV,oldV){
				this.pageSizes = [];
				newV.forEach((e) => {
					this.pageSizes.push(parseInt(e.paraKey));
					this.pageSizes.sort(function (x,y) {
						return x-y;
					});

				})

			}
		}
	};
</script>

<style lang="less" scoped >
	.btnBox {
		width: 100%;
		height: 16%;
	}

	.tableBox {
		width: 100%;
		height: 84%;
	}

	.el-table,
	.block {
		margin-top: 10px;
	}
</style>
