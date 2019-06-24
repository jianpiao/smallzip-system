<template>
  <div class="copy">
    <h1>禁止复制</h1>
    <p class="notcopy" onmousemove=/HideMenu()/ oncontextmenu="return false" ondragstart="return false" onselectstart ="return false" onselect="document.selection.empty()" oncopy="document.selection.empty()" onbeforecopy="return false" onmouseup="document.selection.empty()">可以试试复制我,我是不可以复制的</p>
    <p>我是可以复制的</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      
    }
  },
  mounted() {
    this.$store.dispatch('fullscreenLoading',false)
  }
};
</script>

<style scoped>
.copy {
  padding: 20px;
  background-color: #fff;
}
.notcopy {
    -moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
</style>