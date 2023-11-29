const fs = wx.getFileSystemManager();

//读取文件内容
/**
 *
 * @param url 文件相对地址
 * @param {*} codeTyle 读取时的字符格式
 * @returns Promise
 */
export function readData(url, codeTyle) {
    const regExp = /^(http|https|wxfile):\/\//;
    const isHttp = regExp.test(url)
    return new Promise(function (resolve, reject) {
        if (!url) reject();
        try {
            const str = isHttp ? url : `${wx.env.USER_DATA_PATH}/${url}`
            const res = fs.readFileSync(str, codeTyle, 0);
            resolve(res)
        } catch (e) {
            reject(e);
        }
    });
}



//图片保存到指定文件夹
/**
 *
 * @param temPath 图片所在地址
 * @param path 图片新命名
 * @returns Promise
 */
export function saveImage(temPath, path) {
    console.log(
        "===`${wx.env.USER_DATA_PATH}/${path}`",
        `${wx.env.USER_DATA_PATH}/${path}`
    );
    return new Promise(function (resolve, reject) {
        if (!temPath && !path) reject();
        fs.saveFile({
            tempFilePath: temPath,
            filePath: `${wx.env.USER_DATA_PATH}/${path}`,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
}