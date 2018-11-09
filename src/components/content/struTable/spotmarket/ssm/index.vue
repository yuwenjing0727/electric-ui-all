<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<el-button type="primary" @click="apply()" size="small">申请审批</el-button>
			<el-button type="primary" size="small" @click="release()">发布</el-button>
			<router-link  to="ssi">
				<el-button type="primary" size="small">争议明细</el-button>
			</router-link>

			<el-button type="primary" size="small" @click="check()">查看明细</el-button>
			<router-link  to="sod">
			<el-button type="primary" size="small">结果确认</el-button>
			</router-link>
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="区间类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.interval_type" placeholder="区间类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="keyValueItem in intervalTypeList"
												:key="keyValueItem.paraCode"
												:label="keyValueItem.paraKey"
												:value="keyValueItem.paraCode">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="结算类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_type" placeholder="结算类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="keyValueItem in settlementTypeList"
												:key="keyValueItem.paraCode"
												:label="keyValueItem.paraKey"
												:value="keyValueItem.paraCode">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="生成开始日期" :label-width="formLabelWidth">
										<el-date-picker
											size="mini"
											class="timeInput"
											v-model="searchList.startDate"
											type="date"
											placeholder="选择日期时间">
										</el-date-picker>
									</el-form-item>

								</div>
								<div class="flx">
									<el-form-item label="生成结束日期" :label-width="formLabelWidth">
										<el-date-picker
											size="mini"
											class="timeInput"
											v-model="searchList.endDate"
											type="date"
											placeholder="选择日期时间">
										</el-date-picker>
									</el-form-item>

									<el-form-item label="结算单标题" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_name" placeholder="结算单标题" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in setStatusOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="通道名称" :label-width="formLabelWidth">
										<el-select v-model="searchList.passageway" placeholder="通道" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in transChannelOptions"
												:key="item.transChannelId"
												:label="item.transChannelName"
												:value="item.transChannelId">
											</el-option>
										</el-select>
									</el-form-item>

								</div>
								<div class="flx">
									<el-form-item label="结算单状态" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_status" placeholder="结算单状态" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="keyValueItem in settlementStateList"
												:key="keyValueItem.paraCode"
												:label="keyValueItem.paraKey"
												:value="keyValueItem.paraCode">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item :label-width="formLabelWidth">

									</el-form-item>

									<el-form-item :label-width="formLabelWidth">
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
			<el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%"   @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center">
				</el-table-column>
				<el-table-column prop="settleBillId" label="结算单编号" width="80" align="center">
				</el-table-column>
				<el-table-column prop="settleTitle" label="结算单标题" width="120" align="center">
				</el-table-column>
				<el-table-column prop="transChannelName" label="通道名称" width="120" align="center">
				</el-table-column>
				<el-table-column prop="areaType" label="区间类型" width="120" align="center">
				</el-table-column>
				<el-table-column prop="settlementType" label="结算类型" width="120" align="center">
				</el-table-column>
				<el-table-column prop="settleYear" label="结算单年份" width="120" align="center">
				</el-table-column>
				<el-table-column prop="settleMonth" label="结算单月份" width="120" align="center">
				</el-table-column>
				<el-table-column prop="settleCreationDate" label="生成日期" width="150" align="center">
				</el-table-column>
				<el-table-column prop="makeOrgId" label="编制单位" width="120" align="center">
				</el-table-column>
				<el-table-column prop="makeDate" label="编制时间" width="120" align="center">
				</el-table-column>
				<el-table-column prop="settleStatus" label="结算单状态" width="120" align="center">
				</el-table-column>

			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>

		</div>
		<el-dialog
			title="申请审批"
			:visible.sync="confirmDialogVisible"
			class="elDialog">
			<el-form>
				<div class="flx" style="display:flex">
					<el-form-item label="请选择审批人:" :label-width="formLabelWidth">
						<el-select v-model="approver_name" placeholder="请选择" size="mini">
							<el-option
								v-for="item in approverOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>

					</el-form-item>
				</div>

			</el-form>
			<span slot="footer" class="dialog-footer">
    <el-button @click="confirmDialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureConfirm()" size="mini">确 定</el-button>
  </span>
		</el-dialog>
	<!--	<el-dialog title="结算单明细" :visible.sync="dialogSheetFormVisible" class="elDialog">
			<div class="tableBox">
				<div class="title">
					<h3>北京电力交易中心有限公司交易结算单</h3>
					<p>2018-01-1号</p>
				</div>
				<div class="top">
					<p style="font-weight: 600; font-size: 18px">国家电网有限公司</p>
					<p style="font-size: 14px">2018年1月购售电量电费交易明细如下(单位:兆瓦时/元)</p>
					<p style="font-size: 12px"><span>交易通道:</span>特高压交流长南线</p>
				</div>

				<el-table
					:data="tableData3"
					style="width: 100%"

				>
					<el-table-column
						prop="date"
						label="序号"
						align="center"
						width="150">
					</el-table-column>
					<el-table-column
						prop="name"
						label="交易名称"
						align="center"
						width="150">
					</el-table-column>
					<el-table-column
						prop="province"
						label="售电方"
						align="center"
						width="150">
					</el-table-column>

					<el-table-column label="购电交易" align="center">
						<el-table-column
							prop="name"
							label="当月"
							align="center"
							width="120">
							<el-table-column
								prop="name"
								label="电量"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="name"
								label="电价"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="name"
								label="电费"
								align="center"
								width="120">
							</el-table-column>

						</el-table-column>

						<el-table-column
							prop="name"
							label="年累计"
							align="center"
							width="120">
							<el-table-column
								prop="name"
								label="电量"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="name"
								label="电费"
								align="center"
								width="120">
							</el-table-column>


						</el-table-column>

					</el-table-column>
					<el-table-column label="购电方" prop="date" width="150" align="center">

					</el-table-column>
					<el-table-column label="售电交易" align="center">
						<el-table-column label="当月" prop="date" width="150" align="center">
							<el-table-column
								prop="name"
								label="电量"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="name"
								label="电价"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="name"
								label="电费"
								align="center"
								width="120">
							</el-table-column>

						</el-table-column>
						<el-table-column label="年累计" prop="date" width="150" align="center" >
							<el-table-column
								prop="name"
								label="电量"
								align="center"
								width="120">
							</el-table-column>
							<el-table-column
								prop="name"
								label="电费"
								width="120">
							</el-table-column>
						</el-table-column>

					</el-table-column>



				</el-table>
			</div>



			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogSheetFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>-->











	</div>

