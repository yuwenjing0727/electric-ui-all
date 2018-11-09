<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" size="small" @click="showCreateDialogForm" v-show="buttonPermission.add">添加</el-button>
           <!-- <el-button type="primary" size="small" @click="checkClick">查看</el-button>-->
            <el-button type="primary" size="small" @click="handleClick" v-show="buttonPermission.edit">编辑</el-button>
            <el-button type="primary" size="small" @click="delClick" v-show="buttonPermission.delete">删除</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
					<el-table-column header-align="center" prop="sysjobplanId" label="计划编码">
					</el-table-column>
					<el-table-column header-align="center" prop="sysjobplanName" label="计划名称">
					</el-table-column>
					<el-table-column header-align="center" prop="add1" label="发生频率">
					</el-table-column>
					<el-table-column header-align="center" prop="sysjobId" label="调度对象">
					</el-table-column>
					<el-table-column header-align="center" prop="indexno" label="优先级">
					</el-table-column>
					<el-table-column header-align="center" prop="stopFlag" label="禁止使用">
					</el-table-column>
					<el-table-column header-align="center" prop="sysjobplanDesc" label="备注">
					</el-table-column>

					<!-- <el-table-column
						fixed="right"
						label="操作"
						width="230"
					 >
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="checkClick(scope.row)">查看</el-button>
							<el-button @click="handleClick(scope.row)" type="success" size="mini">编辑</el-button>
							<el-button type="danger" size="mini" @click="delClick(scope.row)">删除</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>


		</div>

		<el-dialog title="查看" :visible.sync="dialogCheckFormVisible" class="elDialog">
			<el-form :model="checkFrom">
				<div class="flx">
					<el-form-item label="计划编码" :label-width="formLabelWidth" >
						<el-input disabled  v-model="checkFrom.sysjobplanId" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="计划名称" :label-width="formLabelWidth"  >
						<el-input disabled v-model="checkFrom.sysjobplanName" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="调度对象" :label-width="formLabelWidth" >
						<el-select disabled v-model="checkFrom.sysjobId" placeholder="请选择" size="mini">
							<el-option
								v-for="item in disObjectOptions"
								:key="item.ID"
								:label="item.NAME"
								:value="item.ID">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="优先级" :label-width="formLabelWidth" prop="priority" >
						<el-input disabled   v-model="checkFrom.indexno" auto-complete="off" size="mini"></el-input>
					</el-form-item>

				</div>
				<div class="flx">
					<el-form-item label="停止使用" :label-width="formLabelWidth" prop="stopUse">
						<el-select disabled v-model="checkFrom.stopFlag" placeholder="请选择" size="mini">
							<el-option
								v-for="item in flagUse"
								:key="item.paraCode"
								:label="item.paraKey"
								:value="item.paraCode">
							</el-option>
						</el-select>
					</el-form-item>

				</div>
				<div class="flx">
					<el-form-item label="发生频率" class="textArea" :label-width="formLabelWidth">
						<el-radio  disabled v-model="checkFrom.fnflag" :label=item.paraCode :key="index" v-for="(item,index)  in  fnFlagList">{{item.paraKey}}</el-radio>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="当前日期" class="textArea" prop="curDate":label-width="formLabelWidth" >
						<el-date-picker
							disabled
							v-model="checkFrom.add2"
							align="right"
							type="date"
							size="mini"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="当前日期前一天" prop="beforeDate" >
						<el-date-picker
							disabled
							v-model="checkFrom.add3"
							align="right"
							type="date"
							size="mini"
							placeholder="选择日期"
						>
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="参数"  prop="param">
						<el-input disabled type="text"  v-model="checkFrom.add5" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="备注" prop="des">
						<el-input disabled type="textarea" v-model="checkFrom.sysjobplanDesc"></el-input>
					</el-form-item>
				</div>
				<div class="flx" v-show="checkFrom.fnflag==0" >
					<el-form-item label="每日" >
						<el-radio v-model="checkFrom.dayfnflag"  label="1" disabled>
							一次发生于 <input v-model="checkFrom.onlyonehour" type="text" style="width: 40px" disabled> 小时<input type="text" v-model="checkFrom.onlyonemin"   style="width: 40px" disabled> 分

						</el-radio>

						<el-radio  v-model="checkFrom.dayfnflag" label="2" style="margin-left: 0" disabled>
							发生频率从<input type="text"  style="width: 40px" v-model="checkFrom.manybeginhour" disabled>小时<input type="text"  style="width: 40px" v-model="checkFrom.manybeginmin" disabled>分开始,
							到<input disabled type="text"  style="width: 40px" v-model="checkFrom.manyendhour">小时<input disabled type="text"  style="width: 40px" v-model="checkFrom.manyendmin">分结束每
							<select disabled  v-model="checkFrom.hourminindex
