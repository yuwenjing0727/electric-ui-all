<template>
    <div id="all">
        <div class="topcanves">
            <topchart></topchart>
        </div>
        <div class="bottomcanves">
           <!-- <leftchart></leftchart>-->
            <rightchart></rightchart>
        </div>
    </div>
</template>

<script>
import topchart  from './topchart'
import leftchart  from './bottomchart/leftchart.vue'
import rightchart  from './bottomchart/rightchart.vue'
export default {
    data(){
        return {

        }
    },
    components:{
        topchart,
        leftchart,
        rightchart
    },

};
</script>

<style lang="less" scoped>
#all {
  width: 100%;
  height: 100%;
}
.topcanves {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #666;
  /*padding-bottom: 10px;*/
}
.bottomcanves {
  width: 100%;
  height: 50%;
  padding-top: 10px;
  box-sizing: border;
  display: flex;
}
</style>
