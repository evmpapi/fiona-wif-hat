/* ============================================================
 * Fiona site config
 * ------------------------------------------------------------
 * This is the ONE place to update the contract, buy link, chart,
 * socials, the public site URL, and Fiona's profile song.
 * When the X account or Telegram group is live, paste the full
 * URL into the field below and leave the other one as "" until
 * it exists. Empty strings render as "coming soon" so we never
 * ship a broken link.
 *
 * To swap the profile song, paste another official YouTube
 * video ID into songYoutubeId (we only embed; we never host audio).
 * ============================================================ */

window.FIONA_CONFIG = {
  siteUrl: "https://fiona-wif-hat.surge.sh/",
  ticker: "$FIONA",
  name: "Fiona Wif Hat",
  ca: "B9YcMn7rXbiQAYWJaChmdfbDKmmtFyw3n5JjtPQ7pump",
  buyUrl:
    "https://pump.fun/coin/B9YcMn7rXbiQAYWJaChmdfbDKmmtFyw3n5JjtPQ7pump?caller=EF1P3tcwAc5M9mTLQ7YaxjRVpGHLNz5237Cq1mkW3LQL&ref=crankycrab68879",
  chartEmbed:
    "https://dexscreener.com/solana/B9YcMn7rXbiQAYWJaChmdfbDKmmtFyw3n5JjtPQ7pump?embed=1&theme=dark&trades=0&info=0",
  chartUrl:
    "https://dexscreener.com/solana/B9YcMn7rXbiQAYWJaChmdfbDKmmtFyw3n5JjtPQ7pump",
  // Official CelineDionVEVO upload. Confirmed embeddable via YouTube oEmbed.
  // Title: "Céline Dion - My Heart Will Go On (Official Audio)"
  // Channel: CelineDionVEVO  https://www.youtube.com/@CelineDionVEVO
  songYoutubeId: "mNsm2P0l_7Y",
  songTitle: "My Heart Will Go On",
  songArtist: "Celine Dion",
  socials: {
    // TODO: paste the live X (Twitter) profile URL once the account exists.
    x: "",
    // TODO: paste the Telegram invite URL once the group exists.
    telegram: "",
  },
};
