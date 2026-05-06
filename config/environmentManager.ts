import { EnvironmentConfig } from './types';
import { devConfig } from './environments/dev.env';
import { uatConfig } from './environments/uat.env';
import { prodConfig } from './environments/prod.env';

export class EnvironmentManager {
  private static instance: EnvironmentManager;
  private currentConfig: EnvironmentConfig;

  private constructor() {
    const env = process.env.test_env?.toLowerCase() || 'dev';
    this.currentConfig = this.loadConfig(env);
  }

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  private loadConfig(env: string): EnvironmentConfig {
    switch (env) {
      case 'dev':
        return devConfig;
      case 'uat':
        return uatConfig;
      case 'prod':
        return prodConfig;
      default:
        return devConfig;
    }
  }

  public getConfig(): EnvironmentConfig {
    return this.currentConfig;
  }

  public getEnvironment(): string {
    return this.currentConfig.environment;
  }

  public getBankURL(): string {
    return this.currentConfig.bankURL || '';
  }
}

export function getEnvironment(): string {
  return EnvironmentManager.getInstance().getEnvironment();
}

export function getBankURL(): string {
  return EnvironmentManager.getInstance().getBankURL();
}
