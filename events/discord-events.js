const { Events, TextChannel } = require("discord.js");
const { io } = require("../bin/server");

// helper function that will attach Event listeners to the Discord client instance passed
const discordEvents = (client) => {
  // Discognito Bot listener that fires when a new message is posted into a channel that the bot has permission
  client.on(Events.MessageCreate, (message) => {
    // forward message to sockets currently in the specifc channelId Room
    io.sockets
      .to(message.channelId)
      .emit("new message", message, message.author, message.author.avatarURL());
  });

  // listener that fires when the Discognito Bot is added to a new server/guild
  client.on(Events.GuildCreate, (guild) => {
    console.log("Discognito added to new server!  Id:", guild.id);

    // Access the channels cache of the newly added guild and push the TextChannels only to the clients textChannels attribute, which is then emitted to the client for rendering
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
    console.log("Discognito removed from a server :/  Id:", guild.id);

    // filter out the text channels with a guild ID that matches the removed guild's ID
    client.textChannels = client.textChannels.filter((channel) => {
      return channel.guildID !== guild.id;
    });

    io.emit("get channels", client.textChannels);
  });
};

module.exports = discordEvents;