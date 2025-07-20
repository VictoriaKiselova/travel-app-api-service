import cron from 'node-cron';

import Session from '../db/models/Session.js';

export const startSessionCleanupJob = () => {
  cron.schedule('0 0 28 * *', async () => {
    const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
      const result = await Session.deleteMany({
        $or: [
          { lastUsedAt: { $lt: cutoffDate } },
          { expiresAt: { $lt: new Date() } },
        ],
      });

      console.log(
        `Deleted ${
          result.deletedCount
        } old sessions on ${new Date().toISOString()}`,
      );
    } catch (error) {
      console.error('Error cleaning sessions:', error);
    }
  });
};
