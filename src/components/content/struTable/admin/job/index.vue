<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" size="small" @click="showCreateDialogForm" v-show="buttonPermission.add">添加</el-button>
           <!-- <el-button type="primary" size="small" @click="checkClick">查看</el-button>-->
            <el-button type="primary" size="small" @click="handleClick" v-show="buttonPermission.edit">编辑</el-button>
            <el-button type="primary"size="small"  @click="delClick" v-show="buttonPermission.delete">删除</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
					<el-table-column header-align="center" prop="sysjobCode" label="编码">
					</el-table-column>
					<el-table-column header-align="center" prop="sysjobName" label="名称">
					</el-table-column>
					<el-table-column header-align="center" prop="springname" label="业务对象名称">
					</el-table-column>
					<el-table-column header-align="center" prop="sysjobDesc" label="备注">
					</el-table-column>
					<!-- <el-table-column
						fixed="right"
						label="操作"
						width="230"
					>
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="checkClick(scope.row)">查看</el-button>
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="mini" @click="delClick(scope.row)">删除</el-button>

						</template>
					</el-table-column> -->
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="addFrom" ref="ruleForm" :rules="rules">
				<div class="flx flx_a">
					<el-form-item label="编码" :label-width="formLabelWidth" prop="code">
						<el-input v-model="addFrom.code" auto-complete="off" size="mini" ></el-input>
					</el-form-item>
					<el-form-item label="名称" :label-width="formLabelWidth" prop="name">
						<el-input v-model="addFrom.name" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx  flx_a">
					<el-form-item label="业务对象名称":label-width="formLabelWidth"  prop="busName">
						<el-input v-model="addFrom.busName" auto-complete="off" size="mini"></el-input>
					</el-form-item>

				</div>
				<div class="flx flx_a">
					<el-form-item label="备注" class="textArea" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="addFrom.des"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="sureAdd('ruleForm')" size="mini">新 增</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
		<el-form :model="editFrom" ref="ruleEditForm" :rules="rules">
			<div class="flx flx_a">
				<el-form-item label="编码" :label-width="formLabelWidth">
					<el-input v-model="editFrom.sysjobCode" auto-complete="off" size="mini"   :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="名称" :label-width="formLabelWidth" prop="sysjobName">
					<el-input v-model="editFrom.sysjobName" auto-complete="off" size="mini"></el-input>
				</el-form-item>
			</div>
			<div class="flx flx_a">
				<el-form-item label="业务对象名称" :label-width="formLabelWidth" prop="springname">
					<el-input v-model="editFrom.springname" auto-complete="off" size="mini"></el-input>
				</el-form-item>
			</div>
			<div class="flx flx_a">
				<el-form-item label="备注" class="textArea" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="editFrom.sysjobDesc"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogEditFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="sureEdit('ruleEditForm')">保存</el-button>
		</div>
	</el-dialog>
		<el-dialog title="查看" :visible.sync="dialogcheckFormVisible" class="elDialog">
			<el-form :model="checkFrom"  >
				<div class="flx flx_a">
					<el-form-item label="编码" :label-width="formLabelWidth" prop="sysjobCode" >
						<el-input :disabled="true" v-model="checkFrom.sysjobCode" auto-complete="off" size="mini" ></el-input>
					</el-form-item>
	</div>
				<div class="flx flx_a">
					<el-form-item label="名称" :label-width="formLabelWidth" prop="name" >
						<el-input v-model="checkFrom.sysjobName" auto-complete="off" size="mini" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item  label="业务对象名称" label-width="110px" prop="busName"  >
						<el-input  v-model="checkFrom.springname" auto-complete="off" size="mini" :disabled="true"></el-input>
					</el-form-item>

				</div>
				<div class="flx flx_a">
					<el-form-item label="备注" class="textArea" prop="des">
						<el-input :disabled="true" type="textarea" v-model="checkFrom.sysjobDesc"></el-input>
					</el-form-item>
				</div>
			</el-form>
		</el-dialog>
	</div>


</template>

