<template>
	<div id="all">
		<div class="btnBox" >
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<el-button type="primary"  size="small" @click="addPrice()">新增</el-button>
			<el-button type="primary"  size="small" @click="editPrice()">修改</el-button>
			<el-button type="primary"  size="small" @click="deletePrice()">删除</el-button>
			<el-button type="primary"  size="small" @click="checkPrice()">详情</el-button>
			<el-button type="primary"  size="small" @click="exportExcel()" >导出</el-button>

			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="价格方案编码" :label-width="formLabelWidth">
										<el-input placeholder="价格方案编码" style="width:200px;"  size="mini"  prefix-icon="el-icon-search" v-model="searchList.priceScheme_code"></el-input>
									</el-form-item>
									<el-form-item label="价格方案名称" :label-width="formLabelWidth">
										<el-input placeholder="价格方案名称" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.priceScheme_name"></el-input>
									</el-form-item>
									<el-form-item label="通道编码" :label-width="formLabelWidth">
										<el-input placeholder="通道编码" size="mini"  prefix-icon="el-icon-search" v-model="searchList.passageway_code"></el-input>
									</el-form-item>

								</div>
								<div class="flx">
									<el-form-item label="通道名称" :label-width="formLabelWidth">
										<el-input placeholder="通道名称"  v-model="searchList.passageway_name" size="mini"  prefix-icon="el-icon-search"></el-input>
									</el-form-item>
									<el-form-item :label-width="formLabelWidth">
										<el-button type="primary" @click="searchForPage" size="mini" >查询</el-button>
										<el-button type="primary" @click="reset()" size="mini" >重置</el-button>
									</el-form-item>
									<el-form-item :label-width="formLabelWidth">

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
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark"
						  @selection-change="handleSelectionChange">
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column header-align="center" prop="pricePlanCode" label="价格方案编号">
					</el-table-column>
					<el-table-column header-align="center" prop="pricePlanName" label="价格方案名称">
					</el-table-column>
					<el-table-column header-align="center" prop="transChannelId" label="通道编码">
					</el-table-column>
					<el-table-column header-align="center" prop="transChannelName" label="通道名称">
					</el-table-column>
					<el-table-column header-align="center" prop="totalTransPrice" label="累计输电价">
					</el-table-column>
					<el-table-column header-align="center" prop="totalNetLoss" label="累计网损">
					</el-table-column>

				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
							   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>

		<el-dialog title="新增价格方案" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="addformSearch" :rules="rules"  ref="addformSearch" >
				<div class="flx">
					<el-form-item label="价格方案编码" :label-width="formLabelWidth" prop="priceScheme_code">
						<el-input v-model="addformSearch.priceScheme_code" auto-complete="off" size="mini" ></el-input>
					</el-form-item>
					<!--<el-form-item label="价格方案明细编码" :label-width="formLabelWidth" prop="tradePathId">
					<el-input v-model="addformSearch.tradePathId" auto-complete="off" size="mini" ></el-input>
				</el-form-item>-->
					<el-form-item label="价格方案名称" :label-width="formLabelWidth" prop="priceScheme_name">
						<el-input v-model="addformSearch.priceScheme_name" auto-complete="off" size="mini"></el-input>
					</el-form-item>

				</div>
				<div class="flx">
					<el-form-item label="通道" :label-width="formLabelWidth" prop="passageway">
						<el-select v-model="addformSearch.passageway" placeholder="请选择" style="width: 160px" size="mini" @change="selectGet">
							<el-option
								v-for="item in transChannelOptions"
								:key="item.transChannelId"
								:label="item.transChannelName"
								:value="item.transChannelId">
							</el-option>
						</el-select>

					</el-form-item>
				</div>

	<div class="flx" style="float: right">
		<el-button type="primary"  size="mini" @click="conPath()" >配置路径</el-button>
	</div>

	<div class="el-table" style="margin-top: 0">
		<el-table :data="addRouteTableData" style="width: 100%;" border tooltip-effect="dark">
			<el-table-column header-align="center" prop="tradePathName" label="路径名称" width="auto">
			</el-table-column>
			<el-table-column header-align="center" prop="pathSort" label="路径序号" width="80"  type="index" >
			</el-table-column>
			<el-table-column header-align="center" prop="tradePathCode" label="路径编号">
			</el-table-column>
			<el-table-column header-align="center" prop="tradePathPrice" label="输电价(元/兆瓦时)"  width="140px">
			</el-table-column>
			<el-table-column header-align="center" prop="tradePathNetloss" label="网损(单位:%)" width="120px">
			</el-table-column>
			<el-table-column header-align="center" prop="sendSmUnitName
