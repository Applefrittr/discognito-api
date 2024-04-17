// Helper function to extract attached asset's URL and dimensions.  Attachments key of message object from Discord is a Map, iterate over the map using a forEach loop
// to pull url and dimension data.  Push an object with this data for each element in the attachments map to an array and return.
function extractAttachments(attachments) {
  const attachmentsData = [];

  attachments.forEach((data, id) => {
    // push an object that contains the attached asset's url along with the width and height values (these will be used to render the container before the url loads, help with rendering smoothness)
    attachmentsData.push({
      url: data.url,
      width: data.width,
      height: data.height,
    });
  });

  return attachmentsData;
}

module.exports = extractAttachments;
