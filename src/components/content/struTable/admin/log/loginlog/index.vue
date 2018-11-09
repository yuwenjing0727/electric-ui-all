<template>
    <div id="all">
        <div class="btnBox">
            <label>用户:</label>
            <el-input placeholder="用户" style="width:200px;" v-model="userName" size="mini"></el-input>
            <label>时间:</label>
            <div class="time" style="display: inline-block">
                <!--<span class="demonstration">登录时间段</span>-->
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="请选择登录时间" end-placeholder="登录时间" size="mini">
			</el-date-picker>

            </div>
            <el-button type="primary" @click="searchdata()" size="mini" v-show="buttonPermission.query">查询</el-button>
            <el-button type="primary" @click="handleClick()" size="mini" v-show="buttonPermission.delete">删除</el-button>
        </div>
        <div class="tableBox">
            <div class="el-table">
                <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
                    <el-table-column header-align="center" prop="orgId" label="机构">
                    </el-table-column>
                    <el-table-column header-align="center" prop="loginName" label="用户">
                    </el-table-column>
                    <el-table-column header-align="center" prop="logintime" label="登录时间">
                    </el-table-column>
                    <el-table-column header-align="center" prop="loginDesc" label="说明">
                    </el-table-column>
                    <!-- <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="handleClick(scope.row)">删除</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <div class="block">
                <el-pagination :pager-count="5" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

        </div>

    </div>

</template>

<script>
export default {
    name: "basics-m-tab3",
    data() {
        return {
			buttonPermission:JSON.parse(sessionStorage.buttonPermission),
            timeRange: ["", ""],
            userName: "",
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            pageSizesObjectList: [],
            pageSizes: [5,10,50,100],
            // 存放select选择数据
            selectData: []
        };
    },
    mounted() {
        this.initdata();
    },
    watch: {
        pageSizesObjectList(newV, oldV) {
            // this.pageSizes = [];
            newV.forEach(e => {
                this.pageSizes.push(parseInt(e.paraKey));
                this.pageSizes.sort(function(x, y) {
                    return x - y;
                });
            });
        }
    },
    created() {
        this.$util.dictory.getItemsByDicKey(
            "page_size",
            "pageSizesObjectList",
            this
        );
    },
    methods: {
        // select选择框
        handleSelectionChange(val) {
            this.selectData = val;
            console.log(val);
        },
        initdata() {
            //初始化数据
            var options = {
                code: "0",
                msg: "success",
                data: {
                    limit: this.pageSize,
                    page: this.currentPage,
                    filter_parameters: {
                        loginName: this.userName,
                        startTime: this.timeRange[0],
                        endTime: this.timeRange[1]
                    }
                }
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/admin/loginlog/jsonlist`,
                    options
                )
                .then(res => {
                    console.log(res);
                    this.total = res.data.data.total;
                    this.tableData = res.data.data.records;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        searchdata() {
            //查询数据
            var options = {
                code: "0",
                msg: "success",
                data: {
                    limit: this.pageSize,
                    page: this.currentPage,
                    filter_parameters: {
                        loginName: this.userName,
                        startTime: this.timeRange[0].toString(),
                        endTime: this.timeRange[1]
                    }
                }
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/admin/loginlog/jsonlist`,
                    options
                )
                .then(res => {
                    console.log(res);
                    this.total = res.data.data.total;
                    this.tableData = res.data.data.records;

                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleClick() {
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$http
                    .post(
                        `${
                            process.env.NODE_ENV
                        }/admin/loginlog/delete/${
                            row.loginlogId
                        }`
                    )
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.initdata();
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.initdata();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.initdata();
        }
    }
};
</script>

<style scoped>
.btnBox {
    width: 100%;
    height: 20%;
}
.btnBox .el-input{
	margin-right: 20px;
}
.time .el-date-editor{
	margin-right: 20px;
}
.tableBox {
    width: 100%;
    height: 80%;
}
.el-table,
.block {
    margin-top: 10px;
}
</style>
<style>
</style>
