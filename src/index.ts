import { Engine } from './core/engine';
var engine: Engine;

// entry point of application
window.onload = () => {
    engine = new Engine();
};

window.onresize = () => {
    engine.resize();
};
