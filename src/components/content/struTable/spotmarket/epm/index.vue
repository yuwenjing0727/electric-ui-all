<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<el-button type="primary" icon="el-icon-search" size="small" @click="exportData">导出</el-button>
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="结算单编号" label-width="100px">
										<el-input placeholder="结算单编号" style="width:200px;"  size="small"  prefix-icon="el-icon-search" v-model="searchList.settlementId"></el-input>
									</el-form-item>
									<el-form-item label="结算单名称" label-width="100px">
										<el-input placeholder="结算单名称" style="width:200px;" size="small"  prefix-icon="el-icon-search"  v-model="searchList.settlementName"></el-input>
									</el-form-item>
									<el-form-item label="结算期间(自)" label-width="100px">
										<el-date-picker
											v-model="searchList.periodStartDate"
											type="date"
											size="small"
											placeholder="选择日期">
										</el-date-picker>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="结算期间(至)" label-width="100px">
										<el-date-picker
											v-model="searchList.periodEndDate"
											type="date"
											size="small"
											placeholder="选择日期">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="市场成员编号" label-width="100px">
										<el-input placeholder="市场成员编号" style="width:200px;" v-model="searchList.marketMemberId" size="small"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
									<el-form-item label="市场成员名称" label-width="100px">
										<el-input placeholder="市场成员名称" style="width:200px;" v-model="searchList.memberName" size="small"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="结算单类型" label-width="100px">
										<el-select v-model="searchList.settlementType" placeholder="状态" size="small">
											<el-option v-for="keyValueItem in settlementTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="状态" label-width="100px">
										<el-select v-model="searchList.ledgerStatus" placeholder="状态" size="small">
											<el-option v-for="keyValueItem in ledgerStatusList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
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
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column header-align="center" prop="settlementId" label="结算单编号">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementType" label="结算单类型">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementName" label="结算单名称">
					</el-table-column>
					<el-table-column header-align="center" prop="memberType" label="市场成员类型">
					</el-table-column>
					<el-table-column header-align="center" prop="marketMemberId" label="市场成员编号">
					</el-table-column>
					<el-table-column header-align="center" prop="memberName" label="市场成员名称">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementPeriod" label="结算期间">
					</el-table-column>
					<el-table-column header-align="center" prop="billMoneyTotal" label="账单金额合计">
					</el-table-column>
					<el-table-column header-align="center" prop="stallDate" label="应付日期">
					</el-table-column>
					<el-table-column header-align="center" prop="invoiceNumber" label="发票号">
					</el-table-column>
					<el-table-column header-align="center" prop="tickettOpenDate" label="开票时间">
					</el-table-column>
					<el-table-column header-align="center" prop="stallMoney" label="应付金额">
					</el-table-column>
					<el-table-column header-align="center" prop="realyPayMoney" label="实付金额">
					</el-table-column>
					<el-table-column header-align="center" prop="payDate" label="付款时间">
					</el-table-column>
					<el-table-column header-align="center" prop="ledgerStatus" label="状态">
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>
	</div>


</template>

<script>
	export default {
		data(){
			return{
				searchBoxFlag:false,
				searchList:{
					settlementId:"",
					settlementName:"",
					periodStartDate:"",
					periodEndDate:"",
					marketMemberId:"",
					memberName:"",
					settlementType:"",
					ledgerStatus:"",
					ledgerType:"01"
				},
				settlementTypeList:[],
				ledgerStatusList:[],
				tableData: [],
				currentPage:1,
				pageSize:10,
				total:0,
				formLabelWidth: '100px',
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100]
			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			this.$util.dictory.getItemsByDicKey("settlement_type","settlementTypeList",this);
			this.$util.dictory.getItemsByDicKey("ledger_status","ledgerStatusList",this);
			this.getPageData();
		},
		methods:{
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
				this.searchBoxFlag = false;
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
				this.$http.post(`${process.env.NODE_ENV}/spotmarket/erm/list`,queryParam)
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

			},
			//导出数据
			exportData(){
				var queryParam = {
					"code": "",
					"msg": "",
					"data": {
						"filter_parameters":this.searchList
					}
				};
				window.open(`${process.env.NODE_ENV}/spotmarket/erm/export?requestJson=`+JSON.stringify(queryParam));
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
	.btnBox{
		width:100%;
		height:20%;
	}
	.tableBox{
		width:100%;
		height:80%;
	}
	.el-table,.block{
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



</style>
