<template>
	<div id="all">
		<div class="btnBox">
			<label style="font-size: 14px;">角色名称</label>
			<el-input placeholder="角色名称" style="width:200px;" size="small" v-model="roleName"></el-input>
			<el-button type="primary" size="small" @click="searchForPage" v-show="buttonPermission.query">查询</el-button>
			<el-button type="primary" size="small" @click="showCreateDialogForm" v-show="buttonPermission.add">添加</el-button>
			<el-button type="primary" size="small" @click="handleClick" v-show="buttonPermission.edit">编辑</el-button>
			<el-button type="primary" size="small" @click="del" v-show="buttonPermission.delete">删除</el-button>
			<!--<el-button type="primary" size="small">分配用户</el-button>
			<el-button type="primary" size="small">取消分配</el-button>-->
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
					<el-table-column header-align="center" type="selection" width="55">
					</el-table-column>
					<el-table-column header-align="center" prop="roleCode" label="角色代码">
					</el-table-column>
					<el-table-column header-align="center" prop="roleName" label="角色名称">
					</el-table-column>
					<el-table-column header-align="center" prop="roleType" label="角色类型">
					</el-table-column>
					<el-table-column header-align="center" prop="creater" label="创建人">
					</el-table-column>
					<el-table-column header-align="center" prop="createDate" label="创建时间">
					</el-table-column>
					<!--<el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column>-->
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
				    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form" ref="ruleForm" :rules="rules">
				<div class="flx">
					<el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
						<el-input v-model="form.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="角色编码" :label-width="formLabelWidth">
						<el-input v-model="form.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="角色描述" class="textArea">
						<el-input type="textarea" v-model="form.roleDesc"></el-input>
					</el-form-item>
				</div>
				<div class="tree">
                    <label class="treeLab">权限选择</label>
					<el-tree class="el-tree-new" ref="tree" :data="data2" show-checkbox node-key="id" default-expand-all :props="defaultProps">
					</el-tree>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRole('ruleForm')">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm" ref="ruleEditForm" :rules="rules">
				<div class="flx">
					<el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="角色编码" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="角色描述" class="textArea">
						<el-input type="textarea" v-model="editForm.roleDesc"></el-input>
					</el-form-item>
				</div>
				<div class="tree">
					<label class="treeLab">权限选择</label>
					<el-tree class="el-tree-new" ref="editTree" :data="data3" show-checkbox node-key="id" default-expand-all :props="defaultEditProps" :default-checked-keys="defaultCheckedKeys">
					</el-tree>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editRole('ruleEditForm')">修 改</el-button>
			</div>
		</el-dialog>

	</div>


</template>

<script>
	import Bus from "@/eventBus.js";
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				/*buttonPermission:{
					"add": true,
					"delete": true,
					"edit": true,
					"info": true,
					"query": true
				},*/
				buttonPermission:JSON.parse(sessionStorage.buttonPermission),
				roleName:"",
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				// 弹窗显隐
				dialogFormVisible: false,
				// 修改弹窗显隐
				dialogEditFormVisible: false,

				// 新增数据
				form: {
					roleName:"",
					roleCode:"",
					roleDesc:""
				},
				// 修改数据
				editForm: {
					roleId:"",
					roleName:"",
					roleCode:"",
					roleDesc:"",
					roleType:"",
					roleSort:""
				},
				formLabelWidth: '100px',
				// 树
				data2: [],
				data3: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
				defaultEditProps: {
					children: 'children',
					label: 'name'
				},
				defaultCheckedKeys:[],
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				// 存放select选择数据
				selectData: [],
				rules:{
					roleName:[
						{ required: true, message: '角色名称不能为空!', trigger: 'blur' }
					]
				}
			}
		},
		created(){
			/*Bus.$on("buttonPermission",(s) => {
				this.$set(this,"buttonPermission",s)
				console.log("权限已传过来");
				console.log(this.buttonPermission);
			})*/
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			this.getPageData();
		},
		methods: {
			// select选择框
			handleSelectionChange(val) {
				this.selectData = val;
				console.log(val);
			},
			del() {
				let self = this;
				if (self.selectData.length == 0) {
					return self.notice("请选中数据进行操作");
				}
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var deleteIds = [];
					self.selectData.forEach((e) => {
						deleteIds.push(e.roleId);
					})
					console.log(deleteIds);
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							ids:deleteIds
						}
					}
					self.$http.post(`${process.env.NODE_ENV}/admin/role/deletes`,queryParam)
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
				let self = this;
				// 修改时判断只能选中一条数据
				if (self.selectData.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				self.dialogEditFormVisible = true;
								self.$http.get(`${process.env.NODE_ENV}/admin/role/info/${self.selectData[0].roleId}`)
					.then((response) => {
						if(response.data.code == 0){
							self.editForm = response.data.data.role;
							self.data3 = response.data.data.menuTree;
							self.defaultCheckedKeys = response.data.data.alreadCheck;
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
							roleName:this.roleName,
						},
						page: this.currentPage,
						limit: this.pageSize
					}

				};
				this.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/role/list`,queryParam)
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

			showCreateDialogForm(){
				let self = this;
				self.dialogFormVisible = true;
				//获取菜单树
				self.$http.get(`${process.env.NODE_ENV}/admin/role/save`)
					.then((response) => {
						console.log(response);
						if(response.data.code == 0){
							self.data2 = response.data.data;
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			addRole(formName){
				let self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:"0",
							msg:"",
							data:{
								roleName:self.form.roleName,
								roleType:"1",
								roleSort:"2",
								roleCode:self.form.roleCode,
								roleDesc:self.form.roleDesc,
								menuIds:self.$refs.tree.getCheckedKeys().join(",")
							}

						};
						self.$http.post(`${process.env.NODE_ENV}/admin/role/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加角色成功！");
									self.searchForPage();
									self.form.roleName = "";
									self.form.roleCode = "";
									self.form.roleDesc = "";
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

			editRole(formName){
				let self = this;
				console.log(self.editForm.roleId);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:"0",
							msg:"",
							data:{
								roleId:self.editForm.roleId,
								roleName:self.editForm.roleName,
								roleType:self.editForm.roleType,
								roleSort:self.editForm.roleSort,
								roleCode:self.editForm.roleCode,
								roleDesc:self.editForm.roleDesc,
								menuIds:self.$refs.editTree.getCheckedKeys().join(",")
							}

						};
						self.$http.post(`${process.env.NODE_ENV}/admin/role/update`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("修改角色成功！");
									self.searchForPage();
									self.editForm.roleId = "";
									self.editForm.roleName = "";
									self.editForm.roleCode = "";
									self.editForm.roleDesc = "";
									self.editForm.roleType = "";
									self.editForm.roleSort = "";
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

			},


		}
	}

</script>

<style scoped>
	.btnBox {
		width: 100%;
		height: 20%;
	}

	.tableBox {
		width: 100%;
		height: 80%;
	}

	.el-table,
	.block {
		margin-top: 10px;
	}

	.el-tree-new{
		width:100% !important;
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
					margin-bottom: 20px  !important;
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

</style>
