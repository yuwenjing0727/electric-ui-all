<template>
	<div id="all">
		<div class="btnBox" >
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<!--<el-button type="primary"  size="small">同步</el-button>-->
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="合约名称" :label-width="formLabelWidth">
										<el-input placeholder="合约名称"  size="mini"  prefix-icon="el-icon-search" v-model="searchList.contractName"></el-input>
									</el-form-item>
									<el-form-item label="区域类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.areaType" placeholder="区域类型" size="mini">
											<el-option v-for="keyValueItem in areaTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>
									<!--<el-form-item label="合约执行类型" label-width="70px">
										<el-select v-model="searchList.executeType" placeholder="合约执行类型">
											<el-option v-for="keyValueItem in executeTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>-->
									<el-form-item label="出清开始时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.voidanceStartQueryDate"
											type="date"
											size="mini"
											format="yyyy-MM-dd"
											placeholder="出清开始时间">
										</el-date-picker>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="出清结束时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.voidanceStartEndDate"
											type="date"
											size="mini"
											format="yyyy-MM-dd"
											placeholder="出清结束时间">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="执行开始时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.executeStartQueryDate"
											type="date"
											size="mini"
											format="yyyy-MM-dd"
											placeholder="执行开始时间">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="执行结束时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.executeEndQueryDate"
											type="date"
											size="mini"
											format="yyyy-MM-dd"
											placeholder="执行结束时间">
										</el-date-picker>
									</el-form-item>

								</div>
								<div class="flx">

									<el-form-item label="通道编码" :label-width="formLabelWidth">
										<el-input placeholder="通道编码" v-model="searchList.transChannelCode" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
									<el-form-item label="路径编码" :label-width="formLabelWidth">
										<el-input placeholder="路径编码"  v-model="searchList.tradePathCode" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
									<el-form-item label="价格方案名称" :label-width="formLabelWidth">
										<el-input placeholder="价格方案名称" v-model="searchList.cashPricePlanName" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="售电方" :label-width="formLabelWidth">
										<el-input placeholder="售电方" v-model="searchList.saleElectricName" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
									<el-form-item label="购电方" :label-width="formLabelWidth">
										<el-input placeholder="购电方"  v-model="searchList.buyElectricName" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
									<el-form-item label="输电方" :label-width="formLabelWidth">
										<el-input placeholder="输电方"  v-model="searchList.transElectricName" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
								</div>
								<div class="flx">
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
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column header-align="center" prop="contractId" label="合约编号">
					</el-table-column>
					<el-table-column header-align="center" prop="contractName" label="合约名称">
					</el-table-column>
					<el-table-column header-align="center" prop="areaType" label="区域类型">
					</el-table-column>
					<el-table-column header-align="center" prop="executeType" label="执行类型">
					</el-table-column>
					<el-table-column header-align="center" prop="transChannelCode" label="通道编码">
					</el-table-column>
					<el-table-column header-align="center" prop="tradePathCode" label="路径编码">
					</el-table-column>
					<el-table-column header-align="center" prop="cashPricePlanName" label="价格方案名称">
					</el-table-column>
					<el-table-column header-align="center" prop="voidanceDate" label="出清时间">
					</el-table-column>
					<el-table-column header-align="center" prop="voidanceStartQueryDate" label="时间（自）">
					</el-table-column>
					<el-table-column header-align="center" prop="voidanceStartEndDate" label="时间（至）">
					</el-table-column>
					<el-table-column header-align="center" prop="executeDate" label="执行时间">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="voidanceElectricPrice" label="出清电价">
					</el-table-column>-->
					<el-table-column header-align="center" prop="executeElectric" label="执行电量">
					</el-table-column>
					<el-table-column header-align="center" prop="saleElectricName" label="售电方名称">
					</el-table-column>
					<el-table-column header-align="center" prop="buyElectricName" label="购电方名称">
					</el-table-column>
					<el-table-column header-align="center" prop="transElectricName" label="输电方名称">
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
				searchBoxFlag:false,
				searchList:{
					contractName:"",
					areaType:"",
					/*executeType:"",*/
					voidanceStartQueryDate:"",
					voidanceStartEndDate:"",
					executeStartQueryDate:"",
					executeEndQueryDate:"",
					transChannelCode:"",
					tradePathCode:"",
					cashPricePlanName:"",
					saleElectricName:"",
					buyElectricName:"",
					transElectricName:""
				},
				areaTypeList:[],//执行区域类型
				executeTypeList:[],//执行合约类型
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				formLabelWidth:"130px"

			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
			this.$util.dictory.getItemsByDicKey("smecarea_type","areaTypeList",this);
			this.$util.dictory.getItemsByDicKey("smceexecute_type","executeTypeList",this);

		},
		mounted() {
			this.getPageData();
		},
		methods: {
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
				this.searchBoxFlag=false
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
				this.$http.post(`${process.env.NODE_ENV}/spotmarket/deoe/list`,queryParam)
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
		margin-bottom: 10px;
		position: relative;
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

	.el-date-editor.el-input, .el-date-editor.el-input__inner {
		width: 188px !important;
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
		}
	}
</style>
