var engine: hyperEngine.Engine;

// entry point of application
window.onload = () => {
    engine = new hyperEngine.Engine();
    //engine.start();
};

window.onresize = () => {
    engine.resize();
}
