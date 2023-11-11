
import { Application, IBoot } from 'egg';

export default class FooBoot implements IBoot {
    private readonly app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
        this.app.logger.info('Config、插件文件被引用');
    }

    configDidLoad() {
        // Config, plugin files have loaded.
        this.app.logger.info('Config,插件文件已加载');
    }

    async didLoad() {
        // All files have loaded, start plugin here.
        this.app.logger.info('所有文件都已加载，请在此处启动插件');
    }

    async willReady() {
        // All plugins have started, can do some thing before app ready.
        this.app.logger.info('所有插件都已经启动，可以在应用程序准备好之前做一些事情');
    }

    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
        this.app.logger.info('Worker准备好了,可以做一些事情');
    }

    async serverDidReady() {
        // Server is listening.
        this.app.logger.info('服务器正在侦听');
    }

    async beforeClose() {
        // Do some thing before app close.
        this.app.logger.info('应用程序即将');
    }
}