import { Request, Response } from 'express';

const mockUserData = {
  age: 35,
  activityLevel: 'moderate',
  sleepHours: 6,
  hasChronicCondition: false,
};

function generateHealthTips(userData: typeof mockUserData) {
  const tips = [];
  if (userData.activityLevel === 'low') tips.push('Try to walk at least 30 minutes a day.');
  if (userData.sleepHours < 7) tips.push('Aim for at least 7 hours of sleep.');
  if (userData.hasChronicCondition) tips.push('Regularly monitor your condition and consult your doctor.');
  if (userData.activityLevel === 'moderate') tips.push('Maintain your current activity level and consider adding strength training.');
  if (tips.length === 0) tips.push('Keep up the good work!');
  return tips;
}

export const getAIInsights = async (req: Request, res: Response) => {
  // In a real app, fetch user data from DB
  const userData = mockUserData;
  const tips = generateHealthTips(userData);
  res.json({
    summary: 'Personalized health tips generated.',
    recommendations: tips,
    createdAt: new Date(),
  });
}; 