" >
								<option value="0">分钟</option>
								<option value="1">小时</option>
							</select>
							执行一次


						</el-radio>
					</el-form-item>
				</div>
				<div class="flx" v-show="checkFrom.fnflag==1">
					<el-form-item label="每周" >
						<el-checkbox-group v-model="checkFrom.sunday"  >
							<el-checkbox label="sunday" disabled>星期日</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkFrom.monday"  >
							<el-checkbox label="monday" disabled>星期一</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkFrom.tuesday"  >
							<el-checkbox label="tuesday" disabled>星期二</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkFrom.wednesday"  >
							<el-checkbox label="wednesday" disabled>星期三</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkFrom.thursday"  >
							<el-checkbox label="thursday" disabled>星期四</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkFrom.friday"  >
							<el-checkbox label="friday" disabled>星期五</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkFrom.saturday"  >
							<el-checkbox label="saturday" disabled>星期六</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</div>
				<div class="flx" v-show="checkFrom.fnflag==2">
					<el-form-item label="每月"  >
						<el-radio v-model="checkFrom.monthflag"  label="1" disabled>
							<span>第</span><input type="text"  style="width: 40px" v-model="checkFrom.dayindex" disabled><span>天</span>
						</el-radio>
						<el-radio v-model="checkFrom.monthflag"  label="2" disabled>
							<span>第</span>
							<input type="text" style="width: 40px" v-model="checkFrom.weekindex" disabled>
							<span>周</span>
							<select  v-model="checkFrom.weekweekindex" disabled>
								<option value="0" >星期日</option>
								<option value="1" >星期一</option>
								<option value="2" >星期二</option>
								<option value="3">星期三</option>
								<option value="4">星期四</option>
								<option value="5">星期五</option>
								<option value="6">星期六</option>
							</select>
						</el-radio>
					</el-form-item>
				</div>
			</el-form>

		</el-dialog>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="addFrom" ref="addFrom" :rules="rules">
				<div class="flx">
					<el-form-item label="计划编码" :label-width="formLabelWidth" prop="code" >
						<el-input v-model="addFrom.planCode" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="计划名称" :label-width="formLabelWidth" prop="planName" >
						<el-input v-model="addFrom.planName" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="调度对象" :label-width="formLabelWidth" prop="busName" >
						<el-select v-model="addFrom.disObject" placeholder="请选择"size="mini" >
							<el-option
								v-for="item in disObjectOptions"
								:key="item.ID"
								:label="item.NAME"
								:value="item.ID">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="优先级" :label-width="formLabelWidth" prop="priority" >
						<el-input type="number" v-model="addFrom.priority" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx flx_paraKey">
					<el-form-item label="停止使用" :label-width="formLabelWidth" prop="stopUse">
						<el-select v-model="addFrom.stopFlag" placeholder="请选择" size="mini" >
							<el-option
								v-for="item in flagUse"
								:key="item.paraCode"
								:label="item.paraKey"
								:value="item.paraCode">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="发生频率" :label-width="formLabelWidth">
						<el-radio v-model="addFrom.fnflag" :label=item.paraCode :key="index" v-for="(item,index)  in  fnFlagList">{{item.paraKey}}</el-radio>
					</el-form-item>
				</div>
				<div class="flx flx_date">
					<el-form-item label="当前日期"  prop="curDate" :label-width="formLabelWidth" >
							<el-date-picker
								v-model="addFrom.curDate"
							align="right"
							type="date"
								size="mini"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="当前日期前一天"  prop="beforeDate" :label-width="formLabelWidth">
						<el-date-picker
							v-model="addFrom.beforeDate"
							align="right"
							type="date"
							size="mini"
							placeholder="选择日期"
						>
						</el-date-picker>
					</el-form-item>

				</div>
				<div class="flx flx_para" >
					<el-form-item label="参数"  prop="des" :label-width="formLabelWidth">
						<el-input type="text" v-model="addFrom.des" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="备注"  prop="param" class="textArea" :label-width="formLabelWidth">
						<el-input type="textarea" v-model="addFrom.param" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx" v-show="addFrom.fnflag==0">
					<el-form-item label="每日"  :label-width="formLabelWidth">
						<el-radio v-model="addFrom.flagdata"  label="1">一次发生于 <input v-model="addFrom.onlyonehour" type="text" style="width: 40px"> 小时<input type="text" v-model="addFrom.onlyonemin"   style="width: 40px"> 分</el-radio>

						<el-radio  v-model="addFrom.flagdata" label="2" style="margin-left: 0">发生频率才从<input type="text"  style="width: 40px" v-model="addFrom.manybeginhour">小时<input type="text"  style="width: 40px" v-model="addFrom.manybeginmin">分开始到<input type="text"  style="width: 40px" v-model="addFrom.manyendhour">小时<input type="text"  style="width: 40px" v-model="addFrom.manyendmin">分结束每<input type="text"  style="width: 40px" v-model="addFrom.hourminindex">执行一次</el-radio>
					</el-form-item>
				</div>
				<div class="flx" v-show="addFrom.fnflag==1">
					<el-form-item label="每周" :label-width="formLabelWidth" >
						<el-checkbox-group v-model="addFrom.sunday"  >
							<el-checkbox label="sunday">星期日</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="addFrom.monday"  >
							<el-checkbox label="monday">星期一</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="addFrom.tuesday"  >
							<el-checkbox label="tuesday">星期二</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="addFrom.wednesday"  >
							<el-checkbox label="wednesday">星期三</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="addFrom.thursday"  >
							<el-checkbox label="thursday">星期四</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="addFrom.friday"  >
							<el-checkbox label="friday">星期五</el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="addFrom.saturday"  >
							<el-checkbox label="saturday">星期六</el-checkbox>
						</el-checkbox-group>

					</el-form-item>
				</div>
				<div class="flx flx_mon" v-show="addFrom.fnflag==2">
					<el-form-item label="每月" :label-width="formLabelWidth" >
						<el-radio v-model="addFrom.monthflag"  label="1">
							<span>第</span><input type="text"  style="width: 40px" v-model="addFrom.dayindex"><span>天</span>
						</el-radio>
						<el-radio v-model="addFrom.monthflag"  label="2">
							<span>第</span>
							<input type="text" style="width: 40px" v-model="addFrom.weekindex">
							<span>周</span>
							<select  v-model="addFrom.weekweekindex">
								<option value="0">星期日</option>
								<option value="1">星期一</option>
								<option value="2">星期二</option>
								<option value="3">星期三</option>
								<option value="4">星期四</option>
								<option value="5">星期五</option>
								<option value="6">星期六</option>
							</select>
						</el-radio>
					</el-form-item>
				</div>
			</el-form>


			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureAdd('addFrom')">新 增</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editFrom" ref="editFrom" :rules="rules">
				<div class="flx">
					<el-form-item label="计划编码" :label-width="formLabelWidth" >
						<el-input v-model="editFrom.sysjobplanId" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="计划名称" :label-width="formLabelWidth" prop="sysjobplanName" >
						<el-input v-model="editFrom.sysjobplanName" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="调度对象" :label-width="formLabelWidth" >
						<el-select v-model="editFrom.sysjobId" placeholder="请选择" size="mini">
							<el-option
								v-for="item in disObjectOptions"
								:key="item.ID"
								:label="item.NAME"
								size="mini"
								:value="item.ID">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="优先级" :label-width="formLabelWidth" prop="priority" >
						<el-input v-model="editFrom.indexno" auto-complete="off" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx flx_paraKey">
					<el-form-item label="停止使用" :label-width="formLabelWidth" prop="stopUse">
						<el-select v-model="editFrom.stopFlag" placeholder="请选择" size="mini">
							<el-option
								v-for="item in flagUse"
								:key="item.paraCode"
								:label="item.paraKey"
								:value="item.paraCode">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发生频率" :label-width="formLabelWidth">
						<el-radio v-model="editFrom.fnflag" :label=item.paraCode :key="index" v-for="(item,index)  in  fnFlagList">{{item.paraKey}}</el-radio>
					</el-form-item>
				</div>
				<div class="flx flx_date">
					<el-form-item label="当前日期" prop="curDate" :label-width="formLabelWidth" >
						<el-date-picker
							v-model="editFrom.add2"
							align="right"
							type="date"
							size="mini"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="当前日期前一天" prop="beforeDate" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editFrom.add3"
							align="right"
							type="date"
							size="mini"
							placeholder="选择日期"
						>
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx flx_para">
					<el-form-item label="参数" prop="param" :label-width="formLabelWidth">
						<el-input type="text" v-model="editFrom.add5" size="mini"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="备注"  prop="des" class="textArea"  :label-width="formLabelWidth">
						<el-input type="textarea" v-model="editFrom.sysjobplanDesc" size="mini"></el-input>
					</el-form-item>
				</div>

				<div class="flx" v-show="editFrom.fnflag==0" >
					<el-form-item label="每日"  :label-width="formLabelWidth" >
						<el-radio v-model="editFrom.dayfnflag"  label="1">
							一次发生于 <input v-model="editFrom.onlyonehour" type="text" style="width: 40px"> 小时<input type="text" v-model="editFrom.onlyonemin"   style="width: 40px"> 分

						</el-radio>

						<el-radio  v-model="editFrom.dayfnflag" label="2" style="margin-left: 0">
								发生频率从<input type="text"  style="width: 40px" v-model="editFrom.manybeginhour">小时<input type="text"  style="width: 40px" v-model="editFrom.manybeginmin">分开始,
								到<input type="text"  style="width: 40px" v-model="editFrom.manyendhour">小时<input type="text"  style="width: 40px" v-model="editFrom.manyendmin">分结束每

							<select  v-model="editFrom. hourminindex" >
								<option value="0">分钟</option>
								<option value="1">小时</option>
							</select>
							执行一次


						</el-radio>
					</el-form-item>
				</div>
				<div class="flx" v-show="editFrom.fnflag==1">
						<el-form-item label="每周":label-width="formLabelWidth" >
							<el-checkbox-group v-model="editFrom.sunday"  >
								<el-checkbox label="sunday">星期日</el-checkbox>
							</el-checkbox-group>
							<el-checkbox-group v-model="editFrom.monday"  >
								<el-checkbox label="monday">星期一</el-checkbox>
							</el-checkbox-group>
							<el-checkbox-group v-model="editFrom.tuesday"  >
								<el-checkbox label="tuesday">星期二</el-checkbox>
							</el-checkbox-group>
							<el-checkbox-group v-model="editFrom.wednesday"  >
								<el-checkbox label="wednesday">星期三</el-checkbox>
							</el-checkbox-group>
							<el-checkbox-group v-model="editFrom.thursday"  >
								<el-checkbox label="thursday">星期四</el-checkbox>
							</el-checkbox-group>
							<el-checkbox-group v-model="editFrom.friday"  >
								<el-checkbox label="friday">星期五</el-checkbox>
							</el-checkbox-group>
							<el-checkbox-group v-model="editFrom.saturday"  >
								<el-checkbox label="saturday">星期六</el-checkbox>
							</el-checkbox-group>
					</el-form-item>
				</div>
				<div class="flx flx_mon" v-show="editFrom.fnflag==2">
					<el-form-item label="每月" :label-width="formLabelWidth">
							<el-radio v-model="editFrom.monthflag"  label="1">
								<span>第</span><input type="text"  style="width: 40px" v-model="editFrom.dayindex"><span>天</span>
							</el-radio>
						    <el-radio  v-model="editFrom.monthflag"  label="2">
								<span>第</span>
								<input type="text" style="width: 40px" v-model="editFrom.weekindex">
								<span>周</span>
								<select  v-model="editFrom.weekweekindex">
									<option value="0">星期日</option>
									<option value="1">星期一</option>
									<option value="2">星期二</option>
									<option value="3">星期三</option>
									<option value="4">星期四</option>
									<option value="5">星期五</option>
									<option value="6">星期六</option>
								</select>
						</el-radio>
					</el-form-item>
				</div>
			</el-form>


			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureEdit('editFrom')">保存</el-button>
			</div>
		</el-dialog>

	</div>


