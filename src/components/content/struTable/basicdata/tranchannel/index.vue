<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<!--<el-button type="primary" size="small" @click="searchForPage">查询</el-button>-->
			<el-button type="primary" size="small" @click="addTrue">添加</el-button>
			<el-button type="primary" size="small" @click="editTrue">编辑</el-button>
			<el-button type="primary" size="small" @click="delTrue">删除</el-button>
			<el-button type="primary" size="small">导入</el-button>
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<!--<el-form-item label="通道编码" label-width="100px">
										<el-input placeholder="通道编码" style="width:200px;"  size="mini"  prefix-icon="el-icon-search" v-model="searchList.transChannelCode"></el-input>
									</el-form-item>-->
									<el-form-item label="通道名称" label-width="100px">
										<el-input placeholder="通道名称" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.transChannelName"></el-input>
									</el-form-item>
									<!--<el-form-item label="送端市场成员" label-width="100px">
										<el-input placeholder="送端市场成员" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.sendMemberName"></el-input>
									</el-form-item>-->
									<el-form-item label="送端市场成员" label-width="100px">
										<el-select v-model="searchList.sendMarketMemberId" placeholder="送端市场成员" size="mini" prefix-icon="el-icon-search">
											<el-option v-for="sendMarketMember in marketMemberList" :key="sendMarketMember.memberCode" :label="sendMarketMember.memberName" :value="sendMarketMember.memberCode"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="受端市场成员" label-width="100px">
										<el-select v-model="searchList.receiveMarketMemberId" placeholder="送端市场成员" size="mini" prefix-icon="el-icon-search">
											<el-option v-for="receiveMarketMember in marketMemberList" :key="receiveMarketMember.memberCode" :label="receiveMarketMember.memberName" :value="receiveMarketMember.memberCode"></el-option>
										</el-select>
										<!--<el-input placeholder="受端市场成员" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.receiveMemberName"></el-input>-->
									</el-form-item>
								</div>
								<div class="flx">

									<el-form-item label="通道状态" label-width="100px">
										<el-select v-model="searchList.transChannelStatus" placeholder="通道状态" size="mini" prefix-icon="el-icon-search">
											<el-option v-for="keyValueItem in keyValueItemList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="searchForPage" size="mini" >查询</el-button>
										<el-button type="primary" @click="reset()" size="mini" >重置</el-button>
									</el-form-item>
									<el-form-item>

									</el-form-item>
								</div>
							</el-form >
						</div>
					</div>
				</el-collapse-transition>
			</div>
		</div>

		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
					<el-table-column header-align="center" prop="transChannelCode" label="通道编码">
					</el-table-column>
					<el-table-column header-align="center" prop="transChannelName" label="通道名称">
					</el-table-column>
					<el-table-column header-align="center" prop="sendMemberName" label="送端市场成员">
					</el-table-column>
					<el-table-column header-align="center" prop="receiveMemberName" label="受端市场成员">
					</el-table-column>
                    <el-table-column header-align="center" prop="transChannelStatus" label="通道状态">
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
			<el-form :model="form" ref="ruleForm" :rules="rules">
				<div class="flx">
					<el-form-item label="通道编码" :label-width="formLabelWidth" prop="transChannelCode">
						<el-input v-model="form.transChannelCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="通道名称" :label-width="formLabelWidth" prop="transChannelName">
						<el-input v-model="form.transChannelName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="送端市场成员" :label-width="formLabelWidth">
						<el-select v-model="form.sendMarketMemberId" placeholder="送端市场成员">
							<el-option v-for="sendMarketMember in marketMemberList" :key="sendMarketMember.memberCode" :label="sendMarketMember.memberName" :value="sendMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="受端市场成员" :label-width="formLabelWidth">
						<el-select v-model="form.receiveMarketMemberId" placeholder="受端市场成员">
							<el-option v-for="receiveMarketMember in marketMemberList" :key="receiveMarketMember.memberCode" :label="receiveMarketMember.memberName" :value="receiveMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
                <div class="flx">
					<el-form-item label="通道状态" :label-width="formLabelWidth">
                        <el-select v-model="form.transChannelStatus" placeholder="请选择通道状态" clearable>
                            <el-option
                                v-for="keyValueItem in keyValueItemList"
                                :key="keyValueItem.paraCode"
                                :label="keyValueItem.paraKey"
                                :value="keyValueItem.paraCode">
                            </el-option>
                        </el-select>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add('ruleForm')">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm" ref="ruleEditForm" :rules="rules">
				<div class="flx">
					<el-form-item label="通道编码" :label-width="formLabelWidth" prop="transChannelCode">
						<el-input v-model="editForm.transChannelCode" auto-complete="off" readonly></el-input>
					</el-form-item>
					<el-form-item label="通道名称" :label-width="formLabelWidth" prop="transChannelName">
						<el-input v-model="editForm.transChannelName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="送端市场成员" :label-width="formLabelWidth">
						<el-select v-model="editForm.sendMarketMemberId" placeholder="送端市场成员">
							<el-option v-for="sendMarketMember in marketMemberList" :key="sendMarketMember.memberCode" :label="sendMarketMember.memberName" :value="sendMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="受端市场成员" :label-width="formLabelWidth">
						<el-select v-model="editForm.receiveMarketMemberId" placeholder="受端市场成员">
							<el-option v-for="receiveMarketMember in marketMemberList" :key="receiveMarketMember.memberCode" :label="receiveMarketMember.memberName" :value="receiveMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
                <div class="flx">
					<el-form-item label="通道状态" :label-width="formLabelWidth">
                        <el-select v-model="editForm.transChannelStatus" placeholder="请选择通道状态" clearable>
                            <el-option
                                v-for="keyValueItem in keyValueItemList"
                                :key="keyValueItem.paraCode"
                                :label="keyValueItem.paraKey"
                                :value="keyValueItem.paraCode">
                            </el-option>
                        </el-select>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit('ruleEditForm')">修 改</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				searchBoxFlag:false,
				searchList:{
					/*transChannelCode:"",*/
					transChannelName:"",
					sendMarketMemberId:"",
					receiveMarketMemberId:"",
					transChannelStatus:""
				},
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList:[],
                pageSizes:[5,10,50,100],
                // 存放select选择数据
                selectData: [],
                // 新增数据
				form: {
					transChannelCode: "",
					transChannelName: "",
                    sendMarketMemberId: "",
                    receiveMarketMemberId: "",
					transChannelStatus: ""
				},
				// 修改数据
				editForm: {},
                // 弹窗显隐
				dialogFormVisible: false,
				// 修改弹窗显隐
				dialogEditFormVisible: false,
                formLabelWidth: '100px',
                multipleSelection: "",
                keyValueItemList: [],
				marketMemberList:[],
				rules:{
					transChannelCode:[
						{ required: true, message: '通道编码不能为空', trigger: 'blur' }
					],
					transChannelName:[
						{ required: true, message: '通道名称不能为空', trigger: 'blur' },
						{ min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
					]
				}
			}
		},
		created(){
            let self = this;
            let key1 = "transchannel_status";
            self.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key1}`)
                .then((response) => {
                    self.keyValueItemList = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			this.getPageData();
			this.getMarketMemberList();
		},
		methods: {
			//获取市场成员List
			getMarketMemberList(){
				this.$http.get(`${process.env.NODE_ENV}/basicdata/marketmember/selectall`)
					.then((response) => {
						if(response.data.code == 0){
							this.marketMemberList = response.data.data;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
            // 添加
            addTrue() {
                this.dialogFormVisible = true;
				this.getMarketMemberList();
            },
            add(formName) {
                let self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						var queryParam = {
							code:"0",
							msg:"",
							data:self.form
						};

						self.$http.post(`${process.env.NODE_ENV}/basicdata/tranchannel/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加输电通道成功！");
									self.searchForPage();
									self.dialogFormVisible = false;
									self.form = {};
								} else {
									self.notice(response.data.msg);
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
            // 修改
            editTrue() {
				let self = this;
				// 修改时判断只能选中一条数据
				if (self.selectData.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				self.dialogEditFormVisible = true;
				this.getMarketMemberList();
				self.$util.dictory.getItemsByDicKey("transchannel_status","keyValueItemList",this);
				self.$http.get(`${process.env.NODE_ENV}/basicdata/tranchannel/info/${self.selectData[0].transChannelId}`)
					.then((response) => {
						if(response.data.code == 0){
							self.editForm = response.data.data;
						}

					})
					.catch(function(error) {
						console.log(error);
					});


            },
            edit(formName) {
                let self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							data: self.editForm
						};
						self.$http.post(`${process.env.NODE_ENV}/basicdata/tranchannel/update`,queryParam)
							.then((response) => {
								if(response.data.code == "0"){
									self.success("修改成功！");
									self.searchForPage();
									self.dialogEditFormVisible = false;
									self.editForm = {};
								} else {
									self.notice(response.data.msg);
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
            // 删除
            delTrue() {
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
						deleteIds.push(e.transChannelId);
					})
					console.log(deleteIds);
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							ids:deleteIds
						}
					}

					self.$http.post(`${process.env.NODE_ENV}/basicdata/tranchannel/deletes`,queryParam)
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
            // select选择框
            handleSelectionChange(val) {
                this.selectData = val;
                console.log(val);
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
				this.searchBoxFlag=false;
			},
			getPageData() {
				var queryParam = {
					code:"0",
					msg:"",
					data:{
						filter_parameters:this.searchList,
						page: this.currentPage,
						limit: this.pageSize
					}

				};
				this.$http.post(`${process.env.NODE_ENV}/basicdata/tranchannel/jsonlist`,queryParam)
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

			/*重置*/
			reset(){
				//searchList
				for(let key in this.searchList){
					this.searchList[key]  = ''
				}

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

<style scoped lang="less">
	.btnBox {
		width: 100%;
		height: 20%;
	}

	.tableBox {
		width: 100%;
		height: 80%;
	}
    .btnBoxTwo {
        margin-top: 10px;
    }
	.el-table,
	.block {
		margin-top: 10px;
	}
	.transition-box {
		margin-bottom: 10px;
		width: 100%;
		height: auto;
		border-radius: 4px;
		text-align: center;
		color: #fff;
		padding: 10px;
		box-sizing: border-box;
		margin-right: 20px;
		border: 1px  solid #e5e5e5;
	}
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
