<template>
    <div id="all">
        <div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
            <el-button type="primary" @click="generate()" size="small">生成</el-button>

			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="区间类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.interval_type" placeholder="区间类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="keyValueItem in intervalTypeList"
												:key="keyValueItem.paraCode"
												:label="keyValueItem.paraKey"
												:value="keyValueItem.paraCode">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="结算类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.settlement_type" placeholder="区间类型" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="keyValueItem in settlementTypeList"
												:key="keyValueItem.paraCode"
												:label="keyValueItem.paraKey"
												:value="keyValueItem.paraCode">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="通道" :label-width="formLabelWidth">
										<el-select v-model="searchList.passageway" placeholder="通道" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in transChannelOptions"
												:key="item. transChannelCode"
												:label="item.transChannelName"
												:value="item. transChannelCode">
											</el-option>
										</el-select>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="年份" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.year"
											type="year"
											size="mini"
											placeholder="选择年份">
										</el-date-picker>

									</el-form-item>
									<el-form-item label="月份" :label-width="formLabelWidth">
										<el-select v-model="searchList.month" placeholder="请选择" size="mini">
											<el-option
												v-for="item in monthList"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="生成状态" :label-width="formLabelWidth">
										<el-select v-model="searchList.status" placeholder="生成状态" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="keyValueItem in settlementStateList"
												:key="keyValueItem.paraCode"
												:label="keyValueItem.paraKey"
												:value="keyValueItem.paraCode">
											</el-option>
										</el-select>
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
            <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="monthResultId" label="月度结果编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="areaType" label="区间类型" width="120" align="center">
                </el-table-column>
                <el-table-column prop="executeType" label="交易类型" width="120" align="center">
                </el-table-column>
                <el-table-column prop="settlementType" label="结算类型" width="120" align="center">
                </el-table-column>
				<el-table-column prop="settlementMemberType" label="成员类型" width="120" align="center">
				</el-table-column>
                <el-table-column prop="settlementMemberName" label="结算成员名称" width="120" align="center">
                </el-table-column>

				<el-table-column prop="transChannelName" label="通道名称" width="120" align="center">
				</el-table-column>
                <el-table-column prop="electricPrice" label="电价" width="120" align="center">
                </el-table-column>
                <el-table-column prop="quantity" label="电量" width="120" align="center">
                </el-table-column>
                <el-table-column prop="electricFee" label="电费" width="150" align="center">
                </el-table-column>
                <el-table-column prop="resultYear" label="年份" width="120" align="center">
                </el-table-column>
                <el-table-column prop="resultMonth" label="月份" width="120" align="center">
                </el-table-column>
                <el-table-column prop="dayResultDate" label="日期" width="120" align="center">
                </el-table-column>

				<el-table-column prop="monthCalculateState" label="生成状态" width="120" align="center">
				</el-table-column>
              </el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
        </div>


        <el-dialog title="生成结算单" :visible.sync="dialogFormVisible" class="elDialog">
            <el-form :model="settlementList"  :rules="rules"  ref="settlementList" >
                <div class="flx" style="display:flex">
                    <el-form-item label="区间类型" :label-width="formLabelWidth" prop="interval_type">
						<el-select v-model="settlementList.interval_type" placeholder="区间类型" clearable class="timeInput inputSize" size="mini">
							<el-option
								v-for="keyValueItem in intervalTypeList"
								:key="keyValueItem.paraCode"
								:label="keyValueItem.paraKey"
								:value="keyValueItem.paraCode">
							</el-option>
						</el-select>
                    </el-form-item>
                    <el-form-item label="结算类型" :label-width="formLabelWidth" size="mini" prop="settlement_type">
						<el-select v-model="settlementList.settlement_type" placeholder="区间类型" clearable class="timeInput inputSize" size="mini">
							<el-option
								v-for="keyValueItem in settlementTypeList"
								:key="keyValueItem.paraCode"
								:label="keyValueItem.paraKey"
								:value="keyValueItem.paraCode">
							</el-option>
						</el-select>
                    </el-form-item>
                </div>
                <div class="flx" style="display:flex">
                    <el-form-item label="通道" :label-width="formLabelWidth" prop="passageway">
						<el-select v-model="settlementList.passageway" placeholder="通道" clearable class="timeInput inputSize" size="mini">
							<el-option
								v-for="item in transChannelOptions"
								:key="item. transChannelCode"
								:label="item.transChannelName"
								:value="item. transChannelCode">
							</el-option>
						</el-select>
                    </el-form-item>
					<el-form-item label="年份" :label-width="formLabelWidth" prop="year">
						<el-date-picker
							v-model="settlementList.year"
							value-format="yyyy"
							type="year"
							size="mini"
							placeholder="选择年份">
						</el-date-picker>

					</el-form-item>

                </div>
                <div class="flx" style="display:flex">
					<el-form-item label="月份" :label-width="formLabelWidth" prop="month">
						<el-select v-model="settlementList.month" placeholder="请选择" size="mini">
							<el-option
								v-for="item in monthList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
                </div>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="sureGenerate('settlementList')" size="mini">生成</el-button>
            </div>
        </el-dialog>









	</div>

</template>

