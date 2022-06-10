let update = (versions, content, i) => {
    if (i >= content.length) {
        return 0;
    }
    let c = content[i];
    if (!versions[c]) {
        versions[c] = {};
    }
    update(versions[c], content, i + 1);
    return 0;
};

let all_versions=[];
let getVersions=(versions,str) =>{
    const keys = Object.keys(versions);
    console.log(keys.length);
    if(keys.length==0){
        return 0;
    }
    for (const key in keys){
        if(key=={}){
            break
        }
        str+=key;
        getVersions(key,"");
    }
    return 0;

};

module.exports = {
    update : update,
    getVersions:getVersions,
}