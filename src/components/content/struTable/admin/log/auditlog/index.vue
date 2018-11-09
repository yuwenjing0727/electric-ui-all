<template>
    <div id="all">
        <div class="btnBox">
            <label>审计事件:</label>
            <el-select v-model="filter_parameters.operationType" placeholder="请选择审计事件"  size="mini">
                <el-option v-for="item in editOptions1" :key="item.paraCode" :label="item.paraKey" :value="item.paraCode">
                </el-option>
            </el-select>
            <label>审计分类:</label>
            <el-select v-model="filter_parameters.auditType" placeholder="请选择审计分类" size="mini">
                <el-option v-for="item in editOptions2" :key="item.paraCode" :label="item.paraKey" :value="item.paraCode">
                </el-option>
            </el-select>
            <el-button type="primary" @click="searchdata()" size="mini" v-show="buttonPermission.query">查询</el-button>
            <el-button type="primary" @click="handleClick()" size="mini" v-show="buttonPermission.delete">删除</el-button>
            <el-button type="primary" @click="statistics()" size="mini" v-show="buttonPermission.count">统计</el-button>
            <el-button type="primary" size="mini" v-show="buttonPermission.export">导出</el-button>
        </div>
        <div class="tableBox">
            <div class="el-table">
                <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column header-align="center" type="selection" width="55">
                    </el-table-column>
                    <el-table-column align="center" prop="createDate" label="事件日期">
                    </el-table-column>
                    <el-table-column align="center" prop="auditType" label="事件类型">
                    </el-table-column>
                    <el-table-column align="center" prop="creater" label="用户姓名">
                    </el-table-column>
                    <!-- <el-table-column align="center" fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="handleClick(scope.row)" size="mini">删除</el-button>
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
            <el-dialog title="统计" :visible.sync="dialogFormVisible" class="elDialog">
                <el-table :data="cmodelData" style="width: 100%" height="300" border tooltip-effect="dark">
                    <el-table-column align="center" prop="paraKey" label="事件类型">
                    </el-table-column>
                    <el-table-column align="center" prop="count" label="统计结果">
                    </el-table-column>
                </el-table>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
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
            dialogFormVisible: false,
            editOptions1: [],
            editOptions2: [],
            tableData: [

            ],
            modelData:[],
            currentPage: 1,
            pageSize: 10,
            total: 0,

            filter_parameters:{
                operationType: "",
                auditType: ""
            },
            pageSizesObjectList: [],
            pageSizes: [5,10,50,100],
            // 存放select选择数据
            selectData: []
        };
    },

    mounted() {
        this.initdata();
    },
    created() {
        this.$util.dictory.getItemsByDicKey("operation_type", "editOptions1", this);
        this.$util.dictory.getItemsByDicKey("audit_type", "editOptions2", this);
        this.$util.dictory.getItemsByDicKey(
            "page_size",
            "pageSizesObjectList",
            this
        );
    },
    watch: {
        pageSizesObjectList(newV, oldV) {
            this.pageSizes = [];
            newV.forEach(e => {
                this.pageSizes.push(parseInt(e.paraKey));
                this.pageSizes.sort(function(x, y) {
                    return x - y;
                });
            });
        }
    },
    computed:{
        cmodelData(){
            var arr=[];
            // if(this.modeldata.length>0){
            //     for(let i=0;i<this.modeldata.length;i++){
            //     }
            // }
            return arr
        },
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
                data: this.filter_parameters

            };
            this.$http
                .post(`${process.env.NODE_ENV}/admin/auditlog/list`, options)
                .then(res => {
                    console.log(res.data.data);
                    this.total = res.data.data.total;
                    this.tableData = res.data.data.records;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        statistics(){
            var options = {
                code: "0",
                msg: "success",
                data: {
                    auditType:this.filter_parameters.auditType
                }
            };
            this.$http
                .post(`${process.env.NODE_ENV}/admin/auditlog/statistics`, options)
                .then(res => {
                    console.log(res);
                    if(res.data.code==0){
                        this.dialogFormVisible=true;
                        for(var i=0;i<res.data.data.records.length;i++){
                            res.data.data[i].count="0"
                        }
                        this.modeldata = res.data.data.records;
                    }
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
                .post(`${process.env.NODE_ENV}/admin/auditlog/list`, options)
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
			let self = this;
			if (self.selectData.length == 0) {
				return self.notice("请选中数据进行操作");
			}
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
				var deleteIds = [];
				self.selectData.forEach((e) => {
					deleteIds.push(e.aduitlogId);
				})
				console.log(deleteIds);
				var queryParam = {
					code:"0",
					msg:"",
					data:{
						ids:deleteIds
					}
				}
                this.$http
                    .post(
                        `${process.env.NODE_ENV}/admin/auditlog/deletes`,queryParam
                    )
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.initdata();
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
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
.btnBox .el-select{
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
