const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userName, userId, messageID) {
 const services = [
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = `🍀 ☆𝙎𝘼𝙏𝑂𝑅𝑈 𝔤𝔬𝔧𝔬  𝐵𝑂𝑇
━━━━━━━━━━━━━━━━
𝔰𝔞𝔩𝔲𝔱, 𝔧𝔢 𝔰𝔲𝔦𝔰 𝔩'𝔦𝔫𝔱𝔢𝔩𝔩𝔦𝔤𝔢𝔫𝔠𝔢 𝔞𝔯𝔱𝔦𝔣𝔦𝔠𝔦𝔩𝔩𝔢 ℭℜéé 𝔭𝔞𝔯 𝔪𝔢𝔰𝔰𝔦𝔢 𝔬𝔰𝔞𝔫𝔤𝔬 𝔮𝔲𝔢 𝔭𝔲𝔦𝔰-𝔧𝔢 𝔣𝔞𝔦𝔯𝔢 𝔭𝔬𝔲𝔯 𝔳𝔬𝔲𝔰 ? ( envoyé avec un effet de feu)
━━━━━━━━━━━━━━━━ \n est active. Pose ta question 🍀`;
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: 'ai',
 author: 'shizuka',
 role: 0,
 aliase: ["ai"],
 category: 'ai-chat',
 shortDescription: 'ai to ask anything',
 },
 onStart: async function ({ api, event, args }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage(" ☆𝙎𝘼𝙏𝑂𝑅𝑈 𝔤𝔬𝔧𝔬  𝐵𝑂𝑇
━━━━━━━━━━━━━━━━
𝔰𝔞𝔩𝔲𝔱, 𝔧𝔢 𝔰𝔲𝔦𝔰 𝔩'𝔦𝔫𝔱𝔢𝔩𝔩𝔦𝔤𝔢𝔫𝔠𝔢 𝔞𝔯𝔱𝔦𝔣𝔦𝔠𝔦𝔩𝔩𝔢 ℭℜéé 𝔭𝔞𝔯 𝔪𝔢𝔰𝔰𝔦𝔢 𝔬𝔰𝔞𝔫𝔤𝔬 𝔮𝔲𝔢 𝔭𝔲𝔦𝔰-𝔧𝔢 𝔣𝔞𝔦𝔯𝔢 𝔭𝔬𝔲𝔯 𝔳𝔬𝔲𝔰 ? 
━━━━━━━━━━━━━━━━\n est active. Pose ta question", event.threadID, event.messageID);
 return;
 }

 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
 api.sendMessage(`GOD-TECH\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━☆𝙎𝘼𝙏𝑂𝑅𝑈 𝔤𝔬𝔧𝔬  𝐵𝑂T 
━━━━━━━━━━━━━━━━ \n est active. Pose ta question`, event.threadID, messageID);
 });
 },
 onChat: async function ({ api, event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("ai")) {
 const input = messageContent.replace(/^ai\s*/, "").trim();
 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
 message.reply(`𝑆𝐴𝑇𝑂𝑅𝑈 𝔊𝔒𝔍𝔒 𝙗𝙤𝙩 \n━━━━━━━━━━━━━━━━\n${userName} , ${response} ━━━━━━━━━━━━━━━━ \n `, messageID);
api.setMessageReaction("🍀", event.messageID, () => {}, true);

 });
 }
 }
};
