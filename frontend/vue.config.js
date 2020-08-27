module.exports = {
  pwa: {
    name: 'PicNet',
    themeColor: '#113260',
    msTileColor: '#051D5A',
    runtimeCompiler: true,
    assetsVersion: 1.0,
    manifestOptions: {
      background_color: '#051D5A'
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./service-worker.js",
      swDest: './service-worker.js'
    },
  }
}; 