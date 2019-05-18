import axios from 'axios';

axios.defaults.withCredentials = true;
let AcsApi = (function () {
    function AcsApi() { };
    AcsApi.prototype.login = function (account, pwd) {
        axios.post('http://localhost:8081/acs/api/v1/user/login', '{"userName":"' + account + '","password":"' + pwd + '"}').then((res) => {
            if (res.status === 201) {
                // save token
                // change status
            }
        });
        return null;
    };
    AcsApi.prototype.formLogin = function (account, pwd) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8081/acs/perform_login', 'username=' + account + '&password=' + pwd, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    // success
                    console.log('login success');
                    // save token
                    // change status
                    resolve(res);
                    return;
                }
                reject();
            }).catch((error) => {
                console.log('login error');
                reject(error);
            })
        });
    };
    AcsApi.prototype.getUsers = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/users';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAlarmPlans = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/alarmPlans';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAlarmNotices = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/alarmNotices';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAnemoData = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/anemoData';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getUserLoginInfo = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/userLoginInfo';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAnemographs = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/anemographs';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAlarmDevices = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/alarmDevices';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getSystemSettings = function (page, size, sort) {
        let url = 'http://localhost:8081/acs/systemSettings';
        if(page || size || sort){
            url = url + '?';
            if(page){
                url = url + 'page=' + page;
            }
            if(size){
                url = url + 'size=' + size;
            }
            if(sort){
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    return AcsApi;
}());
export default AcsApi;