</template>

<script>

	export default {
		name: "basics-m-tab3",

		data(){
			return{
				buttonPermission:JSON.parse(sessionStorage.buttonPermission),
				radio:"1",
				timeRange:"",
				userName:"",
				tableData: [],
				currentPage:1,
				pageSize:10,
				total:0,
				dialogFormVisible: false,
				dialogEditFormVisible:false,
				dialogCheckFormVisible:false,
				addFrom:{
					planCode:"",
					planName:"",
					disObject:"",
					priority:"",
					stopUse:"",
					occurrence:"",
					curDate:"",
					beforeDate:"",
					param:"",
					des:"",
					flagdata:"",
					onlyonehour:"",
					onlyonemin:"",
					manybeginhour:"",
					manybeginmin:"",
					hourminflag:"",
					monthflag:"",
					dayindex:"",
					weekindex:"",
					weekweekindex:"",
					monday:"",
					tuesday:"",
					wednesday:"",
					thursday:"",
					saturday:"",
					sunday:"",
					friday:"",
					manyendhour:"",
					manyendmin:"",
					hourminindex:"",
				},
				editFrom:{},
				checkFrom:{},
				formLabelWidth: '120px',
				disObjectOptions:[
				],
				priorityOptions:[
					{
						label:"1",
						value:"1"
					},
					{
						label:"2",
						value:"2"
					},
					{
						label:"3",
						value:"3"
					},

				],
				flagUse:[],
				fnFlagList:[],
				fnFlagNumList:[],
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				checkList: ['选中且禁用','复选框 A'],
				checkedWeek:["星期一","星期二"],
                weekList:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
                // 存放select选择数据
                selectData: [],
				rules:{
					planName:[{
						required:true,message:"计划名称不能为空",trigger:"blur"
					}],
					sysjobplanName:[{
						required:true,message:"计划名称不能为空",trigger:"blur"
					}]
				}


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

			getPageData() {
				var queryParam = {
					"code":"0",
					"msg":"",
					"data":{
						"page":this.currentPage,
						"limit":this.pageSize,
						"filter_parameters":{
							"sysjobplanName":""   //模糊查询

						}
					}

				}
				this.$http.post(`${process.env.NODE_ENV}/admin/jobplan/list111`,queryParam)
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
			/*请求调度接口*/
			getBus(){
			    var self=this
				self.$http.get(`${process.env.NODE_ENV}/admin/jobplan/addbefore`)
					.then((response) => {
						console.log(response)
						self.disObjectOptions = response.data.data;

					})
					.catch(function(error) {
						console.log(error);
					});

				console.log(self.disObjectOptions)
			},
			/*查看*/
			checkClick(){
                let self=this;
                // 修改时判断只能选中一条数据
                if (self.selectData.length !== 1) {
                    return self.notice("只能选中一条数据进行操作");
                }
			    this.dialogCheckFormVisible=true;
				this.getBus()
				console.log("检查")
				console.log(this.checkFrom)
				this.$util.dictory.getItemsByDicKey('stop_flag','flagUse',this)
				this.$util.dictory.getItemsByDicKey('fn_flag','fnFlagList',this)
				this.$http.get(`${process.env.NODE_ENV}/admin/jobplan/info/${self.selectData[0].sysjobplanId}`)
					.then((response) => {
						if(response.data.code == 0) {
							console.log("编辑")
							console.log(response)
							self.checkFrom = response.data.data.plan;
							self.checkFrom.monday=self.checkFrom.monday==1 ?true :false;
							self.checkFrom.tuesday=self.checkFrom.tuesday==1 ?true :false;
							self.checkFrom.wednesday=self.checkFrom.wednesday==1 ?true :false;
							self.checkFrom.thursday=self.checkFrom.thursday==1 ?true :false;
							self.checkFrom.friday=self.checkFrom.friday==1 ?true :false;
							self.checkFrom.saturday=self.checkFrom.saturday==1 ?true :false;
							self.checkFrom.sunday=self.checkFrom.sunday==1 ?true :false;
							self.checkFrom.dayfnflag=self.checkFrom.dayfnflag.toString()
							self.checkFrom.monthflag=self.checkFrom.monthflag.toString()

							console.log("1111")
							console.log(self.checkFrom)
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},

			/*新增*/
			showCreateDialogForm(){
			    var self=this;
				self.dialogFormVisible=true;
				self.getBus()
				self.$util.dictory.getItemsByDicKey('stop_flag','flagUse',this)
				self.$util.dictory.getItemsByDicKey('fn_flag','fnFlagList',this)


			},
			sureAdd(addFrom){
				let self = this;
                 console.log("qqq")
				console.log(addFrom)
				console.log(self.$refs[addFrom])
				self.$refs[addFrom].validate((valid) => {
					if (valid) {
						let queryParam = {
							"code":"0",
							"msg":"",
							"data":{
								"add1":self.addFrom.occurrence,
								"add2":self.addFrom.curDate,
								"add3": self.addFrom.beforeDate,
								"add4": "",
								"add5": self.addFrom.param,
								"createDate": "",
								"creater": "",
								"dayfnflag": self.addFrom.flagdata,
								"dayindex": 0,
								"delFlag": "1",
								"editDate": "",
								"editer": "",
								"fnflag":self.addFrom.fnflag,
								"friday":self.addFrom.friday==true ?1 :0,/*周五*/
								"hourminflag": self.addFrom.hourminflag,
								"hourminindex": self.addFrom.hourminindex,
								"indexno":self.addFrom.priority,
								"manybeginhour": self.addFrom.manybeginhour,
								"manybeginmin": self.addFrom.manybeginmin,
								"manyendhour": self.addFrom.manyendhour,
								"manyendmin":self.addFrom.manyendmin,
								"monday":  self.addFrom.monday==true ?1 :0, /*周一*/
								"monthflag": self.addFrom.monthflag,
								"onlyonehour":self.addFrom.onlyonehour,
								"onlyonemin": self.addFrom.onlyonemin,
								"saturday": self.addFrom.saturday==true ?1 :0, /*周六*/
								"stopFlag":self.addFrom.stopFlag,
								"sunday": self.addFrom.sunday==true ?1 :0, /*周日*/
								"sysjobId":self.addFrom.disObject,
								"sysjobplanCode":self.addFrom.planCode,
								"sysjobplanDesc":self.addFrom.des,
								"sysjobplanName":self.addFrom.planName,
								"thursday":self.addFrom.thursday==true ?1 :0, /*周四*/
								"tuesday": self.addFrom.tuesday==true ?1 :0, /*周二*/
								"wednesday": self.addFrom.wednesday==true ?1 :0, /*周三*/
								"weekindex":self.addFrom.weekindex,
								"weekweekindex": self.addFrom.weekweekindex
							}


						};
						console.log("add")
						console.log(queryParam.data)
						self.$http.post(`${process.env.NODE_ENV}/admin/jobplan/save`,queryParam)
							.then((response) => {
								console.log(response)
								if(response.data.data == true){
									self.success("添加成功！");
									self.dialogFormVisible = false;
									self.addFrom={
										planCode:"",
										planName:"",
										disObject:"",
										priority:"",
										stopUse:"",
										occurrence:"",
										curDate:"",
										beforeDate:"",
										param:"",
										des:"",
										flagdata:"",
										onlyonehour:"",
										onlyonemin:"",
										manybeginhour:"",
										manybeginmin:"",
										manyendmin:"",
										hourminindex:"",
										hourminflag:"",
										dayindex:"",
										monthflag:"",
										weekindex:"",
										weekweekindex:"",
										monday:"",
										tuesday:"",
										wednesday:"",
										thursday:"",
										saturday:"",
										sunday:"",
										friday:"",
									}


								}
								self.getPageData()

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


			/*编辑*/
			handleClick(){
                let  self=this;
                // 修改时判断只能选中一条数据
               /* if (self.selectData.length !== 1) {
                    return self.notice("只能选中一条数据进行操作");
                }*/
				self.dialogEditFormVisible=true;
				self.getBus()
				self.$util.dictory.getItemsByDicKey('stop_flag','flagUse',this)
				self.$util.dictory.getItemsByDicKey('fn_flag','fnFlagList',this)
				self.$http.get(`${process.env.NODE_ENV}/admin/jobplan/info/${self.selectData[0].sysjobplanId}`)
					.then((response) => {
						if(response.data.code == 0) {
							console.log("编辑")
							console.log(response)
							self.editFrom= response.data.data.plan;
							self.editFrom.monday=self.editFrom.monday==1 ?true :false;
							self.editFrom.tuesday=self.editFrom.tuesday==1 ?true :false;
							self.editFrom.wednesday=self.editFrom.wednesday==1 ?true :false;
							self.editFrom.thursday=self.editFrom.thursday==1 ?true :false;
							self.editFrom.friday=self.editFrom.friday==1 ?true :false;
							self.editFrom.saturday=self.editFrom.saturday==1 ?true :false;
							self.editFrom.sunday=self.editFrom.sunday==1 ?true :false;


						}
						console.log("111")
						console.log(self.editFrom)

					})
					.catch(function(error) {
						console.log(error);
					});




			},
			sureEdit(formName){
				let self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(self.editFrom)
						let queryParam = {
							"code":"0",
							"msg":"",
							"data":{
								"add1":self.editFrom.add1,
								"add2":self.editFrom.add2,
								"add3": self.editFrom.add3,
								"add4": "",
								"add5": self.editFrom.add5,
								"createDate": "",
								"creater": "",
								"dayfnflag": self.editFrom.dayfnflag,
								"dayindex": self.editFrom.dayindex,
								"delFlag": "1",
								"editDate": "",
								"editer": "",
								"fnflag":self.editFrom.fnflag,
								"friday":self.editFrom.friday,/*周五*/
								"hourminflag": self.editFrom.hourminflag,
								"hourminindex": self.editFrom.hourminindex,
								"indexno":self.editFrom.indexno,
								"manybeginhour": self.editFrom.manybeginhour,
								"manybeginmin": self.editFrom.manybeginmin,
								"manyendhour": self.editFrom.manyendhour,
								"manyendmin":self.editFrom.manyendmin,
								"hourminindex":self.editFrom.hourminindex,
								"monday": self.editFrom.monday,
								"monthflag": self.editFrom.monthflag,
								"onlyonehour":self.editFrom.onlyonehour,
								"onlyonemin": self.editFrom.onlyonemin,
								"saturday": self.editFrom.saturday,
								"stopFlag":self.editFrom.stopFlag,
								"sunday": self.editFrom.sunday,
								"sysjobplanId":self.editFrom.sysjobplanId ,
								"sysjobId":self.editFrom.sysjobId,
								"sysjobplanCode":self.editFrom.sysjobplanCode,
								"sysjobplanDesc":self.editFrom.sysjobplanDesc,
								"sysjobplanName":self.editFrom.sysjobplanName,
								"thursday": self.editFrom.thursday,
								"tuesday": self.editFrom.tuesday,
								"wednesday": self.editFrom.wednesday,
								"weekindex":self.editFrom.weekindex,
								"weekweekindex": self.editFrom.weekweekindex
							}





						};
						console.log("edit")
						console.log(queryParam)
						self.$http.post(`${process.env.NODE_ENV}/admin/jobplan/update`,queryParam)
							.then((response) => {
								console.log(response)
								if(response.data.code == 0){
									self.success("修改成功！");
									self.getPageData();
									self.dialogEditFormVisible = false;
									self.editFrom={};

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

			/*删除*/
			delClick(){
				let self = this;
				if (self.selectData.length == 0) {
					return self.notice("请选中数据进行操作");
				}
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/jobplan/delete/${self.selectData[0].sysjobplanId}`)
						.then((response) => {
							if(response.data.code == 0){
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


			handleSizeChange(val){
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
			fnFlagList(newV,oldV){
			    newV.forEach((e) => {
			        e.paraCode = parseInt(e.paraCode);
					this.fnFlagNumList.push(e);
				})

			},
			/*editFrom(newV,oldV){
			   /!* newV.dayfnflag = parseInt(newV.dayfnflag)*!/
				newV.dayfnflag = newV.dayfnflag.toString()
				newV.monthflag=newV.monthflag.toString()
			},*/


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
	.el-table,
	.block {
		margin-top: 10px;
	}

	.flx_para .el-input{
		width: 180px;
	}
	.flx_date .el-date-editor{
		width: 180px;
	}
	.flx_paraKey .el-radio+.el-radio{
		margin-left: 11px !important;
	}
	.flx_mon .el-radio+.el-radio {
		 margin-left: 0px !important;
	}
</style>
<style lang="less">
	// 添加窗口样式
	.elDialog {
		.el-dialog__body {
			padding: 30px 10px;
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
		// 树样式
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

	.el-form-item__error{
		top: 85%;
	}
	.el-form-item {
		margin-bottom: 7px !important;
	}


</style>