" label="售电方">
			</el-table-column>
			<el-table-column header-align="center" prop="transSmUnitName
" label="输电方">
			</el-table-column>
			<el-table-column header-align="center" prop="receiveSmUnitName" label="购电方">
			</el-table-column>
			<el-table-column fixed="right" label="排序操作" width="auto">
				<template slot-scope="scope">
					<i v-if="scope.$index!==0" @click="up(scope.$index,scope.row)" style="cursor: pointer;"><img src="static/img/up.png" alt="向上箭头" style="width: 18px;height: 18px"></i>
					<i v-if="scope.$index!==addRouteTableData.length-1"   @click="down(scope.$index)"  style="cursor: pointer;"><img src="static/img/down.png" alt="向下箭头" style="width: 18px;height: 18px"></i>
				</template>
			</el-table-column>

		</el-table>
	</div>
	<!--<div class="block">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
					   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>-->

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="savePrice('addformSearch')" size="mini">保存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="路径查询" :visible.sync="dialoRoute" class="elDialog">
			<el-form :model="pathSearchList">
				<div class="flx">
					<el-form-item label="路径名称" :label-width="formLabelWidth">
						<el-input v-model="pathSearchList.path_name" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="路径属性" :label-width="formLabelWidth">
						<el-select v-model="pathSearchList.path_attr" placeholder="请选择" size="mini" style="width: 160px">
							<el-option
								v-for="item in routerOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>


					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="送端机构" :label-width="formLabelWidth">
						<el-input v-model="pathSearchList.send_mechanism" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="受端机构" :label-width="formLabelWidth">
						<el-input v-model="pathSearchList.suffer_mechanism" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx" style="float: right">
					<el-button type="primary"  size="mini"  @click="pathSearch()">查询</el-button>
					<!--<el-button type="primary"  size="mini">修改</el-button>
					<el-button type="primary"  size="mini">删除</el-button>-->
				</div>
				<div class="el-table" style="margin-top: 0">
					<el-table :data="pathTableData" style="width: 100%" border tooltip-effect="dark"   @selection-change="handleSelectionpath">
						<el-table-column
							type="selection"
							width="55">
						</el-table-column>
						<el-table-column header-align="center" prop="tradePathName" label="路径名称" width="auto">

						</el-table-column>

						<el-table-column header-align="center" prop="tradePathCode" label="路径编号">
						</el-table-column>

						<el-table-column header-align="center" prop="tradePathPrice" label="输电价(元/兆瓦时)"  width="140px">
						</el-table-column>
						<el-table-column header-align="center" prop="tradePathNetloss" label="网损(单位:%)" width="120px">
						</el-table-column>
						<el-table-column header-align="center" prop="sendSmUnitName
" label="售电方">
						</el-table-column>
						<el-table-column header-align="center" prop="transSmUnitName
