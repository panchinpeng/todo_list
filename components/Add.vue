<template>
  <div>
    <b-row class="my-2">
      <b-col cols="8" md="10">
        <b-form-input
          v-model.trim="todoTitle"
          type="text"
          placeholder="待完成事項"
          @keyup.enter="sendData"
        />
      </b-col>
      <b-col cols="4" md="2">
        <B-button variant="outline-primary" @click="sendData">
          送出
        </B-button>
      </b-col>
    </b-row>
    <hr>
  </div>
</template>
<script>


import { mapActions } from "vuex"
export default {
  data() {
    return {
      todoTitle: ""
    }
  },
  methods: {
    sendData() {
      if (!this.todoTitle) {
        return
      }
      this.addTodo({ title: this.todoTitle, id: Date.now() })
      this.todoTitle = ""
    },
    ...mapActions(["addTodo"])
  }
}
</script>
<style >
</style>