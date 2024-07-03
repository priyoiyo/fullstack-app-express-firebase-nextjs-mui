import { Request, Response } from 'express';
import { getUserProfile, updateUserProfile } from '../repository/userRepository';
import { createSuccessResponse } from '../entities/ApiSuccess';
import { createErrorResponse } from '../entities/ApiError';

export const getUserProfileHandler = async (req: any, res: Response) => {
  try {
    const userDoc = await getUserProfile(req.user.uid);
    console.log(userDoc);
    res.status(200).json(createSuccessResponse("User Found successfully", userDoc));
  } catch (error: any) {
    res.status(404).json(createErrorResponse(error.message));
  }
};

export const updateUserProfileHandler = async (req: any, res: any) => {
  try {
    const { location, phoneNumber, photoProfileUrl } = req.body;
    const userProfile = { location, phoneNumber, photoProfileUrl };
    const updatedProfile = await updateUserProfile(req.user.uid, userProfile);
    res.status(200).json(createSuccessResponse("User Updated successfully", updatedProfile));
  } catch (error:any) {
    res.status(500).json(createErrorResponse(error.message));
  }
};
