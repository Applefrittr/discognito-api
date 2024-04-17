const debug = require("debug")("discognito:discord");
const { Events, TextChannel } = require("discord.js");
const { io } = require("../app/server");
const extractEmbeds = require("../javascript/extractEmbeds");
const extractAttachments = require("../javascript/extractAttachments");

// helper function that will attach Event listeners to the Discord client instance passed
const discordEvents = (client) => {
  // Discognito Bot listener that fires when a new message is posted into a channel that the bot has permission
  client.on(Events.MessageCreate, (message) => {
    // Extract any embeds and attachments within the recieved message object from Discord.  IMPORTANT -- Only GIFs provided by Tenor (Tenor GIF search intigrated into the Discord UI) will be extracted from the embeds data
    let embeds = [];
    let attachments = [];

    if (message.embeds.length > 0) embeds = extractEmbeds(message.embeds);
    if (message.attachments.size > 0)
      attachments = extractAttachments(message.attachments);

    // forward message to sockets currently in the specifc channelId Room
    io.sockets
      .to(message.channelId)
      .emit(
        "new message",
        message,
        message.author,
        message.author.avatarURL(),
        embeds,
        attachments
      );

    debug("Incoming Message from Discord :)", message.embeds);
  });

  // listener fires when a message is deleted in a Text Channel.  Will emit message ID to Discognito client to remove message from UI
  client.on(Events.MessageDelete, (message) => {
    io.sockets.to(message.channelId).emit("delete message", message.id);

    debug("Delete Message request from Discord :/");
  });

  // listener fires when a message is updated.  Pulls updated content filed from message payload and emits the message id and updated content to client
  client.on(Events.MessageUpdate, (message) => {
    io.sockets
      .to(message.channelId)
      .emit("update message", message.id, message.reactions.message.content);

    debug("Message edit recieved from Discord :D");
  });

  // listener that fires when the Discognito Bot is added to a new server/guild
  client.on(Events.GuildCreate, (guild) => {
    debug("Discognito was added to a new server! Yay!!!");
    // Access the channels cache of the newly added guild and push the TextChannels only to the discord.js client's textChannels attribute, which is then emitted to the front-end client for rendering
    for (const [key, value] of guild.channels.cache) {
      if (value instanceof TextChannel) {
        client.textChannels.push({
          guildName: value.guild.name,
          guildID: value.guild.id,
          guildIcon: value.guild.iconURL(),
          name: value.name,
          ID: key,
          topic: value.topic,
        });
      }
    }

    io.emit("get channels", client.textChannels);
  });

  // listener that fires when the Discognito Bot is removed from a guild/server
  client.on(Events.GuildDelete, (guild) => {
    debug("Discognito was removed from a server... sad day :(");

    // filter out the text channels with a guild ID that matches the removed guild's ID
    client.textChannels = client.textChannels.filter((channel) => {
      return channel.guildID !== guild.id;
    });

    io.emit("get channels", client.textChannels);
  });
};

module.exports = discordEvents;
