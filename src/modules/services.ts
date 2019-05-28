import axios from 'axios';

axios.defaults.withCredentials=true;
export default class Services{
    login(account:String, pwd:string):string {
        axios.post('http://localhost:8081/acs/api/v1/user/login', '{"userName":"admin","password":"admin"}').then((res) => {
            if(res.status === 201){
                // save token
                // change status
            }
        });
        return '';
    }
    formLogin(account:String, pwd:string):string {
        axios.post('http://localhost:8081/acs/api/v1/user/login', {userName:account,password:pwd}).then((res) => {
            if(res.status === 302){
                if(res.headers['Location'] === 'http://localhost:8081/acs/'){
                    // success
                    console.log('login success');
                    // save token
                    // change status
                    return;
                }
            }
            console.log('login error');
        });
        return '';
    }
    getUsersByPage(page:number, size:number, sort:string){
        axios.get("http://localhost:8081/acs/users").then((res) => {
            return res.data;
        })
    }
}
