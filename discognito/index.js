const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  TextChannel,
} = require("discord.js");
const dotenv = require("dotenv");
const eventListeners = require("./event-listeners");

// initialize environ variables
dotenv.config();

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
