export interface TelemetryPoint {
  id: number;
  distance: number;
  height: number;
  pwm: number;
  error: number;
  wifi: number;
  createdAt: string;
}

export interface ControlConfig {
  id: number;
  setpoint: number;
  kp: number;
  ki: number;
  kd: number;
  updatedAt: string;
}