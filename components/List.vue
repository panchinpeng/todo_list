<template lang="">
  <div>
    <div class="operator-wrap mb-2" v-if="todos.length>0">
      <b-button-group size="sm" v-if="selectedCount">
        <b-button @click="finishTodo">完成</b-button>
        <b-button @click="resetSelected">重設</b-button>
      </b-button-group>
    </div>
    <B-list-group v-if="todos.length>0">
      <B-list-group-item v-for="(todo, idx) in todos" :key="todo.id" @click="selectItem(todo.id)" class="item-hover">
        <b-row>
          <b-col cols="10" :class="{'selected-item': isSelectedItem(todo.id), 'align-self-center' : true}">
            {{ todo.title }}
          </b-col>
          <b-col cols="2">
            <b-button variant="danger" @click.stop="doRemove(todo.id)" size="sm">刪除</b-button>
          </b-col>
        </b-row>
        

      </B-list-group-item>
    </B-list-Group>
    <div v-else>
      尚無資料
    </div>
  </div>
</template>
<script>
import { BListGroup, BRow, BCol, BButton, BButtonGroup } from "bootstrap-vue";
import { mapActions } from "vuex";
export default {
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    selectedItems() {
      return this.$store.state.selectedItems;
    },
    selectedCount() {
      return this.$store.getters.selectCount;
    }
  },
  methods: {
    doRemove(id) {
      this.removeTodo(id);
    },
    isSelectedItem(id) {
      return this.selectedItems.indexOf(id) !== -1;
    },
    selectItem(id) {
      if (!this.isSelectedItem(id)) {
        this.addSelect(id);
      } else {
        this.removeSelect(id);
      }
    },

    ...mapActions(["removeTodo", "addSelect", "removeSelect", "resetSelected", "finishTodo"])
  }
};
</script>
<style >
.item-hover:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.selected-item::before {
  content: "";
  width: 15px;
  height: 15px;
  display: inline-block;
  vertical-align: middle;
  background-image: url("~assets/check.png");
  background-size: cover;
}

.operator-wrap {
  text-align: right;
  height: 31px;
}
</style>