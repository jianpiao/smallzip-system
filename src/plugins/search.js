 //  列表对象多级嵌套搜索
 const search = (data,keyword) => {
    if (keyword) {
        return data.filter((v) =>{
            return Object.keys(v).some((key) =>{
                return String(v[key]).toLowerCase().indexOf(keyword) > -1
            })
        })   
    }
    return data;
 }
export default search;