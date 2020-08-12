import { Geometry } from "./geometry";
import { Bound } from "../util/bound";
//线
export class Polyline extends Geometry {
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    get bound() {
        return this._bound;
    }
    ;
    addTo(map) {
        this._projection = map.projection;
        this._coordinates = this._lnglats.map((point) => this._projection.project(point));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
        map.addGeometry(this);
    }
    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const matrix = ctx.getTransform();
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._coordinates.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo((matrix.a * point[0] + matrix.e), (matrix.d * point[1] + matrix.f));
            }
            else {
                ctx.lineTo((matrix.a * point[0] + matrix.e), (matrix.d * point[1] + matrix.f));
            }
        });
        ctx.stroke();
        ctx.restore();
    }
}
