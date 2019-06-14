import * as ContainerBuilder from "./ContainerBuilder";
import * as SpriteBuilder from "./SpriteBuilder";
import * as TextBuilder from "./TextBuilder";
import { Parser, CreateStage } from './TiledObjectParser';
import { Config, ITiledProps } from './Config';
import { TiledContainer } from './TiledContainer';

import Mixin from "./pixi-utils";
Mixin();

export let Builders: Array<Function> = [
	ContainerBuilder.Build,
	SpriteBuilder.Build,
	TextBuilder.Build
];

export function Inject(props: ITiledProps | undefined = undefined) {

	// @ts-ignore
	if (!window.PIXI) {
		console.warn("Auto injection works only with globals scoped PIXI, not in modules\nuse \'Loader.registerPlugin(Parser)\' otherwith");
		return;
	}

	if (props) {
		Config.defSpriteAnchor = props.defSpriteAnchor || Config.defSpriteAnchor;
		Config.debugContainers = props.debugContainers != undefined
			? props.debugContainers
			: Config.debugContainers;

		Config.usePixiDisplay = props.usePixiDisplay != undefined
			? props.usePixiDisplay
			: Config.usePixiDisplay;

		Config.roundFontAlpha = props.roundFontAlpha != undefined
			? props.roundFontAlpha
			: Config.roundFontAlpha;
	}

	//@ts-ignore
	window.PIXI.Loader.registerPlugin(Parser);
}

import * as Primitives from "./TiledPrimitives"
import MultiSpritesheet from './TildeMultiSheet';
export { Primitives }

export {
	Parser,
	CreateStage,
	Config,
	ContainerBuilder,
	SpriteBuilder,
	TextBuilder,
	TiledContainer,
	MultiSpritesheet
}

