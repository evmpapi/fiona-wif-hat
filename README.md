# $FIONA — Fiona Wif Hat

A one-page, late-90s / GeoCities-style homepage for the [$FIONA](https://pump.fun/coin/B9YcMn7rXbiQAYWJaChmdfbDKmmtFyw3n5JjtPQ7pump?caller=EF1P3tcwAc5M9mTLQ7YaxjRVpGHLNz5237Cq1mkW3LQL&ref=crankycrab68879) memecoin.

Live: <https://evmpapi.github.io/fiona-wif-hat/>

Fiona is a hippo who saw a hat and simply ate it. Dogs wear hats. Hippos eat them.

## This is a parody, not a charity

The "adopt a hippo" / "sponsor Fiona's hat fund" framing is a joke. **No money goes to a zoo, a sanctuary, a rescue, or any animal.** The site uses no real zoo's name or logo. $FIONA is a memecoin with no intrinsic value, and nothing on this page is financial advice.

## How this is built

Static HTML, CSS, and JS. No build step, no framework, no Netlify/Vercel required. GitHub Pages serves `main` from `/`.

```
index.html      the page
styles.css      the look
config.js       contract, buy link, chart, socials  <-- edit this
app.js          copy-CA, guestbook, counter, sparkles
assets/         images, tiles, 88x31 badges, OG card
assets/memes/   downloadable 1000x1000 PNGs
```

## Where to plug in X and Telegram

Open [`config.js`](config.js). Paste the live profile or invite URL into `socials.x` and/or `socials.telegram`. Leave a field as `""` and the nav will keep saying "coming soon" instead of shipping a broken link.

```js
socials: {
  // TODO: paste the live X (Twitter) profile URL once the account exists.
  x: "",
  // TODO: paste the Telegram invite URL once the group exists.
  telegram: "",
},
```

The contract address, pump.fun buy link, and DexScreener chart URLs also live in that same file.

## Local preview

Any static server in this folder works, for example:

```
python3 -m http.server 8080
```

Then open http://localhost:8080

## License / credit

Art is Fiona in a beanie. The site is a parody of late-90s "save the animals" homepages, not an affiliation with any zoo or park.
