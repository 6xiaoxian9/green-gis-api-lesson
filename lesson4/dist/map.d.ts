import { Projection } from "./projection/projection";
import { Layer } from "./layer/layer";
import { Graphic } from "./element/graphic";
export declare class Map {
    private _container;
    private _canvas;
    private _ctx;
    private _drag;
    private _defaultGraphicLayer;
    private _layers;
    private _zoom;
    private _center;
    private _extent;
    private _projection;
    private _events;
    get projection(): Projection;
    constructor(id: string | HTMLDivElement);
    on(event: any, handler: any): void;
    setView(center?: number[], zoom?: number): void;
    addLayer(layer: Layer): void;
    addGraphic(graphic: Graphic): void;
    updateExtent(): void;
    redraw(): void;
    clear(): void;
    _onDoubleClick(event: any): void;
    _onMouseDown(event: any): void;
    _onMouseMove(event: any): void;
    _onMouseUp(event: any): void;
    _onWheel(event: any): void;
    destroy(): void;
}
