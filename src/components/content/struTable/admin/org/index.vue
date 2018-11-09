<template>
    <div id="all">
        <div class="btnBox">
            <el-button type="primary" icon="el-icon-circle-plus" @click="addorgdata()">添加</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="modorgdata()">修改</el-button>
            <el-button type="primary" icon="el-icon-circle-close" @click="removeorgdata()">删除</el-button>
            <el-button type="primary" icon="el-icon-circle-plus" @click="detailedfrom=true">明细信息</el-button>
        </div>
        <div class="tableBox">
            <div class="stru-tree" :style="{width:strustyle.width}">
                <div v-show="strustyle.display">
                    <div class="stru-top">
                        <p>组织机构树</p>
                        <p>
                            <i class="el-icon-d-arrow-left" title="收起" @click="togglletree()"></i>
                        </p>
                    </div>
                    <el-tree :data="trees" node-key="id" ref="orgtree" :default-expanded-keys="[current]" :highlight-current="true" accordion :props="defaultProps" @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </div>

            <div class="table-page" :style="{width:tablestyle.width}">
                <div class="page-top">
                    <p @click="togglletreeshow()">
                        <i class="el-icon-d-arrow-right" style="margin-right:10px" title="展开" v-show="!strustyle.display"></i>
                    </p>
                    <p>组织明细</p>
                </div>
                <div class="page-wrapp">
                    <div class="page-content">
                        <el-form ref="orgform" label-width="150px" :label-position="labelPosition" class="demo-ruleForm" :model="ruleForm">
                            <div class="flx">
                                <el-form-item label="组织机构名称" prop="orgName">
                                    <el-input :disabled="true" v-model="ruleForm.orgName"></el-input>
                                </el-form-item>
                                <el-form-item label="编号" prop="orgNum" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgNo"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">
                                <el-form-item label="缩写名称" prop="abbName" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgShortname"></el-input>
                                </el-form-item>
                                <el-form-item label="是否虚拟单位" prop="virUnitFlag" label-position="labelPosition">
                                    <el-radio :disabled="true" v-model="ruleForm.inventedUnit" label="0">否</el-radio>
                                    <el-radio :disabled="true" v-model="ruleForm.inventedUnit" label="1">是</el-radio>
                                </el-form-item>
                            </div>
                            <div class=" flx">
                                <el-form-item label="编码" prop="code">
                                    <el-input :disabled="true" v-model="ruleForm.orgCode"></el-input>
                                </el-form-item>
                                <el-form-item label="英文名称" prop="engName" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgeEname"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">
                                <el-form-item label="标识" prop="iden">
                                    <el-input :disabled="true" v-model="ruleForm.orgMark"></el-input>
                                </el-form-item>
                                <el-form-item label="组织结构类型" prop="orgType" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgType"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">

                                <el-form-item label="上级组织ID" prop="supOrg">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.parentorgId"></el-input>
                                </el-form-item>
                                <el-form-item label="电话" prop="number" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.telephone"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">

                                <el-form-item label="所属区域" prop="region" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.areacodingId"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="phoneNumber" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">

                                <el-form-item label="联系人" prop="concats" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.corpMan"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="mailbox" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.email"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">

                                <el-form-item label="传真号码" prop="faxNumber" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.fax"></el-input>
                                </el-form-item>
                                <el-form-item label="网址" prop="website" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.website"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">

                                <el-form-item label="级别" prop="level" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgClass"></el-input>
                                </el-form-item>
                                <el-form-item label="组织机构种类" prop="orgKind" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgKind"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flx">
                                <el-form-item label="排序" prop="sort" class="rule_label">
                                    <el-input :disabled="true" class="rule_input" v-model="ruleForm.orgSort"></el-input>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address" class="rule_label">
                                    <el-input :disabled="true" type="textarea" class="rule_input" v-model="ruleForm.addr"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>

        </div>
        <div>
            <el-dialog title="添加" :visible.sync="createfrom" class="usermodel">
                <el-form :label-position="labelPosition" label-width="130px" :model="addruleFrom">
                    <div class="flx">
                        <el-form-item label="组织机构名称" prop="orgName">
                            <el-input v-model="addruleFrom.orgName"></el-input>
                        </el-form-item>
                        <el-form-item label="编号" prop="orgNum" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.orgNo"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">
                        <el-form-item label="缩写名称" prop="abbName" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.orgShortname"></el-input>
                        </el-form-item>
                        <el-form-item label="是否虚拟单位" prop="virUnitFlag" label-position="labelPosition">
                            <el-radio v-model="addruleFrom.inventedUnit" label="0">否</el-radio>
                            <el-radio v-model="addruleFrom.inventedUnit" label="1">是</el-radio>
                        </el-form-item>
                    </div>
                    <div class=" flx">
                        <el-form-item label="编码" prop="code">
                            <el-input v-model="addruleFrom.orgCode"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称" prop="engName" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.orgeEname"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">
                        <el-form-item label="标识" prop="iden">
                            <el-input v-model="addruleFrom.orgMark"></el-input>
                        </el-form-item>
                        <el-form-item label="组织结构类型" prop="orgType" class="rule_label">
                            <el-select v-model="addruleFrom.orgType" placeholder="请选择">
                                <el-option v-for="item in option1" :key="item.paraCode" :label="item.paraKey" :value="item.paraCode">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </div>
                    <div class="flx">

                        <el-form-item label="上级组织ID" prop="supOrg">
                            <el-input class="rule_input" v-model="addruleFrom.parentorgId"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="number" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.telephone"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="所属区域" prop="region" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.areacodingId"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phoneNumber" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.mobile"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="联系人" prop="concats" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.corpMan"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="mailbox" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.email"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="传真号码" prop="faxNumber" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.fax"></el-input>
                        </el-form-item>
                        <el-form-item label="网址" prop="website" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.website"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="级别" prop="level" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.orgClass"></el-input>
                        </el-form-item>
                        <el-form-item label="组织机构种类" prop="orgKind" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.orgKind"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">
                        <el-form-item label="排序" prop="sort" class="rule_label">
                            <el-input class="rule_input" v-model="addruleFrom.orgSort"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="详细地址" prop="address" class="rule_label">
                            <el-input type="textarea" class="rule_input" v-model="addruleFrom.addr"></el-input>
                        </el-form-item>
                    </div>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="createfrom = false">取 消</el-button>
                    <el-button type="primary" @click="add()">新 增</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="修改" :visible.sync="editfrom" class="usermodel">
                <el-form :model="editForm" ref="addruleFaddruleFromrom" :label-position="labelPosition" label-width="130px">
                    <div class="flx">
                        <el-form-item label="组织机构名称" prop="orgName">
                            <el-input v-model="editForm.orgName"></el-input>
                        </el-form-item>
                        <el-form-item label="编号" prop="orgNum" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.orgNo"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">
                        <el-form-item label="缩写名称" prop="abbName" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.orgShortname"></el-input>
                        </el-form-item>
                        <el-form-item label="是否虚拟单位" prop="virUnitFlag" label-position="labelPosition">
                            <el-radio v-model="editForm.inventedUnit" label="0">否</el-radio>
                            <el-radio v-model="editForm.inventedUnit" label="1">是</el-radio>
                        </el-form-item>
                    </div>
                    <div class=" flx">
                        <el-form-item label="编码" prop="code">
                            <el-input v-model="editForm.orgCode"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称" prop="engName" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.orgeEname"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">
                        <el-form-item label="标识" prop="iden">
                            <el-input v-model="editForm.orgMark"></el-input>
                        </el-form-item>
                        <el-form-item label="组织结构类型" prop="orgType" class="rule_label">
                            <el-select v-model="editForm.orgType" placeholder="请选择">
                                <el-option v-for="item in option1" :key="item.paraCode" :label="item.paraKey" :value="item.paraCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="上级组织ID" prop="supOrg">
                            <el-input class="rule_input" v-model="editForm.parentorgId"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="number" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.telephone"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="所属区域" prop="region" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.areacodingId"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phoneNumber" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.mobile"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="联系人" prop="concats" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.corpMan"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="mailbox" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.email"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="传真号码" prop="faxNumber" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.fax"></el-input>
                        </el-form-item>
                        <el-form-item label="网址" prop="website" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.website"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">

                        <el-form-item label="级别" prop="level" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.orgClass"></el-input>
                        </el-form-item>
                        <el-form-item label="组织机构种类" prop="orgKind" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.orgKind"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flx">
                        <el-form-item label="排序" prop="sort" class="rule_label">
                            <el-input class="rule_input" v-model="editForm.orgSort"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="详细地址" prop="address" class="rule_label">
                            <el-input type="textarea" class="rule_input" v-model="editForm.addr"></el-input>
                        </el-form-item>
                    </div>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="editfrom = false">取 消</el-button>
                    <el-button type="primary" @click="mod()">新 增</el-button>
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
            current: "",
            strustyle: {
                width: "16%",
                display: true
            },
            tablestyle: {
                width: "84%"
            },
            createfrom: false,
            editfrom: false,
            delfrom: false,
            detailedfrom: true,

            formLabelWidth: "100px",
            ruleForm: {
                orgName: "机构名称",
                orgNo: "机构编号",
                orgShortname: "缩写名称",
                inventedUnit: "0",
                orgCode: "编码",
                orgeEname: "英文名称",
                orgMark: "标识",
                orgType: "组织机构类型",
                parentorgId: "上级组织id",
                telephone: "电话",
                areacodingId: "所属区域",
                corpMan: "联系人",
                mobile: "电话号码",
                email: "邮箱",
                fax: "传真",
                website: "网址",
                orgKind: "组织机构种类",
                orgClass: "级别",
                orgSort: "排序",
                addr: "详细地址"
            },
            addruleFrom: {
                orgId: "",
                orgName: "机构名称",
                orgNo: "机构编号",
                orgShortname: "缩写名称",
                inventedUnit: "1",
                orgCode: "编码",
                orgeEname: "英文名称",
                orgMark: "标识",
                orgType: "1",
                parentorgId: "",
                telephone: "电话",
                areacodingId: "所属区域",
                corpMan: "联系人",
                mobile: "电话号码",
                email: "邮箱",
                fax: "传真",
                website: "网址",
                orgKind: "1",
                orgClass: "1",
                orgSort: "1",
                addr: "详细地址"
            },
            editForm: {
                orgId: "主键id",
                orgName: "机构名称",
                orgNo: "机构编号",
                orgShortname: "缩写名称",
                inventedUnit: "0",
                orgCode: "编码",
                orgeEname: "英文名称",
                orgMark: "标识",
                orgType: "组织机构类型",
                parentorgId: "上级组织id",
                telephone: "电话",
                areacodingId: "所属区域",
                corpMan: "联系人",
                mobile: "电话号码",
                email: "邮箱",
                fax: "传真",
                website: "网址",
                orgKind: "组织机构种类",
                orgClass: "级别",
                orgSort: "排序",
                addr: "详细地址"
            },

            labelPosition: "right",
            // 树
            trees: [],
            defaultProps: {
                //树参数配置
                children: "children",
                label: "name"
            },
            option1: [],
           
        };
    },
    mounted() {
        this.initorgdata();
        this.getItemsByDicKey("org_type", "option1");

    },
    computed: {
        getCurrentKey() {
            return this.$refs.orgtree.getCurrentKey();
        }
    },
    methods: {
        getItemsByDicKey(key, options) {
            console.log(options);
            this.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/admin/dict/selectall/${key}`
                )
                .then(response => {
                    console.log(response.data.data);
                    this[options] = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        inittrees() {
            this.$refs.orgtree.setCurrentKey(this.current);
            this.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/admin/org/info/${this.current}`
                )
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.ruleForm = res.data.data;
                    } else {
                        this.$message("加载数据失败");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        initorgdata() {
            this.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/admin/org/selectall`
                )
                .then(res => {
                    console.log(res);
                    this.trees = res.data.data;
                    if (this.current) {
                        return;
                    } else {
                        this.current = this.trees[0].id;
                        this.$nextTick(() => {
                            this.inittrees();
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        addorgdata() {
            //新增
            var self = this;
            this.createfrom = true;
        },
        modorgdata() {
            //点击修改查询
            if (this.getCurrentKey) {
                this.$http
                    .get(
                        `${
                            process.env.NODE_ENV
                        }/admin/org/info/${
                            this.getCurrentKey
                        }`
                    )
                    .then(res => {
                        console.log(res);
                        if (res.status == 200) {
                            this.editfrom = true;
                            this.editForm = res.data.data;
                        } else {
                            this.$message("加载数据失败");
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                this.$message("请选中一个组织修改");
            }
        },
        removeorgdata() {
            if (this.getCurrentKey) {
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$http
                            .post(
                                `${
                                    process.env.NODE_ENV
                                }/admin/org/delete/${
                                    this.ruleForm.orgId
                                }`
                            )
                            .then(res => {
                                console.log(res);
                                if (res.data.code == 0) {
                                    this.$message({
                                        message: "删除成功",
                                        type: "success"
                                    });
                                    this.current = "";
                                    this.initorgdata();
                                } else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: "error"
                                    });
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
            } else {
                this.$message("请选中一个组织修改");
            }
        },
        searchorgdata() {
            this.$http
                .get(
                    `${
                        process.env.NODE_ENV
                    }/admin/org/info${id}`
                )
                .then(res => {
                    console.log(res);
                    this.trees = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        add() {
            //确定添加
            var options = {
                code: "0",
                msg: "success",
                data: this.addruleFrom
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/admin/org/save`,
                    options
                )
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.addruleFrom = {};
                        this.createfrom = false;
                        this.current = "";
                        this.initorgdata();
                    } else {
                        this.$message("添加失败");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            this.editfrom = false;
        },
        mod() {
            //确定修改
            var options = {
                code: "0",
                msg: "success",
                data: this.editForm
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/admin/org/save`,
                    options
                )
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        this.editForm = {};
                        this.current = "";
                        this.initorgdata();
                        this.editfrom = false;
                    } else {
                        this.$message("修改失败");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            this.editfrom = false;
        },
        togglletreeshow() {
            //显示数

            this.tablestyle.width = "84%";
            this.strustyle.width = "16%";
            this.strustyle.display = true;
        },
        togglletree() {
            //隐藏树
            this.strustyle.display = false;
            this.strustyle.width = "0%";
            this.tablestyle.width = "100%";
        },
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
        handleNodeClick(data) {
            if (this.getCurrentKey) {
                this.$http
                    .get(
                        `${
                            process.env.NODE_ENV
                        }/admin/org/info/${
                            this.getCurrentKey
                        }`
                    )
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.ruleForm = res.data.data;
                        } else {
                            this.$message("加载数据失败");
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                this.$message("请选中一个组织修改");
            }
        }
    }
};
</script>

<style lang="less" scoped>
.btnBox {
    width: 100%;
    height: 50px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
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
        transition: all 0.3s;
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
        transition: all 0.3s;
        position: relative;
        .page-top {
            padding: 0 10px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
        }

        .page-wrapp {
            position: absolute;
            left: 10px;
            right: 10px;
            top: 40px;
            bottom: 10px;
            overflow: auto;
            /*border: 1px  solid  #ddd;*/
            border-radius: 5px;
            webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            .page-content {
                padding: 20px;
                flex: 1;

                .demo-ruleForm {
                    & > div {
                        display: flex;
                    }
                }
            }
        }
    }
}
</style>
<style lang="less">
.usermodel {
    .el-dialog__body {
        padding: 10px;
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
    }
    // 树样式
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


