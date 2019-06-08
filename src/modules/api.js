import axios from 'axios';
import Constants from './config'

axios.defaults.withCredentials = true;
let AcsApi = (function () {
    function AcsApi() { };
    AcsApi.prototype.get = function(path, page, size, sort){
        return new Promise((resolve, reject) => {
            let url = path;
            if (page || size || sort) {
                if (url.includes('?')) {
                    url = url + '&'
                } else {
                    url = url + '?';
                }
                if (page) {
                    url = url + 'page=' + page;
                }
                if (size) {
                    url = url + 'size=' + size;
                }
                if (sort) {
                    url = url + 'sort=' + sort;
                }
            }
            axios.get(url).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('get ' + resource + ' error');
                console.log(error)
                reject(error);
            })
        })
    }
    let getResource = function (resource, page, size, sort) {
        return new Promise((resolve, reject) => {
            let url = Constants.API_PREFIX + resource;
            if (page || size || sort) {
                if (url.includes('?')) {
                    url = url + '&'
                } else {
                    url = url + '?';
                }
                if (page) {
                    url = url + 'page=' + page;
                }
                if (size) {
                    url = url + 'size=' + size;
                }
                if (sort) {
                    url = url + 'sort=' + sort;
                }
            }
            axios.get(url).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('get ' + resource + ' error');
                console.log(error)
                reject(error);
            })
        })
    };
    let addResource = function (resource, obj) {
        return new Promise((resolve, reject) => {
            let url = Constants.API_PREFIX + resource;
            axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('add ' + resource + ' error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.addLinks = function (url, links) {
        return new Promise((resolve, reject) => {
            let linksText = ''
            if (links instanceof Array) {
                for (let i in links) {
                    linksText += links[i] + '\n'
                }
            } else if (links instanceof String) {
                linksText = links
            } else {
                reject({ message: 'param links is invalid' })
                return
            }
            axios.post(url, linksText, { headers: { 'Content-Type': 'text/uri-list' } }).then((res) => {
                console.log(res);
                if (res.status === 204) {
                    resolve(res);
                    return;
                }
                console.log('add links error');
                reject(res);
            }).catch((error) => {
                console.log('add links error');
                console.log(error)
                reject(error);
            })
        })
    }
    AcsApi.prototype.updateLinks = function (url, links) {
        return new Promise((resolve, reject) => {
            // let linksText = ''
            // if (links instanceof Array) {
            //     for (let i in links) {
            //         linksText += links[i] + '\n'
            //     }
            // } else if (links instanceof String) {
            //     linksText = links
            // } else {
            //     reject({ message: 'param links is invalid' })
            //     return
            // }
            axios.put(url, links, { headers: { 'Content-Type': 'text/uri-list' } }).then((res) => {
                console.log(res);
                if (res.status === 204) {
                    resolve(res);
                    return;
                }
                console.log('add links error');
                reject(res);
            }).catch((error) => {
                console.log('add links error');
                console.log(error)
                reject(error);
            })
        })
    }
    AcsApi.prototype.updateResource = function (url, resource) {
        return new Promise((resolve, reject) => {
            axios.put(url, resource).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    resolve(res)
                    return
                }
                reject(res)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    AcsApi.prototype.deleteResource = function (url) {
        return new Promise((resolve, reject) => {
            axios.delete(url).then((res) => {
                if (res.status == 204) {
                    resolve(res)
                    return
                }
                reject(res)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    AcsApi.prototype.login = function (account, pwd) {
        axios.post(Constants.API_PREFIX + 'api/v1/user/login', '{"userName":"' + account + '","password":"' + pwd + '"}').then((res) => {
            if (res.status === 201) {
                // save token
                // change status
            }
        });
        return null;
    };
    AcsApi.prototype.formLogin = function (account, pwd) {
        return new Promise((resolve, reject) => {
            axios.post(Constants.API_PREFIX + 'perform_login', 'username=' + account + '&password=' + pwd, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    // success
                    console.log('login success');
                    // save token
                    // change status
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('login error');
                reject(error);
            })
        });
    };
    AcsApi.prototype.logout = function () {
        axios.post('logout').then((res) => {
            if (res.status === 204) {
                // remove user information
                // change status
            }
        })
    };
    AcsApi.prototype.getUsers = function (page, size, sort) {
        return getResource('users', page, size, sort)
    };
    AcsApi.prototype.addUser = function (name, desc, password, role) {
        return new Promise((resolve, reject) => {
            let url = Constants.API_PREFIX + 'api/v1/users';
            axios.post(url, 'name=' + name + '&desc=' + desc + '&password=' + password + '&role=' + role, { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('add user error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.changePwd = function (newPwd, oldPwd) {
        return new Promise((resolve, reject) => {
            let url = Constants.API_PREFIX + 'api/v1/user/changePassword';
            axios.post(url, 'newPwd=' + newPwd + '&oldPwd=' + oldPwd, { headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('changePwd error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.updateUser = function (user) {
        let url = Constants.API_PREFIX + 'users/' + user.username;
        axios.put(url, user).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.delete = function (url) {
        // let url = Constants.API_PREFIX + 'users';
        axios.delete(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAlarmPlans = function (page, size, sort) {
        return getResource('alarmPlans', page, size, sort)
    };
    AcsApi.prototype.getAlarmPlansOfOtherType = function (page, size, sort) {
        return getResource('alarmPlans/search/findAllOtherType', page, size, sort)
    };
    AcsApi.prototype.addAlarmPlan = function (obj) {
        return addResource('alarmPlans', obj)
    }
    AcsApi.prototype.playPlan = function (alarmPlan) {
        return new Promise((resolve, reject) => {
            console.log(alarmPlan._links.self.href)
            let id = alarmPlan._links.self.href.substring( alarmPlan._links.self.href.lastIndexOf('/') + 1)
            let url = Constants.API_PREFIX + 'api/v1/alarmPlans/' + id + '/play';
            axios.post(url).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('playPlan ' + id + ' error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.getPlanStatus = function (alarmPlan) {
        return new Promise((resolve, reject) => {
            let id = alarmPlan._links.self.href.substring( alarmPlan._links.self.href.lastIndexOf('/') + 1)
            let url = Constants.API_PREFIX + 'api/v1/alarmPlans/' + id + '/status';
            axios.get(url).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('getPlanStatus ' + id + ' error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.getAlarmNotices = function (page, size, sort) {
        return getResource('alarmNotices', page, size, sort)
    };
    AcsApi.prototype.getAnemoData = function (page, size, sort) {
        let url = Constants.API_PREFIX + 'anemoData';
        if (page || size || sort) {
            url = url + '?';
            if (page) {
                url = url + 'page=' + page;
            }
            if (size) {
                url = url + 'size=' + size;
            }
            if (sort) {
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getUserLoginInfo = function (page, size, sort) {
        return new Promise((resolve, reject) => {
            let url = Constants.API_PREFIX + 'userLoginInfo';
            if (page || size || sort) {
                url = url + '?';
                if (page) {
                    url = url + 'page=' + page;
                }
                if (size) {
                    url = url + 'size=' + size;
                }
                if (sort) {
                    url = url + 'sort=' + sort;
                }
            }
            axios.get(url).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('getUserLoginInfo error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.getAnemographs = function (page, size, sort) {
        let url = Constants.API_PREFIX + 'anemographs';
        if (page || size || sort) {
            url = url + '?';
            if (page) {
                url = url + 'page=' + page;
            }
            if (size) {
                url = url + 'size=' + size;
            }
            if (sort) {
                url = url + 'sort=' + sort;
            }
        }
        axios.get(url).then((res) => {
            console.log(res);
            return res.data;
        })
    };
    AcsApi.prototype.getAlarmDevices = function (page, size, sort) {
        return new Promise((resolve, reject) => {
            let url = Constants.API_PREFIX + 'alarmDevices';
            if (page || size || sort) {
                url = url + '?';
                if (page) {
                    url = url + 'page=' + page;
                }
                if (size) {
                    url = url + 'size=' + size;
                }
                if (sort) {
                    url = url + 'sort=' + sort;
                }
            }
            axios.get(url).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('getAlarmDevices error');
                console.log(error)
                reject(error);
            })
        })
    };
    AcsApi.prototype.refreshDevices = function () {
        return new Promise((resolve, reject) => {
            axios.post(Constants.API_PREFIX + 'api/v1/alarmDevices/refresh').then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('refreshDevices error');
                console.log(error)
                reject(error);
            })
        })
    }
    AcsApi.prototype.clearDevices = function () {
        return new Promise((resolve, reject) => {
            axios.delete(Constants.API_PREFIX + 'api/v1/alarmDevices/clear').then((res) => {
                console.log(res);
                if (res.status === 200) {
                    resolve(res);
                    return;
                }
                reject(res);
            }).catch((error) => {
                console.log('refreshDevices error');
                console.log(error)
                reject(error);
            })
        })
    }
    AcsApi.prototype.getSystemSettings = function (page, size, sort) {
        let url = Constants.API_PREFIX + 'systemSettings';
        if (page || size || sort) {
            url = url + '?';
            if (page) {
                url = url + 'page=' + page;
            }
            if (size) {
                url = url + 'size=' + size;
            }
            if (sort) {
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
