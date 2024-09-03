import * as appConfig from '../app.config.json'

interface Config {
    globalPrefix: string,
    cors: boolean,
    validation: boolean,
    swagger: boolean,
    exceptionFilter: boolean,
    logger: boolean,
    port: number
}

const defaultConfig: Config = {
    globalPrefix: 'api',
    cors: true,
    validation: true,
    swagger: false,
    exceptionFilter: true,
    logger: false,
    port: 3000
}

export const configuration = {
    ...defaultConfig,
    ...appConfig
}
