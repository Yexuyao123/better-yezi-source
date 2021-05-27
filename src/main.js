import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Menu,
  MenuItem,
  Row,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Calendar,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Option,
  Select,
  FormItem,
  OptionGroup,
  Form,
  Dialog,
  RadioGroup,
  Radio,
  DatePicker,
  Popover,
  Switch,
  Timeline,
  TimelineItem,
  Card,
  Notification,
} from "element-ui";
import "@/assets/element-variables.scss";
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Row);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Calendar);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Option);
Vue.use(Select);
Vue.use(FormItem);
Vue.use(OptionGroup);
Vue.use(Form);
Vue.use(Dialog);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.use(Switch);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Card);
Vue.prototype.$notify = Notification;

Vue.config.productionTip = false;

import { setREM, setHtmlFont } from "./helpers/until.js";
setREM();
window.addEventListener("load", function () {
  window.addEventListener("resize", function (e) {
    e.preventDefault();
    setHtmlFont();
  });
});

setTimeout(() => {
  const loadingEl = document.getElementById("loading");
  loadingEl.parentNode.removeChild(loadingEl);
}, 2000);

// window.addEventListener("scroll", function () {
//   console.log(123);
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
