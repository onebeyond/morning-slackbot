import { App } from '@slack/bolt';

import './utils/env';
import { getWeatherByCity } from './api';
import { Cities } from './constants';
import { cityWeatherAttachedMessage, cityWeatherBlockMessage } from './messages';
import { weatherMapper, convertToCityCode } from './utils';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command('/weather', async ({ command, ack, client, logger }) => {
  try {
    await ack();
    if (command.text === '') {
      Cities.map(async (city) => {
        const rawWeather = await getWeatherByCity(city.name);
        const cityWeather = weatherMapper(rawWeather, city.code);
        console.log(cityWeather);
      });
    } else {
      const rawWeather = await getWeatherByCity(command.text);
      const cityCode = convertToCityCode(rawWeather.location.name);
      const cityWeather = weatherMapper(rawWeather, cityCode);
      const result = await client.chat.postMessage({
        channel: process.env.SLACK_CHANNEL_ID || '',
        blocks: cityWeatherBlockMessage(),
        attachments: cityWeatherAttachedMessage(cityWeather),
      });
      logger.info('>>> weather sent', result);
    }
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  await app.start();
  console.log(`⚡️ Bolt app is running!`);
  console.log(`🌿 Environment: ${process.env.NODE_ENV}`);
})();
