import jwt_decode from 'jwt-decode'; 

export const authenticate = (token, cd) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(token));
        cd();
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined') return false;
    if(localStorage.getItem('jwt')){
        const { exp } = jwt_decode(JSON.parse(localStorage.getItem('jwt')));
        if ((new Date()).getTime() <= exp * 1000){
            return true;
        }else{
            localStorage.removeItem('jwt');
            return false;
        }
    }else return false;
}

export const userInfo = () =>{
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const decoded = jwt_decode(jwt);
    return {...decoded, token: jwt};
}

export const signout = cd => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        cd();
    }
}