import Vue from "vue";
import VueRouter from "vue-router";

import Store from "../store/index";

const Home = () => import("../views/Home.vue");
const The5W = () => import("@/components/5W/The5W.vue");
const Pareto = () => import("@/components/Pareto/Pareto.vue");
const ControlChart = () => import("@/components/ControlChart/ControlChart.vue");
const TheLotAcceptance = () =>
  import("@/components/Quality/TheLotAcceptance.vue");
const TheToolView = () => import("@/views/TheToolView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { index: 0 },
    component: Home
  },
  {
    path: "/tool",
    name: "toolview",
    component: TheToolView,
    children: [
      {
        path: "5W",
        name: "5W",
        component: The5W
      },
      {
        path: "Pareto",
        name: "pareto",
        component: Pareto
      },
      {
        path: "ControlChart",
        name: "Control Chart",
        component: ControlChart
      },
      {
        path: "Lotacceptance",
        name: "Lot Acceptance",
        component: TheLotAcceptance
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.fullPath !== from.fullPath && !Store.state.isDataSave) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
      Store.commit("set_isDataSave", false);
    } else {
      next(false);
    }
  } else {
    next();
    Store.commit("set_isDataSave", false);
  }
});

export default router;
