<template>
	<div id="all">
		<div class="btnBox">
            <el-select v-model="roleName" placeholder="请选择业务线" clearable>
                <el-option 
                    v-for="keyValueItem in keyValueItemList" 
                    :key="keyValueItem.paraCode" 
                    :label="keyValueItem.paraKey" 
                    :value="keyValueItem.paraCode">
                </el-option>
            </el-select>
			<el-input placeholder="数据类型名称" style="width:200px;" v-model="roleName"></el-input>
			<el-button type="primary" @click="searchForPage">查询</el-button>
			<el-button type="primary" @click="showCreateDialogForm">添加</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column header-align="center" prop="roleCode" label="数据类型名称">
					</el-table-column>
					<el-table-column header-align="center" prop="roleName" label="数据类型简介">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="240">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="mini">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                            <el-button type="primary" size="mini" @click="details()">详情页</el-button>
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
                <label>基础信息</label>
				<div class="flx">
					<el-form-item label="名称" :label-width="formLabelWidth">
						<el-input v-model="form.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="业务线" :label-width="formLabelWidth">
                        <el-select v-model="form.roleCode" placeholder="请选择业务线" clearable>
                            <el-option 
                                v-for="keyValueItem in keyValueItemList" 
                                :key="keyValueItem.paraCode" 
                                :label="keyValueItem.paraKey" 
                                :value="keyValueItem.paraCode">
                            </el-option>
                        </el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="描述" class="textArea">
						<el-input type="textarea" v-model="form.roleDesc"></el-input>
					</el-form-item>
				</div>
                <label>字段列表</label>
                <el-button type="text" icon="el-icon-circle-plus" @click="addField"></el-button>
                <!-- 动态添加 -->
                <div class="border" v-for="(item, index) in form.add" :key="index">
                    <div class="field ">
                        <el-form-item label="字段名称" :label-width="formLabelWidth">
                            <el-input v-model="item.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="业务线" :label-width="formLabelWidth">
                            <el-select v-model="item.code" placeholder="请选择" clearable>
                                <el-option 
                                    v-for="keyValueItem in keyValueItemList" 
                                    :key="keyValueItem.paraCode" 
                                    :label="keyValueItem.paraKey" 
                                    :value="keyValueItem.paraCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业务线" :label-width="formLabelWidth">
                            <el-select v-model="item.code" placeholder="请选择" clearable>
                                <el-option 
                                    v-for="keyValueItem in keyValueItemList" 
                                    :key="keyValueItem.paraCode" 
                                    :label="keyValueItem.paraKey" 
                                    :value="keyValueItem.paraCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="field">
                        <el-form-item label="字段描述" class="textArea">
                            <el-input type="textarea" v-model="item.desc"></el-input>
                        </el-form-item>
                        <el-button type="text" icon="el-icon-circle-close" @click="delField(index)"></el-button>
                    </div>
                </div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRole">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm">
                <label>基础信息</label>
				<div class="flx">
					<el-form-item label="名称" :label-width="formLabelWidth">
						<el-input v-model="editForm.roleName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="业务线" :label-width="formLabelWidth">
                        <el-select v-model="editForm.roleCode" placeholder="请选择业务线" clearable>
                            <el-option 
                                v-for="keyValueItem in keyValueItemList" 
                                :key="keyValueItem.paraCode" 
                                :label="keyValueItem.paraKey" 
                                :value="keyValueItem.paraCode">
                            </el-option>
                        </el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="描述" class="textArea">
						<el-input type="textarea" v-model="editForm.roleDesc"></el-input>
					</el-form-item>
				</div>
                <label>字段列表</label>
                <!-- <el-button type="text" icon="el-icon-circle-plus" @click="addField"></el-button> -->
                <!-- 动态添加 -->
                <div class="border" v-for="(item, index) in editForm.add" :key="index">
                    <div class="field ">
                        <el-form-item label="字段名称" :label-width="formLabelWidth">
                            <el-input v-model="item.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="业务线" :label-width="formLabelWidth">
                            <el-select v-model="item.code" placeholder="请选择" clearable>
                                <el-option 
                                    v-for="keyValueItem in keyValueItemList" 
                                    :key="keyValueItem.paraCode" 
                                    :label="keyValueItem.paraKey" 
                                    :value="keyValueItem.paraCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业务线" :label-width="formLabelWidth">
                            <el-select v-model="item.code" placeholder="请选择" clearable>
                                <el-option 
                                    v-for="keyValueItem in keyValueItemList" 
                                    :key="keyValueItem.paraCode" 
                                    :label="keyValueItem.paraKey" 
                                    :value="keyValueItem.paraCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="field">
                        <el-form-item label="字段描述" class="textArea">
                            <el-input type="textarea" v-model="item.desc"></el-input>
                        </el-form-item>
                        <!-- <el-button type="text" icon="el-icon-circle-close" @click="delField(index)"></el-button> -->
                    </div>
                </div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editRole">修 改</el-button>
			</div>
		</el-dialog>

        <el-dialog title="详情" :visible.sync="dialogDetailsVisible" class="elDialog">
            <div class="details">
                <label class="top_border">基础信息</label>
                <div class="fex mag_top">
                    <div>
                        <label>名称：</label><span>test</span>
                    </div>
                    <div>
                        <label>业务线：</label><span>test</span>
                    </div>
                    
                </div>
                <div class="fex">
                    <div class="fex_width">
                        <label>描述：</label><span class="space">test22222222222222222233333333333333333333333322222222222222222222222</span>
                    </div>
                </div>
                <label class="top_border mag_top">字段列表</label>
                <div class="fex mag_top">
                    <div>
                        <label>名称：</label><span>test</span>
                    </div>
                    <div>
                        <label>业务线：</label><span>test</span>
                    </div>
                    
                </div>
                <div class="fex">
                    <div class="fex_width">
                        <label>描述：</label><span class="space">test22222222222222222233333333333333333333333322222222222222222222222</span>
                    </div>
                </div>
                <label class="top_border mag_top">数据结构</label>
                <div class="fex mag_top">
                    <div>
                        <label>test：</label><span>test</span>
                    </div>
                </div>
                <!-- <label class="top_border">数据结构-代码生成</label> -->

            </div>
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
				tableData: [{
                    roleCode: "123",
                    roleName: "qwe"
                }],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				// 弹窗显隐
				dialogFormVisible: false,
				// 修改弹窗显隐
				dialogEditFormVisible: false,
                // 详情显示
                dialogDetailsVisible: false,
				// 新增数据
				form: {
					roleName:"",
					roleCode:"",
                    roleDesc:"",
                    add: []
                },
				// 修改数据
				editForm: {
					roleId:"",
					roleName:"",
					roleCode:"",
					roleDesc:"",
					roleType:"",
                    roleSort:"",
                    add: []
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
                keyValueItemList: []
			}
		},
		mounted() {
			this.getPageData();
		},
		methods: {
            // 动态添加数据
            addField() {
                let self = this;
                self.form.add.push({
                    name: "",
                    code: "",
                    desc: ""
                })
            },
            // 删除动态添加的数据
            delField(index) {
                let self = this;
                self.form.add.splice(index, 1);
            },
            // 详情
            details() {
                this.dialogDetailsVisible = true;
                
            },
			del(s) {
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/role/delete/${s.roleId}`)
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
				self.$http.get(`${process.env.NODE_ENV}/electric-sysmanage-service/role/info/${row.roleId}`)
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
				this.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/role/list`,queryParam)
					.then((response) => {
						this.total = response.data.total;
						this.pageSize = response.data.size;
						// this.tableData = response.data.records;
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			showCreateDialogForm(){
				let self = this;
				self.dialogFormVisible = true;
				//获取菜单树
				self.$http.get(`${process.env.NODE_ENV}/electric-sysmanage-service/role/addbefore`)
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
				self.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/role/save`,queryParam)
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
				self.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/role/update`,queryParam)
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
            .details {
                .top_border {
                    
                    border-top: 2px solid #9dcdff;
                    border-radius: 2px;
                    width: 100%;
                }
                .mag_top {
                    margin-top: 20px;
                }
                .fex {
                    display: flex;
                    padding-right: 20px;
                    div {
                        width: 50%;
                        label {
                            padding-left: 20px;
                        }
                    }
                    .fex_width {
                        width: 100%;
                        display: flex;
                        .space {
                            width: 90%;
                            word-break: break-word;
                            display: inline-block;
                            white-space: pre-wrap;
                            overflow: hidden;
                        }
                    }
                }
            }
            .border {
                border: 1px solid #b0cffb;
                .field {
                    width: 97%;
                    display: flex;
                    .el-form-item {
                        width: 33%;
                        // padding-right: 30px;
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
                .el-button {
                    padding: 0 0 22px 0;
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
