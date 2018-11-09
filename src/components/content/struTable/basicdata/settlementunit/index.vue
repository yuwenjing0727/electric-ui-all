<template>
	<div id="all">
		<div class="btnBox">
            <label style="font-size: 14px;">结算单元类型</label>
			<el-select v-model="settlementUnitType" placeholder="请选择类型" size="small">
				<el-option v-for="keyValueItem in settlementUnittypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
			</el-select>
			<el-button type="primary" size="small" @click="searchForPage">查询</el-button>
			<el-button type="primary" size="small" @click="showCreateDialogForm">添加</el-button>
			<el-button type="primary" size="small">导入</el-button>
			<el-button type="primary" size="small">导出</el-button>
            <el-button type="primary" size="small" @click="handleClick()">编辑</el-button>
            <el-button type="primary" size="small" @click="del(scope.row)">删除</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
				<!--	<el-table-column header-align="center" prop="settlementUnitId" label="结算单元类型编码">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitType" label="结算单元类型">
					</el-table-column>-->
					<el-table-column header-align="center" prop="settlementUnitCode" label="结算单元编码">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitName" label="结算单元名称">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitType" label="结算单元类型">
					</el-table-column>
					<el-table-column header-align="center" prop="memberShortName" label="市场成员简称">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="orgId" label="省公司">
					</el-table-column>-->
					<el-table-column header-align="center" prop="settlementUnitStatus" label="结算单元状态">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="effectDate" label="生效时间">
					</el-table-column>
					<el-table-column header-align="center" prop="invalidDate" label="失效时间">
					</el-table-column>
					<el-table-column header-align="center" prop="marketMemberId" label="所属市场成员">
					</el-table-column>
					<el-table-column header-align="center" prop="installedCapacity" label="装机容量">
					</el-table-column>
					<el-table-column header-align="center" prop="generationType" label="发电类型">
					</el-table-column>
					<el-table-column header-align="center" prop="crewType" label="机组类型">
					</el-table-column>
					<el-table-column header-align="center" prop="settlementUnitStatus" label="状态">
					</el-table-column>-->
					<!-- <el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form">
				<div class="flx">
					<el-form-item label="类型编码" :label-width="formLabelWidth">
						<el-input v-model="form.settlementUnitTypeCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属市场成员" :label-width="formLabelWidth">
						<el-input v-model="form.marketMemberId" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结算单元类型" :label-width="formLabelWidth">
						<el-select v-model="form.settlementUnitType" placeholder="请选择类型">
							<el-option v-for="keyValueItem in settlementUnittypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="装机容量" :label-width="formLabelWidth">
						<el-input v-model="form.installedCapacity" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结算单元编码" :label-width="formLabelWidth">
						<el-input v-model="form.settlementUnitCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="发电类型" :label-width="formLabelWidth">
						<el-select v-model="form.generationType" placeholder="请选择发电类型">
							<el-option v-for="keyValueItem in generationTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结算单元名称" :label-width="formLabelWidth">
						<el-input v-model="form.settlementUnitName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="机组类型" :label-width="formLabelWidth">
						<el-select v-model="form.crewType" placeholder="请选择发电类型">
							<el-option v-for="keyValueItem in crewTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="生效时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="form.effectDate"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							type="date"
							placeholder="生效时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-select v-model="form.settlementUnitStatus" placeholder="请选择状态">
							<el-option v-for="keyValueItem in settlementUnitstatusList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="失效时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="form.invalidDate"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							type="date"
							placeholder="失效时间">
						</el-date-picker>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSettlementUnit">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form>
				<div class="flx">
					<el-form-item label="类型编码" :label-width="formLabelWidth">
						<el-input v-model="editForm.settlementUnitTypeCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="所属市场成员" :label-width="formLabelWidth">
						<el-input v-model="editForm.marketMemberId" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结算单元类型" :label-width="formLabelWidth">
						<el-select v-model="editForm.settlementUnitType" placeholder="请选择类型">
							<el-option v-for="keyValueItem in settlementUnittypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="装机容量" :label-width="formLabelWidth">
						<el-input v-model="editDetailForm.installedCapacity" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结算单元编码" :label-width="formLabelWidth">
						<el-input v-model="editForm.settlementUnitCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="发电类型" :label-width="formLabelWidth">
						<el-select v-model="editDetailForm.generationType" placeholder="请选择发电类型">
							<el-option v-for="keyValueItem in generationTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="结算单元名称" :label-width="formLabelWidth">
						<el-input v-model="editForm.settlementUnitName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="机组类型" :label-width="formLabelWidth">
						<el-select v-model="editDetailForm.crewType" placeholder="请选择发电类型">
							<el-option v-for="keyValueItem in crewTypeList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="生效时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editForm.effectDate"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							type="date"
							placeholder="生效时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-select v-model="editForm.settlementUnitStatus" placeholder="请选择状态">
							<el-option v-for="keyValueItem in settlementUnitstatusList" :key="keyValueItem.paraCode" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="失效时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editForm.invalidDate"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							type="date"
							placeholder="失效时间">
						</el-date-picker>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editSettlementUnit">修 改</el-button>
			</div>
		</el-dialog>

	</div>


