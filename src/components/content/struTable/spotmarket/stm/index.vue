<template>
    <div id="all">
        <div class="btnBox">
            <el-button type="primary" @click="dialogFormVisible=true">新增</el-button>
            <el-button type="primary" @click="dialogFormVisible=true">编辑</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary" @click="dialogFormVisible=true">查看</el-button>
            <el-button type="primary" @click="dialogEditFormVisible=true">关联结算单元</el-button>

        </div>
        <div class="tableBox">
            <div class="el-table">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%" height="100%" border tooltip-effect="dark">
                    <el-table-column align="center" type="selection" width="55">
                    </el-table-column>
                    <el-table-column header-align="center" prop="modelCode" label="模板编号">
                    </el-table-column>
                    <el-table-column header-align="center" prop="modelName" label="模板名称">
                    </el-table-column>
                    <el-table-column header-align="center" prop="modelType" label="模板类型">
                    </el-table-column>
                    <el-table-column header-align="center" prop="modelStatus" label="模板状态">
                    </el-table-column>
                    <el-table-column header-align="center" prop="company" label="使用单位">
                    </el-table-column>
                </el-table>
            </div>

        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog title="基础信息" :visible.sync="dialogFormVisible" width="70%" top="8vh">
            <el-form :model="form" style="display:flex">
                <el-form-item label="模板编号" :label-width="formLabelWidth" size="mini">
                    <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模板名称" :label-width="formLabelWidth" size="mini">
                    <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模板类型" :label-width="formLabelWidth" size="mini">
                    <el-select v-model="form.roleName" placeholder="请选择类型">
                        <el-option label="类型一" value="shanghai"></el-option>
                        <el-option label="类型二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模板状态" :label-width="formLabelWidth" size="mini">
                    <el-select v-model="form.roleName" placeholder="请选择类型">
                        <el-option label="类型一" value="shanghai"></el-option>
                        <el-option label="类型二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <p>结算单表单模板</p>
            <div class="table-head">
                <span>
                    <el-input v-model="editForm.roleCode" size="mini" placeholder="请输入结算单标题"></el-input>
                </span>
                <span>
                    <el-input v-model="editForm.roleCode" size="mini" placeholder="请选择"></el-input>
                </span>
                <span>
                    <el-input v-model="editForm.roleCode" size="mini" placeholder="请选择"></el-input>

                </span>
            </div>
            <div class="table-content">

            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRole">新 增</el-button>
            </div>
        </el-dialog>

        <el-dialog title="关联结算单元" :visible.sync="dialogEditFormVisible" width="80%" top="8vh">
            <div class="gltable">
                <div class="gltable-left">
                    <p style="">可分配结算单元</p>
                    <div class="glsearch">
                        <el-form>
                            <el-form-item label="模板编号" :label-width="formLabelWidth" size="mini">
                                <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="模板编号" :label-width="formLabelWidth" size="mini">
                                <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="glbtn">
                            <el-button type="primary" size="mini">查询</el-button>
                        </div>

                    </div>
                    <div class="table-left">
                        <el-table ref="table-left" :data="tableData" style="width: 100%" height="100%" border tooltip-effect="dark">
                            <el-table-column align="center" type="selection" width="55">
                            </el-table-column>
                            <el-table-column align="center" prop="modelName" label="序号">
                            </el-table-column>
                            <el-table-column align="center" prop="modelName" label="市场成员类型">
                            </el-table-column>
                            <el-table-column align="center" prop="modelType" label="市场成员编码">
                            </el-table-column>
                            <el-table-column align="center" prop="modelStatus" label="市场成员名称">
                            </el-table-column>
                            <el-table-column align="center" prop="company" label="市场成员状态">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="glblock">
                        <el-pagination :pager-count="7" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="gltable-center">
                    <span>
                        <el-button type="primary" icon="el-icon-d-arrow-right"  size="mini">添加</el-button>
                    </span>
                    <span>
                        <el-button type="primary" icon="el-icon-d-arrow-left"  size="mini">删除</el-button>
                    </span>
                    <span>
                        <el-button type="primary" icon="el-icon-delete"  size="mini">清空</el-button>
                    </span>
                </div>
                <div class="gltable-right">
                    <p style="">已关联结算单元</p>
                    <div class="glsearch">
                        <el-form>
                            <el-form-item label="模板编号" :label-width="formLabelWidth" size="mini">
                                <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="模板编号" :label-width="formLabelWidth" size="mini">
                                <el-input v-model="editForm.roleCode" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="glbtn">
                            <el-button type="primary" size="mini">查询</el-button>
                        </div>

                    </div>
                    <div class="table-left">
                        <el-table ref="table-left" :data="tableData" style="width: 100%" height="100%" border tooltip-effect="dark">
                            <el-table-column align="center" type="selection" width="55">
                            </el-table-column>
                            <el-table-column align="center" prop="modelName" label="序号">
                            </el-table-column>
                             <el-table-column align="center" prop="modelName" label="市场成员类型">
                            </el-table-column>
                            <el-table-column align="center" prop="modelType" label="市场成员编码">
                            </el-table-column>
                            <el-table-column align="center" prop="modelStatus" label="市场成员名称">
                            </el-table-column>
                            <el-table-column align="center" prop="company" label="市场成员状态">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="glblock">
                        <el-pagination :pager-count="7" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>

