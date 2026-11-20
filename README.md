# $FIONA — Fiona Wif Hat

A one-page, late-90s / GeoCities-style homepage for the [$FIONA](https://pump.fun/coin/B9YcMn7rXbiQAYWJaChmdfbDKmmtFyw3n5JjtPQ7pump?caller=EF1P3tcwAc5M9mTLQ7YaxjRVpGHLNz5237Cq1mkW3LQL&ref=crankycrab68879) memecoin.

Live: <https://fionawifhat.wtf/> (also at <https://fiona-wif-hat.surge.sh/>)

In loving memory of Fiona Wif Hat, ???? – 2026. She was a hippo who saw a hat and simply ate it. Gone but not forgotten. Dogs wear hats. Hippos eat them.

## This is a parody, not a charity

This is a parody memorial for a memecoin. **It is not a charity, and it is not affiliated with any zoo, park, or animal organization.** $FIONA is a memecoin with no intrinsic value, and nothing on this page is financial advice.

## How this is built

Static HTML, CSS, and JS. No build step, no framework, no Netlify/Vercel required. The site is hosted on [Surge](https://surge.sh) at [fionawifhat.wtf](https://fionawifhat.wtf/). The previous address [fiona-wif-hat.surge.sh](https://fiona-wif-hat.surge.sh/) stays live. Source lives on GitHub.

```
index.html      the page
styles.css      the look
config.js       contract, buy link, chart, socials, profile song  <-- edit this
app.js          copy-CA, guestbook, counter, sparkles, YouTube player, album lightbox
assets/         images, tiles, 88x31 badges, OG card
assets/memes/   downloadable 1000x1000 PNGs
assets/album/   photo album JPEGs (max ~1200px)
```

## Official socials

- X: [@urhippobaddie](https://x.com/urhippobaddie)
- Telegram: [t.me/+3rofjQMKvI85YzNh](https://t.me/+3rofjQMKvI85YzNh)

Those URLs live in [`config.js`](config.js) as `socials.x` and `socials.telegram`. Leave a field as `""` and the nav will keep saying "coming soon" instead of shipping a broken link.

The contract address, pump.fun buy link, and DexScreener chart URLs also live in that same file.

## Profile song

Fiona's Profile Song is an official YouTube embed of Celine Dion's "My Heart Will Go On" (CelineDionVEVO). The video ID lives in `config.js` as `songYoutubeId`. We do not download or host the audio. The player does not autoplay.

## Local preview

Any static server in this folder works, for example:

```
python3 -m http.server 8080
```

Then open http://localhost:8080

## License / credit

Art is Fiona in a beanie. The site is a late-90s-style parody homepage, not an affiliation with any zoo or park.

The Photo Album includes one openly licensed photograph: [Fiona the Hippopotamus](https://commons.wikimedia.org/wiki/File:Fiona_the_Hippopotamus.jpg) by DarthBotto, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons (resized for the web). A search of Wikimedia Commons, Flickr, Openverse, and public-domain sources found only this one unique photograph of Fiona under CC BY, CC BY-SA, CC0, or public domain. The beanie pictures are original site meme art.

Additional real photos appear only as official public embeds of [@CincinnatiZoo](https://x.com/CincinnatiZoo) posts on X (twitter blockquote + `widgets.js`, lazy-loaded). Copyrighted news photos are not downloaded or rehosted. "Fiona in the News" is a text-only wall of headlines linking out to the original articles. This page is not affiliated with the Cincinnati Zoo or any newsroom.
