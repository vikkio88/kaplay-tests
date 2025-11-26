import type { Vec2 } from "kaplay";

export const ANGLES = {
  DEG_0: 0,
  DEG_45: 45,
  DEG_90: 90,
  DEG_135: 135,
  DEG_180: 180,
  DEG_225: 225,
  DEG_270: 270,
  DEG_315: 315,
  DEG_360: 360,
} as const;
export class Angle {
  static negativeAngle(angle: number) {
    return angle - ANGLES.DEG_360;
  }

  static shortestRotation(currentAngle: number, wantedAngle: number) {
    const currentNegative = Angle.negativeAngle(currentAngle);
    const negativeAngle = Angle.negativeAngle(wantedAngle);
    const positiveRotation =
      currentAngle < wantedAngle
        ? wantedAngle - currentAngle
        : ANGLES.DEG_360 - currentAngle + wantedAngle;
    const negativeRotation =
      currentNegative > negativeAngle
        ? Math.abs(currentNegative - negativeAngle)
        : ANGLES.DEG_360 + currentAngle - wantedAngle;

    const clockwise = positiveRotation <= negativeRotation;
    return {
      clockwise,
      currentNegative,
      negativeAngle,
      rotation: Math.abs(
        (clockwise ? positiveRotation : negativeRotation) % ANGLES.DEG_360,
      ),
      angle: clockwise ? wantedAngle : negativeAngle,
    };
  }
  static fromVec2(vec: Vec2) {
    return (
      (Math.atan2(vec.x, vec.y) * ANGLES.DEG_180) / Math.PI - ANGLES.DEG_90
    );
  }

  static normalised(deg: number) {
    if (deg === null) return null;
    return (deg + ANGLES.DEG_360) % ANGLES.DEG_360;
  }
}
