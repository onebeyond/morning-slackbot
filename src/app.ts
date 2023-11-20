import { App } from '@slack/bolt';
import './utils/env';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});
(async () => {
  await app.start();
  console.log(`⚡️ Bolt app is running!`);
  console.log(`🌿 Environment: ${process.env.NODE_ENV}`);
})();
