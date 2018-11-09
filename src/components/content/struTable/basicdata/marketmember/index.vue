<template>
	<div id="all">
		<div class="btnBox">
			<el-button type="primary" icon="el-icon-search" size="small" @click="searchBoxFlag=!searchBoxFlag">搜索</el-button>
			<el-button type="primary" size="small" @click="showCreateDialogForm">添加</el-button>
			<el-button type="primary" size="small" @click="handleClick">编辑</el-button>
			<el-button type="primary" size="small" @click="del">删除</el-button>
			<el-button type="primary" size="small">导入</el-button>
			<!--<el-button type="primary" size="small">同步</el-button>-->
			<!--<el-button type="primary" size="small">导出</el-button>
			<el-button type="primary" size="small">变更记录</el-button>-->
			<div style="margin-top: 20px;">
				<el-collapse-transition>
					<div v-show="searchBoxFlag">
						<div class="transition-box">
							<el-form :model="searchList">
								<div class="flx">
									<!--<el-form-item label="市场成员编码" label-width="100px">
										<el-input placeholder="市场成员编码" style="width:200px;"  size="mini"  prefix-icon="el-icon-search" v-model="searchList.memberCode"></el-input>
									</el-form-item>-->
									<el-form-item label="市场成员名称" label-width="100px">
										<el-input placeholder="市场成员名称" style="width:200px;" size="mini"  prefix-icon="el-icon-search" v-model="searchList.memberName"></el-input>
									</el-form-item>
									<el-form-item label="市场成员类型" label-width="100px">
										<el-select v-model="searchList.memberType" placeholder="市场成员类型" size="mini">
											<el-option v-for="(keyValueItem,index) in memberTypeList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="市场成员状态" label-width="100px">
										<el-select v-model="searchList.memberStatus" placeholder="请选择状态" size="mini">
											<el-option v-for="(keyValueItem,index) in memberStatusList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
										</el-select>
									</el-form-item>

								</div>
								<div class="flx">
									<el-form-item>
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
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
					<el-table-column header-align="center" prop="marketMemberId" label="市场成员编号">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="memberPartentId" label="上级市场成员">
					</el-table-column>-->
					<el-table-column header-align="center" prop="memberName" label="市场成员名称">
					</el-table-column>
					<el-table-column header-align="center" prop="memberShortName" label="市场成员简称">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="memberCode" label="市场成员编码">
					</el-table-column>-->
					<el-table-column header-align="center" prop="memberType" label="市场成员类型">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="enterpriseNature" label="企业性质">
					</el-table-column>
					<el-table-column header-align="center" prop="industryCategory" label="行业分类">
					</el-table-column>
					<el-table-column header-align="center" prop="sysRegisterDate" label="系统注册时间">
					</el-table-column>
					<el-table-column header-align="center" prop="sysRegisterOrg" label="系统注册机构">
					</el-table-column>
					<el-table-column header-align="center" prop="sysInvalidDate" label="系统失效时间">
					</el-table-column>-->
					<el-table-column header-align="center" prop="memberStatus" label="状态">
					</el-table-column>
					<!--<el-table-column header-align="center" prop="creater" label="创建人">
					</el-table-column>
					<el-table-column header-align="center" prop="createDate" label="创建时间">
					</el-table-column>-->
				</el-table>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
							   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form" ref="ruleForm" :rules="rules">
				<div class="flx">
					<el-form-item label="市场成员编码" :label-width="formLabelWidth" prop="memberCode">
						<el-input v-model="form.memberCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="市场成员名称" :label-width="formLabelWidth" prop="memberName">
						<el-input v-model="form.memberName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="市场成员类型" :label-width="formLabelWidth">
						<el-select v-model="form.memberType" placeholder="请选择类型">
							<el-option v-for="(keyValueItem,index) in memberTypeList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="简称" :label-width="formLabelWidth">
						<el-input v-model="form.memberShortName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="统一社会信用代码" :label-width="formLabelWidth">
						<el-input v-model="form.memberCreditCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="法人代表" :label-width="formLabelWidth" prop="legalRepresentaive">
						<el-input v-model="form.legalRepresentaive" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="企业性质" :label-width="formLabelWidth">
						<el-select v-model="form.enterpriseNature" placeholder="请选择企业性质">
							<el-option v-for="(keyValueItem,index) in enterpriseNatureList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="行业分类" :label-width="formLabelWidth">
						<el-select v-model="form.industryCategory" placeholder="请选择行业分类">
							<el-option v-for="(keyValueItem,index) in industryCategoryList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="注册资金" :label-width="formLabelWidth">
						<el-input v-model="form.registerCapital" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="许可证号" :label-width="formLabelWidth">
						<el-input v-model="form.licenseKeyCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="许可证发证时间" :label-width="formLabelWidth">
						<el-date-picker
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							v-model="form.licenseStartDate"
							placeholder="许可证发证时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="许可证生效时间" :label-width="formLabelWidth">
						<el-date-picker
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							v-model="form.licenseEffectDate"
							placeholder="许可证生效时间">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="开户银行" :label-width="formLabelWidth">
						<el-input v-model="form.bankAccout" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="银行账号" :label-width="formLabelWidth">
						<el-input v-model="form.bankCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="纳税人识别号" :label-width="formLabelWidth">
						<el-input v-model="form.taxpayerCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth" prop="telephone">
						<el-input v-model="form.telephone" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<!--<div class="flx">
					<el-form-item label="区域" :label-width="formLabelWidth">
						<el-input  v-model="form.areaCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="省" :label-width="formLabelWidth">
						<el-input v-model="form.provinceId" auto-complete="off"></el-input>
					</el-form-item>
				</div>-->
				<!--<div class="flx">
					<el-form-item label="市" :label-width="formLabelWidth">
						<el-input v-model="form.cityId" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" :label-width="formLabelWidth">
						<el-input v-model="form.address" auto-complete="off"></el-input>
					</el-form-item>
				</div>-->
				<!--<div class="flx">
					<el-form-item label="父节点" :label-width="formLabelWidth">
						<el-input  v-model="form.memberPartentId" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="系统注册时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="form.sysRegisterDate"
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							placeholder="选择注册时间">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="系统注册机构" :label-width="formLabelWidth" prop="sysRegisterOrg">
						<el-input  v-model="form.sysRegisterOrg" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="系统失效时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="form.sysInvalidDate"
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							placeholder="选择失效时间">
						</el-date-picker>
					</el-form-item>
				</div>-->
				<div class="flx">
					<el-form-item label="联系人" :label-width="formLabelWidth">
						<el-input v-model="form.contacts" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" :label-width="formLabelWidth" prop="contactsTelephone">
						<el-input v-model="form.contactsTelephone" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
						<el-input v-model="form.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-select v-model="form.memberStatus" placeholder="请选择状态">
							<el-option v-for="(keyValueItem,index) in memberStatusList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addMarketMember('ruleForm')">新 增</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editAllForm" ref="ruleEditForm" :rules="rules">
				<div class="flx">
					<el-form-item label="市场成员编码" :label-width="formLabelWidth" prop="memberCode">
						<el-input v-model="editAllForm.memberCode" auto-complete="off" readonly></el-input>
					</el-form-item>
					<el-form-item label="市场成员名称" :label-width="formLabelWidth" prop="memberName">
						<el-input v-model="editAllForm.memberName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="市场成员类型" :label-width="formLabelWidth">
						<el-select v-model="editAllForm.memberType" placeholder="请选择类型">
							<el-option v-for="(keyValueItem,index) in memberTypeList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="简称" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.memberShortName" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="统一社会信用代码" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.memberCreditCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="法人代表" :label-width="formLabelWidth" prop="legalRepresentaive">
						<el-input v-model="editAllForm.legalRepresentaive" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="企业性质" :label-width="formLabelWidth">
						<el-select v-model="editAllForm.enterpriseNature" placeholder="请选择企业性质">
							<el-option v-for="(keyValueItem,index) in enterpriseNatureList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="行业分类" :label-width="formLabelWidth">
						<el-select v-model="editAllForm.industryCategory" placeholder="请选择行业分类">
							<el-option v-for="(keyValueItem,index) in industryCategoryList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="注册资金" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.registerCapital" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="许可证号" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.licenseKeyCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="许可证发证时间" :label-width="formLabelWidth">
						<el-date-picker
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							v-model="editAllForm.licenseStartDate"
							placeholder="许可证发证时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="许可证生效时间" :label-width="formLabelWidth">
						<el-date-picker
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							v-model="editAllForm.licenseEffectDate"
							placeholder="许可证生效时间">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="开户银行" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.bankAccout" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="银行账号" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.bankCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="纳税人识别号" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.taxpayerCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth" prop="telephone">
						<el-input v-model="editAllForm.telephone" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<!--<div class="flx">
					<el-form-item label="区域" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.areaCode" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="省" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.provinceId" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="市" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.cityId" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.address" auto-complete="off"></el-input>
					</el-form-item>
				</div>-->
				<!--<div class="flx">
					<el-form-item label="父节点" :label-width="formLabelWidth">
						<el-input  v-model="editAllForm.memberPartentId" auto-complete="off"></el-input>
						&lt;!&ndash;<el-select placeholder="请选择" v-model="editAllForm.memberPartentId">
							<el-option value="" style="overflow:auto; height:200px;background:none;">
								<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
							</el-option>
						</el-select>&ndash;&gt;
					</el-form-item>
					<el-form-item label="系统注册时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editAllForm.sysRegisterDate"
							type="date"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							placeholder="选择注册时间">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="系统注册机构" :label-width="formLabelWidth" prop="sysRegisterOrg">
						<el-input  v-model="editAllForm.sysRegisterOrg" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="系统失效时间" :label-width="formLabelWidth">
						<el-date-picker
							v-model="editAllForm.sysInvalidDate"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							type="date"
							placeholder="选择失效时间">
						</el-date-picker>
					</el-form-item>
				</div>-->
				<div class="flx">
					<el-form-item label="联系人" :label-width="formLabelWidth">
						<el-input v-model="editAllForm.contacts" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" :label-width="formLabelWidth" prop="contactsTelephone">
						<el-input v-model="editAllForm.contactsTelephone" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
						<el-input v-model="editAllForm.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-select v-model="editAllForm.memberStatus" placeholder="请选择状态">
							<el-option v-for="(keyValueItem,index) in memberStatusList" :key="index" :label="keyValueItem.paraKey" :value="keyValueItem.paraCode"></el-option>
						</el-select>
					</el-form-item>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editMarketMember('ruleEditForm')">修 改</el-button>
			</div>
		</el-dialog>

	</div>


