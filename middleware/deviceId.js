import { randomUUID } from 'crypto';

const COOKIE_NAME = 'dw_device_id';
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

// Ensures every request has a stable, anonymous device ID.
// No login required — the cookie itself is the identity.
export function deviceIdMiddleware(req, res, next) {
  let deviceId = req.cookies?.[COOKIE_NAME];

  if (!deviceId) {
    deviceId = randomUUID();
    res.cookie(COOKIE_NAME, deviceId, {
      maxAge: ONE_YEAR_MS,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  req.deviceId = deviceId;
  next();
}
