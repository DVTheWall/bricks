const envTypes = {
  uat: 'uat',
  prod: 'prod',
  dev: 'dev',
};

const environments = {
  [envTypes.dev]: {
    base_url: 'https://bricks-dev.katsamsoft.com/api/method/',
  },
  [envTypes.uat]: {
    base_url: 'https://bricks-dev.katsamsoft.com/api/method/',
  },
  [envTypes.prod]: {
    base_url: '',
  },
};

export const getEnvVars = () => {
  const env = envTypes.dev;
  return environments[env];
};
