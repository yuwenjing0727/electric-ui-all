<template>
    <div id="all">
        <div class="btnBox">
			<!--<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>-->
            <el-button type="primary" @click="check()" size="small">查看明细</el-button>
			<el-button type="primary"  size="small" @click="approval()">审批</el-button>
			<div style="margin-top: 20px;">
				<!--<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<el-form-item label="任务类型" :label-width="formLabelWidth">
										<el-select v-model="searchList.task_type" placeholder="通道" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in transChannelOptions"
												:key="item.transChannelId"
												:label="item.transChannelName"
												:value="item.transChannelId">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="任务状态" :label-width="formLabelWidth">
										<el-select v-model="searchList.task_state" placeholder="流程状态" clearable class="timeInput inputSize" size="mini">
											<el-option
												v-for="item in settlementTypeList"
												:key="item.paraCode"                                                                       :label="item.paraKey"                                                                     :value="item.paraCode">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="任务名称" :label-width="formLabelWidth">

										<el-input placeholder="业务名称" style="width:200px;"  size="mini"  prefix-icon="el-icon-search" v-model="searchList.task_name"></el-input>
									</el-form-item>
								</div>
								<div class="flx">
									<el-form-item label="申请开始时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.appStartDate"
											type="month"
											size="mini"
											placeholder="选择月份">
										</el-date-picker>
									</el-form-item>
									<el-form-item label="申请结束时间" :label-width="formLabelWidth">
										<el-date-picker
											v-model="searchList.appEndDate"
											type="month"
											size="mini"
											placeholder="选择月份">
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
				</el-collapse-transition>-->
			</div>

        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%"   @selection-change="handleSelectionChange" >
				<el-table-column type="selection" width="55" align="center">
				</el-table-column>
                <el-table-column prop="flowTaskId" label="待办编号"  align="center">
                </el-table-column>
                <el-table-column prop="formDataId" label="业务编号" align="center">
                </el-table-column>
                <el-table-column prop="approvalId" label="申请人"  align="center">
                </el-table-column>
                <el-table-column prop="createDate" label="申请时间"  align="center">
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称"  align="center">
                </el-table-column>
				<!--<el-table-column prop="taskActivityName" label="任务活动名称" width="120" align="center">
				</el-table-column>-->
                <el-table-column prop="taskType" label="任务类型"  align="center">
                </el-table-column>
                <el-table-column prop="taskState" label="任务状态 " align="center">
                </el-table-column>
                <el-table-column prop="approvalDate" label="审批时间" align="center">
                </el-table-column>
              </el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
        </div>


        <el-dialog title="审批" :visible.sync="dialogFormVisible" class="elDialog">
            <el-form :model="form">
                <div class="flx" style="display:flex">
                    <el-form-item label="审批意见:" :label-width="formLabelWidth">
						<el-input
							type="textarea"
							placeholder="请输入内容"
							v-model="form.app_dec">
						</el-input>
                    </el-form-item>

                </div>
				<div class="flx">
					<el-form-item label="审批状态" :label-width="formLabelWidth" size="mini">
						<el-radio v-model="form.app_state" label="01">同意</el-radio>
						<el-radio v-model="form.app_state" label="02">不同意</el-radio>
					</el-form-item>
				</div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="sureApproval()" size="mini">确定</el-button>
            </div>
        </el-dialog>

		<!--<el-dialog title="查看详细" :visible.sync="dialogcheckFormVisible" class="elDialog">
			<el-form :data="editData">
				<div class="flx">
					<el-form-item label="待办编号" :label-width="formLabelWidth">
						<el-input v-model="editData.flowTaskId" auto-complete="off" size="mini"  disabled></el-input>
					</el-form-item>
					<el-form-item label="业务编号" :label-width="formLabelWidth">
						<el-input v-model="editData.formDataId" auto-complete="off" size="mini" disabled></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="申请人" :label-width="formLabelWidth">
						<el-input v-model="editData.sponsorId" auto-complete="off" size="mini"  disabled></el-input>
					</el-form-item>
					<el-form-item label="申请时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editData.sponsorDate"
							type="date"
							size="mini"
							disabled
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item></div>
				<div class="flx">
					<el-form-item label="任务名称" :label-width="formLabelWidth">
						<el-input v-model="editData.taskName" auto-complete="off" size="mini" disabled></el-input>
					</el-form-item>
					<el-form-item label="任务活动名称" :label-width="formLabelWidth">
						<el-input v-model="editData.taskActivityName" auto-complete="off" size="mini" disabled></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="任务类型" :label-width="formLabelWidth">
						<el-select v-model="editData.taskType" placeholder="请选择"  size="mini" disabled>
							<el-option
								v-for="item in transChannelOptions"
								:key="item.transChannelId"
								:label="item.transChannelName"
								:value="item.transChannelId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="任务状态" :label-width="formLabelWidth">
						<el-select v-model="editData.taskState" placeholder="请选择"  size="mini" disabled>
							<el-option
								v-for="item in transChannelOptions"
								:key="item.transChannelId"
								:label="item.transChannelName"
								:value="item.transChannelId">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="审批时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editData.approvalDate"
							type="date"
							size="mini"
							disabled
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</div>

			</el-form>
		</el-dialog>
