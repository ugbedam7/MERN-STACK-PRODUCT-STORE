import { generateOtp, verifyOtp } from '../services/otpService';
import { logger } from '../utils/logger';

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Logic for user signup
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    logger.error('SignUp error', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const isVerified = await verifyOtp(otp);

    if (isVerified) {
      res.status(200).send({ message: 'OTP verified' });
    } else {
      res.status(400).send({ message: 'Invalid OTP' });
    }
  } catch (error) {
    logger.error(`OTP verification error: ${error.message}`);
    res.status(500).send({ message: 'Internal server error' });
  }
};