<script>
export default {
    name: "basics-m-tab3",
    data() {
        return {
			searchList:{
			  /*  billStartDate:"", /!*账单期间(自)*!/
				billEndDate:"", /!*账单期间 (至)*!/
				settlement_status:"", /!*结算单状态*!/
				settlement_code:"", /!*结算单编号*!/
				region:"", /!*区域*!/
				province:"", /!*省份*!/
				market_type:"", /!*市场成员类型*!/
				sub_group:"" ,/!*隶属集团*!/
				settUnit_name:"", /!*结算单元名称*!/
				settUnit_code:"",  /!*结算单元编号*!/
				market_name:"",  /!*所属市场成员名称*!/
				market_code:"",  /!*市场成员编号*!/*/
				interval_type:"", /*区间类型*/
				settlement_type:"", /*结算类型*/
				passageway:"", /*通道*/
				year:"", /*年份*/
				month:"",/*月份*/
				status:"", /*状态*/
			},
			settlementList:{
				interval_type:"", /*区间类型*/
				settlement_type:"", /*结算类型*/
				passageway:"", /*通道*/
				year:"", /*年份*/
				month:"",/*月份*/
			},
			monthList:[
				{label:"一月",value:"1"},
				{label:"二月",value:"2"},
				{label:"三月",value:"3"},
				{label:"四月",value:"4"},
				{label:"五月",value:"5"},
				{label:"六月",value:"6"},
				{label:"七月",value:"7"},
				{label:"八月",value:"8"},
				{label:"九月",value:"9"},
				{label:"十月",value:"10"},
				{label:"十一月",value:"11"},
				{label:"十二月",value:"12"},
			],

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
			intervalTypeList:[], /*区间类型*/
			settlementTypeList:[], /*结算类型*/
			settlementStateList:[
				{paraCode:"01",paraKey:"未生成结算单"},
				{paraCode:"02",paraKey:"已生成结算单"},
			], /*生成状态*/
            // 表格数据
            tableData: [],
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
			dialogSheetFormVisible:false,
			tableData3: [
			    {
				date: '2016-05-03',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-04',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-01',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-08',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-06',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-07',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}],
			pageSizesObjectList:[],
			settlementTypeList:[],
			transChannelOptions:[],
			rules:{
				interval_type: [
					{ required: true, message: '请选择区间类型', trigger: 'blur' },
				],
				settlement_type: [
					{ required: true, message: '请选择结算类型', trigger: 'blur' },
				],
				passageway: [
					{ required: true, message: '请选择通道', trigger: 'blur' },
				],
				year: [
					{ required: true, message: '请选择年份', trigger: 'blur' },
				],
				month: [
					{ required: true, message: '请选择月份', trigger: 'blur' },
				]



			},


        };
    },
	created(){
		this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		/*结算类型*/
		this.$util.dictory.getItemsByDicKey("settlement_type","settlementTypeList",this);
		/*区间类型*/
		this.$util.dictory.getItemsByDicKey("smecarea_type","intervalTypeList",this);
		 /*生成状态(月)*/
	/*	this.$util.dictory.getItemsByDicKey("mcrdc_state","settlementStateList",this);*/

	},
	mounted() {
        this.getTranchannel()
		this.getPageData();
	},
    methods: {
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


		getPageData() {
			var queryParam = {
				code: 0,
				data: {
					page: this.currentPage,
					limit: this.pageSize,
					filter_parameters:{
						areaType:this.searchList.interval_type, /*区间类型*/
						settlementMemberType:this.searchList.settlement_type, /*结算类型*/
						transChannelCode:this.searchList.passageway, /*通道名称*/
						resultYear:this.searchList.year,  /*年份*/
						resultMonth:this.searchList.month, /*月份*/
						monthCalculateState:this.searchList.status, /*生成状态*/
					}
				},
				msg: "string"
			}

			 this.$http.post(`${process.env.NODE_ENV}/spotmarket/ssg/jsonlist`,queryParam)
			 	.then((response) => {
			 		this.total = response.data.data.total;
			 		this.pageSize = response.data.data.size;
			         this.tableData = response.data.data.records;
			 	})
			 	.catch(function(error) {
			 		console.log(error);
			 	});

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

		/*结算单生成*/
		generate(){
		   this.dialogFormVisible=true;

		   /*调用接口*/


		},
		sureGenerate(formName){
			/*调用接口*/
			/*this.settlementList,*/
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var queryParam = {
						code: 0,
						data:{
							areaType:this.settlementList.interval_type, /*区间类型*/
							settlementType:this.settlementList.settlement_type, /*结算类型*/
							transChannelCode:this.settlementList.passageway, /*通道名称*/
							resultYear:this.settlementList.year,  /*年份*/
							resultMonth:this.settlementList.month, /*月份*/
						},
						msg: "string"
					}
					this.$http.post(`${process.env.NODE_ENV}/spotmarket/ssg/create`,queryParam)
						.then((response) => {
							if(response.data.code == 0){
								this.success("生成成功！");
								//self.searchForPage();
								this.settlementList={}
								this.dialogFormVisible = false;
							}

							this.getPageData()

						})
						.catch(function(error) {
							console.log(error);
						});

				} else {
					console.log('error submit!!');
					return false;
				}
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

.tableBox{
	.title{
		border-bottom: 2px solid  #000000;
		h3{
			height: 30px;
			line-height: 30px;
			font-size: 18px;
			font-weight: 700;
			text-align: center;
		}
		p{
			text-align: center;
		}
	}
	.top{
		p{
			height: 30px;
			line-height: 30px;
			font-size: 14px;
		}

	}
}


.elDialog{
	.el-date-editor.el-input, .el-date-editor.el-input__inner {
		width: 188px !important;
	}
}

</style>
<style>
	.el-date-editor.el-input, .el-date-editor.el-input__inner {
		width: 215px !important;
	}

</style>
