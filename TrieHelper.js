let update = (root, content, i) => {
    if (i >= content.length) {
        return 0;
    }
    let c = content[i];
    if (!root[c]) {
        root[c] = {};
    }
    update(root[c], content, i + 1);
    return 0;
};

const setVersions = (root, allVersions=[], version = "") => {
    if (Object.keys(root).length == 0) {
        allVersions.push(version);
    }
    for (const key in root) {
        let str = version + key;
        setVersions(root[key], allVersions, str);
    }
}

const getAllVersions = (root) => {
    const allVersions = [];
    setVersions(root, allVersions);
    return allVersions;
}

module.exports = {
    update: update,
    getAllVersions: getAllVersions,
}