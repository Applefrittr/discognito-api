// Helper function to extract embeded asset's URL.  IMPORTANT -- Will only pull assets (MP4s mainly) provided by Tenor, as Tenor GIF's (stoed as MP4s) are integrated into the Discord UI.  Other
// provider's (ie: Youtube, GIPHY, etc.) asset URLs will NOT be extracted. Possbile implementation in the future...

function extractEmbeds(embeds) {
  const embedURLs = [];

  embeds.forEach((embed) => {
    console.log(embed);
    if (embed.data.provider.name === "Tenor")
      // push an object that contains the embedded asset's url along with the width and height values (these will be used to render the container before the url loads, help with rendering smoothness)
      embedURLs.push({
        url: embed.data.video.url,
        width: embed.data.video.width,
        height: embed.data.video.height,
      });
  });

  return embedURLs;
}

module.exports = extractEmbeds;
