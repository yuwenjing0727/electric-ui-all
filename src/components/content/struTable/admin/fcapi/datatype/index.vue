<template>
	<div id="all">
		<div class="btnBox">
            <el-select v-model="bizId" placeholder="请选择业务线" clearable>
                <el-option 
                    v-for="keyValueItem in keyValueItemList" 
                    :key="keyValueItem.ID" 
                    :label="keyValueItem.NAME" 
                    :value="keyValueItem.ID">
                </el-option>
            </el-select>
			<el-input placeholder="数据类型名称" style="width:200px;" v-model="dataTypeName"></el-input>
			<el-button type="primary" @click="searchForPage">查询</el-button>
			<el-button type="primary" @click="showCreateDialogForm">添加</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column header-align="center" prop="datatypeName" label="数据类型名称">
					</el-table-column>
					<el-table-column header-align="center" prop="datatypeDesc" label="数据类型简介">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="240">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" type="success" size="mini">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                            <el-button type="primary" size="mini" @click="details(scope.row)">详情页</el-button>
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
	</div>


</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
                dataTypeName:"",
                bizId: "",
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
                // 详情显示
                dialogDetailsVisible: false,
				// 新增数据
				form: {
					datatypeName:"",
					bizId:"",
                    datatypeDesc:"",
                    add: []
                },
				// 修改数据
				editForm: {
					datatypeName:"",
					bizId:"",
                    datatypeDesc:"",
                    add: []
				},
				formLabelWidth: '100px',
                keyValueItemList: [],
                keyValueItemList1: [],
                options: [
                    {
                        value: '0',
                        label: '默认'
                    },{
                        value: '1',
                        label: '数组'
                    }
                ]
			}
		},
		mounted() {
			this.getPageData();
        },
        created() {
            let self = this;
            self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/addbefore`)
                .then((response) => {
                    console.log(response.data.data.listBiz);
                    self.keyValueItemList = response.data.data.listBiz;
                })
                .catch(function(error) {
                    console.log(error);
                });
            // 分页pagesize
            this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
        },
		methods: {
            // 添加
			showCreateDialogForm(){
				let self = this;
                self.$router.push({path: "datatypeAdd"});
			},
            // 详情
            details(row) {
                let self = this;
                self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/filed/info/${row.datatypeId}`)
                    .then((response) => {
                        let data = response.data.data;
                        console.log(data);
                        this.$router.push({path: "datatypeDetails", query: data});
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                
            },
            // 删除
			del(s) {
                let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/filed/delete/${s.datatypeId}`)
						.then((response) => {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.searchForPage();
							} else {
                                self.notice(response.data.msg);
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
            // 编辑
			edit(row) {
                let self = this;
                self.$http.get(`${process.env.NODE_ENV}/admin/fc/datatype/filed/info/${row.datatypeId}`)
                    .then((response) => {
                        if(response.data.code == 0){
                            console.log(response.data.data);
                            let data = response.data.data;
                            self.$router.push({path: "datatypeEdit", query: data});
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
            // 查询
			searchForPage(){
				this.currentPage = 1;
				this.getPageData();
			},
			getPageData() {
				var queryParam = {
                    code: "",
                    msg: "",
                    data: {
                        page: this.currentPage,
                        limit: this.pageSize,
                        filter_parameters: {
                            dataTypeName: this.dataTypeName,
                            bizId: this.bizId
                        }
                    }
                }
				this.$http.post(`${process.env.NODE_ENV}/admin/fc/datatype/filed/list`,queryParam)
					.then((response) => {
						this.total = response.data.data.total;
						this.pageSize = response.data.data.size;
						this.tableData = response.data.data.records;
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
