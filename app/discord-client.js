// discord.js client created  and connected to Discord API
const debug = require("debug")("discognito:bot");
const {
  Client,
  Events,
  GatewayIntentBits,
  TextChannel,
} = require("discord.js");
const discordEvents = require("../events/discord-events");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// create new atribute textChannels to contain an array of Text channels pulled from the client channel cache
client.textChannels = [];

client.once(Events.ClientReady, (readyClient) => {
  debug(`Ready! Logged in as ${readyClient.user.tag}`);

  // access the channels cache Collection of the client instance and push only the TEXT Channels (exclude Categories and Voice) to the clients's textChannels array.  The array will be
  // passed onto the Discognito client through a socket connection to be rendered in the UI
  for (const [key, value] of client.channels.cache) {
    if (value instanceof TextChannel) {
      // console.log(value);
      //console.log(value.guild);
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
  // attach event listeners to client instance
  discordEvents(client);
});

module.exports = client;