</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				settlementUnitType:"",
				// 表格数据
				tableData: [
					/*{
						settlementUnitId:"",
						settlementUnitType:"发电机组",
						settlementUnitCode:"JSF00001",
						settlementUnitName:"1#机组",
						effectDate:"2017/5/1",
						invalidDate:"",
						marketMemberId:"大唐国际发电股份有限公司张家口发电厂",
						installedCapacity:"30MKV",
						generationType:"火电",
						crewType:"火电",
						settlementUnitStatus:"正常"
					},
					{
						settlementUnitId:"",
						settlementUnitType:"发电机组",
						settlementUnitCode:"JSF00001",
						settlementUnitName:"1#机组",
						effectDate:"2017/5/1",
						invalidDate:"",
						marketMemberId:"大唐国际发电股份有限公司张家口发电厂",
						installedCapacity:"30MKV",
						generationType:"火电",
						crewType:"火电",
						settlementUnitStatus:"正常"
					},
					{
						settlementUnitId:"",
						settlementUnitType:"发电机组",
						settlementUnitCode:"JSF00001",
						settlementUnitName:"1#机组",
						effectDate:"2017/5/1",
						invalidDate:"",
						marketMemberId:"大唐国际发电股份有限公司张家口发电厂",
						installedCapacity:"30MKV",
						generationType:"火电",
						crewType:"火电",
						settlementUnitStatus:"正常"
					}*/
				],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				selectData:[],
				// 弹窗显隐
				dialogFormVisible: false,
				// 修改弹窗显隐
				dialogEditFormVisible: false,

				// 新增数据
				form: {
					settlementUnitTypeCode:"",
					marketMemberId:"",
					settlementUnitType:"",
					settlementUnitCode:"",
					settlementUnitName:"",
					effectDate:"",
					settlementUnitStatus:"",
					invalidDate:"",

					installedCapacity:"",
					generationType:"",
					crewType:""
				},
				// 修改数据
				editForm: {},
				editDetailForm:{},
				formLabelWidth: '100px',
				settlementUnittypeList:[],
				generation_type:[],
				generationTypeList:[],
				crewTypeList:[],
				settlementUnitstatusList:[]

			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
			this.$util.dictory.getItemsByDicKey("settlement_unittype","settlementUnittypeList",this);
		},
		mounted() {
			this.getPageData();
		},
		methods: {
            // select选择框
            handleSelectionChange() {
				this.selectData = val;
            },
			del(s) {
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.get(`${process.env.NODE_ENV}/electric-sysmanage-service/sysRole/delete/${s.roleId}`)
						.then((response) => {
							if(response.data.data == true){
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
			handleClick() {
				let self = this;
				// 修改时判断只能选中一条数据
				if (self.selectData.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				self.dialogEditFormVisible = true;
				self.$util.dictory.getItemsByDicKey("settlement_unittype","settlementUnittypeList",this);
				self.$util.dictory.getItemsByDicKey("generation_type","generationTypeList",this);
				self.$util.dictory.getItemsByDicKey("crew_type","crewTypeList",this);
				self.$util.dictory.getItemsByDicKey("settlement_unitstatus","settlementUnitstatusList",this);
				self.$http.get(`${process.env.NODE_ENV}/admin/dict/info/${self.selectData[0].settlementUnitId}`)
					.then((response) => {
						if(response.data.code == 0){
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
							settlementUnitType:this.settlementUnitType
						},
						page: this.currentPage,
						limit: this.pageSize
					}

				};
				this.$http.post(`${process.env.NODE_ENV}/basicdata/settlementunit/jsonlist`,queryParam)
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
				self.$util.dictory.getItemsByDicKey("settlement_unittype","settlementUnittypeList",this);
				self.$util.dictory.getItemsByDicKey("generation_type","generationTypeList",this);
				self.$util.dictory.getItemsByDicKey("crew_type","crewTypeList",this);
				self.$util.dictory.getItemsByDicKey("settlement_unitstatus","settlementUnitstatusList",this);
			},

			addSettlementUnit(){
				let self = this;
				var queryParam = {
					code:"0",
					msg:"",
					data:{
						settlementUnit:{
							settlementUnitTypeCode:self.form.settlementUnitTypeCode,
							marketMemberId:self.form.marketMemberId,
							settlementUnitType:self.form.settlementUnitType,
							settlementUnitCode:self.form.settlementUnitCode,
							settlementUnitName:self.form.settlementUnitName,
							effectDate:self.form.effectDate,
							settlementUnitStatus:self.form.settlementUnitStatus,
							invalidDate:self.form.invalidDate
						},
						settlementUnitDetail:{
							installedCapacity:self.form.installedCapacity,
							generationType:self.form.generationType,
							crewType:self.form.crewType
						}
					}

				};
				self.$http.post(`${process.env.NODE_ENV}/admin/dict/save`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("添加结算单元成功！");
							self.searchForPage();
							self.form = {};
							self.dialogFormVisible = false;
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},

			editSettlementUnit(){
				let self = this;
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
