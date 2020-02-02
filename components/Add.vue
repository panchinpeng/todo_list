<template>
  <div>
    <b-row class="my-2">
      <b-col cols="8" md="10">
        <b-form-input
          type="text"
          placeholder="待完成事項"
          v-model.trim="todoTitle"
          @keyup.enter="sendData"
        ></b-form-input>
      </b-col>
      <b-col cols="4" md="2">
        <B-button variant="outline-primary" @click="sendData">送出</B-button>
      </b-col>
    </b-row>
    <hr />
  </div>
</template>
<script>
import {
  BFormInput,
  BContainer,
  BRow,
  BCol,
  BButton,
  BCard
} from "bootstrap-vue";

import { mapActions } from "vuex";
export default {
  data() {
    return {
      todoTitle: ""
    };
  },
  methods: {
    sendData() {
      this.addTodo({title: this.todoTitle, id: Date.now()})
      this.todoTitle = ''
    },
    ...mapActions(["addTodo"])
  }
};
</script>
<style >
</style>