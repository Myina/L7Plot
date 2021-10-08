import React, { Component } from 'react';
import { Choropleth } from '@antv/l7plot';

class ChinaProvince extends Component {
  public map: Choropleth | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const response = await fetch('https://gw.alipayobjects.com/os/antfincdn/BzVMWtI7Qk/district-list.json');
    const districtData = await response.json();

    const chinaMap = new Choropleth('container', {
      map: {
        type: 'amap',
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },

      source: {
        data: districtData,
        joinBy: {
          sourceField: 'adcode',
          targetField: 'adcode',
        },
      },

      initialView: {
        level: 'country',
        adcode: '100000',
        granularity: 'district',
      },
      autoFit: true,

      color: {
        field: 'value',
        value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
      },
      style: {
        opacity: 1,
        stroke: '#ccc',
        lineWidth: 0.6,
        lineOpacity: 1,
      },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#000',
          opacity: 0.8,
          fontSize: 10,
          stroke: '#fff',
          strokeWidth: 2,
          textAllowOverlap: true,
          padding: [5, 5],
        },
      },
      // state: { active: true, select: false },
      tooltip: {
        items: ['properties.name', 'properties.adcode', 'properties.value'],
      },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      legend: {
        position: 'bottomleft',
      },
    });

    this.map = chinaMap;
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.map && this.map.destroy();
  }

  render() {
    return (
      <div
        id="container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
    );
  }
}

export default ChinaProvince;