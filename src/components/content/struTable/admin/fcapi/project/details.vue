<template>
	<div  class="wrap">
		<div class="btnBox">
			<span style="font-weight: 700; font-size: 18px">接口管理</span>
		</div>
		<div class="tableBox">
			<div class="left">
				<div class="title">{{projectName}}</div>
				<div class="subMenu">
					<div class="menuTitle">
						<span>接口分组</span>
						<i @click="dialogFormVisible=true" style="cursor:pointer;">+</i>
					</div>
					<!--<el-tree
						:data="groupList"
						node-key="ID"
						default-expand-all
						:expand-on-click-node="false"
						@node-click="handleNodeClick">
					</el-tree>-->
					<ul class="menuList">
						<li style="cursor:pointer;" v-for="(group,index) in groupList" :key="index" @click="handleNodeClick(group)">
							<i class="icon"></i>
							<span :class="isActive === group.NAME ? 'active': ''">{{group.NAME}}</span>
							</li>
					</ul>
				</div>
			</div>
			<div class="right">
				<div class="title">
					<div class="t_left">
					<span>{{interfaceName}}</span>
					<el-button  v-show="(interfaceName!='默认分组')&&(interfaceName!='全部')" type="success" size="mini" @click="showEditGroupDialog">编辑分组</el-button>
					<el-button v-show="(interfaceName!='默认分组')&&(interfaceName!='全部')" type="danger" size="mini" @click="deleteGroup">删除分组</el-button>
					<router-link :to="{path:'addPage', query:{projectId:projectId,projectName:projectName}}">
						<el-button type="primary" size="mini">+新增接口</el-button>
					</router-link>

					<span>共{{interfaceTotal}}个接口</span>
				</div>
					<div class="t_right">
						<!--<el-autocomplete
							size="mini"
							v-model="selectInterfaceName"
							:fetch-suggestions="interfaceData"
							placeholder="请输入接口"
							@select="handleSelect"
						></el-autocomplete>-->

						<el-input
							size="mini"
							placeholder="接口搜索"
							prefix-icon="el-icon-search"
							v-model="selectInterfaceName">
						</el-input>
					</div>

				</div>
				<div class="tableCon">
					<div class="el-table">
						<el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
							<el-table-column header-align="center" prop="requestUrl" label="URL">
							</el-table-column>
							<el-table-column header-align="center" prop="documentName" label="名称">
							</el-table-column>
							<el-table-column header-align="center" prop="groupId" label="分组">
							</el-table-column>

							<el-table-column fixed="right" label="操作" width="250">
								<template slot-scope="scope">
									<router-link :to="{path:'editPage', query:{projectId:projectId,projectName:projectName,documentId:scope.row.documentId}}">
										<el-button type="success" size="mini">编辑</el-button>
									</router-link>

									<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
									<router-link :to="{path:'testPage', query:{documentId:scope.row.documentId,projectName:projectName,projectId:projectId}}">
										<el-button type="primary" size="mini" >测试</el-button>
									</router-link>

								</template>
							</el-table-column>
						</el-table>

					</div>
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
									   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
						</el-pagination>
					</div>
				</div>


			</div>

		</div>
		<el-dialog title="新增接口分组" :visible.sync="dialogFormVisible" class="elDialog">
			<el-form :model="form"  :rules="rules" ref="ruleAddGroupForm">
				<div class="flx">
					<el-form-item label="分组名称" :label-width="formLabelWidth" prop="groupName">
						<el-input v-model="form.groupName" auto-complete="off" placeholder="请输入分组名称"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="分组排序" class="textArea" :label-width="formLabelWidth" prop="groupSort"  placeholder="请输入分组排序">
						<el-input  v-model.number="form.groupSort"></el-input>
					</el-form-item>
				</div>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureAdd('ruleAddGroupForm')">保存</el-button>
			</div>

		</el-dialog>

		<el-dialog title="更新接口分组" :visible.sync="dialogEditFormVisible" class="elDialog">
			<el-form :model="editForm"  :rules="rules" ref="ruleEditGroupForm">
				<div class="flx">
					<el-form-item label="分组名称" :label-width="formLabelWidth" prop="groupName">
						<el-input v-model="editForm.groupName" auto-complete="off" placeholder="请输入分组名称"></el-input>
					</el-form-item>
				</div>
				<div class="flx">
					<el-form-item label="分组排序" class="textArea" :label-width="formLabelWidth" prop="groupSort"  placeholder="请输入分组排序">
						<el-input  v-model.number="editForm.groupSort"></el-input>
					</el-form-item>
				</div>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureEdit('ruleEditGroupForm')">更新</el-button>
			</div>

		</el-dialog>

	</div>

