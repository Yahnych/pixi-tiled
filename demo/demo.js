
/// <reference path="../dist/pixi-tiled.d.ts" />

function init() {

    //inject to pixi loader 
     TiledOG.InjectToPixi({
        debugContainers: true // enable containers as shapes debugging 
    });

    var app = new PIXI.Application();
    document.body.appendChild(app.view);

   
    //load map with dependencies
    app.loader.add("demo", "./maps/demo.json").load(loaded);

    function loaded() {
        
        //stage generate automatiсaly, all sprites lo
        app.stage.addChild(app.loader.resources["demo"].stage);
        console.log(app.loader.resources);
        app.ticker.add(gameLoop);
    }

    function gameLoop(dt) {

    }
}