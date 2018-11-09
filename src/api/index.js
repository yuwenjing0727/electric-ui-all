import axios from 'axios'
import router from '../router/index'
axios.defaults.timeout = 8000;
// axios.defaults.withCredentials = true
// code状态码200判断

axios.interceptors.request.use((res) => {
    res.headers['token'] = sessionStorage.token || "" // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    return res
}, (error) => {

    console.log('promise error:' + error)
    return Promise.reject(error)
})

axios.interceptors.response.use((res) => {

    return res
}, (error) => {
    console.log('promise error:' + error)
	if (error.response) {
		switch (error.response.status) {
			case 404:
				/*跳转到404界面*/
				var components = JSON.parse(sessionStorage.getItem("components"));
				components.push("/error404");
				sessionStorage.setItem("components",JSON.stringify(components));
				router.push({path:"/error404"});
				break;

			case 500:
				/*跳转到500界面*/
				var components = JSON.parse(sessionStorage.getItem("components"));
				components.push("/error500");
				sessionStorage.setItem("components",JSON.stringify(components));
				router.push({path:"/error500"});
				break;
				//接着会去router下index.js中走router.beforeEach方法，因此需将"/my500"存到components里
				//这样才会跳转到500界面

		}
	}
    return Promise.reject(error)
})
export default axios