</template>

<script>
	import { isvalidatemobile,validateEmail } from '@/utils/validate'
	export default {
		data() {
			var validateTelephone = (rule, value, callback) => {
				console.log("电话号码校验")
				var list = isvalidatemobile(value);
				console.log(list);
				if(list[0]){
					callback(new Error(list[1]));
				}else{
					callback();
				}
			};
			var validateContactsTelephone = (rule, value, callback) => {
				console.log("联系电话校验")
				var list = isvalidatemobile(value);
				console.log(list);
				if(list[0]){
					callback(new Error(list[1]));
				}else{
					callback();
				}
			};
			var testEmail = (rule, value, callback) => {
				if(!validateEmail(value)){
					callback(new Error('邮箱格式不正确'));
				} else {
					callback();
				}
			};
			return {
				data: [{
					label: '一级 1',
					children: [{
						label: '二级 1-1',
						children: [{
							label: '三级 1-1-1'
						}]
					}]
				}, {
					label: '一级 2',
					children: [{
						label: '二级 2-1',
						children: [{
							label: '三级 2-1-1'
						}]
					}, {
						label: '二级 2-2',
						children: [{
							label: '三级 2-2-1'
						}]
					}]
				}, {
					label: '一级 3',
					children: [{
						label: '二级 3-1',
						children: [{
							label: '三级 3-1-1'
						}]
					}, {
						label: '二级 3-2',
						children: [{
							label: '三级 3-2-1'
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},

				searchBoxFlag:false,
				searchList:{
					/*memberCode:"",*/
					memberName:"",
					memberType:"",
					memberStatus:""
				},
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList:[],
                pageSizes:[5,10,50,100],
                // 存放select选择数据
                selectData: [],
				dialogFormVisible:false,
				dialogEditFormVisible:false,
				// 新增数据
				form: {
					memberCode:"",
					memberName:"",
					memberType:"",
					memberShortName:"",
					enterpriseNature:"",
					industryCategory:"",
					memberPartentId:"",
					sysRegisterDate:"",
					sysRegisterOrg:"",
					sysInvalidDate:"",
					memberStatus:"",

					memberCreditCode:"",
					legalRepresentaive:"",
					registerCapital:"",
					licenseKeyCode:"",
					licenseStartDate:"",
					licenseEffectDate:"",
					bankAccout:"",
					bankCode:"",
					taxpayerCode:"",
					telephone:"",
					areaCode:"",
					provinceId:"",
					cityId:"",
					address:"",
					contacts:"",
					contactsTelephone:"",
					email:"",
				},
				editForm: {},
				editDetailForm:{},
				editAllForm:{},
				formLabelWidth: '125px',
				memberTypeList:[],
				enterpriseNatureList:[],
				industryCategoryList:[],
				memberStatusList:[],
				rules: {
					memberCode: [
						{ required: true, message: '市场成员编码不能为空', trigger: 'blur' }
					],
					memberName: [
						{ required: true, message: '市场成员名称不能为空', trigger: 'blur' },
						{  max: 50, message: '长度在 50个字符之内', trigger: 'blur' }
					],
					legalRepresentaive: [
						{  max: 10, message: '长度在 10个字符之内', trigger: 'blur' }
					],
					sysRegisterOrg: [
						{  max: 50, message: '长度在 50个字符之内', trigger: 'blur' }
					],
					telephone:[
						{ validator: validateTelephone, trigger: 'blur' }
					],
					contactsTelephone:[
						{ validator: validateContactsTelephone, trigger: 'blur' }
					],
					email:[
						{ validator: testEmail, trigger: 'blur' }
					]

				}
			}
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
			this.$util.dictory.getItemsByDicKey("member_type","memberTypeList",this);
			this.$util.dictory.getItemsByDicKey("member_status","memberStatusList",this);
		},
		mounted() {
			this.getPageData();
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
				this.editAllForm.memberPartentId = data.label;
				//点击节点后收回select下拉框
				this.$refs.select.visible = false;
			},
            // select选择框
            handleSelectionChange(val) {
                this.selectData = val;
                console.log(val);
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
				this.searchBoxFlag=false;
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
				this.$http.post(`${process.env.NODE_ENV}/basicdata/marketmember/jsonlist`,queryParam)
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
				self.$util.dictory.getItemsByDicKey("member_type","memberTypeList",this);
				self.$util.dictory.getItemsByDicKey("enterprise_nature","enterpriseNatureList",this);
				self.$util.dictory.getItemsByDicKey("industry_category","industryCategoryList",this);
				self.$util.dictory.getItemsByDicKey("member_status","memberStatusList",this);
			},
			addMarketMember(formName){
				let self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						var queryParam = {
							code:"0",
							msg:"",
							data:{
								marketMember:{
									memberCode:self.form.memberCode,
									memberName:self.form.memberName,
									memberType:self.form.memberType,
									memberShortName:self.form.memberShortName,
									enterpriseNature:self.form.enterpriseNature,
									industryCategory:self.form.industryCategory,
									memberPartentId:self.form.memberPartentId,
									sysRegisterDate:self.form.sysRegisterDate,
									sysRegisterOrg:self.form.sysRegisterOrg,
									sysInvalidDate:self.form.sysInvalidDate,
									memberStatus:self.form.memberStatus
								},
								marketMemberDetail:{
									memberCreditCode:self.form.memberCreditCode,
									legalRepresentaive:self.form.legalRepresentaive,
									registerCapital:self.form.registerCapital,
									licenseKeyCode:self.form.licenseKeyCode,
									licenseStartDate:self.form.licenseStartDate,
									licenseEffectDate:self.form.licenseEffectDate,
									bankAccout:self.form.bankAccout,
									bankCode:self.form.bankCode,
									taxpayerCode:self.form.taxpayerCode,
									telephone:self.form.telephone,
									areaCode:self.form.areaCode,
									provinceId:self.form.provinceId,
									cityId:self.form.cityId,
									address:self.form.address,
									contacts:self.form.contacts,
									contactsTelephone:self.form.contactsTelephone,
									email:self.form.email
								}
							}
						};
						self.$http.post(`${process.env.NODE_ENV}/basicdata/marketmember/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加市场成员成功！");
									self.searchForPage();
									self.form = {};
									self.dialogFormVisible = false;
								}else if(response.data.code == 1){
									self.notice(response.data.message);
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

			editMarketMember(formName){
				let self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:"0",
							msg:"",
							data:{
								marketMember:{
									marketMemberId:self.editForm.marketMemberId,
									memberCode:self.editAllForm.memberCode,
									memberName:self.editAllForm.memberName,
									memberType:self.editAllForm.memberType,
									memberShortName:self.editAllForm.memberShortName,
									enterpriseNature:self.editAllForm.enterpriseNature,
									industryCategory:self.editAllForm.industryCategory,
									memberPartentId:self.editAllForm.memberPartentId,
									sysRegisterDate:self.editAllForm.sysRegisterDate,
									sysRegisterOrg:self.editAllForm.sysRegisterOrg,
									sysInvalidDate:self.editAllForm.sysInvalidDate,
									memberStatus:self.editAllForm.memberStatus
								},
								marketMemberDetail:{
									marketMemberId:self.editDetailForm.marketMemberId,
									memberCreditCode:self.editAllForm.memberCreditCode,
									legalRepresentaive:self.editAllForm.legalRepresentaive,
									registerCapital:self.editAllForm.registerCapital,
									licenseKeyCode:self.editAllForm.licenseKeyCode,
									licenseStartDate:self.editAllForm.licenseStartDate,
									licenseEffectDate:self.editAllForm.licenseEffectDate,
									bankAccout:self.editAllForm.bankAccout,
									bankCode:self.editAllForm.bankCode,
									taxpayerCode:self.editAllForm.taxpayerCode,
									telephone:self.editAllForm.telephone,
									areaCode:self.editAllForm.areaCode,
									provinceId:self.editAllForm.provinceId,
									cityId:self.editAllForm.cityId,
									address:self.editAllForm.address,
									contacts:self.editAllForm.contacts,
									contactsTelephone:self.editAllForm.contactsTelephone,
									email:self.editAllForm.email
								}
							}
						}
						self.$http.post(`${process.env.NODE_ENV}/basicdata/marketmember/update`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("修改市场成员成功！");
									self.searchForPage();
									self.editAllForm = {};
									self.editForm = {};
									self.editDetailForm = {};
									self.dialogEditFormVisible = false;
								}else if(response.data.code == 1){
									self.notice(response.data.message);
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
			// 编辑
			handleClick(){
				let self = this;
				// 修改时判断只能选中一条数据
				if (self.selectData.length !== 1) {
					return self.notice("只能选中一条数据进行操作");
				}
				self.dialogEditFormVisible = true;
				self.$util.dictory.getItemsByDicKey("member_type","memberTypeList",this);
				self.$util.dictory.getItemsByDicKey("enterprise_nature","enterpriseNatureList",this);
				self.$util.dictory.getItemsByDicKey("industry_category","industryCategoryList",this);
				self.$util.dictory.getItemsByDicKey("member_status","memberStatusList",this);
				self.$http.get(`${process.env.NODE_ENV}/basicdata/marketmember/info/${self.selectData[0].marketMemberId}`)
					.then((response) => {
						if(response.data.code == 0){
							self.editForm = response.data.data.marketMember;
							self.editDetailForm = response.data.data.marketMemberDetail;

							self.$set(self.editAllForm,"memberCode",self.editForm.memberCode);
							self.$set(self.editAllForm,"memberName",self.editForm.memberName);
							self.$set(self.editAllForm,"memberType",self.editForm.memberType);
							self.$set(self.editAllForm,"memberShortName",self.editForm.memberShortName);
							self.$set(self.editAllForm,"enterpriseNature",self.editForm.enterpriseNature);
							self.$set(self.editAllForm,"industryCategory",self.editForm.industryCategory);
							self.$set(self.editAllForm,"memberPartentId",self.editForm.memberPartentId);
							self.$set(self.editAllForm,"sysRegisterDate",self.editForm.sysRegisterDate);
							self.$set(self.editAllForm,"sysRegisterOrg",self.editForm.sysRegisterOrg);
							self.$set(self.editAllForm,"sysInvalidDate",self.editForm.sysInvalidDate);
							self.$set(self.editAllForm,"memberStatus",self.editForm.memberStatus);

							self.$set(self.editAllForm,"memberCreditCode",self.editDetailForm.memberCreditCode);
							self.$set(self.editAllForm,"legalRepresentaive",self.editDetailForm.legalRepresentaive);
							self.$set(self.editAllForm,"registerCapital",self.editDetailForm.registerCapital);
							self.$set(self.editAllForm,"licenseKeyCode",self.editDetailForm.licenseKeyCode);
							self.$set(self.editAllForm,"licenseStartDate",self.editDetailForm.licenseStartDate);
							self.$set(self.editAllForm,"licenseEffectDate",self.editDetailForm.licenseEffectDate);
							self.$set(self.editAllForm,"bankAccout",self.editDetailForm.bankAccout);
							self.$set(self.editAllForm,"bankCode",self.editDetailForm.bankCode);
							self.$set(self.editAllForm,"taxpayerCode",self.editDetailForm.taxpayerCode);
							self.$set(self.editAllForm,"telephone",self.editDetailForm.telephone);
							self.$set(self.editAllForm,"areaCode",self.editDetailForm.areaCode);
							self.$set(self.editAllForm,"provinceId",self.editDetailForm.provinceId);
							self.$set(self.editAllForm,"cityId",self.editDetailForm.cityId);
							self.$set(self.editAllForm,"address",self.editDetailForm.address);
							self.$set(self.editAllForm,"contacts",self.editDetailForm.contacts);
							self.$set(self.editAllForm,"contactsTelephone",self.editDetailForm.contactsTelephone);
							self.$set(self.editAllForm,"email",self.editDetailForm.email);
						}

					})
					.catch(function(error) {
						console.log(error);
					});


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
						deleteIds.push(e.marketMemberId);
					})
					console.log(deleteIds);
					var queryParam = {
						code:"0",
						msg:"",
						data:{
							ids:deleteIds
						}
					}
					self.$http.post(`${process.env.NODE_ENV}/basicdata/marketmember/deletes`,queryParam)
						.then((response) => {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.searchForPage();
							}else if(response.data.code == 1){
								self.$message({
									type: 'warn',
									message: response.data.msg
								});

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
			margin-bottom: 20px  !important;
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

<style lang="less">
	.el-date-editor.el-input, .el-date-editor.el-input__inner {
		width: 100%;
	}
	// 添加窗口样式
	.elDialog {
		.el-dialog__body {
			.flx {
				display: flex;
				.el-form-item {
					width: 50%;
					margin-bottom: 20px;
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
