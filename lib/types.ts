export interface TelemetryPoint {
  id: number;
  distance: number;
  height: number;
  pwm: number;
  error: number;
  wifi: number;
  alarm: boolean;
  createdAt: string;
}

export interface ControlConfig {
  id: number;
  setpoint: number;
  kp: number;
  ki: number;
  kd: number;
  resetToken: number;
  updatedAt: string;
}