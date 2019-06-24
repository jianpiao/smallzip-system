import { get, post } from './server'

/**
 * 网易云音乐接口
 * cm 是cloudMusic简称
 */

 //  获取热门歌手
 export const CMSingerArtist = () => get(`/toplist/artist`)

 //  登录
 export const CMLogin = (phone,password) => get(`/login/cellphone?phone=${phone}&password=${password}`)

 //  登录状态
 export const CMLoginState = () => get(`/login/status`)

 //  获取用户信息 , 歌单，收藏，mv, dj 数量
 export const CMSubcount = () => get(`/user/subcount`)

 //  获取用户歌单
 export const CMPlaylist = (i) => get(`/user/playlist?uid=${i}`)

  //  获取歌单详情
  export const CMPlaylistDetail = (i) => get(`/playlist/detail?id=${i}`)