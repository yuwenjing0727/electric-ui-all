<template>
	<div id="all">
		<div class="btnBox">
			<label style="font-size: 14px;">路径名称</label>
			<el-input placeholder="路径名称" style="width:200px;" v-model="tradePathName" size="small"></el-input>
			<el-button type="primary" size="small" @click="searchForPage">查询</el-button>
			<el-button type="primary" size="small" @click="showImportDialog">导入</el-button>
			<!--<el-button type="primary" size="small" @click="showCreateDialogForm">添加</el-button>
			<el-button type="primary" size="small" @click="handleClick">编辑</el-button>-->
			<el-button type="primary" size="small" @click="del">删除</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
					<el-table-column header-align="center" type="selection" width="55">
					</el-table-column>
					<el-table-column header-align="center" prop="tradePathCode" label="路径编号">
					</el-table-column>
					<el-table-column header-align="center" prop="tradePathName" label="路径名称">
					</el-table-column>
					<el-table-column header-align="center" prop="sendElectric" label="送出电量">
					</el-table-column>
					<el-table-column header-align="center" prop="receiveElectric" label="受入电量">
					</el-table-column>
					<el-table-column header-align="center" prop="lineLossVal" label="线损值">
					</el-table-column>
					<el-table-column header-align="center" prop="transLineLoss" label="中转线损值">
					</el-table-column>
					<el-table-column header-align="center" prop="lineLossDate" label="日期">
					</el-table-column>
					<!-- <el-table-column
						fixed="right"
						width="200"
						label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</div>
			<div class="block">
				<!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>-->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="参数名称" :label-width="formLabelWidth">
						<el-input v-model="form.paraName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="参数编码" :label-width="formLabelWidth">
						<el-input v-model="form.paraCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="参数级别" :label-width="formLabelWidth">
						<el-select v-model="form.paraClass" placeholder="请选择类型">
							<el-option v-for="keyValueItem in keyValueItemList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="参数关键字" :label-width="formLabelWidth">
						<el-input v-model="form.paraKey" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="参数类型" :label-width="formLabelWidth">
						<el-input v-model="form.paraEkey" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="顺序" :label-width="formLabelWidth">
						<el-input v-model="form.paraSort" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="是否默认" :label-width="formLabelWidth">
						<el-checkbox v-model="form.defaultFlag"></el-checkbox>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="form.paraDesc" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addDict">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm">
				<div class="flx">
					<el-form-item label="参数名称" :label-width="formLabelWidth">
						<el-input v-model="editForm.paraName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="参数编码" :label-width="formLabelWidth">
						<el-input v-model="editForm.paraCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="参数级别" :label-width="formLabelWidth">
						<el-select v-model="editForm.paraClass" placeholder="请选择类型">
							<el-option v-for="keyValueItem in keyValueItemList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="参数关键字" :label-width="formLabelWidth">
						<el-input v-model="editForm.paraKey" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="参数类型" :label-width="formLabelWidth">
						<el-input v-model="editForm.paraEkey" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="顺序" :label-width="formLabelWidth">
						<el-input v-model="editForm.paraSort" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="是否默认" :label-width="formLabelWidth">
						<el-checkbox v-model="editForm.defaultFlag"></el-checkbox>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input v-model="editForm.paraDesc" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editDict">修 改</el-button>
			</div>
		</el-dialog>

		<el-dialog title="导入" :visible.sync="dialogImportFormVisible" class="elDialog">
			<el-upload
				accept=".xls,.xlsx"
				name="fileName"
				class="upload-demo"
				ref="upload"
				:action="action"
				:before-remove="beforeRemove"
				multiple
				:limit="5"
				:on-exceed="handleExceed"
				:before-upload="beforeUpload"
				:on-success="handleSuccess"
				:auto-upload="false"
				:file-list="fileList">
				<el-button size="small" type="primary">选取文件</el-button>
				<div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogImportFormVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="submitUpload">确定导入</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
	export default {
		data(){
			return{
				tradePathName:"",
				tableData: [/*{
                    paraName: "1",
					paraCode: "",
					paraClass: "",
					paraKey: "",
					paraEkey: "",
					paraSort: "",
					defaultFlag: "",
					paraDesc:""
                },{
                    paraName: "2",
					paraCode: "",
					paraClass: "",
					paraKey: "",
					paraEkey: "",
					paraSort: "",
					defaultFlag: "",
					paraDesc:""
                }*/],
				currentPage:1,
				pageSize:10,
				total:0,
				// 弹窗显隐
				dialogFormVisible: false,
				dialogEditFormVisible:false,
				// 新增数据
				form: {
					paraName: "",
					paraCode: "",
					paraClass: "",
					paraKey: "",
					paraEkey: "",
					paraSort: "",
					defaultFlag: "",
					paraDesc:""
				},
				editForm: {},
				formLabelWidth: '100px',
				keyValueItemList:[],
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				// 存放select选择数据
				selectData: [],
				dialogImportFormVisible:false,
				fileList: [
					/*{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
					{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}*/
					],
				action: `${process.env.NODE_ENV}/zuul/spotmarket/linelossexport/upload`
			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
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
			del() {
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
						deleteIds.push(e.lineLossId);
					})
					console.log(deleteIds);
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							ids:deleteIds
						}
					}
					self.$http.post(`${process.env.NODE_ENV}/spotmarket/linelossexport/deletes`,queryParam)
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
			// 编辑
			handleClick(){
				let self = this;
				// 修改时判断只能选中一条数据
				if (self.selectData.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				self.dialogEditFormVisible = true;
				self.$util.dictory.getItemsByDicKey("parameter_class","keyValueItemList",this);
				self.$http.get(`${process.env.NODE_ENV}/admin/dict/info/${self.selectData[0].paraId}`)
					.then((response) => {
						if(response.data.code == 0){
							response.data.data.defaultFlag = response.data.data.defaultFlag == "1"? true : false;
							self.editForm = response.data.data;
						}

					})
					.catch(function(error) {
						console.log(error);
					});


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
			},
			getPageData() {
				var queryParam = {
					code:"0",
					msg:"",
					data:{
						filter_parameters:{
							tradePathName:this.tradePathName
						},
						page: this.currentPage,
						limit: this.pageSize
					}

				};
				this.$http.post(`${process.env.NODE_ENV}/spotmarket/linelossexport/list`,queryParam)
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

			showCreateDialogForm(){
				let self = this;
				self.dialogFormVisible = true;
				self.$util.dictory.getItemsByDicKey("parameter_class","keyValueItemList",this);
			},

			addDict(){
				let self = this;
				var queryParam = {
					code:"0",
					msg:"",
					data:{
						createDate: "",
						creater: "",
						defaultFlag: self.form.defaultFlag ? "1" : "0",
						delFlag: "",
						editDate: "",
						editer: "",
						paraClass: self.form.paraClass,
						paraCode: self.form.paraCode,
						paraDesc: self.form.paraDesc,
						paraEkey: self.form.paraEkey,
						paraId: "",
						paraKey: self.form.paraKey,
						paraName: self.form.paraName,
						paraSort: self.form.paraSort,
						paraType: self.form.paraType,
						paraValue: "",
						parentparaId: ""
					}

				};
				self.$http.post(`${process.env.NODE_ENV}/admin/dict/save`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("添加数据字典成功！");
							self.searchForPage();
							self.form = {};
							self.dialogFormVisible = false;
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},

			editDict(){
				let self = this;
				self.editForm.defaultFlag = self.editForm.defaultFlag ? "1" : "0";
				let queryParam = {
					code:"0",
					msg:"",
					data:self.editForm
				}
				self.$http.post(`${process.env.NODE_ENV}/admin/dict/update`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("修改数据字典成功！");
							self.searchForPage();
							self.editForm = {};
							self.dialogEditFormVisible = false;
						}

					})
					.catch(function(error) {
						console.log(error);
					});
			},

			//线损数据导入
			showImportDialog(){
				this.dialogImportFormVisible = true;
			},
			handleExceed(file, fileList) {
				this.$message.warning(`最多只能上传${fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//校验文件格式和文件大小
			beforeUpload(file){
				let type = file.name.substring(file.name.indexOf(".")+1,file.name.length);
				console.log("type："+type);
				const isXLS = type === 'xls' || 'xlsx';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isXLS) {
					this.$message.error('上传的文件必须为xls/xlsx格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传的文件大小不能超过 2MB!');
				}
				return isXLS && isLt2M;

			},
			submitUpload(){
				this.$refs.upload.submit();
			},
			handleSuccess(res){
				console.log(res);
				if(res.code == 0){
					this.success("导入成功！")
					this.dialogImportFormVisible = false;
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							filter_parameters:{
								tradePathName:this.tradePathName
							},
							page: this.currentPage,
							limit: this.pageSize
						}

					};
					var url = res.data;
					this.$http.post(`${process.env.NODE_ENV}${url}`,queryParam)
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

<style scoped>
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
	}

</style>
