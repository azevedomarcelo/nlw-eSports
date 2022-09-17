import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesStringToHour } from "./utils/convert-minutes-string-to-hour";

const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app.use(express.json());
app.use(cors());

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });
  return res.json(games)
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesStringToHour(ad.hourStart),
        hourEnd: convertMinutesStringToHour(ad.hourEnd),
      }
    })
  );
});

app.get('/ads/:id/discord', async (req, res) => {
  const gameId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: gameId,
    }
  })
  return res.json({
    discord: ad.discord,
  })
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel
    }
  });

  return res.json(ad);
})

app.listen(3333);