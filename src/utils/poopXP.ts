export const getLevel = (xp:number)=>{
    if(xp<500){
        return{
            name:'NOVATO',
            level:0
        }
    }
    if(xp>=500 && xp <1000){
        return{
            name:'PRINCIPIANTE',
            level:1
        }
    }
    if(xp>=1000){
        return{
            name:'AMATEUR',
            level:2
        }
    }
}