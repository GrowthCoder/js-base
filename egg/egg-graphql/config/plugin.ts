/*
 * @Description: 
 * @Author: ting.gao
 * @LastEditors: ting.gao
 * @Date: 2020-05-07 00:24:45
 * @LastEditTime: 2020-05-07 20:20:39
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // 开启插件
  graphql: {
    enable: true,
    package: '@switchdog/egg-graphql',
  },
};

export default plugin;
