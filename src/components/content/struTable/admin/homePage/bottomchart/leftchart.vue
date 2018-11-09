<template>
    <div class="leftchart" id="leftchart">

    </div>
</template>
<script>
export default {
    name:"leftchart",
    data(){
        return {
            option:{
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:285, name:'购电方'},
                            {value:80, name:'输电方'},
                            {value:400, name:'售电方'},
                            
                        ]
                    }
                ],
            },
            myChart:{},

        }
    },
    mounted(){
        this.initchart(
            document.getElementById("leftchart"),
            this.option,
        )
    },
    methods:{
        initchart(ele,option){
            this.myChart = this.echarts.init(ele);
            this.myChart.setOption(option);
        }
    }

}
</script>
<style lang="less" scoped>
.leftchart{
    width:50%;
    height:100%;
}
</style>