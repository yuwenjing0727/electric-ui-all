<template>
	<div id="all">
		<div class="tableBox">

			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">

					<el-table-column header-align="center" prop="tablekey" label="表名称">
					</el-table-column>
					<el-table-column header-align="center" prop="countValue" label="增长值">
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
		name: "basics-m-tab3",
		data() {
			return {
				tableData: [],
				currentPage:1,
				pageSize:10,
				total:0,
				pageSizesObjectList: [],
				pageSizes: [5,10,50,100]
			};
        },
        created() {
            // 分页pagesize
            this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
        },
        mounted() {
			this.getPageData();
		},
		methods: {
            getPageData() {
                var queryParam = {
                    data: {
                        page: this.currentPage,
                        limit: this.pageSize,
                        filter_parameters: {
                            tablekey: ""  //模糊查询
                        }
                    }
                    
                }
                this.$http.post(`${process.env.NODE_ENV}/electric-sysmanage-service/squence/list`, queryParam)
					.then((response) => {
						this.total = response.data.data.total;
						this.pageSize = response.data.data.size;
						this.tableData = response.data.data.records;
					})
					.catch(function (error) {
						console.log(error);
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
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.getPageData();
			},


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

<style lang="less" scoped>

	.tableBox {
		width:100%;
		height:80%;

	}
	.el-table,.block{
		margin-top: 10px;
	}

</style>



