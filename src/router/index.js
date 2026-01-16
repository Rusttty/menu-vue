import Vue from "vue";
import Router from "vue-router";

import Menu from "@/Menu.vue";
import TableSelect from "@/views/TableSelect.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Menu },
    { path: "/table", component: TableSelect },
  ],
});
