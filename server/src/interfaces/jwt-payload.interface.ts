export interface JwtTokenPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
