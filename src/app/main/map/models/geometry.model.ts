import {Layer} from 'leaflet';

export class Geometry {
  name: string;
  layer: Layer;
  isVisible: boolean;

  constructor(name: string, layer: Layer) {
    this.name = name;
    this.layer = layer;
    this.isVisible = true;
  }

}