" label="输电方">
						</el-table-column>
						<el-table-column header-align="center" prop="receiveSmUnitName" label="购电方">
						</el-table-column>

					</el-table>
				</div>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
								   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialoRoute= false" size="mini">取 消</el-button>
				<el-button type="primary" @click="confirm()" size="mini">确认</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改价格方案" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editSearch" :rules="rules"  ref="editSearch">
				<div class="flx">
					<el-form-item label="价格方案编号" :label-width="formLabelWidth" prop="pricePlanCode">
						<el-input v-model="editSearch.pricePlanCode" auto-complete="off" size="mini" ></el-input>
					</el-form-item>
					<!--<el-form-item label="价格方案明细编码" :label-width="formLabelWidth" prop="tradePathId">
						<el-input v-model="editSearch.tradePathId" auto-complete="off" size="mini" ></el-input>
					</el-form-item>-->
					<el-form-item label="价格方案名称" :label-width="formLabelWidth" prop="pricePlanName">
					<el-input v-model="editSearch.pricePlanName" auto-complete="off" size="mini"></el-input>
				</el-form-item>


				</div>
				<div class="flx">

					<el-form-item label="通道" :label-width="formLabelWidth" prop="transChannelId">
						<el-select v-model="editSearch.transChannelId" placeholder="请选择" style="width: 260px" size="mini">
							<el-option
								v-for="item in transChannelOptions"
								:key="item.transChannelId"
								:label="item.transChannelName"
								:value="item.transChannelId">
							</el-option>
						</el-select>

					</el-form-item>
				</div>
				<div class="flx" style="float: right">
					<el-button type="primary"  size="mini" @click="editconPath()" >配置路径</el-button>
				</div>

				<div class="el-table" style="margin-top: 0">
					<el-table :data="editform" style="width: 100%;" border tooltip-effect="dark">
						<el-table-column header-align="center" prop="tradePathName"label="路径名称" width="auto">
						</el-table-column>
							<el-table-column header-align="center" prop="pathSort" label="路径序号" width="auto" type="index" >

						</el-table-column>
						<el-table-column header-align="center" prop="tradePathCode"label="路径编号">
						</el-table-column>
						<el-table-column header-align="center" prop="transElectricPrice"label="输电价(元/兆瓦时)"  width="140px">
						</el-table-column>
						<el-table-column header-align="center" prop="netLoss"label="网损(单位:%)" width="120px">
						</el-table-column>
						<el-table-column header-align="center" prop="sellMarketMemberId"label="售电方">
						</el-table-column>
						<el-table-column header-align="center" prop="transMarketMemberId"label="输电方">
						</el-table-column>
						<el-table-column header-align="center" prop="buyMarketMemberId"label="购电方">
						</el-table-column>
						<el-table-column fixed="right" label="排序操作" width="auto">
							<template slot-scope="scope">
								<i v-if="scope.$index!==0" @click="editUp(scope.$index)" style="cursor: pointer;"><img src="static/img/up.png" alt="向上箭头" style="width: 18px;height: 18px"></i>
								<i v-if="scope.$index!==addRouteTableData.length-1"   @click="editDown(scope.$index)"  style="cursor: pointer;"><img src="static/img/down.png" alt="向下箭头" style="width: 18px;height: 18px"></i>
							</template>
						</el-table-column>

					</el-table>
				</div>
				<!--<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
								   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>-->

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="editSure('editSearch')" size="mini">保存</el-button>
			</div>
		</el-dialog>


		<el-dialog title="价格方案详情" :visible.sync="dialogcheckFormVisible" class="elDialog">
			<el-form>
				<div class="flx">
					<el-form-item label="价格方案编号" :label-width="formLabelWidth">
						<el-input v-model="editSearch.pricePlanCode" auto-complete="off" size="mini"  disabled></el-input>
					</el-form-item>
					<!--<el-form-item label="价格方案明细编码" :label-width="formLabelWidth" prop="tradePathId">
						<el-input v-model="editSearch.tradePathId" auto-complete="off" size="mini" ></el-input>
					</el-form-item>-->
					<el-form-item label="价格方案名称" :label-width="formLabelWidth">
						<el-input v-model="editSearch.pricePlanName" auto-complete="off" size="mini" disabled></el-input>
					</el-form-item>

				</div>
				<div class="flx">

					<el-form-item label="通道" :label-width="formLabelWidth">
						<el-select v-model="editSearch.transChannelId" placeholder="请选择" style="width: 260px" disabled>
							<el-option
								v-for="item in transChannelOptions"
								:key="item.transChannelId"
								:label="item.transChannelName"
								:value="item.transChannelId">
							</el-option>
						</el-select>

					</el-form-item>
				</div>
					<div class="el-table" style="margin-top: 0;">
						<el-table :data="editform" style="width: 100%;" border tooltip-effect="dark">
							<el-table-column header-align="center" prop="tradePathName" label="路径名称" width="auto">
							</el-table-column>
							<el-table-column header-align="center" prop="tradePathCode" label="路径编号"width="auto">
							</el-table-column>
							<el-table-column header-align="center" prop="transElectricPrice"label="输电价(元/兆瓦时)"  width="140px">
							</el-table-column>
							<el-table-column header-align="center" prop="netLoss"label="网损(单位:%)" width="120px">
							</el-table-column>
							<el-table-column header-align="center" prop="sellMarketMemberId"label="售电方" width="auto">
							</el-table-column>
							<el-table-column header-align="center" prop="transMarketMemberId"label="输电方" width="auto">
							</el-table-column>
							<el-table-column header-align="center" prop="buyMarketMemberId"label="购电方" width="auto">
							</el-table-column>

						</el-table>
					</div>



			</el-form>
		</el-dialog>
	</div>


</template>

