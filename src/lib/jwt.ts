import jwt from 'jsonwebtoken'
import { config } from '../config'

interface TokenPayload {
  userId: string
  email: string
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwt.secret) as TokenPayload
}

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}