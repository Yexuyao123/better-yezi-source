import { httpRequest } from "@/helpers/request.js";

//new Date() 参数可以为整数; 也可以为字符串; 但格式必须正确
//new Date(2018,10,6);  //正确
// new Date("2018/10/6"); /正确
// new Date("2018-10-6");//错误
// new Date( year, month, date, hrs, min, sec) 按给定的参数创建一日期对象

//daily打卡
//mark:string备注(可选)
//label打卡项所属标签:int number
//content:number如奶茶1杯content就是1
//date:Date类型，不传就是提交时间
//id:number
//增
export const dailyCreate = (
  { date, label, content, mark = "" } = { mark: "" }
) => {
  label = Number(label);
  content = Number(content);
  return httpRequest("/api2/daily/", "POST", { date, label, content, mark });
};

//改
export const dailyEdit = ({ id, content, mark = "" } = { mark: "" }) => {
  return httpRequest(`/api2/daily/${id}`, "PATCH", { content, mark });
};
//删
export const dailyDel = ({ id }) => {
  return httpRequest(`/api2/daily/${id}`, "DELETE");
};
//查
//todo 这个接口不再需要label
export const dailyList = ({ start, end } = { start: "", end: "" }) => {
  return httpRequest(`/api2/daily`, "GET", {
    start,
    end,
  });
};

//label 如喝奶茶，单位是杯
//创建标签
// name标签名string
// unit单位 string
//pid父标签的id 如是每日打卡类型还是健身类型
//type类型‘count计数’、‘check是否0或1’、‘category’种类：所属父级
export const labelCreate = ({ name, unit, pid, type }) => {
  return httpRequest("/api2/label/", "POST", { name, unit, pid, type });
};
//修改标签
export const labelUpdate = ({ name, unit }) => {
  return httpRequest("/api2/label/", "PATCH", {
    name,
    unit,
  });
};
//获取某个父类底下的子标签，如健康底下的标签项有早睡、早期、奶茶等
//pid:0是取到标签类：健康、学习
// pid:1健康（底下子类用id)
// pid:2学习
export const getTabList = () => {
  return httpRequest(`/api2/label/`, "GET", { pid: 0 });
  // .then((res) => {
  //   console.log("api请求拿到数据");
  //   console.log("res===========", res);
  //   console.log(typeof res);
  //   console.log("res.data===========", res.data);
  //   console.log(typeof res.data);
  //   console.log("===========", res.data[0]);
  //   console.log(typeof res.data[0]);
  // });
};
export const getLabelList = ({ pid }) => {
  return httpRequest(`/api2/label/`, "GET", { pid });
};

//work待办事项
//创建
//content代办事项:string长度1-100
//type类型：todo代办(默认)、cancel取消、finish完成,创建时默认为todo
//deadline_date最迟完成时间：Date类型
//deadline是否限时代办:Boolean
export const workCreat = ({ deadline, content, deadline_date = "" }) => {
  return httpRequest("/api2/work/", "POST", {
    content,
    deadline,
    deadline_date,
  });
};
//修改
//修改代办status,非紧急与紧急切换
export const workEditDeadline = ({ id, deadline_date }) => {
  return httpRequest(`/api2/work/deadline/${id}`, "PATCH", {
    deadline: 1,
    deadline_date,
  });
};
//修改代办status,todo改为finish
//deadline_date不传为当前时刻
export const workEditFinish = ({ id }) => {
  const finish_date = new Date().getTime();
  return httpRequest(`/api2/work/finish/${id}`, "PATCH", {
    finish_date,
  });
};
//修改content
export const workEdit = ({ id, content }) => {
  return httpRequest(`/api2/work/${id}`, "PATCH", {
    content,
  });
};
//cancel删除
export const workDelete = ({ id }) => {
  return httpRequest(`/api2/work/${id}`, "DELETE");
};
//获取
//获取代办列表
//status:todo/finish
//deadline=1
//请求紧急todo列表
export const workDeadlineTodoList = ({ start, end }) => {
  return httpRequest("/api2/work/", "GET", {
    start,
    end,
    deadline: 1,
    status: "todo",
  });
};
//deadline=0
//请求非紧急todo列表
export const workTodoList = () => {
  return httpRequest("/api2/work/", "GET", { status: "todo", deadline: 0 });
};
//获取finish列表
// start, end同时给或者同时不给，同时不给即表示获取全部
export const workFinishList = ({ start, end }) => {
  return httpRequest("/api2/work/finish", "GET", { start, end });
};
