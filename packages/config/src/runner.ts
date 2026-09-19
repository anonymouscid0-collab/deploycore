import { RunnerType } from '@deploycore/types';
export interface RunnerConfig {
  type: RunnerType;
  docker?: { socketPath: string; networkDriver: string };
  local?: { workDir: string; insecure: true };
  mock?: { simulateDelay: number };
}
export function getRunnerConfig(): RunnerConfig {
  const runnerType = (process.env.RUNNER_TYPE || 'docker') as RunnerType;
  if (runnerType === 'local') {
    console.warn('⚠️  Using LocalProcessRunner. This is NOT secure. Development only.');
    return { type: 'local', local: { workDir: process.env.LOCAL_RUNNER_WORKDIR || '/tmp/deploycore-runner', insecure: true } };
  }
  if (runnerType === 'mock') {
    return { type: 'mock', mock: { simulateDelay: parseInt(process.env.MOCK_RUNNER_DELAY || '1000', 10) } };
  }
  return { type: 'docker', docker: { socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock', networkDriver: 'bridge' } };
}
export function isDevMode(): boolean {
  return process.env.DEV_MODE === 'true' || process.env.NODE_ENV === 'development';
}
export function getBuildWorkerConcurrency(): number {
  return parseInt(process.env.BUILD_WORKER_CONCURRENCY || '4', 10);
}