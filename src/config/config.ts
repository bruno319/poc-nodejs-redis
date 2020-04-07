export interface Config {
  env: string;
  port: number;
  proxyTimeout: number;
  timeExpireHelmet: number;
  ipAllowOrigin: string;
  proxyApiUrl: string;
  proxyGraphQLUrl: string;
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 4500,
    proxyTimeout: 10000,
    timeExpireHelmet: 15778476000,
    ipAllowOrigin: process.env.IP_ALLOW_ORIGIN || '*',
  },
  dev: {
    isDebug: true,
  },
  qa: {
    isDebug: true,
  },
  prd: {
    isDebug: false,
    ip: process.env.HOSTNAME || '0.0.0.0',
    port: process.env.PORT || 80,
  },
};

const getConfig = (): Config => {
  return { ...config.all, ...config[config.all.env] };
};

export default getConfig();
