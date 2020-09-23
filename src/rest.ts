import express from "express";
import { In } from "typeorm";
import { Favorite } from "./entity/Favorite";
import { Follow } from "./entity/Follow";
import { Tweet, TweetType } from "./entity/Tweet";
import { User } from "./entity/User";

export default function rest(currentUser: User) {
  const router = express.Router();

  router.get("/tweets", async (req, res) => {
    const usersForTimeline = await Follow.find({
      where: {
        fromUser: currentUser,
      },
      relations: ["toUser"],
    });

    const tweets = await Tweet.find({
      where: {
        user: In(usersForTimeline.map((follow) => follow.toUser.id)),
        type: In([TweetType.NONE, TweetType.RETWEET]),
      },
    });

    const tweetsWithUser = await Promise.all(
      tweets.map(async (tweet) => ({
        ...tweet,
        user: await tweet.user,
      }))
    );

    res.json({ tweets: tweetsWithUser });
  });

  router.post("/tweets", async (req, res) => {
    const tweet = Tweet.create({
      text: req.body.text,
      user: currentUser,
    });

    await tweet.save();

    res.json({ tweet });
  });

  router.get("/users", async (req, res) => {
    res.json({
      users: await User.find({}),
    });
  });

  router.get("/users/:id", async (req, res) => {
    const user = await User.findOne(req.params.id);
    if (!user) {
      return res.json({ user: null });
    }

    res.json({
      user: {
        ...user,
        tweets: await user.tweets,
      },
    });
  });

  router.post("/follow", async (req, res) => {
    const toUser = await User.findOneOrFail({ where: { name: req.body.user } });
    const follow = Follow.create({ fromUser: currentUser, toUser });

    await follow.save();

    res.json({
      follow,
    });
  });

  router.get("/favorites", async (req, res) => {
    const favorites = await Favorite.find({
      where: {
        user: currentUser,
      },
    });

    const favoritesWithUserAndTweets = await Promise.all(
      favorites.map(async (favorite) => ({
        ...favorite,
        user: await favorite.user,
        tweet: await favorite.tweet,
      }))
    );

    res.json({
      favorites: favoritesWithUserAndTweets,
    });
  });

  router.post("/favorites", async (req, res) => {
    const fav = Favorite.create({
      user: currentUser,
      tweet: await Tweet.findOneOrFail(req.body.tweet),
    });

    await fav.save();

    res.json({
      favorite: fav,
    });
  });

  return router;
}
