<template>
    <div id="all">
        <div class="btnBox">
            <el-input style="width:200px" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="radio">
            </el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">同步</el-button>
            <el-button type="primary">导出</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" height="100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="name" label="序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="address" label="表计编码" width="120" align="center">
                </el-table-column>
                <el-table-column prop="name" label="表计名称" width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="倍率" width="100" align="center">
                </el-table-column>
                <el-table-column prop="name" label="所属市场成员" width="200" align="center">
                </el-table-column>
                <el-table-column prop="address" label="所属联络线" width="120" align="center">
                </el-table-column>
                <el-table-column prop="name" label="方向" width="100" align="center">
                </el-table-column>
                <el-table-column prop="address" label="开始时间" width="120" align="center">
                </el-table-column>
                <el-table-column prop="name" label="开始底码" width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="结束时间" width="120" align="center">
                </el-table-column>
                <el-table-column prop="name" label="结束底码" width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="增量" width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="电量" width="120" align="center">
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
export default {
    name: "basics-m-tab3",
    data() {
        return {
            // 表格数据
            tableData3: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-06",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-07",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ],
            // 分页数据
            currentPage: 1,
            pageSize: 10,
            total: 0,
            // 弹窗显隐
            dialogFormVisible: false,
            // 新增数据
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            formLabelWidth: "100px",
            // 单选
            radio: "1",
            // 树
            data2: [
                {
                    id: 1,
                    label: "基础业务平台",
                    children: [
                        {
                            id: 2,
                            label: "英大长安",
                            children: [
                                {
                                    id: 3,
                                    label: "编辑器组件"
                                },
                                {
                                    id: 4,
                                    label: "Excel导入"
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: "英大长安-管理",
                            children: [
                                {
                                    id: 6,
                                    label: "机构管理",
                                    children: [
                                        {
                                            id: 7,
                                            label: "修改"
                                        },
                                        {
                                            id: 8,
                                            label: "明细"
                                        }
                                    ]
                                },
                                {
                                    id: 9,
                                    label: "人员管理",
                                    children: [
                                        {
                                            id: 10,
                                            label: "修改"
                                        },
                                        {
                                            id: 11,
                                            label: "明细"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    methods: {
        // 删除弹窗
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
        handleClick(row) {
            console.log(row);
        },
        handleSizeChange() {},
        handleCurrentChange() {}
    }
};
</script>

<style lang="less" scoped >
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
</style>
