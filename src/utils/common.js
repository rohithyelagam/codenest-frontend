

const getCokkie = (key) =>{
    return new Promise((resolve,reject)=>{
        const token = document.cookie.split(";");
        token.forEach((curr)=>{
            var arrtemp = curr.split('=');
            if(arrtemp[0].trim()==key.trim()){
                resolve(arrtemp[1].trim());
            }
        })
        resolve("");
    });
}

const addCokkie = (key,value) => {
    return new Promise((resolve,reject)=>{
        document.cookie = key+"="+(value||"")+"; path=/";
        resolve();
    })
}

const removeCokkie = (key)=>{
    return new Promise(resolve=>{
        document.cookie = key+'=; Max-Age=-99999999; path=/'
        resolve();
    })
}

module.exports = {getCokkie,addCokkie,removeCokkie};