</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				searchList:{
					interval_type:"", /*区间类型*/
					settlement_type:"", /*结算类型*/
					passageway:"", /*通道名称*/
					startDate:"", /*生成开始日期*/
					endDate:"",/*生成结束日期*/
					settlement_name:"", /*结算单标题*/
					settlement_status:"", /*结算单状态*/
				},
				searchBoxFlag:false,
				setStatusOptions:[
					{label:"已保存",value:"已保存"},
					{label:"审批中",value:"审批中"},
					{label:"已驳回",value:"已驳回"},
					{label:"待发布",value:"待发布"},
					{label:"已发布",value:"已发布"},
					{label:"待回复",value:"待回复"},
					{label:"已回复",value:"已回复"},
					{label:"已确认",value:"已确认"},
				],
				regionOptions:[
					{label:"华北",value:"华北"},
					{label:"东华",value:"东华"},
					{label:"西南",value:"西南"},
					{label:"华中",value:"华中"},
				],
				marketTypeOptons:[
					{label:"发电企业",value:"发电企业"},
					{label:"售电企业",value:"售电企业"},
					{label:"电力用户",value:"电力用户"},
					{label:"辅助用户",value:"辅助用户"},

				],
				approver_name:"soaadmin",


				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				// 弹窗显隐
				dialogFormVisible: false,
				// 新增数据
				form: {
					name: "",
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: ""
				},
				formLabelWidth: "100px",
				// 单选
				radio: "1",
				// 树
				defaultProps: {
					children: "children",
					label: "label"
				},
				multipleSelection: [],
				confirmDialogVisible:false,
				settlementTypeList:[],  /*结算类型*/
				transChannelOptions:[],
				approverOptions:[
					{label:"soaadmin",value:"00001"}
				],
				dialogSheetFormVisible:false,
				intervalTypeList:[], /*区间类型*/
				settlementStateList:[],/*结算单状态*/




			};
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);

			/*结算类型*/
			this.$util.dictory.getItemsByDicKey("settlement_type","settlementTypeList",this);
			/*区间类型*/
			this.$util.dictory.getItemsByDicKey("smecarea_type","intervalTypeList",this);
			/*结算单状态*/
			this.$util.dictory.getItemsByDicKey("smsbsettlement_status","settlementStateList",this);


		},
		mounted() {
			this.getPageData();
			this.getTranchannel();
		},
		methods: {
			/*获取通道名称*/
			getTranchannel(){
				this.$http.get(`${process.env.NODE_ENV}/basicdata/tranchannel/selectall`)
					.then((response) => {
						console.log("通道")
						console.log(response)
						if(response.data.code == 0){
							this.transChannelOptions=response.data.data
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			getPageData() {

				var queryParam = {
					code: 0,
					data: {
						page: this.currentPage,
						limit: this.pageSize,
						filter_parameters: {
							/*bizName: this.bizName*/
							areaType:this.searchList.interval_type,/*区间类型*/
							settlementType:this.searchList.settlement_type, /*结算类型*/
							settleCreationDate:this.searchList.startDate,  /*生成开始日期*/
							settleEndtionDate:this.searchList.endDate,  /*生成结束日期*/
							settleTitle:this.searchList.settlement_name,  /*结算单标题*/
							transChannelName:this.searchList.passageway, /*通道名称*/
							settleStatus:this.searchList.settlement_status, /*结算单状态*/
						}
					},
					msg: "string"
				}
				 this.$http.post(`${process.env.NODE_ENV}/spotmarket/ass/jsonlist`,queryParam)
				 	.then((response) => {
				 		this.total = response.data.data.total;
				 		this.pageSize = response.data.data.size;
				         this.tableData = response.data.data.records;
				 	})
				 	.catch(function(error) {
				 		console.log(error);
				 	});

			},
			// 删除弹窗
			del() {
				this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.$message({
							type: "success",
							message: "删除成功!"
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			handleClick(row) {
				console.log(row);
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getPageData();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getPageData();
			},

			searchForPage(){
				this.currentPage = 1;
				this.getPageData();
				this.searchBoxFlag=false
			},
			/*重置*/
			reset(){
				//searchList
				for(let key in this.searchList){
					this.searchList[key]  = ''
				}

			},

			/*选中的条数*/
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			/*申请审批*/
			apply(){
				/*
				 * 点击申请审批需要判断当前选择的记录是否是未审批状态，如果是未审批则可以进行申请审批，点击申请审批弹出一个框，框里面的内容为：
				 请选择审批人：下拉列表框
				 确定、取消
				 * */
				let  self=this
				if (self.multipleSelection.length !==1 ) {
					return self.notice("请选择一条数据进行审批");
				}
				if(self.multipleSelection[0].settleStatus =='审批中'){
					return self.notice("该单在审批中，请不要重复操作");
				}

				this.confirmDialogVisible=true
				/*获取审批人*/
				/*this.$http.get(`${process.env.NODE_ENV}/spotmarket/ass/examineuser`)
					.then((response) => {
				       //this.approverOptions=response.data.data

					})
					.catch(function(error) {
						console.log(error);
					});*/

			},
			sureConfirm(){



				var queryParam = {
					code: 0,
					data: {
						approvalId:this.approver_name,
						formDataId:this.multipleSelection[0].settleBillId,
					},
					msg: "string"
				}
				this.$http.post(`${process.env.NODE_ENV}/spotmarket/ass/applyexamine`,queryParam)
					.then((response) => {
						if(response.data.code==0){
							this.success("确认审批");
						}

						this.getPageData()

					})
					.catch(function(error) {
						console.log(error);
					});


				this.confirmDialogVisible=false;
				this.multipleSelection=[]

			},

			/*查看明细*/
			check(){
				let  self=this
				if (self.multipleSelection.length !==1 ) {
					return self.notice("请选择一条数据");
				}
				/*查看明细
				  1.需要把  结算单标题  通道名称  区间类型  结算类型  都带到结算单详情页面上
				  2.选中一条数据   通过id   获取该条数据的结算单详情

				*
				* */
				self.dialogSheetFormVisible=true;
				/*path: `/describe/${id}`,*/
				self.$router.push({
					path: `sett`,
					query:{
					    id:self.multipleSelection[0].settleBillId,
					}


				})
			},
			/*发布*/
			release(){
				let  self=this
				if (self.multipleSelection.length !==1 ) {
					return self.notice("请选择一条数据");
				}

				/*点击发布之前;需要判断是否审批成功,只有审批成功才可以发布,如果没有审批 提示用户先审批; 发布工程   提示发布成功成功*/
				//settleStatus 04
				if(self.multipleSelection[0].settleStatus !=='待发布'){
					return self.notice("该单异常,不允许发布");
				}

				this.$http.get(`${process.env.NODE_ENV}/spotmarket/ass/issue/${self.multipleSelection[0].settleBillId}`,)
					.then((response) => {
						if(response.data.code==0){
							this.success("发布成功");
						}
						this.getPageData()
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
		height: 20%;
	}

	.tableBox {
		width: 100%;
		height: 80%;
	}
	.block {
		margin-top: 10px;
	}
	.transition-box {
		margin-bottom: 10px;
		/*width: 630px;*/
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
			margin-bottom: 0px  !important;
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
<style>
	.el-date-editor.el-input, .el-date-editor.el-input__inner {
		width: 215px !important;
	}

</style>
