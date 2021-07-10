import { uniqueId } from '@antv/util';
import { Scene } from '@antv/l7-scene';
import { ILayer } from '@antv/l7-core';
import EventEmitter from '@antv/event-emitter';

export interface ILayerGroupOption {
  name?: string;
}

export class LayerGroup extends EventEmitter {
  /**
   * 图层组名称
   */
  public name: string;
  /**
   * 子图层
   */
  public layers: ILayer[];
  /**
   * 地图容器
   */
  public scene: Scene | undefined;

  constructor(layers: ILayer[] = [], option: ILayerGroupOption = {}) {
    super();
    this.name = option.name ? option.name : uniqueId('layerGroup');
    this.layers = layers;
  }

  /**
   * 图层组添加到地图上
   */
  addTo(scene: Scene) {
    this.scene = scene;
    let layerIndex = 0;
    const layerLength = this.layers.length;
    this.layers.forEach((layer) => {
      layer.once('inited', (e) => {
        layerIndex++;
        this.emit('inited', e);
        if (layerIndex === layerLength) {
          this.emit('inited-all');
        }
      });
      scene.addLayer(layer);
    });
  }

  /**
   * 图层组是否有该图层
   */
  hasLayer(layer: ILayer): boolean {
    return this.layers.some((itemLayer) => itemLayer === layer);
  }

  /**
   * 增加图层
   */
  public addlayer(layer: ILayer) {
    // TODO: duplicate layer
    this.layers.push(layer);
    if (this.scene) {
      layer.once('inited', (e) => this.emit('inited', e));
      this.scene.addLayer(layer);
    }
  }

  /**
   * 移除 layer 图层
   */
  public removelayer(layer: ILayer): boolean {
    const layerIndex = this.layers.findIndex((itemLayer) => itemLayer === layer);
    if (layerIndex === -1) return false;
    this.layers.splice(layerIndex, 1);
    if (this.scene) {
      this.scene.removeLayer(layer);
    }
    return true;
  }

  /**
   * 获取所有的地图图层
   */
  public getLayers(): ILayer[] {
    return this.layers;
  }

  /**
   * 根据图层 ID 获取图层对象
   */
  public getLayer(id: string): ILayer | undefined {
    return this.layers.find((itemLayer) => itemLayer.id === id);
  }

  /**
   * 根据图层 name 获取图层对象
   */
  public getLayerByName(name: string): ILayer | undefined {
    return this.layers.find((itemLayer) => itemLayer.name === name);
  }

  /**
   * 移除所有的图层对象
   */
  public removeAllLayer() {
    this.layers.forEach((itemLayer) => {
      if (this.scene) {
        this.scene.removeLayer(itemLayer);
      }
    });
    this.layers = [];
  }

  /**
   * 是否图层组为空
   */
  public isEmpty() {
    return this.layers.length === 0;
  }
}