-->






	</div>

</template>

<script>
export default {
    name: "basics-m-tab3",
    data() {
        return {
			searchList:{
				task_type:"",/*任务类型*/
				task_state:"",/*任务状态*/
				task_name:"", /*任务名称*/
				appStartDate:"", /*审批开始时间*/
				appEndDate:"", /*审批结束时间*/
			},
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
            // 表格数据
            tableData: [],
            // 分页数据
            currentPage: 1,
            pageSize: 10,
            total: 0,
            // 弹窗显隐
            dialogFormVisible: false,

            form: {
				app_dec:"",
				app_state:"",
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
			tableData3: [],
			pageSizesObjectList:[],
			settlementTypeList:[],
			multipleSelection:[],
			transChannelOptions:[],
			dialogcheckFormVisible:false,
			editData:[],




        };
    },
	created(){
		this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		this.$util.dictory.getItemsByDicKey("settlement_type","settlementTypeList",this);

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
					filter_parameters: {
						taskType:this.searchList.task_type,
						taskState:this.searchList.task_state,
						taskName:this.searchList.task_name,
						sponsorStartDate:this.searchList.appStartDate,
						sponsorEndDate:this.searchList.appEndDate,
					}
				},
				msg: "string"
			}
			 this.$http.post(`${process.env.NODE_ENV}/spotmarket/task/jsonlist`,queryParam)
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

		/*选中的条数*/
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		/*重置*/
		reset(){
			//searchList
			for(let key in this.searchList){
				this.searchList[key]  = ''
			}

		},

		/*查看明细*/
		check(){
			let  self=this
			if (self.multipleSelection.length !==1 ) {
			 return self.notice("请选择一条数据");
			 }

			//self.dialogcheckFormVisible=true;

			self.$router.push({
				path: `sett`,
				query:{
					id:self.multipleSelection[0].formDataId
				}


			})
		},

		 /*审批确定*/

		approval(){
			let  self=this;
			if (self.multipleSelection.length !==1 ) {
				return self.notice("请选择一条数据");
			}
			self.dialogFormVisible =true

		},

		sureApproval(){
			let  self=this;
			var queryParam = {
				code: 0,
				data: {
					agreeType:self.form.app_state,
					agreeMessage:self.form.app_dec,
					flowTaskId:self.multipleSelection[0].flowTaskId,
				},
				msg: "string"
			}

			this.$http.post(`${process.env.NODE_ENV}/spotmarket/task/apply `,queryParam)
				.then((response) => {
			    if(response.data.code=='0'){
					self.success('审批成功');
				}else{
					self.success('审批失败');
				}

				})
				.catch(function(error) {
					console.log(error);
				});
			self.dialogFormVisible = false;
			self.multipleSelection=[]
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
	margin-top: 30px;
	.el-form-item {
		width: 100%;
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

.el-date-editor.el-input, .el-date-editor.el-input__inner {
	width: 215px !important;
}
.flx{
	margin-top: 0;
}


</style>
