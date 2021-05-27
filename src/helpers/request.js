// import Vue from "vue";
import Axios from "axios";
import store from "@/store";

export class createAxios {
  //类实例将运行constructor然后将实例结果保存给_axiosInstance
  _axiosInstance = null;
  //请求的config
  _axiosRequestConfig = {};
  // 拿到CancelToken函数
  CancelToken = Axios.CancelToken;

  //cancel池子，动态属性，所有的实例都可以网这个池子添加要收集的cancel
  static cancelObj = {};
  //constructor本质上相当于MVC中C里面的init初始化
  constructor(
    options = {
      baseURL: "",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, //请求时加上cookie
      timeout: 30000, //超时时间，
    }
  ) {
    this._axiosRequestConfig = options;
    this._axiosInstance = Axios.create(this._axiosRequestConfig);
    this.setInterceptor(this._axiosInstance);
  }

  setInterceptor(instance) {
    //发送请求之前
    instance.interceptors.request.use((config) => {
      this.collectCanceler(config);
      this.setTokenHeader(config);
      return config;
    });
    // 添加响应后拦截器，处理response
    instance.interceptors.response.use(
      (response) => {
        const cancelKey = this.getPendingUrl(response.config);
        this.removeCancel(cancelKey);
        this.saveToken(response);
        this.removeToken(response);
        return response;
      },
      (error) => {
        if (Axios.isCancel(error)) {
          //判断是否是由于手动cancel引起的中断的报错，是的话就不做处理
          return Promise.reject("重复请求，请求被取消");
        } else {
          console.log(error);
          return Promise.reject(error);
        }
      }
    );
  }
  collectCanceler(config) {
    //收集Canceler函数到cancelObj池子中
    const cancelKey = this.getPendingUrl(config);
    //判断config是否已配置cancelToken
    config.cancelToken = new this.CancelToken((c) => {
      //判断请求是否存在,存在就让cancel停止请求，添加本次请求到池子中
      if (createAxios.cancelObj[cancelKey]) {
        this.removeCancel(cancelKey);
      }
      this.addCancel(cancelKey, c);
    });
  }
  setTokenHeader(config) {
    //判断是否携带token请求头,保证之前设置的请求头已经被移除
    if (config.headers.common.Authorization) {
      delete config.headers.common.Authorization;
    }
    // console.log(config.headers);
    //每一次请求前都要携带上当前localStorage里的token
    const token = localStorage.getItem("token");
    if (token) {
      // console.log(token);
      config.headers.common["Authorization"] = token;
      // console.log(config.headers);
    }
  }
  saveToken(res) {
    //登录成功保存token
    //这里的status是和后端约定的
    if (
      (res.config.url === "/auth/login" && res.data.status === "ok") ||
      (res.config.url === "/auth/register" && res.data.status === "ok")
    ) {
      console.log(res);
      store.commit("saveLoginState", {
        isLogin: true,
        username: res.data.data.username,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
      }
    }
  }
  removeToken(res) {
    //注销成功删除token
    if (res.config.url === "/auth/logout" && res.data.status === "ok") {
      localStorage.removeItem("token");
      store.commit("saveLoginState", {
        isLogin: false,
        username: null,
      });
    }
  }

  getPendingUrl({ method, url, data, params }) {
    //设置标识cancel的key
    //如果是提交上传数据，需要上传的数据也不同
    return [method, url, JSON.stringify(data), JSON.stringify(params)].join(
      "&"
    );
  }
  addCancel(cancelKey, cancel) {
    createAxios.cancelObj[cancelKey] = cancel;
  }
  removeCancel(cancelKey) {
    //取消该请求，并在池子中移除
    const cancel = createAxios.cancelObj[cancelKey];
    cancel && cancel();
    // console.log("重复请求或者请求已完成，手动移除池子中的cancel");
    delete createAxios.cancelObj[cancelKey];
  }
  canceler(cancel) {
    // 取消当前请求，已在请求中了，请求防抖
    setTimeout(cancel, 1);
  }
  removeAllCancel() {
    //  切换页面前调用将现存所有进行中的请求cancel
    Object.keys(createAxios.cancelObj).forEach((cancelKey) => {
      createAxios.cancelObj[cancelKey]();
    });
    // console.log("切换页面前，手动移除池子中的cancel");
    createAxios.cancelObj = {};
  }

  //todo:请求防抖处理
  httpRequest = (url, type = "get", data = {}, errorTitle = "") => {
    const method = type.toLowerCase();
    // console.log(localStorage.token);
    return new Promise((resolve, reject) => {
      this._axiosInstance
        .request({
          url,
          method,
          // params: data,
          params: method === "get" ? data : {},
          data: method !== "get" || method === "patch" ? data : {},
        })
        .then(
          (res) => {
            // console.log(res);
            // console.log(res.data);
            if (res.status) {
              // console.log("request拿到响应的数据了");
              // console.log("打印res.data", res.data);
              // console.log("打印res.data.data", res.data.data);
              // console.log("resolve抛出res.data");
              // console.log(typeof res.data);
              resolve(res.data);
            } else {
              console.log("网络异常");
              reject(res.data);
            }
          },
          (err) => {
            const tip = "请求" + errorTitle + "失败";
            console.log(tip);
            // console.log(err);
            reject(err);
          }
        )
        .catch((err) => {
          //测试时抛出来看，正常使用的时候这里不写放空，甚至不catch，这样用户就看不到
          console.log(err);
        })
        .finally();
    });
  };

  // checkStatus(status, errno) {
  // return !status && [4100, 1].includes(errno);
  // }
}

//设置不变的请求config
export const AXIOS_OPTION = {
  baseURL: process.env.NODE_ENV === "production" ? "/" : "/pro",
  headers: {
    //设置传递参数类型/格式，比如是 json 格式，还是 application/x-www-form-urlencoded的数据
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: false, //请求时加上cookie,使用jwt token时就可以false不携带
  timeout: 30000, //超时时间，
};

export const vueAxios = new createAxios(AXIOS_OPTION);
export const httpRequest = vueAxios.httpRequest;
export const cancelHttp = vueAxios.removeAllCancel;
