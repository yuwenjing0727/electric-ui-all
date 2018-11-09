<template>
	<div id="all">
		<div class="btnBox">
			<label style="font-size: 14px;">登录账号</label>
			<el-input placeholder="角色名称" style="width:200px;" size="small" v-model="loginName"></el-input>
			<label style="font-size: 14px;">真实姓名</label>
			<el-input placeholder="真实姓名" style="width:200px;" size="small" v-model="userName"></el-input>
			<el-button type="primary" size="small" @click="searchUser" v-show="buttonPermission.query">查询</el-button>
			<el-button type="primary" size="small" @click="allotRole">分配角色</el-button>
			<!--<el-input clearable placeholder="登录账号" style="width:140px;" size="small" v-model="loginName"></el-input>
            <el-input clearable placeholder="真实姓名" style="width:140px;" size="small" v-model="userName"></el-input>-->
			<!--<el-select v-model="userType" placeholder="请选择用户类型" clearable size="small" style="width:140px;">
                <el-option
                    v-for="keyValueItem in keyValueItemList"
                    :key="keyValueItem.paraCode"
                    :label="keyValueItem.paraKey"
                    :value="keyValueItem.paraCode">
                </el-option>
            </el-select>-->
			<!-- <el-input clearable placeholder="手机号码" style="width:140px;" size="small" v-model="mobile"></el-input>-->
			<!--<el-select v-model="userState" clearable placeholder="请选择用户状态" size="small" style="width:140px;">
                <el-option
                    v-for="keyValueItem in keyValueItemList2"
                    :key="keyValueItem.paraCode"
                    :label="keyValueItem.paraKey"
                    :value="keyValueItem.paraCode">
                </el-option>
            </el-select>-->

		</div>
		<!--<div class="btnBox">
            &lt;!&ndash;<el-button type="text" icon="el-icon-circle-plus" @click="createfrom=true">增加</el-button>
            <el-button type="text" icon="el-icon-edit" @click="editUser">修改</el-button>
            <el-button type="text" icon="el-icon-circle-close" @click="delUser">删除</el-button>
            <el-button type="text" icon="el-icon-circle-close" @click="banUser">停用</el-button>&ndash;&gt;

            &lt;!&ndash; <el-button type="text" icon="el-icon-share">分配特权</el-button>
            <el-button type="text" icon="el-icon-back">回收权限</el-button> &ndash;&gt;
            &lt;!&ndash;<el-button type="text" icon="el-icon-refresh" @click="resetUserPw">重置</el-button>&ndash;&gt;

        </div>-->
		<div class="tableBox">
			<div class="stru-tree" :style="{width:strustyle.width}">
				<div v-show="strustyle.display">
					<div class="stru-top">
						<p>组织机构树</p>
						<p>
							<i class="el-icon-d-arrow-left" title="收起" @click="togglletree()"></i>
						</p>
					</div>
					<!--<el-tree :data="data2" node-key="id" ref="stru-tree" :props="defaultProps" highlight-current @node-click="handleNodeClick">
					</el-tree>-->
					<div style="width:100%;height:420px;overflow: auto;">
						<el-tree lazy :load="getOrgList" :props="defaultProps" highlight-current @node-click="handleNodeClick">
						</el-tree>
					</div>
				</div>
			</div>

			<div class="table-page" :style="{width:tablestyle.width}">
				<div class="page-top">
					<p @click="togglletreeshow()"><i class="el-icon-d-arrow-right" style="margin-right:10px" title="展开" v-show="!strustyle.display"></i></p>
					<p>用户列表</p>
				</div>
				<div class="page-content">
					<el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%" height="100%" @selection-change="handleSelectionChange">

						<el-table-column type="selection" width="55" align="center">
						</el-table-column>
						<el-table-column prop="loginName" label="登录账号" align="center">
						</el-table-column>
						<el-table-column prop="userName" label="真实姓名" align="center">
						</el-table-column>
						<!--<el-table-column prop="userType" label="用户类型" align="center" :formatter="userTypeFlags">
                        </el-table-column>-->
						<el-table-column prop="mobile" label="手机号码" align="center">
						</el-table-column>
						<!--<el-table-column prop="sex" label="性别" align="center" :formatter="sexFlags">
                        </el-table-column>
                        <el-table-column prop="userState" label="用户状态" align="center" :formatter="userStateFlags">
                        </el-table-column>-->
						<el-table-column prop="userEmail" label="邮箱地址" align="center">
						</el-table-column>
					</el-table>
				</div>
				<div class="Pagination">
					<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50, 100]"
					    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination> -->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--<div class="">
			<el-dialog title="添加" :visible.sync="createfrom" class="usermodel">
				<el-form :model="form">
					<div class="flx">
						<el-form-item label="登录账号" :label-width="formLabelWidth">
							<el-input v-model="form.loginName" auto-complete="off"></el-input>
						</el-form-item>

						<el-form-item label="真实姓名" :label-width="formLabelWidth">
							<el-input v-model="form.userName" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<div class="flx">
						<el-form-item label="工号" :label-width="formLabelWidth">
							<el-input v-model="form.userNo"></el-input>
						</el-form-item>
						<el-form-item label="昵称" :label-width="formLabelWidth">
							<el-input v-model="form.nickName"></el-input>
						</el-form-item>
					</div>
					<div class="flx">
						<el-form-item label="管理员" :label-width="formLabelWidth">
                            <el-select v-model="form.adminFlag" placeholder="请选择类型">
								<el-option
                                    v-for="keyValueItem in keyValueItemList4"
                                    :key="keyValueItem.paraCode"
                                    :label="keyValueItem.paraKey"
                                    :value="keyValueItem.paraCode">
                                </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户类型" :label-width="formLabelWidth">
							<el-select v-model="form.userType" placeholder="请选择类型">
								<el-option
                                    v-for="keyValueItem in keyValueItemList"
                                    :key="keyValueItem.paraCode"
                                    :label="keyValueItem.paraKey"
                                    :value="keyValueItem.paraCode">
                                </el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="flx">
						<el-form-item label="手机号码" :label-width="formLabelWidth">
							<el-input v-model="form.mobile"></el-input>
						</el-form-item>
						<el-form-item label="性别" :label-width="formLabelWidth">
							<el-radio v-model="form.sex" v-for="keyValueItem in keyValueItemList3" :key="keyValueItem.paraCode" :label="keyValueItem.paraCode">{{keyValueItem.paraKey}}</el-radio>
						</el-form-item>
					</div>

					<div class="flx">
						<el-form-item label="用户状态" :label-width="formLabelWidth">
							<el-select v-model="form.userState" placeholder="请选择用户状态">
                                <el-option
                                    v-for="keyValueItem in keyValueItemList2"
                                    :key="keyValueItem.paraCode"
                                    :label="keyValueItem.paraKey"
                                    :value="keyValueItem.paraCode">
                                </el-option>
                            </el-select>
						</el-form-item>

						<el-form-item label="邮箱地址" :label-width="formLabelWidth">
							<el-input v-model="form.userEmail" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					&lt;!&ndash; <div class="tree">
						<label class="treeLab">用户机构权限</label>
						<el-tree :data="data2" show-checkbox node-key="id" default-expand-all :props="defaultProps" accordion @node-click="handleNodeClick">
						</el-tree>
					</div> &ndash;&gt;
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="createfrom = false">取 消</el-button>
					<el-button type="primary" @click="addRole">新 增</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="">
			<el-dialog title="修改" :visible.sync="modifyfrom" class="usermodel">
				<el-form :model="editForm">
					<div class="flx">
						<el-form-item label="登录账号" :label-width="formLabelWidth">
							<el-input v-model="editForm.loginName" auto-complete="off"></el-input>
						</el-form-item>

						<el-form-item label="真实姓名" :label-width="formLabelWidth">
							<el-input v-model="editForm.userName" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					<div class="flx">
						<el-form-item label="工号" :label-width="formLabelWidth">
							<el-input v-model="editForm.userNo"></el-input>
						</el-form-item>
						<el-form-item label="昵称" :label-width="formLabelWidth">
							<el-input v-model="editForm.nickName"></el-input>
						</el-form-item>
					</div>
					<div class="flx">
						<el-form-item label="管理员" :label-width="formLabelWidth">
                            <el-select v-model="editForm.adminFlag" placeholder="请选择类型">
								<el-option
                                    v-for="keyValueItem in keyValueItemList4"
                                    :key="keyValueItem.paraCode"
                                    :label="keyValueItem.paraKey"
                                    :value="keyValueItem.paraCode">
                                </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户类型" :label-width="formLabelWidth">
							<el-select v-model="editForm.userType" placeholder="请选择类型">
								<el-option
                                    v-for="keyValueItem in keyValueItemList"
                                    :key="keyValueItem.paraCode"
                                    :label="keyValueItem.paraKey"
                                    :value="keyValueItem.paraCode">
                                </el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="flx">
						<el-form-item label="手机号码" :label-width="formLabelWidth">
							<el-input v-model="editForm.mobile"></el-input>
						</el-form-item>
						<el-form-item label="性别" :label-width="formLabelWidth">
							<el-radio v-model="editForm.sex" v-for="keyValueItem in keyValueItemList3" :key="keyValueItem.paraCode" :label="keyValueItem.paraCode">{{keyValueItem.paraKey}}</el-radio>
						</el-form-item>
					</div>

					<div class="flx">
						<el-form-item label="用户状态" :label-width="formLabelWidth">
							<el-select v-model="editForm.userState" placeholder="请选择用户状态">
                                <el-option
                                    v-for="keyValueItem in keyValueItemList2"
                                    :key="keyValueItem.paraCode"
                                    :label="keyValueItem.paraKey"
                                    :value="keyValueItem.paraCode">
                                </el-option>
                            </el-select>
						</el-form-item>
						<el-form-item label="邮箱地址" :label-width="formLabelWidth">
							<el-input v-model="editForm.userEmail" auto-complete="off"></el-input>
						</el-form-item>
					</div>
					&lt;!&ndash; <div class="tree">
						<label class="treeLab">用户机构权限</label>
						<el-tree :data="data2" show-checkbox node-key="id" default-expand-all :props="defaultProps" accordion @node-click="handleNodeClick">
						</el-tree>
					</div> &ndash;&gt;
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="modifyfrom = false">取 消</el-button>
					<el-button type="primary" @click="editUserTrue">保 存</el-button>
				</div>
			</el-dialog>
		</div>-->
		<div class="">
			<el-dialog title="分配角色" :visible.sync="rolefrom" class="usermodel">
				<template>
					<el-transfer v-model="value1" :data="data"></el-transfer>
				</template>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancelAllotRole">取 消</el-button>
					<el-button type="primary" @click="allotRoleTrue">保 存</el-button>
				</div>
			</el-dialog>
		</div>
	</div>

