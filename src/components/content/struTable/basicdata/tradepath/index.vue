<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
            <!--<label style="font-size: 14px;">路径编码</label>
			<el-input placeholder="路径名称" style="width:200px;" size="small" v-model="tradePathCode"></el-input>
            <label style="font-size: 14px;margin-left: 10px;">路径名称</label>
			<el-input placeholder="路径名称" style="width:200px;" size="small" v-model="tradePathName"></el-input>-->
<!--			<el-button type="primary" size="small" @click="searchForPage">查询</el-button>-->
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
									<el-form-item label="路径编码" label-width="100px">
										<el-input placeholder="路径编码" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.tradePathCode"></el-input>
									</el-form-item>
									<el-form-item label="路径名称" label-width="100px">
										<el-input placeholder="路径名称" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.tradePathName"></el-input>
									</el-form-item>
									<el-form-item label="路径类型" label-width="100px">
										<el-select v-model="searchList.tradePathType" placeholder="请选择路径类型" size="mini" prefix-icon="el-icon-search">
											<el-option v-for="keyValueItem in keyValueItemList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>

								</div>
								<div class="flx">
									<el-form-item label="送端市场成员" label-width="100px">
										<el-select v-model="searchList.sendSmUnitId" placeholder="送端市场成员" size="mini" prefix-icon="el-icon-search">
											<el-option v-for="sendMarketMember in marketMemberList" :key="sendMarketMember.memberCode" :label="sendMarketMember.memberName" :value="sendMarketMember.memberCode"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="受端市场成员" label-width="100px">
										<el-select v-model="searchList.receiveSmUnitId" placeholder="送端市场成员" size="mini" prefix-icon="el-icon-search">
											<el-option v-for="receiveMarketMember in marketMemberList" :key="receiveMarketMember.memberCode" :label="receiveMarketMember.memberName" :value="receiveMarketMember.memberCode"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" @click="searchForPage" size="mini" >查询</el-button>
										<el-button type="primary" @click="reset()" size="mini" >重置</el-button>
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
					<el-table-column header-align="center" prop="tradePathCode" label="路径编码">
					</el-table-column>
					<el-table-column header-align="center" prop="tradePathName" label="路径名称">
					</el-table-column>
