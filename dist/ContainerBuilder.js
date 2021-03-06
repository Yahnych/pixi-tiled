"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TiledContainer_1 = require("./TiledContainer");
var Config_1 = require("./Config");
var pixi_js_1 = require("pixi.js");
var Primitives = __importStar(require("./TiledPrimitives"));
function ApplyMeta(meta, target) {
    target.name = meta.name;
    target.tiledId = meta.id;
    target.width = meta.width || target.width;
    target.height = meta.height || target.height;
    target.rotation = ((meta.rotation || 0) * Math.PI) / 180.0;
    target.x = meta.x || 0;
    target.y = meta.y || 0;
    target.visible = meta.visible == undefined ? true : meta.visible;
    target.types = meta.type ? meta.type.split(":") : [];
    target.primitive = Primitives.BuildPrimitive(meta);
    var props = meta.parsedProps;
    if (props) {
        if (!isNaN(props.opacity)) {
            target.alpha = Number(props.opacity);
        }
        Object.assign(target, props);
        target.properties = props;
    }
    target.source = meta;
    if (Config_1.Config.debugContainers) {
        setTimeout(function () {
            var rect = new pixi_js_1.Graphics();
            rect.lineStyle(2, 0xff0000, 0.7)
                .drawRect(target.x, target.y, meta.width, meta.height)
                .endFill();
            if (target instanceof pixi_js_1.Sprite) {
                rect.y -= target.height;
            }
            target.parent.addChild(rect);
        }, 30);
    }
}
exports.ApplyMeta = ApplyMeta;
function Build(meta) {
    var types = meta.type ? meta.type.split(":") : [];
    var container = undefined;
    if (types.indexOf("mask") > -1) {
        container = new pixi_js_1.Sprite(pixi_js_1.Texture.WHITE);
    }
    else {
        container = new TiledContainer_1.TiledContainer();
    }
    if (meta.gid) {
        if (container instanceof pixi_js_1.Sprite) {
            container.anchor = Config_1.Config.defSpriteAnchor;
        }
        else {
            container.pivot = Config_1.Config.defSpriteAnchor;
            container.hitArea = new pixi_js_1.Rectangle(0, 0, meta.width, meta.height);
        }
    }
    ApplyMeta(meta, container);
    return container;
}
exports.Build = Build;
//# sourceMappingURL=ContainerBuilder.js.map