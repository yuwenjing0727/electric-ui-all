<template>
	<div id="all">
		<div class="btnBox">
			<!--<el-input placeholder="菜单名称" style="width:200px;" v-model="menuName"></el-input>
			<el-button type="primary" @click="searchForPage()">查询</el-button>-->
			<el-button type="primary" size="small" @click="showCreateDialogForm" v-show="buttonPermission.add">添加</el-button>
		</div>
		<div class="tableBox">
			<div class="el-table">
				<TableTree :option="option">
					<el-table-column label="操作"
									 width="200">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="success" size="small" v-show="buttonPermission.edit">编辑</el-button>
							<el-button type="danger" size="mini" @click="delRow(scope.row)" v-show="buttonPermission.delete">删除</el-button>

						</template>
					</el-table-column>
				</TableTree>
			</div>
			<!--<div class="block">
				&lt;!&ndash;<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
&ndash;&gt;
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>-->


		</div>

		<el-dialog title="添加" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form" ref="ruleForm" :rules="rules">
				<div class="flxRadio">
					<el-form-item label="类型" :label-width="formLabelWidth">
						<el-radio v-model="form.menuType" :label=item.paraCode :key="index" v-for="(item,index)  in  menuTypeList">{{item.paraKey}}</el-radio>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
						<el-input v-model="form.menuName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" :label-width="formLabelWidth">
						<el-select v-model="form.parentId" placeholder="请选择">
							<el-option
								v-for="item in parentMenuOption"
								:key="item.menuId"
								:label="item.menuName"
								:value="item.menuId">
							</el-option>
						</el-select>
					</el-form-item>

				</div>
				<div class="flx">
					<el-form-item label="菜单URL" :label-width="formLabelWidth">
						<el-input v-model="form.menuUrl" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="授权标识" :label-width="formLabelWidth">
						<el-input v-model="form.permission" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="排序号" :label-width="formLabelWidth">
						<el-input v-model="form.order" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="图标" :label-width="formLabelWidth">
						<el-input v-model="form.icon" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="菜单类别" :label-width="formLabelWidth">
							<el-radio v-model="form.menuCategory" :label=item.paraCode :key="index" v-for="(item,index)  in  categoryList">{{item.paraKey}}</el-radio>
						</el-form-item>
					<el-form-item label="按钮操作标识编码" label-width="130px">
						<el-input v-model="form.menuOperationCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRole('ruleForm')">新 增</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm">
				<div class="flxRadio">
					<el-form-item label="类型" :label-width="formLabelWidth">
						<el-radio v-model="editForm.menuType" :label=item.paraCode :key="index" v-for="(item,index)  in  menuTypeList">{{item.paraKey}}</el-radio>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="菜单名称" :label-width="formLabelWidth">
						<el-input v-model="editForm.menuName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" :label-width="formLabelWidth">
						<el-select v-model="editForm.parentId" placeholder="请选择">
							<el-option
								v-for="item in parentMenuOption"
								:key="item.menuId"
								:label="item.menuName"
								:value="item.menuId">
							</el-option>
						</el-select>
					</el-form-item>

				</div>
				<div class="flx">
					<el-form-item label="菜单URL" :label-width="formLabelWidth">
						<el-input v-model="editForm.frontPath" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="授权标识" :label-width="formLabelWidth">
						<el-input v-model="editForm.menuPermission" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="排序号" :label-width="formLabelWidth">
						<el-input v-model="editForm.menuSort" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="图标" :label-width="formLabelWidth">
						<el-input v-model="editForm.menuIcon" auto-complete="off"></el-input>
					</el-form-item>
				</div>

				<div class="flx">
					<el-form-item label="菜单类别" :label-width="formLabelWidth">
						<el-radio v-model="editForm.menuCategory" :label=item.paraCode :key="index" v-for="(item,index)  in  categoryList">{{item.paraKey}}</el-radio>
					</el-form-item>
					<el-form-item label="按钮操作标识编码" label-width="130px">
						<el-input v-model="editForm.menuOperationCode" auto-complete="off"></el-input>
					</el-form-item>
				</div>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editRole()">保存</el-button>
			</div>
		</el-dialog>
	</div>


</template>

