import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tempo from "../views/Tempo.vue";
import Pareto from "../views/Pareto.vue";
import ControlChart from "../views/ControlChart.vue";
import LotAcceptance from "../views/LotAcceptance.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { index: 0 },
    component: Home
  },
  {
    path: "/tempo",
    name: "tempo",
    meta: { index: 1 },
    component: Tempo
  },
  {
    path: "/pareto",
    name: "pareto",
    meta: { index: 2 },
    component: Pareto
  },
  {
    path: "/ControlChart",
    name: "Control Chart",
    meta: { index: 3 },
    component: ControlChart
  },
  {
    path: "/lotacceptance",
    name: "Lot Acceptance",
    meta: { index: 4 },
    component: LotAcceptance
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
