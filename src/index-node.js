/* eslint-disable import/first */
import './utils/native-support/node';
import { Core, Utils, Constants, init, onInit, version, packageName, Settings } from './index-core';
import './ui/messages/index-models';

module.exports = {
  Core,
  Utils,
  Constants,
  init,
  onInit,
  version: version + '-node',
  packageName,
  get client() { return Settings.getClient(); },
  Settings,
};
if (typeof global !== 'undefined') global.Layer = global.layer = module.exports;