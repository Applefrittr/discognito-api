// discord.js client created  and connected to Discord API
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  TextChannel,
} = require("discord.js");
const eventListeners = require("./event-listeners");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// new Collection added to the client instance that will hold all current Text Channels
client.textChannels = new Collection();

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  for (const [key, value] of client.channels.cache) {
    if (value instanceof TextChannel) client.textChannels.set(key, value);
  }
  // attach Event listeners
  eventListeners(client);
});

module.exports = client;
