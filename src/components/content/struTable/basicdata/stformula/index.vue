<template>
	<div id="all">
		<div class="btnBox">
			<el-select v-model="type1" clearable placeholder="请选择市场成员类型" style="width:160px;">
                <el-option label="临时员工" value="1"></el-option>
                <el-option label="正式员工" value="2"></el-option>
            </el-select>
            <el-select v-model="type2" clearable placeholder="请选择公式类型" style="width:160px;">
                <el-option label="临时员工" value="1"></el-option>
                <el-option label="正式员工" value="2"></el-option>
            </el-select>
			<el-button type="primary" @click="searchForPage">查询</el-button>
			<el-button type="primary" @click="showCreateDialogForm">添加</el-button>
            <el-button type="primary">关联结算主体</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column type="index" label="序号">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitId" label="公式编号">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitType" label="公式名称">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitCode" label="公式描述">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitName" label="公式类型">
					</el-table-column>
					<el-table-column header-align="center" prop="effectDate" label="公式定义">
					</el-table-column>
					<el-table-column header-align="center" prop="invalidDate" label="市场成员类型">
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
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="公式编号" :label-width="formLabelWidth">
						<el-input v-model="form.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="公式名称" :label-width="formLabelWidth">
						<el-input v-model="form.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
                    <el-form-item label="公式描述" class="textArea">
						<el-input type="textarea" v-model="form.region"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="公式类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="市场成员类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
                    <el-form-item label="公式定义" class="textArea">
						<el-input type="textarea" v-model="form.region"></el-input>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRole">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="公式编号" :label-width="formLabelWidth">
						<el-input v-model="form.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="公式名称" :label-width="formLabelWidth">
						<el-input v-model="form.roleCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
                    <el-form-item label="公式描述" class="textArea">
						<el-input type="textarea" v-model="form.region"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="公式类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
                    <el-form-item label="市场成员类型" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择类型">
							<el-option label="类型一" value="shanghai"></el-option>
							<el-option label="类型二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
                    <el-form-item label="公式定义" class="textArea">
						<el-input type="textarea" v-model="form.region"></el-input>
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
                type1: "",
                type2: "",
				// 表格数据
				tableData: [
					{
						settlementUnitId:"",
						settlementUnitType:"发电机组",
						settlementUnitCode:"JSF00001",
						settlementUnitName:"1#机组",
						effectDate:"2017/5/1",
						invalidDate:"",
						marketMemberId:"大唐国际发电股份有限公司张家口发电厂",
						installedCapacity:"30MKV",
						generationType:"火电",
						crewType:"火电",
						settlementUnitStatus:"正常"
					},
					{
						settlementUnitId:"",
						settlementUnitType:"发电机组",
						settlementUnitCode:"JSF00001",
						settlementUnitName:"1#机组",
						effectDate:"2017/5/1",
						invalidDate:"",
						marketMemberId:"大唐国际发电股份有限公司张家口发电厂",
						installedCapacity:"30MKV",
						generationType:"火电",
						crewType:"火电",
						settlementUnitStatus:"正常"
					},
					{
						settlementUnitId:"",
						settlementUnitType:"发电机组",
						settlementUnitCode:"JSF00001",
						settlementUnitName:"1#机组",
						effectDate:"2017/5/1",
						invalidDate:"",
						marketMemberId:"大唐国际发电股份有限公司张家口发电厂",
						installedCapacity:"30MKV",
						generationType:"火电",
						crewType:"火电",
						settlementUnitStatus:"正常"
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
