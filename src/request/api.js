import { get, post } from './http'

/**
 * qq音乐接口
 * 
 */

// export const apiAddress = () => get('test/public/index.php/index/Index/get');
//　获取歌手列表
export const apiAddress = () => get('v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp1');
//  获取歌手详情
export const singerDetail = (i) => get(`v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=100&songstatus=1&singermid=${i}&jsonpCallback=jp1`)