<script>
	export default {
		name: "basics-m-tab3",

		data(){
			return{
				buttonPermission:JSON.parse(sessionStorage.buttonPermission),
				timeRange:"",
				userName:"",
				tableData: [
					/*{
						code: "011",
						name: '保全对账',
						busName: 'asasdegsrtfgdftgetrgxdfdrtgdrtgt',
						des:'保全对账'

					},*/
				],
				currentPage:1,
				pageSize:10,
				total:0,
				dialogFormVisible: false,
				dialogEditFormVisible:false,
				dialogcheckFormVisible:false,
				addFrom:{
					code:"",
					name:"",
					busName:"",
					des:"",

				},
				editFrom:{},
				checkFrom:{},
				formLabelWidth: '120px',
				pageSizesObjectList:[],
                pageSizes:[5,10,50,100],
                // 存放select选择数据
                selectData: [],
				rules:{
					code:[
						{required:true,message:"编码不能为空",trigger:"blur"}
					],
					name:[
						{required:true,message:"名称不能为空",trigger:"blur"}
					],
					busName:[
						{required:true,message:"业务对象名称不能为空",trigger:"blur"}
					],
					sysjobName:[
						{required:true,message:"名称不能为空",trigger:"blur"}
					],
					springname:[
						{required:true,message:"业务对象名称不能为空",trigger:"blur"}
					],
					sysjobCode:[
						{required:true,message:"编码不能为空",trigger:"blur"}
					]


				}
			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			this.getPageData();
		},
		methods:{
            // select选择框
            handleSelectionChange(val) {
                this.selectData = val;
                console.log(val);
            },
			getPageData() {
				var queryParam = {
					"code":"0",
					"msg":"",
					"data":{
						"page":this.currentPage,
						"limit":this.pageSize,
						"filter_parameters":{
							"sysjobName":"",
							"springname":""

						}
					}
				}
				this.$http.post(`${process.env.NODE_ENV}/admin/job/list`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							console.log(response)
							this.total = response.data.data.total;
							this.pageSize = response.data.data.size;
							this.tableData = response.data.data.records;
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},
			/*新增*/
			showCreateDialogForm(){
			    this.dialogFormVisible=true
			},
			sureAdd(formName){
				let self = this;
				self.$refs[formName].validate((valid) => {
					if(valid){
						let queryParam = {
							"code":"0",
							"msg":"",
							"data":{
								"createDate": "",
								"creater": "",
								"delFlag": "1",
								"editDate": "",
								"editer": "",
								"springname":self.addFrom.busName,
								"sysjobCode":self.addFrom.code,
								"sysjobDesc":self.addFrom.des,
								"sysjobName":self.addFrom.name
							}
						};

						self.$http.post(`${process.env.NODE_ENV}/admin/job/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加成功！");
									//self.searchForPage();
									self.addFrom={}
									self.dialogFormVisible = false;
								}
								self.getPageData()

							})
							.catch(function(error) {
								console.log(error);
							});
					}else{
						console.log('error submit!!');
						return false;
					}
				})
			},
			/*删除*/
			delClick(row){
				let self = this;
				if (self.selectData.length == 0) {
					return self.notice("请选中数据进行操作");
				}
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/job/delete/${self.selectData[0].sysjobId}`)
						.then((response) => {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.getPageData();
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
			/*编辑*/
			handleClick(){
                let self=this;
                // 修改时判断只能选中一条数据
               /* if (self.selectData.length !== 1) {
                    return self.notice("只能选中一条数据进行操作");
                }*/
				self.dialogEditFormVisible=true;
				/*self.editFrom.id=row.sysjobId;
				self.editFrom.busName = row.springname;
				self.editFrom.code = row.sysjobCode;
				self.editFrom.des = row.sysjobDesc;
				self.editFrom.name=row.sysjobName;*/

				this.$http.get(`${process.env.NODE_ENV}/admin/job/info/${self.selectData[0].sysjobId}`)
					.then((response) => {
						if(response.data.code == 0) {
							console.log("编辑")
							console.log(response)
							self.editFrom = response.data.data;
						}

					})
					.catch(function(error) {
						console.log(error);
					});



			},
			sureEdit(formName){
				let self = this;
				console.log("编辑")
				console.log(self.editFrom)
				self.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:"0",
							msg:"",
							data:{
								"sysjobId":self.editFrom.sysjobId,
								"createDate": "",
								"creater": "",
								"delFlag": "",
								"editDate": "",
								"editer": "",
								"springname": self.editFrom.springname,
								"sysjobCode":self.editFrom.sysjobCode,
								"sysjobDesc": self.editFrom.sysjobDesc,
								"sysjobName": self.editFrom.sysjobName
							}

						};
						self.$http.post(`${process.env.NODE_ENV}/admin/job/update`,queryParam)
							.then((response) => {
								console.log(response)
								if(response.data.code == 0){
									self.success("修改成功！");
									self.getPageData();
									self.editFrom={};
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
			/*查看*/
			checkClick(){
                let self=this;
                // 修改时判断只能选中一条数据
                if (self.selectData.length !== 1) {
                    return self.notice("只能选中一条数据进行操作");
                }
				self.dialogcheckFormVisible=true;
				this.$http.get(`${process.env.NODE_ENV}/admin/job/info/${self.selectData[0].sysjobId}`)
					.then((response) => {
						if(response.data.code == 0) {
							console.log("编辑")
							console.log(response)
							self.checkFrom = response.data.data;
						}

					})
					.catch(function(error) {
						console.log(error);
					});




			},


			handleSizeChange(val){
				this.pageSize = val;
				this.getPageData();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.getPageData();
			},

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
	}
</script>

<style scoped>
	.btnBox{
		width:100%;
		height:20%;
	}
	.tableBox{
		width:100%;
		height:80%;
	}
	.el-table,.block{
		margin-top: 10px;
	}
	.el-table,
	.block {
		margin-top: 10px;
	}

</style>
<style lang="less">
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
		// 树样式
		.tree {
			padding: 0 32px;
			.treeLab {
				font-weight: 500;
				width: 100px;
				font-size: 14px;
				color: #606266;
				line-height: 40px;
			}
			.el-tree {
				max-height: 200px;
				overflow: auto;
				border: 1px solid #ddd;
			}
		}
	}


	.flx_a .el-form-item {
		margin-bottom: 22px !important;
	}

</style>
