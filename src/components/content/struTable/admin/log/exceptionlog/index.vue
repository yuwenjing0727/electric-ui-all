<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag" v-show="buttonPermission.query">搜索</el-button>
            <el-button type="primary" size="mini" @click="del()" v-show="buttonPermission.delete">删除</el-button>
			<el-button type="primary" size="mini" v-show="buttonPermission.export">导出</el-button>
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="用户" :label-width="formLabelWidth">
										<el-input placeholder="用户" style="width:200px;" size="mini" v-model="searchList.userName"></el-input>
									</el-form-item>
									<el-form-item label="异常名称" :label-width="formLabelWidth">
										<el-input placeholder="异常名称" style="width:200px;" size="mini" v-model="searchList.exceptionName"></el-input>
									</el-form-item>
									<el-form-item label="异常类" :label-width="formLabelWidth">
										<el-input placeholder="异常类" style="width:200px;" size="mini" v-model="searchList.anomalyClass"></el-input>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.time"
											type="datetimerange"
											range-separator="至"
											start-placeholder="请选择异常发生时间"
											end-placeholder="请选择异常发生时间"
											size="mini"
										>
										</el-date-picker>
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
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column header-align="center" prop="exceptionDate" label="异常时间">
					</el-table-column>
					<el-table-column header-align="center" prop="exceptionName" label="异常名称">
					</el-table-column>
					<el-table-column header-align="center" prop="exceptionMsg" label="异常描述">
					</el-table-column>
					<!-- <el-table-column
						fixed="right"
						label="操作">
						<template slot-scope="scope">
							<el-button type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column> -->
				</el-table>
				<!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>-->
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>


	</div>


</template>

<script>
	export default {
		name: "basics-m-tab3",
		data(){
			return{
				buttonPermission:JSON.parse(sessionStorage.buttonPermission),
			    searchList:{
			        userName:"",
					exceptionName:"",
					time:"",
					anomalyClass:"",
				},
				editOptions:[
					{
						label:"修改",
						value:"修改"
					},
					{
						label:"查询",
						value:"查询"
					},
					{
						label:"删除",
						value:"删除"
					}
				],
				tableData: [],
				currentPage:1,
				pageSize:10,
				total:0,
                editValue:"",
                // 存放select选择数据
                selectData: [],
				searchBoxFlag:false,
				formLabelWidth: "100px",
			}
		},
		mounted() {
			this.getPageData();
		},
		methods:{
            // select选择框
            handleSelectionChange(val) {
                this.selectData = val;
                console.log(val);
            },
			getPageData() {
				var queryParam = {
					code: 0,
					data: {
						page: this.currentPage,
						limit: this.pageSize,
						filter_parameters:{
							userName:this.searchList.userName,
							exceptionMethodname:this.searchList.exceptionName,
							exceptionDate:this.searchList.time,
							exceptionClass:this.searchList.anomalyClass,
						}
					},
					msg: "string"
				}
				this.$http.post(`${process.env.NODE_ENV}/admin/sysexceptionlog/list`,queryParam)
					.then((response) => {
				      console.log(response.data)
						this.total = response.data.data.total;
						this.pageSize = response.data.data.size;
						this.tableData = response.data.data.records;
						console.log(this.tableData)
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			searchForPage(){
				this.currentPage = 1;
				this.getPageData();
				this.searchBoxFlag=false
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

			 /*删除*/
			del() {
				let self = this;
				if (self.selectData.length == 0) {
					return self.notice("请选中数据进行操作");
				}
				this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					var deleteIds = [];
					self.selectData.forEach((e) => {
						deleteIds.push(e.exceptionlogId);
					})
					console.log(deleteIds);
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							ids:deleteIds
						}
					}
					this.$http
						.post(
							`${process.env.NODE_ENV}/admin/sysexceptionlog/deletes`,queryParam
						)
						.then(res => {
							console.log(res);
							if (res.data.code == 0) {
								this.$message({
									message: "删除成功",
									type: "success"
								});
								self.getPageData();
							} else {
								this.$message({
									message: res.data.msg,
									type: "error"
								});
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				});
			},

			/*重置*/
			reset(){
				//searchList
				for(let key in this.searchList){
					this.searchList[key]  = ''
				}

			},

		},



	}
</script>

<style scoped lang="less" >

	.btnBox{
		width:100%;
		height:20%;
		padding: 5px;
	}
	.btnBox .el-input{
		margin-right: 20px;
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
