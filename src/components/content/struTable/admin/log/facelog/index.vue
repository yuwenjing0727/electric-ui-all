<template>
    <div id="all">
        <div class="btnBox">
            <label>接口名称:</label>
            <el-input placeholder="接口名称" style="width:180px;" v-model="filter_parameters.faceName" size="mini"></el-input>
            <label>状态码:</label>
            <el-input placeholder="状态码" style="width:180px;" v-model="filter_parameters.respCode" size="mini"  ></el-input>
            <label>用户:</label>
            <el-input placeholder="用户" style="width:180px;" v-model="filter_parameters.reqUrl" size="mini"></el-input>
            <el-button type="primary" @click="searchdata()" size="mini" v-show="buttonPermission.query">查询</el-button>
            <el-button type="primary" @click="filter_parameters={}" size="mini">重置</el-button>
            <!--<el-button type="primary" size="mini">查看报文</el-button>-->
            <el-button type="primary" size="mini" v-show="buttonPermission.export">导出</el-button>
        </div>
        <div class="tableBox">
            <div class="el-table">
                <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
                    <el-table-column align="center" prop="intergratSystemId" label="序号">
                    </el-table-column>
                    <el-table-column align="center" prop="logDate" label="时间">
                    </el-table-column>
                    <el-table-column align="center" prop="Initiator" label="发起方">
                    </el-table-column>
                    <el-table-column align="center" prop="respMessage" label="响应方">
                    </el-table-column>
                    <el-table-column align="center" prop="policyNum" label="保单号">
                    </el-table-column>
                    <el-table-column align="center" prop="orderId" label="订单号">
                    </el-table-column>
                    <el-table-column align="center" prop="product" label="产品">
                    </el-table-column>

                    <el-table-column align="center" prop="reqType" label="接口类型">
                    </el-table-column>

                    <el-table-column align="center" prop="respCode" label="返回状态码">
                    </el-table-column>

                    <!-- <el-table-column fixed="right" label="查看报文">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">查看报文</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
                <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>-->
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
            tableData: [],
            filter_parameters: {
                intergratSystemName: "",
                faceName: "",
                respCode: "",
                orderId: "",
                memberId: "",
                reqUrl: "",
                mobile: ""
            },
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
                    filter_parameters: this.filter_parameters
                }
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/facelog/list`,
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
                    filter_parameters: this.filter_parameters
                }
            };
            this.$http
                .post(
                    `${
                        process.env.NODE_ENV
                    }/electric-sysmanage-service/facelog/list`,
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
        handleClick(row) {
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$http
                    .post(
                        `${
                            process.env.NODE_ENV
                        }/electric-sysmanage-service/loginlog/delete/${
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
.tableBox {
    width: 100%;
    height: 80%;
}
.el-table,
.block {
    margin-top: 10px;
}
</style>
