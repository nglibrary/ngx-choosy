function DevBannerPlugin(options) {
  // Setup the plugin instance with options...
}

DevBannerPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};

module.exports = DevBannerPlugin;
