import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { ChinaDistrictOptions } from './interface';

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS: Partial<ChinaDistrictOptions> = deepAssign({}, Plot.DefaultOptions, {
  source: {
    data: [],
    joinBy: {
      targetField: 'adcode',
    },
  },
  initialView: {
    level: 'country',
    adCode: '100000',
  },
});

/**
 * 行政数据默认显示粒度
 */
export const DEFAULT_AREA_GRANULARITY = {
  world: 'country',
  country: 'province',
  province: 'city',
  city: 'district',
  district: null,
};

/**
 * 行政数据服务地址
 */
export const DISTRICT_URL = {
  ChinaBoundary: 'http://127.0.0.1:8080/area-combination/country/china_country.json',
  Area: 'http://127.0.0.1:8080/area-combination',
};

/**
 * 国界样式
 */
export const CHINA_BOUNDARY_STYLE = {
  国界: {
    color: 'red',
    width: 1,
    opacity: 1,
  },
  争议: {
    color: 'red',
    width: 1,
    opacity: 0.8,
    dashArray: [1, 6],
  },
  海洋: {
    color: 'blue',
    width: 0.7,
    opacity: 0.8,
  },
  港澳: {
    color: 'gray',
    width: 0.7,
    opacity: 0.8,
  },
};
