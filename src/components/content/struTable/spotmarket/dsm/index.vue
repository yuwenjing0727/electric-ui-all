<template>
	<div id="all">
		<div class="btnBox">
            <el-date-picker
                class="timeInput"
                v-model="timeStar"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
            至：
            <el-date-picker
                class="timeInput"
                v-model="timeEnd"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
            <el-select v-model="bizName" placeholder="请选择交易类型" clearable class="timeInput inputSize">
                <el-option 
                    v-for="keyValueItem in keyValueItemList" 
                    :key="keyValueItem.ID" 
                    :label="keyValueItem.NAME" 
                    :value="keyValueItem.ID">
                </el-option>
            </el-select>
            <el-select v-model="bizName" placeholder="请选择电量模式" clearable class="timeInput inputSize">
                <el-option 
                    v-for="keyValueItem in keyValueItemList" 
                    :key="keyValueItem.ID" 
                    :label="keyValueItem.NAME" 
                    :value="keyValueItem.ID">
                </el-option>
            </el-select>
            <el-select v-model="bizName" placeholder="请选择市场主体编码" clearable class="timeInput">
                <el-option 
                    v-for="keyValueItem in keyValueItemList" 
                    :key="keyValueItem.ID" 
                    :label="keyValueItem.NAME" 
                    :value="keyValueItem.ID">
                </el-option>
            </el-select>
			<el-button type="primary" @click="searchForPage">查询</el-button>
			<el-button type="primary" @click="exportEXC">导出</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55"></el-table-column>
					<el-table-column header-align="center" prop="bizName" label="序号" width="60">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="结算单元" min-width="80">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizName" label="结算对象" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="市场主体类型" min-width="120">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizName" label="结算类型" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="日期" min-width="80">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizName" label="时点（自）" min-width="120">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="时点（至）" min-width="120">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizName" label="合约id" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="合约名称" min-width="80">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizName" label="合同电量" min-width="80">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="执行电量" min-width="80">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizName" label="偏差电量" min-width="120">
					</el-table-column>
					<el-table-column header-align="center" prop="bizSort" label="偏差类型" min-width="80">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="偏差考核规则id" min-width="120">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="准许偏差率" min-width="100">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="准许偏差量" min-width="100">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="偏差考核电量" min-width="120">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="偏差价格" min-width="80">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="偏差考核费用" min-width="120">
					</el-table-column>
                    <el-table-column header-align="center" prop="bizSort" label="调度费用" min-width="80">
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
                timeStar: "",
                timeEnd: "",
				bizName:"",
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
				// this.$http.post(`${process.env.NODE_ENV}/admin/fc/biz/list`,queryParam)
				// 	.then((response) => {
				// 		this.total = response.data.data.total;
				// 		this.pageSize = response.data.data.size;
                //         this.tableData = response.data.data.records;
				// 	})
				// 	.catch(function(error) {
				// 		console.log(error);
				// 	});

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
