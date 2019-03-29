import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState({
            authList: state => state.authList,
            authApi: state => state.authApi
        })
    },
    methods: {
        permission(pmsion) {
            let auth_api_id = JSON.parse(this.authApi)[pmsion];
            let auth_id = this.authList.split(',').findIndex((val,index) => {
                if(val == auth_api_id){
                    return true;
                }
            })
            return auth_id > -1 ? true : false 
        },
    }
};
