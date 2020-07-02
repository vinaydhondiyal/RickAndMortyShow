    //Get Filter function data
    export const getFilterVal = (data,target,name)=>{
        let key = target;
        let val=[];
       // let comp;
       try{
        data.forEach((curr)=> {
           
           if(name.length>0){
                if(val.indexOf(curr[key][name]) === -1){  
                     val.push(curr[key][name]);                    
                } 
            }else{
                if(val.indexOf(curr[key])===-1){
                    val.push(curr[key]);                    
                }
            }
        });
        }catch(e){
            console.log(e)
           
        }
        return val;
    }