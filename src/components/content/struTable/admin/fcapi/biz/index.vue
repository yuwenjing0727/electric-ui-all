<template>
	<div id="all">
		<div class="btnBox">
			<el-input placeholder="业务线名称" style="width:200px;" v-model="bizName"></el-input>
			<el-button type="primary" @click="searchForPage">查询</el-button>
			<el-button type="primary" @click="showCreateDialogForm">添加</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column header-align="center" prop="bizName" label="业务线名称">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="排序">
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
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
				    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="业务线名称" :label-width="formLabelWidth" :rules="{required: true}">
						<el-input v-model="form.bizName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="排序" :label-width="formLabelWidth" :rules="{required: true}">
						<el-input v-model="form.bizSort" auto-complete="off"></el-input>
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
					<el-form-item label="业务线名称" :label-width="formLabelWidth" :rules="{required: true}">
						<el-input v-model="editForm.bizName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="排序" :label-width="formLabelWidth" :rules="{required: true}">
						<el-input v-model="editForm.bizSort" auto-complete="off"></el-input>
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
				bizName:"",
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList: [],
				pageSizes: [5,10,50,100],
				// 弹窗显隐
				dialogFormVisible: false,
				// 修改弹窗显隐
				dialogEditFormVisible: false,

				// 新增数据
				form: {
					bizName:"",
					bizSort:""
				},
				// 修改数据
				editForm: {
					bizName:"",
                    bizSort:"",
                    bizId: ""
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
        created() {
             // 分页pagesize
            this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
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
					self.$http.post(`${process.env.NODE_ENV}/admin/fc/biz/delete/${s.bizId}`)
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
            // 点击编辑获取数据
			handleClick(row) {
				let self = this;
				self.dialogEditFormVisible = true;
				self.editForm.bizName = row.bizName;
                self.editForm.bizSort = row.bizSort;
                self.editForm.bizId = row.bizId;
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
                    code: 0,
                    data: {
                        page: this.currentPage,
                        limit: this.pageSize,
                        filter_parameters: {
                            bizName: this.bizName
                        }
                    },
                    msg: "string"
                }
				this.$http.post(`${process.env.NODE_ENV}/admin/fc/biz/list`,queryParam)
					.then((response) => {
						this.total = response.data.data.total;
						this.pageSize = response.data.data.size;
                        this.tableData = response.data.data.records;
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			showCreateDialogForm(){
				let self = this;
				self.dialogFormVisible = true;
			},
            // 添加
			addRole(){
				let self = this;
				let queryParam = {
                    data: {
                        bizName:self.form.bizName,
					    bizSort:self.form.bizSort
                    }
                };
				self.$http.post(`${process.env.NODE_ENV}/admin/fc/biz/save`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("添加角色成功！");
							self.searchForPage();
							self.form.bizName = "";
							self.form.bizSort = "";
							self.dialogFormVisible = false;
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},
            // 修改
			editRole(){
				let self = this;
				let queryParam = {
                    data: {
                        bizId: self.editForm.bizId,
                        bizName:self.editForm.bizName,
					    bizSort:self.editForm.bizSort
                    }
				};
				self.$http.post(`${process.env.NODE_ENV}/admin/fc/biz/update`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("修改角色成功！");
							self.searchForPage();
							self.dialogEditFormVisible = false;
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