</template>

<script>
export default {
    name: "basics-m-tab3",
    data() {
        return {
            roleName: "",
            // 表格数据
            tableData: [
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                {
                    modelName: "12",
                    modelType: "12",
                    modelStatus: "12",
                    company: "12"
                },
                
            ],
            // 分页数据
            currentPage: 4,
            pageSize: 10,
            total: 100,
            // 弹窗显隐
            dialogFormVisible: false,
            // 修改弹窗显隐
            dialogEditFormVisible: true,

            // 新增数据
            form: {
                modelCode: "",
                modelName: "",
                modelType: "",
                modelStatus: "",
                company: ""
            },
            // 修改数据
            editForm: {
                roleId: "",
                roleName: "",
                roleCode: "",
                roleDesc: "",
                roleType: "",
                roleSort: ""
            },
            formLabelWidth: "80px",
            // 树
            data2: [],
            data3: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            defaultEditProps: {
                children: "children",
                label: "name"
            },
            defaultCheckedKeys: [],
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                
            ],
            value: ""
        };
    },
    mounted() {
        this.getPageData();
    },
    methods: {
        del(s) {
            let self = this;
            self
                .$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    self.$http
                        .post(
                            `${
                                process.env.NODE_ENV
                            }/electric-sysmanage-service/role/delete/${
                                s.roleId
                            }`
                        )
                        .then(response => {
                            if (response.data.data == true) {
                                self.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                self.searchForPage();
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
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
            let self = this;
            self.dialogEditFormVisible = true;
            self.editForm.roleId = row.roleId;
            self.editForm.roleName = row.roleName;
            self.editForm.roleCode = row.roleName;
            self.editForm.roleDesc = row.roleDesc;
            self.editForm.roleType = row.roleType;
            self.editForm.roleSort = row.roleSort;
            self.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/role/info/${row.roleId}`
                )
                .then(response => {
                    self.data3 = response.data.data.menuTree;
                    self.defaultCheckedKeys = response.data.data.alreadCheck;
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
        searchForPage() {
            this.currentPage = 1;
            this.getPageData();
        },
        getPageData() {
            var queryParam = {
                roleName: this.roleName,
                page: this.currentPage,
                limit: this.pageSize
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/role/list`,
                    queryParam
                )
                .then(response => {
                    this.total = response.data.total;
                    this.pageSize = response.data.size;
                    this.tableData = response.data.records;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        showCreateDialogForm() {
            let self = this;
            self.dialogFormVisible = true;
            //获取菜单树
            self.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/role/addbefore`
                )
                .then(response => {
                    console.log(response);
                    self.data2 = response.data.data.menuTree;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        addRole() {
            let self = this;
            let queryParam = {
                roleName: self.form.roleName,
                roleType: "1",
                roleSort: "2",
                roleCode: self.form.roleCode,
                roleDesc: self.form.roleDesc,
                menuIds: self.$refs.tree.getCheckedKeys().join(",")
            };
            self.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/role/save`,
                    queryParam
                )
                .then(response => {
                    if (response.data.data == true) {
                        self.success("添加角色成功！");
                        self.searchForPage();
                        self.form.roleName = "";
                        self.form.roleCode = "";
                        self.form.roleDesc = "";
                        self.dialogFormVisible = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        editRole() {
            let self = this;
            console.log(self.editForm.roleId);
            let queryParam = {
                roleId: self.editForm.roleId,
                roleName: self.editForm.roleName,
                roleType: self.editForm.roleType,
                roleSort: self.editForm.roleSort,
                roleCode: self.editForm.roleCode,
                roleDesc: self.editForm.roleDesc,
                menuIds: self.$refs.editTree.getCheckedKeys().join(",")
            };
            self.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/role/update`,
                    queryParam
                )
                .then(response => {
                    if (response.data.data == true) {
                        self.success("修改角色成功！");
                        self.searchForPage();
                        self.editForm.roleId = "";
                        self.editForm.roleName = "";
                        self.editForm.roleCode = "";
                        self.editForm.roleDesc = "";
                        self.editForm.roleType = "";
                        self.editForm.roleSort = "";
                        self.dialogEditFormVisible = false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.btnBox {
    width: 100%;
    height: 50px;
}

.tableBox {
    position: absolute;
    top: 60px;
    bottom: 50px;
    left: 10px;
    right: 10px;
    overflow: auto;
}
.block {
    position: absolute;
    padding: 0 10px;
    height: 40px;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-top: 1px solid #eee;
    div {
        position: absolute;
        left: 10px;
        bottom: 3px;
    }
}
.table-head {
    width: 100%;
    span {
        margin-left: 20px;
        display: inline-block;
        width: 180px;
    }
}
.table-content {
    height: 350px;
    width: 100%;
}
.gltable {
    width: 100%;
    height: 520px;
    position: relative;
}
.glsearch {
    width: 100%;
    height:100px;
    position: relative;
    display: flex;
}
.glbtn {
    margin-left: 30px;
    position: absolute;
    bottom: 22px;
    right: 20px;
}
.gltable-left {
    border: 1px solid #ccc;
    width: 45%;
    height: 100%;
    position: absolute;
    left: 0;
    p {
        font-size: 16px;
        height:40px;
        line-height: 40px;
        margin: 0 10px 10px 10px;
        border-bottom: 1px solid #ccc;
    }
    .table-left {
        margin: 0 10px;
        left:0;
        right:0;
        position: absolute;
        top:150px;
        bottom:50px;
    }
    .glblock{
        position: absolute;
        overflow: auto;
        padding: 0 10px;
        height: 40px;
        left: 10px;
        right: 10px;
        bottom: 0;
        div {
            position: absolute;
            left: 10px;
            bottom: 3px;
        }
    }
}
.gltable-center{
    position: absolute;
    right: 45%;
    left: 45%;
    display: flex;
    flex-direction:column;
    align-items: center;
    top:45%;
    bottom: 15%;
    justify-content: space-between;
}
.gltable-right {
    border: 1px solid #ccc;
    width: 45%;
    height: 100%;
    position: absolute;
    right: 0;
    p {
        font-size: 16px;
        height:40px;
        line-height: 40px;
        margin: 0 10px 10px 10px;
        border-bottom: 1px solid #ccc;
    }
    .table-left {
        margin: 0 10px;
        left:0;
        right:0;
        position: absolute;
        top:150px;
        bottom:50px;
    }
    .glblock{
        position: absolute;
        overflow: auto;
        padding: 0 10px;
        height: 40px;
        left: 10px;
        right: 10px;
        bottom: 0;
        div {
            position: absolute;
            left: 10px;
            bottom: 3px;
        }
    }
}
</style>

