import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';

export const comparePasswords = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  return await User.create({
    ...userData,
    password: hashedPassword
  });
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUserData = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');
};

export const deactivateUser = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  );
};

export const getAllUsers = async () => {
  return await User.find().select('-password');
};