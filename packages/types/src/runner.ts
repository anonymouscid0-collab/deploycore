export interface RunnerConfig {
  workloadId: string;
  workspaceId: string;
  projectId: string;
  serviceId: string;
  deploymentId: string;
  artifactPath: string;
  startCommand: string;
  envVars: Record<string, string>;
  port: number;
  resources: { cpu: number; memory: string; pids: number };
  network: { public: boolean; privateNetworkId?: string };
  healthCheck?: { path: string; port: number; interval: number; timeout: number };
}
export interface RunnerResult {
  containerId: string;
  publicUrl?: string;
  internalHostname?: string;
  status: 'starting' | 'running' | 'stopped' | 'failed';
}
export interface Runner {
  start(config: RunnerConfig): Promise<RunnerResult>;
  stop(containerId: string): Promise<void>;
  logs(containerId: string, tail?: number): Promise<string>;
  healthCheck(containerId: string): Promise<boolean>;
  stats(containerId: string): Promise<{ cpu: number; memory: number; network: { rx: number; tx: number } }>;
}
export type RunnerType = 'docker' | 'local' | 'mock';