<script>
	import TableTree from '../../../../table-tree/src/main.vue';
	export default {
		data(){
			return{
				buttonPermission:JSON.parse(sessionStorage.buttonPermission),
				menuName:"",
				tableData: [
					{
						menuId: '2',
						menuName: '系统管理',
						parentMenu: '',
						icon:'',
						type:'目录',
						order:'0',
						menuUrl:'',
						permission:''
					},
					{
						menuId: '2',
						menuName: '管理员列表',
						parentMenu: '系统管理',
						icon:'',
						type:'菜单',
						order:'1',
						menuUrl:'modules/sys/user.html',
						permission:''
					},
					{
						menuId: '15',
						menuName: '查看',
						parentMenu: '管理员列表',
						icon:'',
						type:'按钮',
						order:'0',
						menuUrl:'',
						permission:'sys:user.list,sys:user.info'
					},
					{
						menuId: '15',
						menuName: '查看',
						parentMenu: '管理员列表',
						icon:'',
						type:'按钮',
						order:'0',
						menuUrl:'',
						permission:'sys:user.list,sys:user.info'
					},
					{
						menuId: '15',
						menuName: '查看',
						parentMenu: '管理员列表',
						icon:'',
						type:'按钮',
						order:'0',
						menuUrl:'',
						permission:'sys:user.list,sys:user.info'
					},
					{
						menuId: '15',
						menuName: '查看',
						parentMenu: '管理员列表',
						icon:'',
						type:'按钮',
						order:'0',
						menuUrl:'',
						permission:'sys:user.list,sys:user.info'
					},
					{
						menuId: '15',
						menuName: '查看',
						parentMenu: '管理员列表',
						icon:'',
						type:'按钮',
						order:'0',
						menuUrl:'',
						permission:'sys:user.list,sys:user.info'
					}

				],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				// 弹窗显隐
				dialogFormVisible: false,
				dialogEditFormVisible:false,
				// 新增数据
				form: {
					menuType: '',
					menuName: '',
					parentMenu: '',
					parentId: '',
					menuUrl: '',
					permission: '',
					order: '',
					icon: '',
					menuCategory:"",
					menuOperationCode:"",

				},
				/*编辑数据*/
				editForm:{},
				formLabelWidth: '100px',
				option:{
				    data:"",
					columns:[
					 /*{text:"菜单ID",value:"menuId"},*/
					 {text:"",value:""},
					 {text:"菜单名称",value:"menuName"},
					 {text:"上级菜单",value:"parentName"},
					 {text:"图标",value:"menuIcon"},
					 {text:"类型",value:"menuTypeName"},
					 {text:"排序号",value:"menuSort"},
					 {text:"菜单URL",value:"reqUrl"},
					 {text:"授权标识",value:"menuOperationCode"},
					 ],
					expandAll:"false",
					border:"",
				},
				parentMenuOption:[],
				categoryList:[],
				menuTypeList:[],
				pageSizesObjectList:[],
				pageSizes:[5,10,50,100],
				rules:{
					menuName:[
						{ required: true, message: '菜单名称不能为空', trigger: 'blur' }
					]
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
			getPageData() {
				this.$http.get(`${process.env.NODE_ENV}/admin/menu/selectalltree`)
					.then((response) => {
				    console.log(response)
						//this.tableData = response.data.data;
						this.option.data = response.data.data;

					})
					.catch(function(error) {
						console.log(error);
					});

				console.log(this.tableData)
			},

			/*分页*/
			handleSizeChange(val) {
				this.pageSize = val;
				this.getPageData();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.getPageData();
			},
			/*查询*/
			searchForPage(){
				this.currentPage = 1;
			},
			/*编辑*/
			handleClick(row){
			    var self=this;
				self.dialogEditFormVisible=true;
			    console.log("编辑")
				console.log(row)
				self.getItemsByDicKey('menu_category','categoryList')
				self.getItemsByDicKey('menu_type','menuTypeList')

			/*	self.editForm.id=row.menuId;
				self.editForm.type=row.menuType;
				self.editForm.menuName=row.menuName;
				self.editForm.parentMenu=row.parentName;
				self.editForm.parentId=row.parentId;
				self.editForm.menuUrl=row.frontPath;
				self.editForm.permission=row.menuPermission;
				self.editForm.order=row.menuSort;
				self.editForm.icon=row.menuIcon;*/
				self.$http.get(`${process.env.NODE_ENV}/admin/menu/list`)
					.then((response) => {
						if(response.data.code == 0){
							console.log("list")
							console.log(response)
							self.parentMenuOption=response.data.data
							self.parentMenuOption.unshift(
								{menuId:"-1", menuName:"根目录"}
							)
						}
						self.getPageData()

					})
					.catch(function(error) {
						console.log(error);
					});

				self.$http.get(`${process.env.NODE_ENV}/admin/menu/info/${row.menuId}`)
					.then((response) => {
				    console.log("response")
				    console.log(response)
						self.editForm=response.data.data
						/*self.editForm.id=response.data.data.menuId;
						self.editForm.type=response.data.data.menuType;
						self.editForm.menuName=response.data.data.menuName;
						self.editForm.parentMenu=response.data.data.parentName;
						self.editForm.parentId=response.data.data.parentId;
						self.editForm.menuUrl=response.data.data.frontPath;
						self.editForm.permission=response.data.data.menuPermission;
						self.editForm.order=response.data.data.menuSort;
						self.editForm.icon=response.data.data.menuIcon;*/
					})
					.catch(function(error) {
						console.log(error);
					});

			},
             /*删除*/
			delRow(row){
			    /* let a={
					 "code":"0",
					 "msg":"success",
					 "data":{
						 "limit":2,
						 "page":2,
						 "filter_parameters":{
							 "orgId":"1"
						 }
					 }

				 }*/

				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/menu/delete/${row.menuId}`)
						.then((response) => {
							if(response.data.data == true){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.getPageData();
							}else{
                                   self.prompt(response.data.msg)

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
			editRole(){
				let self = this;
				console.log(self.editForm.menuId);

				let queryParam = {
					code: '0',
					data: {
						menuId:self.editForm.menuId,
						menuType:self.editForm.menuType,
						menuName:self.editForm.menuName,
						parentId:self.editForm.parentId,
						frontPath:self.editForm.frontPath,
						menuPermission:self.editForm.menuPermission,
						menuSort:self.editForm.menuSort,
						menuIcon:self.editForm.menuIcon,
						menuCategory:self.editForm.menuCategory,
						menuOperationCode:self.editForm.menuOperationCode
					},
					msg: "",
				};
				self.$http.post(`${process.env.NODE_ENV}/admin/menu/update`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							self.success("修改菜单成功！");
							self.searchForPage();
							self.editForm={}
							/*self.editForm.type = "";
							self.editForm.menuName = "";
							self.editForm.parentMenu = "";
							self.editForm.menuUrl= "";
							self.editForm.permission = "";
							self.editForm.order = "";
							self.editForm.icon="";*/
							self.dialogEditFormVisible = false;
						}

						self.getPageData()
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			/*添加*/
			showCreateDialogForm(){
				let self=this;
				self.dialogFormVisible=true;
				self.getItemsByDicKey('menu_category','categoryList')
				self.getItemsByDicKey('menu_type','menuTypeList')

				/*parentMenu*/
				self.$http.get(`${process.env.NODE_ENV}/admin/menu/list`)
					.then((response) => {
						if(response.data.code ==0){
						    console.log("list")
							console.log(response)
							self.parentMenuOption=response.data.data
							self.parentMenuOption.unshift(
								{menuId:"-1", menuName:"根目录"}
							)
						}
						self.getPageData()

					})
					.catch(function(error) {
						console.log(error);
					});


			},
			addRole(formName){
			    let  self=this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						let queryParam = {
							code:'0',
							data:{
								menuType:self.form.menuType,
								menuName:self.form.menuName,
								parentId:self.form.parentId,
								frontPath:self.form.menuUrl,
								menuPermission:self.form.permission,
								menuSort:self.form.order,
								menuIcon:self.form.icon,
								menuCategory:self.form.menuCategory,
								menuOperationCode:self.form.menuOperationCode,
							},
							msg: ""

						};
						console.log("111")
						console.log(queryParam)
						self.$http.post(`${process.env.NODE_ENV}/admin/menu/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加菜单成功！");
									self.searchForPage();
									self.form.type = "";
									self.form.menuName = "";
									self.form.parentMenu = "";
									self.form.menuUrl= "";
									self.form.permission = "";
									self.form.order = "";
									self.form.icon="";
									self.form.menuCategory="";
									self.form.menuOperationCode="";
									self.dialogFormVisible = false;
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

			/*数据字典*/
			getItemsByDicKey(key,s){
				let self = this;
				self.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key}`)
					.then((response) => {
						if(response.data.code == 0){
							self[s] =  response.data.data;
							console.log(self[s]);
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},



		},
		components: {TableTree},
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
	.elDialog .el-dialog__body .flxRadio .el-form-item {
		width: 100%;
		padding-right: 30px;
	}
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
