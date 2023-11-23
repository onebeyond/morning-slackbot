import { Weather } from '../models';

export const cityWeatherBlockMessage = () => {
  const today = new Date();
  const [month, day, year] = [today.getMonth() + 1, today.getDate(), today.getFullYear()];

  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '⏰  Parte Metereológico  ⏰',
      },
    },
    {
      type: 'context',
      elements: [
        {
          text: `*${day} / ${month} / ${year}*  |  Morning Slackbot`,
          type: 'mrkdwn',
        },
      ],
    },
    {
      type: 'divider',
    },
  ];
};

export const cityWeatherAttachedMessage = (weather: Weather) => {
  return [
    {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${weather.cityEmoji}  *${weather.city.toUpperCase()}*  ${weather.countryEmoji}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `☀️    Temperatura actual:  *${weather.currentTemp}*`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `⬆️    Max:  *${weather.maxTemp}*     〰️      ⬇️ Min:  *${weather.minTemp}*`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `💧    Probabilidad de lluvia:  *${weather.rain}* `,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ` 🌅    Amanecer:  *${weather.sunrise}*     〰️      🌇   Anochecer:  *${weather.sunset}*  `,
          },
        },
        {
          type: 'divider',
        },
      ],
    },
  ];
};
