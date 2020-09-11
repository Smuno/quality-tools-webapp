import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import The5W from "@/components/5W/The5W.vue";
import Pareto from "@/components/Pareto/Pareto.vue";
import ControlChart from "@/components/ControlChart/ControlChart.vue";
import TheLotAcceptance from "@/components/Quality/TheLotAcceptance.vue";
import TheToolView from "@/views/TheToolView.vue"

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
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
})

export default router;