</template>

<script>
	export default {
		name: "basics-m-tab3",
		data() {
			return {
				buttonPermission:JSON.parse(sessionStorage.buttonPermission),
				// 分配角色数据
				data: [],
				value1: [],
				// 用户名
				userName: "",
				loginName: '',
				userState: '',
				userType: [],
				mobile: '',
				// 表格数据
				tableData: [],
				// 组织机构树
				data2: [],
				multipleSelection: [],

				defaultProps: {
					children: "children",
					label: "name"
				},
				// 分页
				currentPage: 1,
				pageSize: 10,
				total: 0,
				strustyle: {
					width: "20%",
					display: true,
				},
				tablestyle: {
					width: "80%",
				},
				/*createfrom: false, //添加弹框状态
				modifyfrom: false, //修改弹框状态*/
				rolefrom: false, // 分配角色弹框
				formLabelWidth: '100px',
				/*// 添加数据
                form: {
                    loginName: '',
                    userName: '',
                    userNo: '',
                    nickName: '',
                    adminFlag: [],
                    userType: [],
                    mobile: '',
                    sex: '1',
                    userState: '1',
                    userEmail: ''
                },
                // 修改数据
                editForm: {
                    loginName: '',
                    userName: '',
                    userNo: '',
                    nickName: '',
                    adminFlag: '',
                    userType: [],
                    mobile: '',
                    sex: '1',
                    userState: '1',
                    userEmail: ''
                },*/
				// 点击树的节点数据
				clickTree: "",
				/*keyValueItemList: [],
                keyValueItemList2: [],
                keyValueItemList3: [],
                keyValueItemList4: [],*/
				pageSizesObjectList: [],
				pageSizes: [5,10,50,100]
			};
		},
		created() {
			/*let self = this;
            let key1 = "user_type";
            self.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key1}`)
                .then((response) => {
                    self.keyValueItemList = response.data.data;
                })
                .catch(function(error) {
                        console.log(error);
                });
            let key2 = "user_state";
            self.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key2}`)
                .then((response) => {
                    self.keyValueItemList2 = response.data.data;
                })
                .catch(function(error) {
                        console.log(error);
                });
            let key3 = "sex_flag";
            self.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key3}`)
                .then((response) => {
                    self.keyValueItemList3 = response.data.data;
                })
                .catch(function(error) {
                        console.log(error);
                });
            let key4 = "admin_flag";
            self.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key4}`)
                .then((response) => {
                    self.keyValueItemList4 = response.data.data;
                })
                .catch(function(error) {
                        console.log(error);
                });*/
			// 分页pagesize
			this.$util.dictory.getItemsByDicKey("page_size","pageSizesObjectList",this);
		},
		mounted() {
			/*this.getOrgList();*/
		},
		methods: {
			/*// 添加
            addRole() {
                let self = this;
                let queryParam = {
                    data: {
                        loginName: self.form.loginName,
                        userName: self.form.userName,
                        userNo: self.form.userNo,
                        nickName: self.form.nickName,
                        adminFlag: self.form.adminFlag,
                        userType: self.form.userType,
                        mobile: self.form.mobile,
                        sex: self.form.sex,
                        userState: self.form.userState,
                        userEmail: self.form.userEmail
                    }
                };
                self.$http.post(`${process.env.NODE_ENV}/admin/user/save`,queryParam)
                    .then((response) => {
                        if(response.data.code == "0"){
                            self.success("添加成功！");
                            self.createfrom = false;
                            self.form.loginName = "";
                            self.form.userName = "";
                            self.form.userNo = "";
                            self.form.nickName = "";
                            self.form.adminFlag = [];
                            self.form.userType = [];
                            self.form.mobile = "";
                            self.form.sex = "1";
                            self.form.userState = "1";
                            self.form.userEmail = "";
                        } else {
                            self.notice(response.data.msg);
                        }

                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            },
            // 修改
            editUser(){
                let self = this;
                if (self.multipleSelection.length != 1)
                    return self.prompt("只能选择一条数据进行修改");
                self.modifyfrom = true;
                self.editForm.loginName = self.multipleSelection[0].loginName;
                self.editForm.userName = self.multipleSelection[0].userName;
                self.editForm.userNo = self.multipleSelection[0].userNo;
                self.editForm.nickName = self.multipleSelection[0].nickName;
                self.editForm.adminFlag = self.multipleSelection[0].adminFlag;
                self.editForm.userType = self.multipleSelection[0].userType;
                self.editForm.mobile = self.multipleSelection[0].mobile;
                self.editForm.sex = self.multipleSelection[0].sex;
                self.editForm.userState = self.multipleSelection[0].userState;
                self.editForm.userEmail = self.multipleSelection[0].userEmail;
            },
            // 修改保存
            editUserTrue() {
                let self = this;
                let queryParam = {
                    data: {
                        userId: self.multipleSelection[0].userId,
                        loginName: self.editForm.loginName,
                        userName: self.editForm.userName,
                        userNo: self.editForm.userNo,
                        nickName: self.editForm.nickName,
                        adminFlag: self.editForm.adminFlag,
                        userType: self.editForm.userType,
                        mobile: self.editForm.mobile,
                        sex: self.editForm.sex,
                        userState: self.editForm.userState,
                        userEmail: self.editForm.userEmail
                    }
                };
                self.$http.post(`${process.env.NODE_ENV}/admin/user/save`,queryParam)
                    .then((response) => {
                        if(response.data.code == "0"){
                            self.success("修改成功！");
                            self.modifyfrom = false;
                            let data = self.clickTree;
                            self.handleNodeClick(data);
                        } else {
                            self.notice(response.data.msg);
                        }

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            // 删除
            delUser() {
                let self = this;
                if (self.multipleSelection.length != 1)
                    return self.prompt("只能选择一条数据进行删除");
                self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$http.get(`${process.env.NODE_ENV}/admin/user/delete/${self.multipleSelection[0].userId}`)
                        .then((response) => {
                            if(response.data.code == "0"){
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                let data = self.clickTree;
                                self.handleNodeClick(data);
                            } else {
                                self.notice(response.data.msg);
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
            // 停用
            banUser() {
                let self = this;
                if (self.multipleSelection.length != 1)
                    return self.prompt("只能选择一条数据进行禁用");
                self.$confirm('此操作将停用该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$http.get(`${process.env.NODE_ENV}/admin/user/updateStatus/${self.multipleSelection[0].userId}`)
                        .then((response) => {
                            if(response.data.code == "0"){
                                self.$message({
                                    type: 'success',
                                    message: '停用成功!'
                                });
                                let data = self.clickTree;
                                self.handleNodeClick(data);
                            }  else {
                                self.notice(response.data.msg);
                            }

                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    });
                });
            },
            // 重置
            resetUserPw() {
                let self = this;
                if (self.multipleSelection.length != 1)
                    return self.prompt("只能选择一条数据进行重置");
                self.$confirm('此操作将重置该用户密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$http.get(`${process.env.NODE_ENV}/admin/user/resetpassword/${self.multipleSelection[0].userId}`)
                        .then((response) => {
                            if(response.data.code == "0"){
                                self.$message({
                                    type: 'success',
                                    message: '重置成功!'
                                });
                                let data = self.clickTree;
                                self.handleNodeClick(data);
                            }  else {
                                self.notice(response.data.msg);
                            }

                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重置'
                    });
                });
            },*/
			// 分配角色
			allotRole() {
				let self = this;
				if (self.multipleSelection.length != 1)
					return self.prompt("只能选择一个用户分配角色");
				self.rolefrom = true;
				self.$http.get(`${process.env.NODE_ENV}/admin/user/distribute/${self.multipleSelection[0].userId}`)
					.then((response) => {
						if (response.data.code == "0") {
							for (var item of response.data.data[0]) {
								self.data.push({
									key: item.roleId,
									label: item.roleName
								})
							}
							for (var items of response.data.data[1]) {
								self.value1.push(items.roleId);
							}
						}  else {
							self.notice(response.data.msg);
						}

					})
					.catch(function (error) {
						console.log(error);
					});
			},
			// 保存分配角色
			allotRoleTrue() {
				let self = this;
				if (self.value1.length != 1)
					return self.prompt("用户只能分配一个角色");
				var queryParam = {
					data: {
						userId: self.multipleSelection[0].userId,
						roleId: self.value1[0]
					}
				}
				self.$http.post(`${process.env.NODE_ENV}/admin/user/savedistribute`, queryParam)
					.then((response) => {
						if(response.data.code == "0"){
							self.$message({
								type: 'success',
								message: '分配成功!'
							});
							let data = self.clickTree;
							self.handleNodeClick(data);
							self.data = [];
							self.value1 = [];
							self.rolefrom = false;
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			},

			/*取消分配角色*/
			cancelAllotRole(){
				let self = this;
				self.data = [];
				self.value1 = [];
				self.rolefrom = false;
			},

			// 获取树
			/**
			 * 懒加载树获取组织机构子节点
			 * element-tree使用方法
			 * @param node:当前点击节点信息
			 * @param resolve:传递参数方法
			 * */
			getOrgList(node,resolve) {
				/*this.$http.get(`${process.env.NODE_ENV}/admin/org/selectall`)
					.then((response) => {
						this.data2 = response.data.data;
					})
					.catch(function (error) {
						console.log(error);
					});
*/
				let self = this;
				console.log(node);
				if(node.level == 0){
					self.$http.get(`${process.env.NODE_ENV}/admin/org/selectall`).then(res => {
						let treeData = []
						res.data.data.forEach(e => {
							treeData.push(e)
						})
						resolve(treeData);
					}).catch(res => {
						resolve([]);
					})
				}else{
					console.log("当前节点id值为："+node.data.id)
					self.$http.get(`${process.env.NODE_ENV}/admin/org/selectall/${node.data.id}`).then(res => {
						let myList = [];
						res.data.data.forEach(e => {
							myList.push(e)
						})
						resolve(myList);
					}).catch(res => {
						resolve([]);
					})

				}

			},
			// 点击树，展示右侧列表
			handleNodeClick(data) {
				console.log("点击树节点");
				console.log(data);
				this.clickTree = data;
				var queryParam = {
					data: {
						page: this.currentPage,
						limit: this.pageSize,
						filter_parameters: {
							orgId: data.id,
							userName: "",
							loginName:""
						}
					}
				}
				this.$http.post(`${process.env.NODE_ENV}/admin/user/jsonlist`, queryParam)
					.then((response) => {
						this.total = response.data.data.total;
						this.pageSize = response.data.data.size;
						this.tableData = response.data.data.records;
					})
					.catch(function (error) {
						console.log(error);
					});
			},
			// 查询
			searchUser() {
				var queryParam = {
					data: {
						filter_parameters: {
							orgId: "",
							userName: this.userName,
							loginName: this.loginName,
							/*userState: this.userState,
							userType: this.userType,
							mobile: this.mobile*/
						}
					}
				}
				this.$http.post(`${process.env.NODE_ENV}/admin/user/jsonlist`, queryParam)
					.then((response) => {
						this.total = response.data.data.total;
						this.pageSize = response.data.data.size;
						this.tableData = response.data.data.records;
					})
					.catch(function (error) {
						console.log(error);
					});
			},
			togglletreeshow() { //显示树
				this.tablestyle.width = "84%";
				this.strustyle.width = "16%";
				this.strustyle.display = true;
			},
			togglletree() { //隐藏树
				this.strustyle.display = false;
				this.strustyle.width = "0%";
				this.tablestyle.width = "100%";
			},
			/*toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
            },*/
			// 选中table中的数据
			handleSelectionChange(val) {
				console.log(val);
				this.multipleSelection = val;
				// 初始化分配角色数据
				this.data = [];
				this.value1 = [];
			},
			handleClick(row) {
				console.log(row);
			},
			// 每页显示条数
			handleSizeChange(val) {
				this.pageSize = val;
				let data = this.clickTree;
				this.handleNodeClick(data);
			},
			// 上下翻页
			handleCurrentChange(val) {
				this.currentPage = val;
				let data = this.clickTree;
				this.handleNodeClick(data);
			},
			// 员工类型格式化
			userTypeFlags(row, column, value) {
				return value == 1 ? "临时员工" : "正式员工";
			},
			// 性别格式化
			sexFlags(row, column, value) {
				return value == 1 ? "男" : "女";
			},
			/* // 员工状态格式化
             userStateFlags(row, column, value) {
                 // 1激活、2冻结、3休眠、4注销
                 switch (value) {
                     case "1":
                         return "激活";
                         break;
                     case "2":
                         return "冻结";
                         break;
                     case "3":
                         return "休眠";
                         break;
                     case "4":
                         return "注销";
                         break;
                     default:
                         break;
                 }
             }*/

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

<style lang="less" scoped>
	.btnBox {
		width: 100%;
		height: 20%;
		line-height: 40px;
		/*border-bottom: 1px solid #eee;*/
		button {
			margin-right: 10px;
			&:first-child {
				margin-left: 10px;
			}
		}
	}

	.tableBox {
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 10px;
		right: 10px;
		display: flex;
		.stru-tree {
			height: 100%;
			border-left: 1px solid #eee;
			border-right: 1px solid #eee;
			border-radius: 10px;
			transition: all .3s;
			.stru-top {
				height: 30px;
				overflow: hidden;
				line-height: 30px;
				p {
					float: left;
					&:first-child {
						margin-left: 20px;
					}
					&:last-child {
						float: right;
						margin-right: 20px;
					}
				}
			}
		}
		.table-page {
			transition: all .3s;
			position: relative;
			div {
				position: absolute;
				box-sizing: border-box;
			}
			.page-top {
				padding: 0 10px;
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				border-bottom: 1px solid #eee;
				display: flex;
				line-height: 30px;

			}
			.page-content {
				left: 10px;
				right: 10px;
				top: 40px;
				bottom: 50px;
				overflow: auto;
				&>div {
					table {
						td {
							padding: 4px 0px !important
						}
						th {
							padding: 4px 0px !important
						}
					}
				}

			}
			.Pagination {
				padding: 0 10px;
				height: 40px;
				width: 100%;
				bottom: 0;
				border-top: 1px solid #eee;
				div {
					right: 10px;
					bottom: 5px;

				}
			}
		}
	}

</style>
<style lang="less">
	.usermodel {
		.el-dialog__body {
			padding: 10px;
			.el-transfer {
				margin-left: 100px;
			}
			.flx {
				display: flex;
				.el-form-item {
					width: 60%;
					padding-right: 30px;
					margin-bottom: 10px;
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
		} // 树样式
		.tree {
			padding-left: 32px;
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
