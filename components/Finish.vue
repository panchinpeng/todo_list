<template>
  <div v-if="finishTodos.length>0" class="my-2">
    完成項目
    <B-list-group>
      <B-list-group-item v-for="todo in finishTodos" :key="todo.id" class="item-hover">
        <b-row>
          <b-col cols="9" class="align-item-center">
            {{ todo.title }}
          </b-col>
          <b-col cols="3" class="date-string">
            {{ todo.finishTime | date_format }}
          </b-col>
        </b-row>
      </B-list-group-item>
    </B-list-Group>
  </div>
</template>
<script>
export default {
  computed: {
    finishTodos() {
      return this.$store.state.finishTodos
    }
  }
}
</script>

<style>
.date-string {
  font-size: 0.8em;
}
</style>