<!--					<el-table-column header-align="center" prop="sendSmUnitName" label="送端结算单元">
					</el-table-column>
					<el-table-column header-align="center" prop="transSmUnitName" label="输电结算单元">
					</el-table-column>
					<el-table-column header-align="center" prop="receiveSmUnitName" label="受端结算单元">
					</el-table-column>-->
					<el-table-column header-align="center" prop="tradePathType" label="路径类型">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="voltageLevel" label="电压等级">
					</el-table-column>
                    <el-table-column header-align="center" prop="capacityPrice" label="容量电价">
					</el-table-column>-->
					<el-table-column header-align="center" prop="sendMemberName" label="送端市场成员">
					</el-table-column>
					<el-table-column header-align="center" prop="receiveMemberName" label="受端市场成员">
					</el-table-column>
                    <el-table-column header-align="center" prop="tradePathPrice" label="输电价/元">
					</el-table-column>
                    <el-table-column header-align="center" prop="tradePathNetloss" label="网损/%">
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
			<el-form :model="form" :rules = "rules" ref="ruleForm">
				<div class="flx">
					<el-form-item label="路径编码" :label-width="formLabelWidth" prop="tradePathCode">
						<el-input v-model="form.tradePathCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="路径名称" :label-width="formLabelWidth" prop="tradePathName">
						<el-input v-model="form.tradePathName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<!--<div class="flx">
					<el-form-item label="送端结算单元" :label-width="formLabelWidth">
						<el-select v-model="form.sendSmUnitId" placeholder="送端结算单元">
							<el-option v-for="settlementUnit in settlementUnitList" :key="settlementUnit.settlementUnitId" :label="settlementUnit.settlementUnitName" :value="settlementUnit.settlementUnitId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="输电结算单元" :label-width="formLabelWidth">
						<el-select v-model="form.transSmUnitId" placeholder="输电结算单元">
							<el-option v-for="settlementUnit in settlementUnitList" :key="settlementUnit.settlementUnitId" :label="settlementUnit.settlementUnitName" :value="settlementUnit.settlementUnitId"></el-option>
						</el-select>
					</el-form-item>
				</div>-->
                <div class="flx">
					<!--<el-form-item label="受端结算单元" :label-width="formLabelWidth">
						<el-select v-model="form.receiveSmUnitId" placeholder="输电结算单元">
							<el-option v-for="settlementUnit in settlementUnitList" :key="settlementUnit.settlementUnitId" :label="settlementUnit.settlementUnitName" :value="settlementUnit.settlementUnitId"></el-option>
						</el-select>
					</el-form-item>-->

					<!--<el-form-item label="电压等级" :label-width="formLabelWidth">
						<el-select v-model="form.voltageLevel" placeholder="请选择电压等级">
							<el-option v-for="keyValueItem in voltageLevelList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item label="送端市场成员" :label-width="formLabelWidth">
						<el-select v-model="form.sendSmUnitId" placeholder="送端市场成员">
							<el-option v-for="sendMarketMember in marketMemberList" :key="sendMarketMember.memberCode" :label="sendMarketMember.memberName" :value="sendMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="受端市场成员" :label-width="formLabelWidth">
						<el-select v-model="form.receiveSmUnitId" placeholder="受端市场成员">
							<el-option v-for="receiveMarketMember in marketMemberList" :key="receiveMarketMember.memberCode" :label="receiveMarketMember.memberName" :value="receiveMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
                <div class="flx">
					<!--<el-form-item label="容量电价" :label-width="formLabelWidth" prop="capacityPrice">
						<el-input v-model.number="form.capacityPrice" auto-complete="off"></el-input>
					</el-form-item>-->
					<el-form-item label="路径类型" :label-width="formLabelWidth">
						<el-select v-model="form.tradePathType" placeholder="请选择路径类型">
							<el-option v-for="keyValueItem in keyValueItemList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="输电价/元" :label-width="formLabelWidth" prop="tradePathPrice">
						<el-input v-model.number="form.tradePathPrice" auto-complete="off"></el-input>
					</el-form-item>
				</div>
                <div class="flx">
					<el-form-item label="网损/%" :label-width="formLabelWidth" prop="tradePathNetloss">
						<el-input v-model.number="form.tradePathNetloss" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add('ruleForm')">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm" :rules="rules" ref="editRuleForm">
				<div class="flx">
					<el-form-item label="路径编码" :label-width="formLabelWidth" prop="tradePathCode">
						<el-input v-model="editForm.tradePathCode" auto-complete="off" readonly></el-input>
					</el-form-item>
					<el-form-item label="路径名称" :label-width="formLabelWidth" prop="tradePathName">
						<el-input v-model="editForm.tradePathName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<!--<div class="flx">
					<el-form-item label="送端结算单元" :label-width="formLabelWidth">
						<el-select v-model="editForm.sendSmUnitId" placeholder="送端结算单元">
							<el-option v-for="settlementUnit in settlementUnitList" :key="settlementUnit.settlementUnitId" :label="settlementUnit.settlementUnitName" :value="settlementUnit.settlementUnitId"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="输电结算单元" :label-width="formLabelWidth">
						<el-select v-model="editForm.transSmUnitId" placeholder="输电结算单元">
							<el-option v-for="settlementUnit in settlementUnitList" :key="settlementUnit.settlementUnitId" :label="settlementUnit.settlementUnitName" :value="settlementUnit.settlementUnitId"></el-option>
						</el-select>
					</el-form-item>
				</div>-->
                <div class="flx">
					<!--<el-form-item label="受端结算单元" :label-width="formLabelWidth">
						<el-select v-model="editForm.receiveSmUnitId" placeholder="输电结算单元">
							<el-option v-for="settlementUnit in settlementUnitList" :key="settlementUnit.settlementUnitId" :label="settlementUnit.settlementUnitName" :value="settlementUnit.settlementUnitId"></el-option>
						</el-select>
					</el-form-item>-->
					<!--<el-form-item label="电压等级" :label-width="formLabelWidth">
						<el-select v-model="editForm.voltageLevel" placeholder="请选择电压等级">
							<el-option v-for="keyValueItem in voltageLevelList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item label="送端市场成员" :label-width="formLabelWidth">
						<el-select v-model="editForm.sendSmUnitId" placeholder="送端市场成员">
							<el-option v-for="sendMarketMember in marketMemberList" :key="sendMarketMember.memberCode" :label="sendMarketMember.memberName" :value="sendMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="受端市场成员" :label-width="formLabelWidth">
						<el-select v-model="editForm.receiveSmUnitId" placeholder="受端市场成员">
							<el-option v-for="receiveMarketMember in marketMemberList" :key="receiveMarketMember.memberCode" :label="receiveMarketMember.memberName" :value="receiveMarketMember.memberCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
                <div class="flx">
					<!--<el-form-item label="容量电价" :label-width="formLabelWidth" prop="capacityPrice">
						<el-input v-model.number="editForm.capacityPrice" auto-complete="off"></el-input>
					</el-form-item>-->
					<el-form-item label="路径类型" :label-width="formLabelWidth">
						<el-select v-model="editForm.tradePathType" placeholder="请选择路径类型">
							<el-option v-for="keyValueItem in keyValueItemList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="输电价/元" :label-width="formLabelWidth" prop="tradePathPrice">
						<el-input v-model.number="editForm.tradePathPrice" auto-complete="off"></el-input>
					</el-form-item>
				</div>
                <div class="flx">
					<el-form-item label="网损/%" :label-width="formLabelWidth" prop="tradePathNetloss">
						<el-input v-model.number="editForm.tradePathNetloss" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit('editRuleForm')">修 改</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
	export default {
		data() {
			return {
				searchBoxFlag:false,
				searchList:{
					tradePathName:"",
					tradePathCode:"",
					tradePathType:"",
					sendSmUnitId: "",
					receiveSmUnitId: ""
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
					tradePathCode: "",
					tradePathName: "",
                    /*sendSmUnitId: "",
                    transSmUnitId: "",
					receiveSmUnitId: "",*/
                    tradePathType: "",
                    /*voltageLevel: "",
					capacityPrice: "",*/
					sendSmUnitId: "",
					receiveSmUnitId: "",
                    tradePathPrice: "",
                    tradePathNetloss: ""
				},
				keyValueItemList:[],
				voltageLevelList:[],
				// 修改数据
				editForm: {},
                // 弹窗显隐
				dialogFormVisible: false,
				// 修改弹窗显隐
				dialogEditFormVisible: false,
                formLabelWidth: '100px',
                multipleSelection: "",
				settlementUnitList:[],
				rules:{
					tradePathCode:[
						{ required: true, message: '路径编码不能为空', trigger: 'blur' }
					],
					tradePathName:[
						{ required: true, message: '路径名称不能为空', trigger: 'blur' }
					],
					capacityPrice:[
						{ type:'number', message: '容量电价为数值类型', trigger: 'blur' }
					],
					tradePathPrice:[
						{ type:'number', message: '输电价为数值类型', trigger: 'blur' }
					],
					tradePathNetloss:[
						{ type:'number', message: '网损为数值类型', trigger: 'blur' }
					]
				},
				marketMemberList:[]

			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
			this.$util.dictory.getItemsByDicKey("tradepath_type","keyValueItemList",this);
			this.getMarketMemberList();
		},
		mounted() {
			this.getPageData();
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
			//获取所有的结算单元
			getSettlementUnitList(){
				this.$http.get(`${process.env.NODE_ENV}basicdata/settlementunit/selectall`)
					.then((response) => {
						if(response.data.code == 0){
							this.settlementUnitList = response.data.data;
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
            addTrue() {
                this.dialogFormVisible = true;
				this.$util.dictory.getItemsByDicKey("tradepath_type","keyValueItemList",this);
				/*this.$util.dictory.getItemsByDicKey("voltage_level","voltageLevelList",this);*/
				this.getMarketMemberList();
				this.getSettlementUnitList();
            },
            add(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var queryParam = {
							code:"0",
							msg:"",
							data:self.form
						};
						queryParam.data.tradePathNetloss = self.form.tradePathNetloss/100;
						//tradePathNetloss
						self.$http.post(`${process.env.NODE_ENV}/basicdata/tradepath/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加交易路径成功！");
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
            editTrue() {
				let self = this;
				// 修改时判断只能选中一条数据
				if (self.selectData.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				self.dialogEditFormVisible = true;
				self.$util.dictory.getItemsByDicKey("tradepath_type","keyValueItemList",this);
				/*this.$util.dictory.getItemsByDicKey("voltage_level","voltageLevelList",this);*/
				this.getMarketMemberList();
				this.getSettlementUnitList();
				self.$http.get(`${process.env.NODE_ENV}/basicdata/tradepath/info/${self.selectData[0].tradePathId}`)
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
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:"0",
							msg:"",
							data:self.editForm
						};
						queryParam.data.tradePathNetloss = self.editForm.tradePathNetloss/100;
						self.$http.post(`${process.env.NODE_ENV}/basicdata/tradepath/update`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("修改交易路径成功！");
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
						deleteIds.push(e.tradePathId);
					})
					console.log(deleteIds);
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							ids:deleteIds
						}
					}

					self.$http.post(`${process.env.NODE_ENV}/basicdata/tradepath/deletes`,queryParam)
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
				this.$http.post(`${process.env.NODE_ENV}/basicdata/tradepath/jsonlist`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							this.total = response.data.data.total;
							this.pageSize = response.data.data.size;
                            this.tableData = response.data.data.records;
                            this.tableData.forEach((e) => {
                            	e.tradePathNetloss = (e.tradePathNetloss*100).toFixed(2)+"%"
							})
                            console.log(this.tableData);
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
					margin-bottom: 20px;
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
