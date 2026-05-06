export interface EnvironmentConfig {
  environment: 'dev' | 'uat' | 'prod';
  businessURL?: string;
  providerURL?: string;
  adminURL?: string;
  bankURL?: string;
  timeout?: number;
}
