<template>
    <div class="rightchart" id="rightchart">

    </div>
</template>
<script>
export default {
    name:"rightchart",
     data(){
        return {
            option :{
                color: ['#3398DB',"#f40"],
                title: [
                    {
                        text: '2018年9月平均出清电价',
                        textStyle:{
                            fontSize: 16,
                            color: "#666"
                        },
                        x: '45%',
                        /*subtext:"2018年9月份",
                        subtextStyle: {
                            fontSize: 12,
                            color: "#ccc",
                            fontWeight:"bold"
                        }*/
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['日前','日内'],
                    right:"80"
                },
                // grid: {
                //     left: '3%',
                //     right: '4%',
                //     bottom: '3%',
                //     containLabel: true
                // },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    axisLabel: {
                        interval: 0,
                        rotate: 75
                    },
                    data: ["9/1","9/2","9/3","9/4","9/5","9/6","9/7","9/8","9/9","9/10","9/11","9/12","9/13","9/14","9/15","9/16","9/17","9/18","9/19","9/20","9/21","9/22","9/23","9/24","9/25","9/26","9/27","9/28","9/29","9/30"]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'日前',
                        type:'line',
                        data:[0.42,0.39,0.4,0.52,0.45,0.37,0.48,0.49,0.5,0.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    },
                    {
                        name:'日内',
                        type:'line',
                        data:[0.5,0.42,0.49,0.48,0.5,0.39,0.48,0.5,0.39,0.4,0.5,0.43,0.48,0.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    },
                ]
            },
            myChart:{},

        }
    },
    mounted(){
        this.initchart(
            document.getElementById("rightchart"),
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
.rightchart{
    width:100%;
    height:100%;
    /*border-left:1px solid #666;*/
}
</style>
