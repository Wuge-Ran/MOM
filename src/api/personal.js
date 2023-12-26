import request from "../network/request";
import {encode as encodeBase64} from '@utils/base64';

export const getCurrentCard = () => {
    const url = `/v1/cardins`;
    return request.get(url);
};

export const getUserInfo = () => {
    const url = `/v1/wxuser`;
    return request.get(url);
}

export const postAvatar = (base64) => {
    const url = `/v1/upload_public_file_base64`;
    return request.bodyPost(url,{
        filename:Base64.encode('avatar.png')
    },{
        header:{
            'content-type': 'application/octet-stream'
        },
        bodyData:base64,
    });
}

export const getCheckinList = (data) => {
    const url = `/v1/checkin_daypass`;
    return request.get(url,data);
}

export const getCouresCardList = (data) =>{
    const url = `/v1/course_by_cardins_list`;
    return request.get(url,data);
}

function generateDates() {
    // 获取今天的日期
    const today = new Date();
    const todayFormatted = formatDate(today);

    // 获取三年前的日期
    const threeYearsAgo = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
    const threeYearsAgoFormatted = formatDate(threeYearsAgo);

    return {
        today: todayFormatted,
        threeYearsAgo: threeYearsAgoFormatted,
    };
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getOrderList = () => {
    console.log('generateDates', generateDates())
    const {today,threeYearsAgo} = generateDates()
    const url = `/v1/order_list`;
    return request.get(url,{
        'from-date':threeYearsAgo,
        'to-date':today,
        'order-status':'paid'
    });
}

export const updateInfo = (attr, value) => {
    const url = `/v1/wxuser/info`;
    const encode =encodeBase64(value)
    return request.post(url, {
        attr,
        value: encode
    });
}
export let Base64 = {
    // 转码表
    tables: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ],
    UTF16ToUTF8: function (str) {
        let results = [],
            len = str.length;
        for (let i = 0; i < len; i++) {
            let code = str.charCodeAt(i);
            if (code > 0x0000 && code <= 0x007F) {
                /* 一字节，不考虑0x0000，因为是空字节
                   U+00000000 – U+0000007F 	0xxxxxxx
                */
                results.push(str.charAt(i));
            } else if (code >= 0x0080 && code <= 0x07FF) {
                /* 二字节
                   U+00000080 – U+000007FF 	110xxxxx 10xxxxxx
                   110xxxxx
                */
                let byte1 = 0xC0 | ((code >> 6) & 0x1F);
                // 10xxxxxx
                let byte2 = 0x80 | (code & 0x3F);
                results.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2)
                );
            } else if (code >= 0x0800 && code <= 0xFFFF) {
                /* 三字节
                   U+00000800 – U+0000FFFF 	1110xxxx 10xxxxxx 10xxxxxx
                   1110xxxx
                */
                let byte1 = 0xE0 | ((code >> 12) & 0x0F);
                // 10xxxxxx
                let byte2 = 0x80 | ((code >> 6) & 0x3F);
                // 10xxxxxx
                let byte3 = 0x80 | (code & 0x3F);
                results.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2),
                    String.fromCharCode(byte3)
                );
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                // 四字节
                // U+00010000 – U+001FFFFF 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                // 五字节
                // U+00200000 – U+03FFFFFF 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                // 六字节
                // U+04000000 – U+7FFFFFFF 	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return results.join('');
    },
    UTF8ToUTF16: function (str) {
        let results = [],
            len = str.length;
        let i = 0;
        for (let i = 0; i < len; i++) {
            let code = str.charCodeAt(i);
            // 第一字节判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 一字节
                // 0xxxxxxx
                results.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 二字节
                // 110xxxxx 10xxxxxx
                let code2 = str.charCodeAt(++i);
                let byte1 = (code & 0x1F) << 6;
                let byte2 = code2 & 0x3F;
                let utf16 = byte1 | byte2;
                results.push(Sting.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                let code2 = str.charCodeAt(++i);
                let code3 = str.charCodeAt(++i);
                let byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                let byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                let utf16 = ((byte1 & 0x00FF) << 8) | byte2
                results.push(String.fromCharCode(utf16));
            } else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return results.join('');
    },
    encode: function (str) {
        if (!str) {
            return '';
        }
        let utf8 = this.UTF16ToUTF8(str); // 转成UTF-8
        let i = 0; // 遍历索引
        let len = utf8.length;
        let results = [];
        while (i < len) {
            let c1 = utf8.charCodeAt(i++) & 0xFF;
            results.push(this.tables[c1 >> 2]);
            // 补2个=
            if (i == len) {
                results.push(this.tables[(c1 & 0x3) << 4]);
                results.push('==');
                break;
            }
            let c2 = utf8.charCodeAt(i++);
            // 补1个=
            if (i == len) {
                results.push(this.tables[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                results.push(this.tables[(c2 & 0x0F) << 2]);
                results.push('=');
                break;
            }
            let c3 = utf8.charCodeAt(i++);
            results.push(this.tables[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            results.push(this.tables[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
            results.push(this.tables[c3 & 0x3F]);
        }

        return results.join('');
    },
    decode: function (str) {
        //判断是否为空
        if (!str) {
            return '';
        }

        let len = str.length;
        let i = 0;
        let results = [];
        //循环解出字符数组
        while (i < len) {
            let code1 = this.tables.indexOf(str.charAt(i++));
            let code2 = this.tables.indexOf(str.charAt(i++));
            let code3 = this.tables.indexOf(str.charAt(i++));
            let code4 = this.tables.indexOf(str.charAt(i++));

            let c1 = (code1 << 2) | (code2 >> 4);
            results.push(String.fromCharCode(c1));

            if (code3 != -1) {
                let c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
                results.push(String.fromCharCode(c2));
            }
            if (code4 != -1) {
                let c3 = ((code3 & 0x3) << 6) | code4;
                results.push(String.fromCharCode(c3));
            }

        }

        return this.UTF8ToUTF16(results.join(''));
    }
};