<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<el-button type="primary" @click="confirm()" size="small">申请审批</el-button>
			<el-button type="primary" size="small">争议明细</el-button>
			<el-button type="primary" size="small">查看明细</el-button>
			<el-button type="primary" size="small">导出</el-button>
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="账单期间(自)" :label-width="formLabelWidth">
										<el-date-picker
											size="mini"
											class="timeInput"
											v-model="searchList.billStartDate"
											type="datetime"
											placeholder="选择日期时间">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="账单期间 (至)" :label-width="formLabelWidth">
										<el-date-picker
											size="mini"
											class="timeInput"
											v-model="searchList.billEndDate"
											type="datetime"
											placeholder="选择日期时间">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="结算单状态" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_status" placeholder="结算单状态" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in setStatusOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="结算单编号" :label-width="formLabelWidth">
										<el-input placeholder="结算单编号" size="mini" v-model="searchList.settlement_code" ></el-input>

									</el-form-item>
									<el-form-item label="区域" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_status" placeholder="区域" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in regionOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="省份" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_status" placeholder="省份" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in regionOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="市场成员类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.market_type" placeholder="市场成员类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in marketTypeOptons"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="隶属集团" :label-width="formLabelWidth">
										<el-select v-model="searchList.sub_group" placeholder="隶属集团" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in marketTypeOptons"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="结算单元名称" :label-width="formLabelWidth">
										<el-input placeholder="结算单元名称" size="mini"  v-model="searchList.settUnit_name" ></el-input>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="结算单元编号" :label-width="formLabelWidth">
										<el-input placeholder="结算单元编号" size="mini" v-model="searchList.settUnit_code" ></el-input>

									</el-form-item>
									<el-form-item label="所属市场成员名称" label-width="130px">
										<el-input placeholder="所属市场成员名称" size="mini" v-model="searchList.market_name" ></el-input>

									</el-form-item>
									<el-form-item label="市场成员编号" :label-width="formLabelWidth">
										<el-input placeholder="市场成员编号" size="mini" v-model="searchList.market_code" ></el-input>
									</el-form-item>

								</div>
								<div class="flx">
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
			<el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%"   @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center">
				</el-table-column>
				<el-table-column prop="name" label="序号" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="账单期间（自）" width="80" align="center">
				</el-table-column>
				<el-table-column prop="address" label="账单期间（至）" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="结算单状态" width="120" align="center">
				</el-table-column>
				<el-table-column prop="address" label="结算单编号" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="结算单名称" width="120" align="center">
				</el-table-column>
				<el-table-column prop="address" label="结算单元名称" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="结算单元编号" width="120" align="center">
				</el-table-column>
				<el-table-column prop="address" label="所属市场成员名称" width="150" align="center">
				</el-table-column>
				<el-table-column prop="name" label="市场成员编号" width="120" align="center">
				</el-table-column>
				<el-table-column prop="address" label="市场成员类型" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="隶属集团" width="120" align="center">
				</el-table-column>
				<el-table-column prop="address" label="账单金额" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="编制单位" width="120" align="center">
				</el-table-column>
				<el-table-column prop="address" label="编制时间" width="120" align="center">
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>

		</div>

		<el-dialog
			title="提示"
			:visible.sync="confirmDialogVisible"
			width="30%"
			center>
			<span>是否确认</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="confirmDialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureConfirm()" size="mini">确 定</el-button>
  </span>
		</el-dialog>






	</div>

</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				searchList:{
					billStartDate:"", /*账单期间(自)*/
					billEndDate:"", /*账单期间 (至)*/
					settlement_status:"", /*结算单状态*/
					settlement_code:"", /*结算单编号*/
					region:"", /*区域*/
					province:"", /*省份*/
					market_type:"", /*市场成员类型*/
					sub_group:"" ,/*隶属集团*/
					settUnit_name:"", /*结算单元名称*/
					settUnit_code:"",  /*结算单元编号*/
					market_name:"",  /*所属市场成员名称*/
					market_code:"",  /*市场成员编号*/
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


				// 表格数据
				tableData3: [
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-08",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-06",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-07",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-03",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-02",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-08",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					}
				],
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

		};
		},
		mounted() {
			this.getPageData();
		},
		methods: {
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
				// this.$http.post(`${process.env.NODE_ENV}/admin/fc/biz/list`,queryParam)
				// 	.then((response) => {
				// 		this.total = response.data.data.total;
				// 		this.pageSize = response.data.data.size;
				//         this.tableData = response.data.data.records;
				// 	})
				// 	.catch(function(error) {
				// 		console.log(error);
				// 	});

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

			/*确认*/
			confirm(){
				let  self=this
				if (self.multipleSelection.length ==0 ) {
					return self.notice("请至少选择一条数据");
				}
				this.confirmDialogVisible=true
			},
			sureConfirm(){
				this.success("已确认")
				this.confirmDialogVisible=false;

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
		width: 178px !important;
	}
</style>
