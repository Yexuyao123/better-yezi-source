import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: {
      title: "叶旭瑶",
    },
    children: [
      {
        path: "/",
        redirect: "/navigation",
      },
      {
        path: "/navigation",
        name: "Navigation",
        component: () => import("@/views/Navigation.vue"),
        meta: {
          title: "叶旭瑶 | 导航页",
        },
      },
      {
        path: "/todo",
        name: "Todo",
        component: () => import("@/views/Todo.vue"),
        meta: {
          title: "叶旭瑶 | 计划",
        },
        children: [
          {
            path: "/todo",
            redirect: "/todo/calendar",
          },
          {
            path: "/todo/calendar",
            name: "Calendar",
            component: () => import("@/views/Calendar.vue"),
            meta: {
              title: "叶旭瑶 | 待办事项",
            },
          },
          {
            path: "/todo/goodday",
            name: "GoodDay",
            component: () => import("@/views/HaveAGoodDay.vue"),
            meta: {
              title: "今日打卡",
            },
          },
          {
            path: "/todo/monthdata",
            name: "MonthData",
            component: () => import("@/views/MonthData.vue"),
            meta: {
              title: "叶旭瑶 | 30天打卡数据",
            },
          },
        ],
      },
      {
        path: "/information",
        name: "Information",
        component: () => import("@/views/Information.vue"),
        meta: {
          title: "叶旭瑶 | 个人简历",
        },
      },
      {
        path: "/notebook",
        name: "Notebook",
        component: () => import("@/views/Notebook.vue"),
        meta: {
          title: "叶旭瑶 | 个人博客",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