<script>
	/*import { isvalidatemobile,validateEmail } from '@/utils/validate'*/
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				searchBoxFlag:false,
				searchList:{
					priceScheme_code:"",
					priceScheme_name:"",
					passageway_name:"",
					passageway_code:"",
				},
				clearTypeOption:[
					{
						value: '01',
						label: '日前出清'
					},
					{
						value: '02',
						label: '日内出清'
					},
					{
						value: '03',
						label: '实时出清'
					},
				],
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				defaultCheckedKeys:[],
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				formLabelWidth:"136px",
				dialogFormVisible:false,
				addformSearch:{
					priceScheme_code:"",
					tradePathId:"",
					priceScheme_name:"",
					passageway:"",
					passageway_name:"",
				},
				pathSearchList:{
				    path_name:"",
					path_attr:"",
                    send_mechanism:"",
					suffer_mechanism:"",
				},
				addform:{
					priceScheme_code:"",
					priceScheme_name:"",
					passageway:"",
					passageway_name:"",
					passageway_code:"",
					sendEndOrg:"",
					receivingEndOrg:"",
				},

				editSearch:{},
				editform:[],

				dialogEditFormVisible:false,
				dialogpassageway:false,
				dialoRoute:false,
				routerOptions:[
					{label:"省间直流",value:"省间直流"},
					{label:"省内共享网络",value:"省内共享网络"},
					{label:"区域共享网络",value:"区域共享网络"},
				],
				addRouteTableData:[],
				RouteTableData:[],
				pathTableData:[],
				transChannelOptions:[],
				multipleSelection: [], /*主表所选项*/
				addEditFlag:"",
				dialogcheckFormVisible:false,
				selectionpathData:[],
				rules:{
					priceScheme_code: [
						{ required: true, message: "价格方案编号不能为空", trigger: 'blur' },
					],
					/*tradePathId:[
						{ required: true, message: "价格方案明细编码不能为空", trigger: 'blur' },

					],*/
					priceScheme_name: [
						{ required: true, message: '价格方案名称不能为空', trigger: 'blur' },
						{  max: 50, message: '长度在 50个字符之内', trigger: 'blur' }
					],
					passageway:[
						{ required: true, message: '请选择通道', trigger: 'blur' },
					],
					pricePlanCode:[
						{ required: true, message: '', trigger: 'blur' },
					],




				},
				routeData:[],
				editRouteData:[]



			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
			/*this.$util.dictory.getItemsByDicKey("pathline_type","routerOptions",this);
*/
			/*this.$util.dictory.getItemsByDicKey("voidance_type","clearTypeOption",this);*/

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
						filter_parameters:{
							"pricePlanCode":this.searchList.priceScheme_code,
							"transChannelId":this.searchList.passageway_code,
							"pricePlanName":this.searchList.priceScheme_name,
							"transChannelName":this.searchList.passageway_name
						},
						page: this.currentPage,
						limit: this.pageSize
					}
				};
				this.$http.post(`${process.env.NODE_ENV}/spotmarket/priceplan/list`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							console.log(response)
							console.log("11111111111")
							this.total = response.data.data.total;
							this.pageSize = response.data.data.size;
							this.tableData = response.data.data.records;
							console.log(this.tableData)
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
			/*查询通道数据*/
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
			/*新增价格方案*/
			addPrice(){
			    this.dialogFormVisible=true;
				this.getTranchannel()
				this.addformSearch={
					priceScheme_code:"",
					priceScheme_name:"",
					passageway:"",
				    };
				this.addRouteTableData=[]



			},
			/*新增价格方案保存*/
			savePrice(addformSearch){
				let self = this;
				console.log(addformSearch)
				console.log(self.$refs[addformSearch])
				self.$refs[addformSearch].validate((valid) => {
					if (valid) {
						let queryParam = {
							"code": "0",
							"msg": "",
							"data": {
								"smPricePlan":{
									"pricePlanCode":self.addformSearch.priceScheme_code,
									"pricePlanName":self.addformSearch.priceScheme_name,
									"tradePathId":self.addformSearch.tradePathId,
									"transChannelId":self.addformSearch.passageway,
									"transChannelName":self.addformSearch.passageway_name,
									"pricePlanStatus":"01",
									"pricePlanType":"01",
									"pricePlanTimeType":"01",
									"pricePlanTradeType":"01"
								},
								"smPricePlanDetail":this.addRouteTableData,
							}
						}
						self.$http.post(`${process.env.NODE_ENV}/spotmarket/priceplan/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加成功！");
									//self.searchForPage();
									self.addFrom={}
									self.dialogFormVisible = false;
									self.getPageData()
								}else{
									self.prompt(response.data.msg);
									self.dialogFormVisible = false;
								}
							})
							.catch(function(error) {
								console.log(error);
							});

					}else{
						console.log('error submit!!');
						return false;
					}

				});

			},
			/*配置路径*/
			conPath(){
              this.dialoRoute=true;
				let self = this;
				this.addEditFlag='addPath';
				let queryParam = {
					"code": "0",
					"msg": "",
					"data": {
						"page":self.currentPage,
						"limit":self.pageSize,
						"filter_parameters":{
							path_name:self.pathSearchList.path_name,
							path_attr:self.pathSearchList.path_attr,
							send_mechanism:self.pathSearchList.send_mechanism,
							suffer_mechanism:self.pathSearchList.suffer_mechanism,
						}
					}
				}
				this.$http.post(`${process.env.NODE_ENV}/basicdata/tradepath/jsonlist`,queryParam)
					.then((response) => {
						console.log("路径")
						console.log(response)
						if(response.data.code == 0){
						    self.pathTableData=response.data.data.records;
                         console.log( this.pathTableData)
						}
					})
					.catch(function(error) {
						console.log(error);
					});


			},
			/*路径查询*/
			pathSearch(){
				this.conPath()

			},
			/*主表选中的某一天数据*/
			handleSelectionChange(val) {
				this.multipleSelection = val;

			},
			/*价格方案修改*/
			editPrice(){
				this.dialogEditFormVisible=true;
			    let  self=this
				if (self.multipleSelection.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
			  /*  this.dialogEditFormVisible=true;*/
				this.getTranchannel();

				this.$http.get(`${process.env.NODE_ENV}/spotmarket/priceplan/info/${self.multipleSelection[0].pricePlanId}`)
					.then((response) => {
						if(response.data.code == 0) {
							console.log("编辑")
							self.editform=response.data.data.records;
							console.log(self.editform)
							self.editSearch={
								pricePlanCode:self.editform[0].pricePlanCode,
								pricePlanName:self.editform[0].pricePlanName,
								transChannelId:self.editform[0].transChannelId,

							};

						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},
			/*选择的路径*/
			handleSelectionpath(val){
			    /*this.selectionpathData=val;*/
				this.selectionpathData=val;
				console.log(this.selectionpathData)





			},

			/*修改价格方案保存*/
			editSure(editSearch){
			    this.dialogEditFormVisible=true;
				let self = this;
				this.$refs[editSearch].validate((valid) => {
					if (valid) {
						let queryParam = {
							"code": "0",
							"msg": "",
							"data": {
								"smPricePlan":{
									"pricePlanId":self.multipleSelection[0].pricePlanId,
									"pricePlanCode":self.editSearch.pricePlanCode,
									"pricePlanName":self.editSearch.pricePlanName,
									"transChannelId":self.editSearch.transChannelId,
								},
								"smPricePlanDetail":this.editform,
							}
						}
						self.$http.post(`${process.env.NODE_ENV}/spotmarket/priceplan/update`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("修改成功！");
									//self.searchForPage();
									self.addFrom={}
									self.dialogEditFormVisible = false;
									self.getPageData()
								}else{
									self.prompt(response.data.msg);
									self.dialogEditFormVisible= false;
								}


							})
							.catch(function(error) {
								console.log(error);
							});

					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			/*修改路径*/
			editconPath(){
			    let  self=this
				this.dialoRoute=true;
				this.addEditFlag='editPath';
				let queryParam = {
					"code": "0",
					"msg": "",
					"data": {
						"page":self.currentPage,
						"limit":self.pageSize,
						"filter_parameters":{
							path_name:self.pathSearchList.path_name,
							path_attr:self.pathSearchList.path_attr,
							send_mechanism:self.pathSearchList.send_mechanism,
							suffer_mechanism:self.pathSearchList.suffer_mechanism,
						}
					}
				}
				this.$http.post(`${process.env.NODE_ENV}/basicdata/tradepath/jsonlist`,queryParam)
					.then((response) => {
						console.log("路径")
						console.log(response)
						if(response.data.code == 0){
							self.pathTableData=response.data.data.records;
							console.log( this.pathTableData)
						}
					})
					.catch(function(error) {
						console.log(error);
					});


			},
			/*价格方案删除*/
			deletePrice(){
				let self = this;
				let  deletesId=[];
				for(var  i=0;i<self.multipleSelection.length;i++){
					deletesId.push(self.multipleSelection[i].pricePlanId)
				}
				let queryParam = {
					"code": "0",
					"msg": "",
					"data": {
						"ids":deletesId

					}
				}

				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/spotmarket/priceplan/deletes/`,queryParam)
						.then((response) => {
							if(response.data.code ==0 ){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.getPageData();
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
			/*查看价格方案*/
			checkPrice(){
				let  self=this
				if (self.multipleSelection.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				console.log(self.multipleSelection)
				this.dialogcheckFormVisible=true;
				this.getTranchannel();
				this.$http.get(`${process.env.NODE_ENV}/spotmarket/priceplan/info/${self.multipleSelection[0].pricePlanId}`)
					.then((response) => {
						if(response.data.code == 0) {
							console.log("编辑")
							self.editform=response.data.data.records;
							self.editSearch={
								pricePlanCode:self.editform[0].pricePlanCode,
								pricePlanName:self.editform[0].pricePlanName,
								transChannelId:self.editform[0].transChannelId,
							};

						}

					})
					.catch(function(error) {
						console.log(error);
					});


			},
			/*确认*/
			confirm(){
			   this.dialoRoute= false
				if(this.addEditFlag=='addPath'){
					this.addRouteTableData=this.selectionpathData;

				}else if(this.addEditFlag=='editPath'){
					this.editform=this.selectionpathData

				}

			},
			/*导出*/
			exportExcel(){
				var queryParam =  {
					code:"0",
					msg:"",
					data:{
						filter_parameters:{
							"pricePlanCode":this.searchList.priceScheme_code,
							"transChannelId":this.searchList.passageway_code,
							"pricePlanName":this.searchList.priceScheme_name,
							"transChannelName":this.searchList.passageway_name
						}
					}
				};

				window.open(`${process.env.NODE_ENV}/spotmarket/priceplan/export1?requestJson=`+JSON.stringify(queryParam));

			},

		/*下拉框选中事件*/
		selectGet(vId){//这个vId也就是value
			let obj = {};
			obj = this.transChannelOptions.find((item)=>{//这里的userList就是上面遍历的数据源
				return item.transChannelId === vId;//筛选出匹配数据
			});
			this.addformSearch.passageway_name=obj.transChannelName

			console.log(obj.transChannelName);//我这边的name就是对应label的
		},

			/*表格行与行交换位置*/
			up(index,row){
				this.routeData=[].concat(this.addRouteTableData)
				var i=index, j=i-1,temp = this.routeData[i];
				var temp =this.routeData[i];
				this.routeData[i]=this.routeData[j];
				this.routeData[j] = temp;
				this.addRouteTableData=[].concat(this.routeData)

			},
			down(index){
				this.routeData=[].concat(this.addRouteTableData)
				var i=index,j=i+1,temp = this.routeData[i];
				this.routeData[i] = this.routeData[j];
				this.routeData[j] = temp;
				this.addRouteTableData=[].concat(this.routeData)
			},

			editUp(index){
				this.editRouteData=[].concat(this.editform)
				var i=index, j=i-1,temp = this.editRouteData[i];
				var temp =this.editRouteData[i];
				this.editRouteData[i]=this.editRouteData[j];
				this.editRouteData[j] = temp;
				this.editform=[].concat(this.editRouteData)
			},
			editDown(index){
				this.editRouteData=[].concat(this.editform)
				var i=index,j=i+1,temp = this.editRouteData[i];
				this.editRouteData[i] = this.editRouteData[j];
				this.editRouteData[j] = temp;
				this.editform=[].concat(this.editRouteData)
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

			},
			'addRouteTableData':function (newval,oldval) {
			    console.log("2222")
				console.log(newval);
			},
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

	.el-input--mini{
		width: 160px  !important;
	}
	.elDialog{
		.el-dialog__body{
			.flx{
				display: flex;
				.el-form-item{
					width: 100% !important;
				}
			}
		}

	}

	.el-input.el-form-item__error {
		top: 76% !important;

	}

</style>

<style lang="less">
	// 添加窗口样式
	.elDialog {
		.el-dialog__body {
			height: 400px;
			overflow: scroll;
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
	.el-form-item__error {
		top: 76% !important;

	}
</style>
