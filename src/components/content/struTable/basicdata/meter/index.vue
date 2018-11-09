<template>
	<div id="all">
		<div class="btnBox">
			<el-input placeholder="表计类型" style="width:200px;" v-model="roleName"></el-input>
			<el-button type="primary" @click="searchForPage">查询</el-button>
			<el-button type="primary" @click="showCreateDialogForm">添加</el-button>
			<el-button type="primary">导入</el-button>
			<el-button type="primary">导出</el-button>
			<el-button type="primary">变更</el-button>
			<el-button type="primary">变更记录</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column header-align="center" prop="roleCode" label="计量点编码">
					</el-table-column>
					<el-table-column header-align="center" prop="roleName" label="计量点名称">
					</el-table-column>
					<el-table-column header-align="center" prop="roleType" label="表计类型">
					</el-table-column>
					<el-table-column header-align="center" prop="creater" label="计量点倍率">
					</el-table-column>
					<el-table-column header-align="center" prop="createDate" label="计量点生效时间">
					</el-table-column>
					<el-table-column header-align="center" prop="roleCode" label="计量点失效时间">
					</el-table-column>
					<el-table-column header-align="center" prop="roleName" label="口径类型">
					</el-table-column>
					<el-table-column header-align="center" prop="roleType" label="所属结算单元">
					</el-table-column>
					<el-table-column header-align="center" prop="creater" label="所属市场成员">
					</el-table-column>
					<el-table-column header-align="center" prop="createDate" label="所属联络线">
					</el-table-column>
					<el-table-column header-align="center" prop="createDate" label="状态">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]"
							   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="editForm">
				<div class="flx">
					<el-form-item label="计量点编号" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="表计类型" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="计量点名称" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="口径类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="计量点倍率" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属结算单元" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="生效时间" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属市场成员" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="失效时间" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属联络线" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRole">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm">
				<div class="flx">
					<el-form-item label="计量点编号" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="表计类型" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="计量点名称" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="口径类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="计量点倍率" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属结算单元" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="生效时间" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属市场成员" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="失效时间" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属联络线" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editRole">修 改</el-button>
			</div>
		</el-dialog>

	</div>


</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				roleName:"",
				// 表格数据
				tableData: [
					{
						roleCode:"111",
						roleName:"222",
						roleType:"333",
						creater:"444",
						createDate:"555"
					},
					{
						roleCode:"111",
						roleName:"222",
						roleType:"333",
						creater:"444",
						createDate:"555"
					},
					{
						roleCode:"111",
						roleName:"222",
						roleType:"333",
						creater:"444",
						createDate:"555"
					}
				],
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
				defaultCheckedKeys:[]
			}
		},
		mounted() {
			this.getPageData();
		},
		methods: {
			del(s) {
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.get(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/delete/${s.roleId}`)
						.then((response) => {
							if(response.data.data == true){
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
				self.dialogEditFormVisible = true;
				self.editForm.roleId = row.roleId;
				self.editForm.roleName = row.roleName;
				self.editForm.roleCode = row.roleName;
				self.editForm.roleDesc = row.roleDesc;
				self.editForm.roleType = row.roleType;
				self.editForm.roleSort = row.roleSort;
				self.$http.get(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/get/${row.roleId}`)
					.then((response) => {
						self.data3 = response.data.data.menuTree;
						self.defaultCheckedKeys = response.data.data.alreadCheck;
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
					roleName:this.roleName,
					page: this.currentPage,
					limit: this.pageSize
				}
				this.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/page`,queryParam)
					.then((response) => {
						this.total = response.data.total;
						this.pageSize = response.data.size;
						this.tableData = response.data.records;
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			showCreateDialogForm(){
				let self = this;
				self.dialogFormVisible = true;
				//获取菜单树
				self.$http.get(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/addBefore`)
					.then((response) => {
						console.log(response);
						self.data2 = response.data.data.menuTree;
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			addRole(){
				let self = this;
				let queryParam = {
					roleName:self.form.roleName,
					roleType:"1",
					roleSort:"2",
					roleCode:self.form.roleCode,
					roleDesc:self.form.roleDesc,
					menuIds:self.$refs.tree.getCheckedKeys().join(",")

				};
				self.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/add`,queryParam)
					.then((response) => {
						if(response.data.data == true){
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

			},

			editRole(){
				let self = this;
				console.log(self.editForm.roleId);
				let queryParam = {
					roleId:self.editForm.roleId,
					roleName:self.editForm.roleName,
					roleType:self.editForm.roleType,
					roleSort:self.editForm.roleSort,
					roleCode:self.editForm.roleCode,
					roleDesc:self.editForm.roleDesc,
					menuIds:self.$refs.editTree.getCheckedKeys().join(",")

				};
				self.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/edit`,queryParam)
					.then((response) => {
						if(response.data.data == true){
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
			}

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
