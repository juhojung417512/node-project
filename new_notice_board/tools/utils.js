export function ajax(url,args){
    return fetch(url,{
        method: 'POST',
        body: JSON.stringify(args),
        headers: {"Content-Type": "application/json"}
    }).then((response)=>{
        return response.json()
    })
}