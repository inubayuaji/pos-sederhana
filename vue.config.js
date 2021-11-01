module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Kasir",
        appId: "com.lunantu.kasir",
        extraFiles: ["src/database.sqlite"],
        // win: {
        //   icon: "icon.png",
        // },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true,
        },
      },
      externals: ["knex", "sqlite3"],
    },
  },
};
