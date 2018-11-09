<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<el-button type="primary" @click="exportEXC" size="small">导出</el-button>
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="结算单元" :label-width="formLabelWidth">
										<el-input placeholder="结算单元" style="width:200px;"  size="mini"  prefix-icon="el-icon-search" v-model="searchList.settlement_unit" ></el-input>
									</el-form-item>
									<el-form-item label="结算类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_type" placeholder="结算类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in settTypeOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="交易类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.transaction_type" placeholder="交易类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in tranTypeOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="时间自" :label-width="formLabelWidth">
										<el-date-picker
											size="mini"
											class="timeInput"
											v-model="searchList.dateStar"
											type="datetime"
											placeholder="选择日期时间">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="时间至" :label-width="formLabelWidth">
										<el-date-picker
											size="mini"
											class="timeInput"
											v-model="searchList.dateEnd"
											type="datetime"
											placeholder="选择日期时间">
										</el-date-picker>
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
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
					<el-table-column header-align="center" type="selection" width="55"></el-table-column>
					<el-table-column header-align="center" prop="dayResultId" label="日电费计算结果ID" width="120">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementMemberName" label="结算成员名称" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementType" label="结算类型" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="electricFee" label="电费" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="quantity" label="电量" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="electricPrice" label="电价" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="dayResultDate" label="日期" min-width="80">
					</el-table-column>
				</el-table>
			</div>
			<div class="block" v-if="tableData.length!=0">
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
				searchList:{
					settlement_unit:"",
					settlement_type:"",
					transaction_type:"",
					dateStar:"",
					dateEnd:"",
				},
				searchBoxFlag:false,
				settTypeOptions:[  /*结算类型*/
					{label:"日前市场",value:"日前市场"},
					{label:"日内市场",value:"日内市场"},
					{label:"实时市场",value:"实时市场"},
					{label:"其他",value:"其他"},
				],
				tranTypeOptions:[ /*交易类型*/
					{label:"省间中长期",value:"省间中长期"},
					{label:"省间现货",value:"省间现货"},
					{label:"省内中长期",value:"省内中长期"},
					{label:"省内现货",value:"省内现货"},
				],
				marketTypeOptions:[
					{label:"发电企业",value:"发电企业"},
					{label:"电网公司",value:"电网公司"},
					{label:"售电公司",value:"售电公司"},
					{label:"电力用户",value:"电力用户"},
					{label:"其他",value:"其他"},
				],
				// 表格数据
				tableData: [{
					bizName:"123",
					bizSort:"2333",
					bizId: "qwe"
				}],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList: [],
				pageSizes: [5,10,50,100],
				formLabelWidth: '100px',
				// 查询数据字典
				keyValueItemList: []
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
			// select选择框
			handleSelectionChange() {

			},
			// 导出
			exportEXC() {
				var queryParam =  {
					code:"0",
					msg:"",
					data:{
						filter_parameters:{
							"settlementType": this.searchList.settlement_unit,
							"tradeType": this.searchList.settlement_type,
							"settlementUnitName":  this.searchList.transaction_type,
							"dayStartDate":  this.searchList.dateStar,
							"dayEndDate":  this.searchList.dateEnd
						}
					}
				};

				window.open(`${process.env.NODE_ENV}/spotmarket/rtms/export?requestJson=`+JSON.stringify(queryParam));

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
				 this.$http.post(`${process.env.NODE_ENV}/spotmarket/rtms/list`,queryParam)
				 	.then((response) => {
				 		this.total = response.data.data.total;
				 		this.pageSize = response.data.data.size;
				         this.tableData = response.data.data.records;
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

<style scoped lang="less" >
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

<style lang="less">
	#all {
		.btnBox {
			.timeInput {
				width: 185px;
				.el-input__inner {
					padding-right: 20px;
				}
			}
			.inputSize {
				width: 170px;
			}
		}
	}




</style>