</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				projectId:this.$route.query.projectId,
				projectName:this.$route.query.projectName,
				selectedGroupId:"-1",//默认展示全部接口
				groupList:[
					{ID:"-1", NAME:"全部"},
					{ID:"0", NAME:"默认分组"},
				],
				dialogFormVisible:false,
				dialogEditFormVisible:false,
				formLabelWidth:"100px",
				form:{
					groupName:"",
					groupSort:"",
				},
				editForm:{},
				rules: {
					groupName: [
						{ required: true, message: '请输入分组名称', trigger: 'blur' },
					],
					groupSort:[
						{ required: true, message: '请输入分组排序', trigger: 'blur' },
						{ type: 'number', message: '分组排序必须为数字', trigger: 'blur'}

					]
				},
				selectInterfaceName:"",
				interfaceData:[],
				// 表格数据
				tableData: [],
				// 分页数据
				currentPage: 1,
				pageSize: 10,
				total: 0,
				pageSizesObjectList:[],
				pageSizes:[5, 10, 50,100],
				interfaceName:"全部",
				interfaceTotal:"",
				isActive:"全部",


			};
		},
		created(){
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			this.getGroupList();
			this.getPageData();
		},
		methods: {
			// 删除弹窗
			append(data) {
				const newChild = { id: id++, label: 'testtest', children: [] };
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},

			deleteGroup(){
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/group/delete/${this.selectedGroupId}`)
						.then((response) => {
							if(response.data.code == 0){
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
								self.getGroupList();
							}else if(response.data.code == 1){
								self.$message({
									type: 'error',
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

			sureAdd(formName){
				let  self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						var queryParam = {
							code:"0",
							msg:"",
							data:{
								groupName: this.form.groupName,
								projectId: this.projectId,
								groupSort: this.form.groupSort
							}

						};
						self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/group/save`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("添加分组成功！");
									self.getGroupList();
									self.form = {};
									self.dialogFormVisible=false;
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

			sureEdit(formName){
				let  self = this;
				self.$refs[formName].validate((valid) => {
					if (valid) {
						var queryParam = {
							code:"0",
							msg:"",
							data:self.editForm
						};
						self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/group/update`,queryParam)
							.then((response) => {
								if(response.data.code == 0){
									self.success("更新分组成功！");
									self.getGroupList();
									self.editForm = {};
									self.dialogEditFormVisible=false;
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

			showEditGroupDialog(){
				let self = this;
				self.dialogEditFormVisible = true;
				self.$http.get(`${process.env.NODE_ENV}/admin/fc/project/group/info/${this.selectedGroupId}`)
					.then((response) => {
						if(response.data.code == 0){
							self.editForm = response.data.data;
						}

					})
					.catch(function(error) {
						console.log(error);
					});


			},

			handleSelect(item) {
				console.log(item);
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
							projectId:this.projectId,
							groupId:this.selectedGroupId,
							documentName:this.selectInterfaceName
						},
						page: this.currentPage,
						limit: this.pageSize
					}

				};
				this.$http.post(`${process.env.NODE_ENV}/admin/fc/project/document/list`,queryParam)
					.then((response) => {
						if(response.data.code == 0){
							this.total = response.data.data.total;
							this.pageSize = response.data.data.size;
							this.tableData = response.data.data.records;
							this.interfaceTotal=response.data.data.total;
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},

			//删除接口
			del(s) {
				let self = this;
				self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.$http.post(`${process.env.NODE_ENV}/admin/fc/project/document/delete/${s.documentId}`)
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

			//获取分组树
			getGroupList(){
				this.$http.get(`${process.env.NODE_ENV}/admin/fc/project/group/list/${this.projectId}`)
					.then((response) => {
						if(response.data.code == 0){
							this.groupList = [
								{ID:"-1", NAME:"全部"},
								{ID:"0", NAME:"默认分组"},
							];
							this.groupList = this.groupList.concat(response.data.data);
						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
             /*点击树节点*/
			handleNodeClick(data) {
			    console.log("点击树节点")
				console.log(data);
                 this.isActive=data.NAME
			    this.interfaceName=data.NAME;
			    this.selectedGroupId = data.ID;
			    //获取指定项目，分组下的接口
				this.searchForPage();
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

			},

			selectInterfaceName(newV,oldV){
				this.searchForPage();
			}

		}
	};
</script>

<style lang="less" scoped >
	.wrap{
		/*padding: 10px;*/
		min-height: 100%;
		height: auto;
		position: relative;
		/*background: forestgreen;*/
	}
	.btnBox {
		width: 100%;
		height: 30px;
		line-height: 30px;
		span{
			margin-left: 10px;
		}
	}

	.tableBox {
		/*position: absolute;
		top: 30px;
		bottom: 50px;
		left: 10px;
		right: 10px;*/
		/*height: 90%;*/
		width: 100%;
		.left{
			position: absolute;
			width: 24%;
			height: 100%;
			.title{
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 16px;
				color: #fff;
				background: #409EFF;
				border-radius: 3px;

			}
			.subMenu{
				margin-top: 10px;
				background: #fff;
				width: 100%;
				height: auto;
				.menuTitle{
					height: 30px;
					line-height: 30px;
					font-size: 16px;
					width: 100%;
					border-bottom: 1px  solid #e5e5e5;
					span{
						margin-left: 10px;
						float: left;
					}
					i{
						text-align: right;
						float: right;
						margin-right: 10px;
					}
				}
				.menuList{
					li{
						height: 30px;
						line-height: 30px;
						border-bottom: 1px  solid #e5e5e5;
						span{
							margin-left: 20px;}

					}
					li:hover{
						background: #EBEBEB;
					}
					.active{
						font-size: 14px;
						font-weight:600;
					}


				}
			}
		}
		.right{
			margin-left: 25%;
			height: 100%;
			background: #fff;
			padding: 10px;
			.title{
				height: 30px;
				display: flex;
				margin-bottom: 10px;
				.t_left{
					width: 76%;

				}
				.t_right{
					flex: 1;

				}
			}



		}
	}

	.el-table,.block{
		margin-top: 10px;
	}

	.block{
	/*	position: absolute;*/
		padding: 0 10px;
		height: 40px;
		left:10px;
		right:10px;
		bottom: 0;
	/*	border-top:1px solid #eee;*/
		div{
			position: absolute;
			right:10px;
			bottom:3px
		}
	}
</style>
