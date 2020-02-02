<template>
  <div class="container">
    <!-- 解決報warn : The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup -->
    <no-ssr>
      <b-row>
        <b-col>
          <b-card>
            <Add></Add>
            <List></List>
            <Finish></Finish>
          </b-card>
        </b-col>
      </b-row>
    </no-ssr>
  </div>
</template>

<script>
import Add from "~/components/Add.vue";
import List from "~/components/List.vue";
import Finish from "~/components/Finish.vue";
import vue from "vue";

import { mapActions } from "vuex";
import { BRow, BCol } from "bootstrap-vue";
vue.filter("date_format", function(val) {
  function appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }
  let d = new Date(val);
  return (
    d.getFullYear() +
    "-" +
    appendLeadingZeroes(d.getMonth() + 1) +
    "-" +
    appendLeadingZeroes(d.getDate()) +
    " " +
    appendLeadingZeroes(d.getHours()) +
    ":" +
    appendLeadingZeroes(d.getMinutes()) +
    ":" +
    appendLeadingZeroes(d.getSeconds())
  );
});
export default {
  components: {
    Add,
    List,
    Finish
  },
  created() {
    // 因為是SSR沒有window
    // refer https://nuxtjs.org/faq/window-document-undefined
    if (process.browser) {
      window.addEventListener("beforeunload", () => {
        this.storeData();
      });
      this.initTodos(localStorage.getItem("todos"));
      this.initSelectedItems(localStorage.getItem("selectedItems"));
      this.initFinishTodos(localStorage.getItem("finishTodos"));
    }
  },

  methods: {
    storeData() {
      // 儲存所有store的資料
      localStorage.setItem("todos", JSON.stringify(this.$store.state.todos));
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(this.$store.state.selectedItems)
      );
      localStorage.setItem(
        "finishTodos",
        JSON.stringify(this.$store.state.finishTodos)
      );
    },
    ...mapActions(["initTodos", "initSelectedItems", "initFinishTodos"])
  }
};
</script>

<style>
</style>
