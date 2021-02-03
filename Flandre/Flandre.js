function FlandreScript() {
const Discord = require('discord.js'),
      FlandreClient = new Discord.Client(),
      Superagent = require('superagent'),
      Database = require('quick.db'),
      Moment = require('moment'),
      Sakura = require('sakuranpm'),
      RandomAnime = require('random-anime'),
      Fetch = require('node-fetch'),
      AnimeFacts = require('anime-facts'),
      AnimeQuotesApi = require('anime-quotes-api'),
      Ruka = require('rukanpm'),
      Azurlane = require('@azurapi/azurapi'),
      DonutApi = require('donutapi'),
      TnaiToken = require('./Config/Config.ts').tnai_token,
      AnimeScraper = require('anime-scraper').Anime,
      Anilist = require('anilist-node'),
      Tnai = require('tnai'),
      NekoLove = require('neko-love'),
      FreezeGoldAnime = require('@freezegold/anime.js'),
      FlandreAnilistClient = new Anilist(),
      FlandreTnaiClient = new Tnai(TnaiToken),
      FlandreFreezeAnimeClient = new FreezeGoldAnime.Client(),
      FlandreNekoClient = new NekoLove.Client(),
      HMfull = require('hmfull'),
      Weather = require('weather-js'),
      ChatBot = require('smartestchatbot'),
      Commands = require('./Commands/Config/Database.ts'),
      Prefix = require('./Config/Config.ts').prefix,
      Developer = require('./Config/Config.ts').developer,
      Server = require('./Config/Config.ts').server,
      FlandreToken = require('./Config/Config.ts').discord_token,
      Cooldown = require('./Config/Config.ts').cmd_cooldown,
      SetTime = new Set();
let FlandreAngery = require('./Config/Emojis.ts').flandre_angery,
    FlandreHi = require('./Config/Emojis.ts').flandre_hi,
    FlandreLaugh = require('./Config/Emojis.ts').flandre_laugh,
    FlandreSatisfied = require('./Config/Emojis.ts').flandre_satisfied,
    FlandreSigh = require('./Config/Emojis.ts').flandre_sigh,
    FlandreTired = require('./Config/Emojis.ts').flandre_tired,
    FlandreUgh = require('./Config/Emojis.ts').flandre_ugh,
    FlandreUhhh = require('./Config/Emojis.ts').flandre_uhh;
class Logging {
  constructor(console) {
    this.logging = console;
  }
}
let Flandre = {
  login: function () {
    FlandreClient.login(FlandreToken)
  },
  ready: function () {
    FlandreClient.on('ready', async () => {
     const ArrayStatus = [
         `${FlandreClient.users.cache.size} Users~ ${Prefix}help`,
         `${FlandreClient.guilds.cache.size} Servers~ ${Prefix}help`,
          `${FlandreClient.channels.cache.size} Channels~ ${Prefix}help`,
         `${Prefix}help`
     ];
  let Index = 0;     
  setInterval(() => {
      if(Index === ArrayStatus.length) Index = 0;
      const Status = ArrayStatus[Index];
      FlandreClient.user.setActivity(Status);
      Index++;
    }, 20000);
      console.log('Flandre Readyを!');
    })
  },
  loadcommands: function () {
    Commands(Database);
  },
  messageCreate: function (Reply, msg) {
    if(!Reply) {
      throw Error('Please define your Reply! >~<')
    } else {
    msg.channel.startTyping();
    msg.channel.send(Reply).catch(err => {
    let DefaultChannel = "";
 msg.guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && DefaultChannel == "") {
    if(channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) {
      DefaultChannel = channel;
    }
  }
})
        const ErrorEmbed = new Discord.MessageEmbed()
            .setColor('#e87e76')
            .setTitle(`${FlandreUgh} | *${msg.author.tag}, Sorry! but i don't have send messages Permission on that Channel!*`)
            .setTimestamp()
            .setFooter(`No Permission Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        DefaultChannel.send(`<@${msg.author}>`).then(msgf => {
            msgf.delete({ timeout: 1000 })
        })
        DefaultChannel.send(ErrorEmbed).catch(err => {
            return;
        })
    })
    msg.channel.stopTyping();
    }
  },
  logging: function (msg) {
    let Log = new Logging(msg.content + ', ' + msg.author.tag + ', ' + msg.author.id);
    console.log(Log.logging);
  },
  flandreEmbedSuccess: function () {
    return new Discord.MessageEmbed()
    .setColor('#ffffc4')
    .setTimestamp()
  },
  flandreEmbedError: function () {
    return new Discord.MessageEmbed()
    .setColor('#e87e76')
    .setTimestamp()
  },
    brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South',
    create_instant_invite: 'CREATE_INSTANT_INVITE',
    kick_members: 'KICK_MEMBERS',
    ban_members: 'BAN_MEMBERS',
    administrator: 'ADMINISTRATOR',
    manage_channels: 'MANAGE_CHANNELS',
    manage_guild: 'MANAGE_GUILD',
    add_reactions: 'ADD_REACTIONS',
    view_audit_log: 'VIEW_AUDIT_LOG',
    priority_speaker: 'PRIORITY_SPEAKER',
    stream: 'STREAM',
    view_channel: 'VIEW_CHANNEL',
    send_messages: 'SEND_MESSAGES',
    send_tts_messages: 'SEND_TTS_MESSAGES',
    manage_messages: 'MANAGE_MESSAGES',
    embed_links: 'EMBED_LINKS',
    attach_files: 'ATTACH_FILES',
    read_message_history: 'READ_MESSAGE_HISTORY',
    mention_everyone: 'MENTION_EVERYONE',
    use_external_emojis: 'USE_EXTERNAL_EMOJIS',
    view_guild_insights: 'VIEW_GUILD_INSIGHTS',
    connect: 'CONNECT',
    speak: 'SPEAK',
    mute_members: 'MUTE_MEMBERS',
    deafen_members: 'DEAFEN_MEMBERS',
    move_members: 'MOVE_MEMBERS',
    use_vad: 'USE_VAD',
    change_nickname: 'CHANGE_NICKNAME',
    manage_nicknames: 'MANAGE_NICKNAMES',
    manage_roles: 'MANAGE_ROLES',
    manage_webhooks: 'MANAGE_WEBHOOKS',
    manage_emojis: 'MANAGE_EMOJIS'
};
Flandre.login();
Flandre.loadcommands();
Flandre.ready();
FlandreClient.on('message', async msg => {
 try {
   let ChannelCheck = Database.get(`enabledchannels_${msg.channel.id}`)
    switch(ChannelCheck) {
      case false:
       return;
       break;
     }
     if(msg.author.bot) return;
    const AfkEmbedError = new Flandre.flandreEmbedError().setFooter(`Afk Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
          AfkEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Afk Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     
     if(Database.has(`UserAfk_${msg.author.id}_${msg.guild.id}`)) {
        const Reason = Database.get(`UserAfk_${msg.author.id}_${msg.guild.id}`);
        await Database.delete(`UserAfk_${msg.author.id}_${msg.guild.id}`)
        AfkEmbedSuccess.setTitle(`${FlandreHi} | *You have been removed to Afk! (${Reason.slice(0, 50)})*`)
        Flandre.messageCreate(AfkEmbedSuccess, msg);
    }
    if(msg.mentions.members.first()) {
        if(Database.has(`UserAfk_${msg.mentions.members.first().id}_${msg.guild.id}`)) {
            let Reason = Database.get(`UserAfk_${msg.mentions.members.first().id}_${msg.guild.id}`);
            AfkEmbedError.setTitle(`${FlandreAngery} | *${msg.mentions.members.first().user.tag} is Currently Afk! Reason: ${Reason}*`)
         Flandre.messageCreate(AfkEmbedError, msg);
        }
    }
    switch(msg.channel.type) {
      case "dm":
       return;
       break; 
      }
    if(!msg.content.toLowerCase().startsWith(Prefix)) return;
    if(SetTime.has(msg.author.id)){
    let CooldownError = Flandre.flandreEmbedError().setFooter(`Cooldown Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     CooldownError.setTitle(`${FlandreAngery} | *${msg.author.tag}, Please Wait ${Cooldown} Seconds Before typing \`${msg.content}\` again!*`)
      return Flandre.messageCreate(CooldownError, msg);
  }
  SetTime.add(msg.author.id) 
  setTimeout(() => {
    SetTime.delete(msg.author.id)
  }, Cooldown * 1000)
    const args = msg.content.slice(Prefix.length).split(/ +/),
          command = args.shift().toLowerCase();
    if(command === 'commandschannel') {
      Flandre.logging(msg);
      const DisEnableCmdsEmbedError = new Flandre.flandreEmbedError().setFooter(`Disable Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            DisEnableCmdsEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Disable Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
        if(!msg.member.hasPermission(Flandre.manage_guild)) {
           DisEnableCmdsEmbedError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_guild} Permission to use this command!*`)
           Flandre.messageCreate(DisEnableCmdsEmbedError, msg);
        } else {
        let Toggle = ['enable', 'disable'],
            ToggleArgs = args[0],
            Reply = new Object();
        if(!Toggle.includes(ToggleArgs)) {
          DisEnableCmdsEmbedError.setTitle(`${FlandreUhhh} | *Please specify if \`enable <#Channel>\` or \`disable <#Channel>\`*`)
          Reply = DisEnableCmdsEmbedError;
        switch(Reply) {
          case DisEnableCmdsEmbedError:
            Flandre.messageCreate(Reply, msg);
        }
        } else if(ToggleArgs === 'enable') {
          let Channel = msg.mentions.channels.first()
          if(!Channel) {
            DisEnableCmdsEmbedError.setTitle(`${FlandreUhhh} | *Please mention a specific Channel to enable my commands from!*`)
            Reply = DisEnableCmdsEmbedError;
            Flandre.messageCreate(Reply, msg);
          } else {
            let ChannelDb = Database.get(`enabledchannels_${Channel.id}`)
            if(ChannelDb === true) {
              DisEnableCmdsEmbedError.setTitle(`${FlandreSigh} | ${Channel} *is already enabled my commands!*`)
              Reply = DisEnableCmdsEmbedError;
              Flandre.messageCreate(Reply, msg);
            } else {
              Database.set(`enabledchannels_${Channel.id}`, true)
              DisEnableCmdsEmbedSuccess.setTitle(`${FlandreHi} | *Successfully Enabled* ${Channel}!`)
              Reply = DisEnableCmdsEmbedSuccess;
              Flandre.messageCreate(Reply, msg);
            }
          }
        } else if(ToggleArgs === 'disable') {
          let Channel = msg.mentions.channels.first()
          if(!Channel) {
            DisEnableCmdsEmbedError.setTitle(`${FlandreUhhh} | *Please mention a specific Channel to disable my commands from!*`)
            Reply = DisEnableCmdsEmbedError;
            Flandre.messageCreate(Reply, msg);
          } else {
            let ChannelDb = Database.get(`enabledchannels_${Channel.id}`)
            if(ChannelDb === false) {
              DisEnableCmdsEmbedError.setTitle(`${FlandreSigh} | ${Channel} *is already disabled my commands!*`)
              Reply = DisEnableCmdsEmbedError;
              Flandre.messageCreate(Reply, msg);
            } else {
              Database.set(`enabledchannels_${Channel.id}`, false)
              DisEnableCmdsEmbedSuccess.setTitle(`${FlandreHi} | *Successfully Disabled* ${Channel}!`)
              Reply = DisEnableCmdsEmbedSuccess;
              Flandre.messageCreate(Reply, msg);
            }
          }
        }
        }
      } else if(command === 'animememe') {
        Flandre.logging(msg);
        const AnimeMemeError = new Flandre.flandreEmbedError().setFooter(`Flandre Anime Meme!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
             AnimeMemeSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Flandre Anime Meme!`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
             
        let Reply = new Object(),
           {body} = await Superagent
        .get(`https://www.reddit.com/r/AnimeMeme.json?sort=top&t=week`)
        .query({limit: 800});
    
    var allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if(!allowed.length) {
          AnimeMemeError.setTitle(`${FlandreUhhh} | *Sorry! it seems theres no result! Try Again!*`)
          Reply = AnimeMemeError;
          switch(Reply) {
            case AnimeMemeError:
              Flandre.messageCreate(Reply, msg);
          }
        } else {
        var randomNumber = Math.floor(Math.random() * allowed.length)
        AnimeMemeSuccess.setTitle(`${FlandreHi} | *${allowed[randomNumber].data.title}*`)
        AnimeMemeSuccess.setDescription(`Author ~ *${allowed[randomNumber].data.author}*`)
        AnimeMemeSuccess.setImage(allowed[randomNumber].data.url)
        Reply = AnimeMemeSuccess;
        switch(Reply) {
          case AnimeMemeSuccess:
            Flandre.messageCreate(Reply, msg);
        }
        }
      } else if(command === 'hug') {
        Flandre.logging(msg);
        const HugEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Hug Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Huggo = `*${msg.author.username} Hugged itself*`;
          Superagent
  .get("https://nekos.life/api/v2/img/hug")
    .end((err, response) => {
    HugEmbed.setTitle(`${FlandreHi} | ${Huggo}`)
    HugEmbed.setImage(response.body.url)
    Flandre.messageCreate(HugEmbed, msg);
    })
        } else {
          let Huggo = `*${msg.author.username} Hugged ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/hug")
    .end((err, response) => {
    HugEmbed.setTitle(`${FlandreHi} | ${Huggo}`)
    HugEmbed.setImage(response.body.url)
    Flandre.messageCreate(HugEmbed, msg);
    })
        }
      } else if(command === 'cuddle') {
        Flandre.logging(msg);
        const CuddleEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Cuddle Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Cuddle = `*${msg.author.username} Cuddled itself*`;
          Superagent
  .get("https://nekos.life/api/v2/img/cuddle")
    .end((err, response) => {
    CuddleEmbed.setTitle(`${FlandreHi} | ${Cuddle}`)
    CuddleEmbed.setImage(response.body.url)
    Flandre.messageCreate(CuddleEmbed, msg);
    })
        } else {
          let Cuddle = `*${msg.author.username} Cuddled with ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/cuddle")
    .end((err, response) => {
    CuddleEmbed.setTitle(`${FlandreHi} | ${Cuddle}`)
    CuddleEmbed.setImage(response.body.url)
    Flandre.messageCreate(CuddleEmbed, msg);
    })
        }
      } else if(command === 'kiss') {
        Flandre.logging(msg);
        const KissEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Kiss Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Kissu = `*${msg.author.username} Kissed itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/kiss")
    .end((err, response) => {
    KissEmbed.setTitle(`${FlandreHi} | ${Kissu}`)
    KissEmbed.setImage(response.body.url)
    Flandre.messageCreate(KissEmbed, msg);
    })
        } else {
          let Kissu = `*${msg.author.username} Kissed with ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/kiss")
    .end((err, response) => {
    KissEmbed.setTitle(`${FlandreHi} | ${Kissu}`)
    KissEmbed.setImage(response.body.url)
    Flandre.messageCreate(KissEmbed, msg);
    })
        }
      } else if(command === 'help') {
        Flandre.logging(msg);
        const HelpEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Example: ${Prefix}animememe`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
              HelpEmbedError = new Flandre.flandreEmbedError().setFooter(`Example: ${Prefix}help anime`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
        if(!args[0]) {
          HelpEmbed.setTitle(`${FlandreLaugh} | *Modules Menu!*`)
          HelpEmbed.setDescription(`Do ${Prefix}help [Module Name or Command] to get info!\n\n`)
          HelpEmbed.addField(`${FlandreHi} | Anime`, `\`${Prefix}help anime\``)
          HelpEmbed.addField(`${FlandreTired} | Administration`, `\`${Prefix}help admin\``)
          HelpEmbed.addField(`${FlandreLaugh} | Fun`, `\`${Prefix}help fun\``)
          HelpEmbed.addField(`${FlandreSigh} | Miscellaneous`, `\`${Prefix}help misc\``)
          HelpEmbed.addField(`${FlandreAngery} | Roleplay`, `\`${Prefix}help roleplay\n\``)
          HelpEmbed.addField(`${FlandreUhhh} | *Links!*`, `[Invite Link!](https://discord.com/api/oauth2/authorize?client_id=779897677332742175&permissions=1477307632&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fdc99VGUrrw&response_type=code&scope=guilds%20bot), [Support Server!](https://discord.gg/a2sWQwVrhp), [Vote!](https://top.gg/bot/779897677332742175/vote).`)
          Flandre.messageCreate(HelpEmbed, msg);
        } else if(args[0].toLowerCase() === 'anime') {
          HelpEmbed.setTitle(`${FlandreHi} | *Anime Commands!* Do ${Prefix}help [Command]`)
          HelpEmbed.setDescription(`\`animememe, animescrap, animeavatar, azurlane, achinfo, neko, nekogif, animebg, animemobilebg, rafact, raquote, ranime, racharacter.\``)
          Flandre.messageCreate(HelpEmbed, msg);
        } else if(args[0].toLowerCase() === 'admin') {
          HelpEmbed.setTitle(`${FlandreTired} | *Admin Commands!* Do ${Prefix}help [Command]`)
          HelpEmbed.setDescription(`\`commandschannel, autorole, addrole, removerole, setchatchannel, autoping, customcmd.\``)
          Flandre.messageCreate(HelpEmbed, msg);
        } else if(args[0].toLowerCase() === 'fun') {
            HelpEmbed.setTitle(`${FlandreTired} | *Fun Commands!* Do ${Prefix}help [Command]`)
          HelpEmbed.setDescription(`\`wolverine, speed, stonks, icanmilkyou, drip, emergency, ejected, water, carreverse, firsttime.\``)
          Flandre.messageCreate(HelpEmbed, msg);
        } else if(args[0].toLowerCase() === 'misc') {
          HelpEmbed.setTitle(`${FlandreHi} | *Miscellaneous Commands!* Do ${Prefix}help [Command]`)
          HelpEmbed.setDescription(`\`afk, avatar, emojis, info, roleinfo, weather, help, uptime, userinfo, serverinfo, membercount.\``)
          Flandre.messageCreate(HelpEmbed, msg);
        } else if(args[0].toLowerCase() === 'roleplay') {
          HelpEmbed.setTitle(`${FlandreHi} | *Roleplay Commands!* Do ${Prefix}help [Command]`)
          HelpEmbed.setDescription(`\`marry, divorce, hug, kiss, cuddle, think, confused, dance, run, glomp, bully, cringe, highfive, happy, nervous, pout, poke, punch, feed, smug, pat, slap, tickle, vomit, cry, clap, bonk, smile, handhold, scared, wave, nom, bite, hello, bye, blush, bored, sad.\``)
          Flandre.messageCreate(HelpEmbed, msg);
        } else {
          let cmd = args[0].toLowerCase(),
              cmdname = Database.get(`${cmd}name`),
              cmdcategory = Database.get(`${cmd}category`),
              cmddescription = Database.get(`${cmd}description`),
              cmdusage = Database.get(`${cmd}usage`),
              cmdexample = Database.get(`${cmd}example`),
              cmdpermission = Database.get(`${cmd}permission`),
              Reply = new Object();
        if(!cmdname) {
          HelpEmbedError.setTitle(`${FlandreUgh} | *Invalid Command Or Module Senpai!*`)
          Reply = HelpEmbedError;
          Flandre.messageCreate(Reply, msg);
        } else {
        HelpEmbed.setTitle(`${FlandreHi} | *${cmdname}* Command!`)
        HelpEmbed.setDescription(`[] is Optional, <> is Needed!`)
        HelpEmbed.addField(`Category`, `\`${cmdcategory}\``)
        HelpEmbed.addField(`Description`, `\`${cmddescription}\``)
        HelpEmbed.addField(`Usage`, `\`${cmdusage}\``)
        HelpEmbed.addField(`Example`, `\`${cmdexample}\``)
        HelpEmbed.addField(`Permission`, `\`${cmdpermission}\``)
        Flandre.messageCreate(HelpEmbed, msg);
        }
        }
      } else if(command === 'uptime') {
        Flandre.logging(msg);
        require("moment-duration-format");
       const Duration = Moment.duration(FlandreClient.uptime).format(" D [days], H [hrs], m [mins], s [secs]"),
             UptimeEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Uptime Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let Reply = new Object();
        UptimeEmbed.setTitle(`${FlandreLaugh} | *My Uptime!*`)
        UptimeEmbed.setDescription(`${Duration}`)
        Reply = UptimeEmbed;
        switch(Reply) {
          case UptimeEmbed:
            Flandre.messageCreate(Reply, msg);
        }
      } else if(command === 'poke') {
        Flandre.logging(msg);
        const PokeEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Poke Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Pokku = `*${msg.author.username} Poked itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/poke")
    .end((err, response) => {
    PokeEmbed.setTitle(`${FlandreHi} | ${Pokku}`)
    PokeEmbed.setImage(response.body.url)
    Flandre.messageCreate(PokeEmbed, msg);
    })
        } else {
          let Pokku = `*${msg.author.username} Poked ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/poke")
    .end((err, response) => {
    PokeEmbed.setTitle(`${FlandreHi} | ${Pokku}`)
    PokeEmbed.setImage(response.body.url)
    Flandre.messageCreate(PokeEmbed, msg);
    })
        }
      } else if(command === 'feed') {
        Flandre.logging(msg);
        const FeedEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Feed Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Feedu = `*${msg.author.username} Feeds itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/feed")
    .end((err, response) => {
    FeedEmbed.setTitle(`${FlandreHi} | ${Feedu}`)
    FeedEmbed.setImage(response.body.url)
    Flandre.messageCreate(FeedEmbed, msg);
    })
        } else {
          let Feedu = `*${msg.author.username} Feeds ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/feed")
    .end((err, response) => {
    FeedEmbed.setTitle(`${FlandreHi} | ${Feedu}`)
    FeedEmbed.setImage(response.body.url)
    Flandre.messageCreate(FeedEmbed, msg);
    })
        }
      } else if(command === 'smug') {
        Flandre.logging(msg);
        const SmugEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Smug Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Smuggu = `*${msg.author.username} Smugs at itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/smug")
    .end((err, response) => {
    SmugEmbed.setTitle(`${FlandreHi} | ${Smuggu}`)
    SmugEmbed.setImage(response.body.url)
    Flandre.messageCreate(SmugEmbed, msg);
    })
        } else {
          let Smuggu = `*${msg.author.username} Smugs at ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/smug")
    .end((err, response) => {
    SmugEmbed.setTitle(`${FlandreHi} | ${Smuggu}`)
    SmugEmbed.setImage(response.body.url)
    Flandre.messageCreate(SmugEmbed, msg);
    })
        }
      } else if(command === 'pat') {
        Flandre.logging(msg);
        const PatEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Pat Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Pattu = `*${msg.author.username} Pats itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/pat")
    .end((err, response) => {
    PatEmbed.setTitle(`${FlandreHi} | ${Pattu}`)
    PatEmbed.setImage(response.body.url)
    Flandre.messageCreate(PatEmbed, msg);
    })
        } else {
          let Pattu = `*${msg.author.username} Pats ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/pat")
    .end((err, response) => {
    PatEmbed.setTitle(`${FlandreHi} | ${Pattu}`)
    PatEmbed.setImage(response.body.url)
    Flandre.messageCreate(PatEmbed, msg);
    })
        }
      } else if(command === 'slap') {
        Flandre.logging(msg);
        const SlapEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Slap Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Slappu = `*${msg.author.username} Slaps itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/slap")
    .end((err, response) => {
    SlapEmbed.setTitle(`${FlandreHi} | ${Slappu}`)
    SlapEmbed.setImage(response.body.url)
    Flandre.messageCreate(SlapEmbed, msg);
    })
        } else {
          let Slappu = `*${msg.author.username} Slaps ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/slap")
    .end((err, response) => {
    SlapEmbed.setTitle(`${FlandreHi} | ${Slappu}`)
    SlapEmbed.setImage(response.body.url)
    Flandre.messageCreate(SlapEmbed, msg);
    })
        }
      } else if(command === 'tickle') {
        Flandre.logging(msg);
        const TickleEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Tickle Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Ticklu = `*${msg.author.username} Tickles itself?!*`;
          Superagent
  .get("https://nekos.life/api/v2/img/tickle")
    .end((err, response) => {
    TickleEmbed.setTitle(`${FlandreHi} | ${Ticklu}`)
    TickleEmbed.setImage(response.body.url)
    Flandre.messageCreate(TickleEmbed, msg);
    })
        } else {
          let Ticklu = `*${msg.author.username} Tickles ${User.username}*`;
          Superagent
  .get("https://nekos.life/api/v2/img/tickle")
    .end((err, response) => {
    TickleEmbed.setTitle(`${FlandreHi} | ${Ticklu}`)
    TickleEmbed.setImage(response.body.url)
    Flandre.messageCreate(TickleEmbed, msg);
    })
        }
      } else if(command === 'animescrap') {
        Flandre.logging(msg);
          const AnimeScrapError = new Flandre.flandreEmbedError().setFooter(`Anime Scrap Flandre! Powered by anime-scraper~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
                AnimeScrapSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Anime Scrap Flandre! Powered by anime-scraper~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
         let AnimeName = args.join(" ");
         AnimeScrapError.setTitle(`${FlandreAngery} | *Please specify a anime name!*`)
         if(!AnimeName) return Flandre.messageCreate(AnimeScrapError, msg);
          
          AnimeScraper.search(AnimeName).then(function (results) {
            try {
            results[1].toAnime().then(function (anime) {
                AnimeScrapSuccess.setTitle(`${FlandreHi} | *${anime.name}*`)
                AnimeScrapSuccess.setDescription(`${anime.summary}`)
                AnimeScrapSuccess.addField(`Genres`, `\`${anime.genres}\``)
                AnimeScrapSuccess.addField(`Released`, `\`${anime.released}\``)
                AnimeScrapSuccess.addField(`Pilot Episode`, `[Ep 1](${anime.episodes[0].url})`)
                Flandre.messageCreate(AnimeScrapSuccess, msg);
            })
            } catch (error) {
                AnimeScrapError.setTitle(`${FlandreHi} | *Sorry! but i'm unable to search the anime or it is a NSFW Anime!*`)
                Flandre.messageCreate(AnimeScrapError, msg);
            }
          })
      } else if(command === 'avatar') {
      Flandre.logging(msg);
     let Reply = new Object();
     const AvatarEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Avatat Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           AvatarEmbedError = new Flandre.flandreEmbedError().setFooter(`Avatat Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     var User;
    user = msg.mentions.users.first() || FlandreClient.users.cache.get(args[0])
    if (!user) {
      if (!args[0]) {
        user = msg.author;
        getuseravatar(user);
      } else {
        try{
        var id = args[0];
        FlandreClient.fetchUser(id).then(user => {
          getuseravatar(user);
        }).catch(error => console.log(error));
        } catch(err) {
           AvatarEmbedError.setTitle(`${FlandreUhhh} | *Please type a valid ID or mention a user!*`)
          Reply = AvatarEmbedError;
            switch(Reply) {
                case AvatarEmbedError:
                    Flandre.messageCreate(Reply, msg);
            }
        }
    }
    } else {
      getuseravatar(user);
    }
    function getuseravatar(user) {
      AvatarEmbedSuccess.setTitle(`${FlandreLaugh} | *${user.username}'s Avatar!*`)
      AvatarEmbedSuccess.setDescription(`Links`)
      AvatarEmbedSuccess.addField(`Png`, `[png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096})})`)
      AvatarEmbedSuccess.addField(`Jpg`, `[jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 4096})})`)
      AvatarEmbedSuccess.addField(`Webp`, `[webp](${user.displayAvatarURL({ format: 'webp', dynamic: true, size: 4096})})`)
      AvatarEmbedSuccess.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
      Reply = AvatarEmbedSuccess;
        switch(Reply) {
            case AvatarEmbedSuccess: 
                Flandre.messageCreate(Reply, msg);
        }
    }  
  } else if(command === 'vomit') {
    Flandre.logging(msg);
        const VomitEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Vomit Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Vomitu = `*${msg.author.username} Vomits*`,
              SakuraVomit = await Sakura.vomit();
    VomitEmbed.setTitle(`${FlandreHi} | ${Vomitu}`)
    VomitEmbed.setImage(SakuraVomit)
    Flandre.messageCreate(VomitEmbed, msg);
        } else {
          let Vomitu = `*${msg.author.username} Vomits at ${User.username}*`,
              SakuraVomit = await Sakura.vomit();
    VomitEmbed.setTitle(`${FlandreHi} | ${Vomitu}`)
    VomitEmbed.setImage(SakuraVomit)
    Flandre.messageCreate(VomitEmbed, msg);
  }
  } else if(command === 'cry') {
    Flandre.logging(msg);
        const CryEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Cry Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Cryu = `*${msg.author.username} Cries*`,
              SakuraCry = await Sakura.cry();
    CryEmbed.setTitle(`${FlandreHi} | ${Cryu}`)
    CryEmbed.setImage(SakuraCry)
    Flandre.messageCreate(CryEmbed, msg);
        } else {
          let Cryu = `*${msg.author.username} Cries at ${User.username}'s Shoulder!*`,
              SakuraCry = await Sakura.cry();
    CryEmbed.setTitle(`${FlandreHi} | ${Cryu}`)
    CryEmbed.setImage(SakuraCry)
    Flandre.messageCreate(CryEmbed, msg);
  }
  } else if(command === 'clap') {
    Flandre.logging(msg);
        const ClapEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Clap Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Clappu = `*${msg.author.username} Claps*`,
              SakuraClap = await Sakura.claps();
    ClapEmbed.setTitle(`${FlandreHi} | ${Clappu}`)
    ClapEmbed.setImage(SakuraClap)
    Flandre.messageCreate(ClapEmbed, msg);
        } else {
          let Clappu = `*${msg.author.username} Claps at ${User.username}*`,
              SakuraClap = await Sakura.claps();
    ClapEmbed.setTitle(`${FlandreHi} | ${Clappu}`)
    ClapEmbed.setImage(SakuraClap)
    Flandre.messageCreate(ClapEmbed, msg);
  }
  } else if(command === 'scared') {
    Flandre.logging(msg);
        const ScaredEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Scared Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Scaredu = `*${msg.author.username} Was Scared!*`,
              SakuraScared = await Sakura.scared();
    ScaredEmbed.setTitle(`${FlandreHi} | ${Scaredu}`)
    ScaredEmbed.setImage(SakuraScared)
    Flandre.messageCreate(ScaredEmbed, msg);
        } else {
          let Scaredu = `*${msg.author.username} was Scared at ${User.username}!*`,
              SakuraScared = await Sakura.scared();
    ScaredEmbed.setTitle(`${FlandreHi} | ${Scaredu}`)
    ScaredEmbed.setImage(SakuraScared)
    Flandre.messageCreate(ScaredEmbed, msg);
  }
  } else if(command === 'hello') {
    Flandre.logging(msg);
        const HelloEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Hellow Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Hellou = `*${msg.author.username} Greets itself!*`,
              SakuraHello = await Sakura.hi();
    HelloEmbed.setTitle(`${FlandreHi} | ${Hellou}`)
    HelloEmbed.setImage(SakuraHello)
    Flandre.messageCreate(HelloEmbed, msg);
        } else {
          let Hellou = `*${msg.author.username} Greets a Hello to ${User.username}!*`,
              SakuraHello = await Sakura.hi();
    HelloEmbed.setTitle(`${FlandreHi} | ${Hellou}`)
    HelloEmbed.setImage(SakuraHello)
    Flandre.messageCreate(HelloEmbed, msg);
  }
  } else if(command === 'bye') {
    Flandre.logging(msg);
        const ByeEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Bye Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Byu = `*${msg.author.username} Goodbyes itself!*`,
              SakuraBye = await Sakura.bye();
    ByeEmbed.setTitle(`${FlandreHi} | ${Byu}`)
    ByeEmbed.setImage(SakuraBye)
    Flandre.messageCreate(ByeEmbed, msg);
        } else {
          let Byu = `*${msg.author.username} Goodbyes ${User.username}!*`,
              SakuraBye = await Sakura.bye();
    ByeEmbed.setTitle(`${FlandreHi} | ${Byu}`)
    ByeEmbed.setImage(SakuraBye)
    Flandre.messageCreate(ByeEmbed, msg);
  }
  } else if(command === 'blush') {
    Flandre.logging(msg);
        const BlushEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Blush Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Blushu = `*${msg.author.username} Blushes*`,
              SakuraBlush = await Sakura.blush();
    BlushEmbed.setTitle(`${FlandreHi} | ${Blushu}`)
    BlushEmbed.setImage(SakuraBlush)
    Flandre.messageCreate(BlushEmbed, msg);
        } else {
          let Blushu = `*${msg.author.username} Blushes at ${User.username}!*`,
              SakuraBlush = await Sakura.blush();
    BlushEmbed.setTitle(`${FlandreHi} | ${Blushu}`)
    BlushEmbed.setImage(SakuraBlush)
    Flandre.messageCreate(BlushEmbed, msg);
  }
  } else if(command === 'bored') {
    Flandre.logging(msg);
        const BoredEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Bored Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Boredu = `*${msg.author.username} is Bored!*`,
              SakuraBored = await Sakura.bored();
    BoredEmbed.setTitle(`${FlandreHi} | ${Boredu}`)
    BoredEmbed.setImage(SakuraBored)
    Flandre.messageCreate(BoredEmbed, msg);
        } else {
          let Boredu = `*${msg.author.username} and ${User.username} are Bored!*`,
              SakuraBored = await Sakura.bored();
    BoredEmbed.setTitle(`${FlandreHi} | ${Boredu}`)
    BoredEmbed.setImage(SakuraBored)
    Flandre.messageCreate(BoredEmbed, msg);
  }
  } else if(command === 'sad') {
    Flandre.logging(msg);
        const SadEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Sad Flandre! Powered by Sakuranpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Saddu = `*${msg.author.username} is Sad!*`,
              SakuraSad = await Sakura.sad();
    SadEmbed.setTitle(`${FlandreHi} | ${Saddu}`)
    SadEmbed.setImage(SakuraSad)
    Flandre.messageCreate(SadEmbed, msg);
        } else {
          let Saddu = `*${msg.author.username} and ${User.username} is Depressed!*`,
              SakuraSad = await Sakura.sad();
    SadEmbed.setTitle(`${FlandreHi} | ${Saddu}`)
    SadEmbed.setImage(SakuraSad)
    Flandre.messageCreate(SadEmbed, msg);
  }
  } else if(command === 'autorole') {
      Flandre.logging(msg);
      const AutoRoleEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Autorole Flandre`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            AutoRoleEmbedError = new Flandre.flandreEmbedError().setFooter(`Autorole Flandre`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
              if(!msg.member.hasPermission(Flandre.manage_guild)) {
                             AutoRoleEmbedError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_guild} Permission to use this command!*`)
                  Flandre.messageCreate(AutoRoleEmbedError, msg);
              } else if(!msg.guild.me.hasPermission(Flandre.manage_roles)) {
                  AutoRoleEmbedError.setTitle(`${FlandreUgh} | *Sorry but i need the ${Flandre.manage_roles} Permission to Perform this Command!*`)
                  Flandre.messageCreate(AutoRoleEmbedError, msg);
              } else {
      let Toggle = ['enable', 'disable', 'setrole'],
          ToggleArgs = args[0],
          Reply = new Object();
      if(!Toggle.includes(ToggleArgs)) {
          AutoRoleEmbedError.setTitle(`${FlandreUgh} | *Please Specify if \`enable\` , \`disable\` or \`setrole <Mention a role>\`*`)
          Reply = AutoRoleEmbedError;
          Flandre.messageCreate(Reply, msg);
      } else if(ToggleArgs.toLowerCase() === 'setrole') {
          let AutoRoleDB = Database.get(`statusautorole_${msg.guild.id}`)
         switch(AutoRoleDB) {
             case true:        
          let Role = msg.mentions.roles.first()
              AutoRoleEmbedError.setTitle(`${FlandreUhhh} | *Please mention a role!*`)
                 Reply = AutoRoleEmbedError;
             if(!Role) return  Flandre.messageCreate(Reply, msg);
             let RoleDB = Database.get(`roleForAutorole_${msg.guild.id}`)
             AutoRoleEmbedError.setTitle(`${FlandreUgh} | *Please specify other Roles ${Role} is already Setted as Auto Role!*`)
             Reply = AutoRoleEmbedError;
             if(RoleDB === Role.id) return Flandre.messageCreate(Reply, msg);
           
             Database.set(`roleForAutorole_${msg.guild.id}`, Role.id)
             AutoRoleEmbedSuccess.setTitle(`${FlandreHi} | *Successfully setted ${Role} as Auto Role!*`)
             Reply = AutoRoleEmbedSuccess;
             Flandre.messageCreate(Reply, msg);
             break;
             case null:
                 AutoRoleEmbedError.setTitle(`${FlandreUgh} | *Auto role is Disabled! Please enable it first!*`)
                 Reply = AutoRoleEmbedError;
                 Flandre.messageCreate(Reply, msg);
                 break;
         }
      } else if(ToggleArgs.toLowerCase() === 'disable') {
          //"3&"
          let AutoRoleDBB = Database.get(`statusautorole_${msg.guild.id}`)
          switch(AutoRoleDBB) {
              case null:
                  AutoRoleEmbedError.setTitle(`${FlandreUgh} | *AutoRole is Already Disabled!*`)
                  Reply = AutoRoleEmbedError;
                  Flandre.messageCreate(Reply, msg);
                  break;
              case true:
                  Database.delete(`statusautorole_${msg.guild.id}`)
                  AutoRoleEmbedSuccess.setTitle(`${FlandreLaugh} | *Successfully Disabled Auto Role!*`)
                  Reply = AutoRoleEmbedSuccess;
                  Flandre.messageCreate(Reply, msg);
                  break;
          }
          } else if(ToggleArgs.toLowerCase() === 'enable') {
              let AutoRoleDBBB = Database.get(`statusautorole_${msg.guild.id}`)
              switch(AutoRoleDBBB) {
                  case true:
                      AutoRoleEmbedSuccess.setTitle(`${FlandreUgh} | *Auto Role is already enabled!*`)
                      Reply = AutoRoleEmbedSuccess;
                      Flandre.messageCreate(Reply, msg);
                      break;
                  case null:
                      Database.set(`statusautorole_${msg.guild.id}`, true)
                      AutoRoleEmbedSuccess.setTitle(`${FlandreHi} | *Successfully Enabled Auto role!*`)
                      Reply = AutoRoleEmbedSuccess;
                      Flandre.messageCreate(Reply, msg);
                      break;
              }
          }
    }
  } else if(command === 'userinfo') {
      Flandre.logging(msg);
      let Reply = new Object();
      const UserInfoEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`UserInfo Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.last() || msg.guild.members.cache.get(msg) || msg.member,
		   roles = Member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
					
  UserInfoEmbedSuccess.setTitle(`${FlandreHi} | *Info of ${Member.user.tag}!*`)
  UserInfoEmbedSuccess.setThumbnail(Member.user.displayAvatarURL({ dynamic: true, size: 512 }))
  UserInfoEmbedSuccess.addField(`Username`, `\`${Member.user.username}\``)
  UserInfoEmbedSuccess.addField(`Discriminator`, `\`${Member.user.discriminator}\``)
  UserInfoEmbedSuccess.addField(`ID`, `\`${Member.user.id}\``)
  UserInfoEmbedSuccess.addField(`Avatar`, `[Link](${Member.user.displayAvatarURL({ dynamic: true })})`)
  UserInfoEmbedSuccess.addField(`Status`, `\`${Member.user.presence.status}\``)
  UserInfoEmbedSuccess.addField(`Game`, `\`${Member.user.presence.game || 'Not playing!'}\``)
  UserInfoEmbedSuccess.addField(`Time Created`, `\`${Moment(Member.user.createdTimestamp).format('LT')} ${Moment(Member.user.createdTimestamp).format('LL')} ${Moment(Member.user.createdTimestamp).fromNow()}\``)
  UserInfoEmbedSuccess.addField(`Highest Role`, `\`${Member.roles.highest.id === msg.guild.id ? 'No Role!' : Member.roles.highest.name}\``)
  UserInfoEmbedSuccess.addField(`User Joined`, `\`${Moment(Member.joinedAt).format('LL LTS')}\``)
      Reply = UserInfoEmbedSuccess;
      Flandre.messageCreate(Reply, msg);
  } else if(command === 'serverinfo') {
      let Reply = new Object();
      const users = {
            online: msg.guild.presences.cache.filter(presence => presence.status === "online").size,
            idle: msg.guild.presences.cache.filter(presence => presence.status === "idle").size,
            dnd: msg.guild.presences.cache.filter(presence => presence.status === "dnd").size,
          },
          RolesString = msg.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()),
            ServerInfoEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`ServerInfo Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));

            ServerInfoEmbedSuccess.setTitle(`${FlandreLaugh} | *${msg.guild.name} Info!*`)
            ServerInfoEmbedSuccess.setThumbnail(msg.guild.iconURL({ dynamic: true }))
            ServerInfoEmbedSuccess.addField(`Online Users`, `\`${users.online}\``, true)
            ServerInfoEmbedSuccess.addField(`Idle Users`, `\`${users.idle}\``, true)
            ServerInfoEmbedSuccess.addField(`Do not Disturb Users`, `\`${users.dnd}\``, true)
            ServerInfoEmbedSuccess.addField(`Total Users`,  `\`${msg.guild.memberCount}\``, true)
            ServerInfoEmbedSuccess.addField(`Roles`, `\`${msg.guild.roles.cache.size}\``, true)
            ServerInfoEmbedSuccess.addField(`Text Channels`, `\`${msg.guild.channels.cache.size}\``, true)
            ServerInfoEmbedSuccess.addField(`Voice Channels`, `\`${msg.guild.channels.cache.filter(channel => channel.type === 'voice').size}\``, true)
            ServerInfoEmbedSuccess.addField(`Server Region`, `\`${Flandre[msg.guild.region]}\``, true)
            ServerInfoEmbedSuccess.addField(`Server Boost Tier`, `\`${msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None!'}\``, true)
            ServerInfoEmbedSuccess.addField(`Boost Count`, `\`${msg.guild.premiumSubscriptionCount || '0'}\``)
            ServerInfoEmbedSuccess.addField(`Emojis`, `\`${msg.guild.emojis.cache.size}\``, true)
            Reply = ServerInfoEmbedSuccess;
      Flandre.messageCreate(Reply, msg);
  } else if(command === 'animeavatar') {
      Flandre.logging(msg);
      const AnimeAvatarEmbedSuccess = Flandre.flandreEmbedSuccess().setFooter(`AnimeAvatar Flandre! Powered by Nekos.Life~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            { url } = await Fetch(`https://nekos.life/api/v2/img/${msg.channel.nsfw ? "nsfw_" : ""}avatar`)
      .then((res) => res.json());

      AnimeAvatarEmbedSuccess.setTitle(`${FlandreHi} | *${msg.channel.nsfw ? "NSFW " : ""}Anime Avatar!*`)
      AnimeAvatarEmbedSuccess.setImage(url)
      Flandre.messageCreate(AnimeAvatarEmbedSuccess, msg);
  } else if(command === 'membercount') {
      Flandre.logging(msg);
      const MemberCountEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`MemberCount Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            Guild = FlandreClient.guilds.cache.get(args[0]) || msg.guild,
		    Members = Guild.members.cache;
      
			MemberCountEmbedSuccess.setTitle(`${FlandreHi} | *${Guild.name} MemberCount!*`)
      MemberCountEmbedSuccess.setThumbnail(Guild.iconURL({ dynamic: true }))
      MemberCountEmbedSuccess.addField(`Humans`, `\`${Members.filter(member => !member.user.bot).size}\``)
      MemberCountEmbedSuccess.addField(`Bots`, `\`${Members.filter(member => member.user.bot).size}\``)
      MemberCountEmbedSuccess.addField(`All Members`, `\`${Guild.memberCount}\``)
      MemberCountEmbedSuccess.addField(`Online`, `\`${Members.filter(member => member.presence.status === 'online').size}\``)
      MemberCountEmbedSuccess.addField(`Idle`, `\`${Members.filter(member => member.presence.status === 'idle').size}\``)
      MemberCountEmbedSuccess.addField(`Do not Disturb`, `\`${Members.filter(member => member.presence.status === 'dnd').size}\``)
      MemberCountEmbedSuccess.addField(`Offline`, `\`${Members.filter(member => member.presence.status === 'offline').size}\``)
      Flandre.messageCreate(MemberCountEmbedSuccess, msg);
  } else if(command === 'marry') {
      Flandre.logging(msg);
      const MarryEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Marry Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            MarryEmbedError = new Flandre.flandreEmbedError().setFooter(`Marry Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
      
      let MarryDB = Database.get(`marrieduserdata_${msg.author.id}`)
              MarryEmbedError.setTitle(`${FlandreUgh} | *You already have a spouse! Please divorce First!*`)
  if(MarryDB === true) return Flandre.messageCreate(MarryEmbedError, msg);
  
  let OnGoingDB = Database.get(`ongoingproposal_${msg.author.id}`)
  MarryEmbedError.setTitle(`${FlandreUgh} | *Please wait you still have on going proposal!*`)
  if(OnGoingDB === true) return Flandre.messageCreate(MarryEmbedError, msg);
  
let spouse = msg.mentions.members.first() || FlandreClient.users.cache.get(args[0]);
MarryEmbedError.setTitle(`${FlandreUgh} | *Mention a user You love!*`)
if(!spouse) return Flandre.messageCreate(MarryEmbedError, msg);
MarryEmbedError.setTitle(`${FlandreUgh} | *Sorry! but You cannot Marry a bot!*`)
if(spouse.user.bot === true) return Flandre.messageCreate(MarryEmbedError, msg);
MarryEmbedError.setTitle(`${FlandreUgh} | *You cannot marry yourself!*`)
if(spouse.id === msg.author.id) return Flandre.messageCreate(MarryEmbedError, msg);
let marrieddb = Database.get(`marrieduserdata_${spouse.id}`)
MarryEmbedError.setTitle(`${FlandreUgh} | *${spouse.user.username} is Already Married!*`)
if(marrieddb === true) return Flandre.messageCreate(MarryEmbedError, msg);
MarryEmbedSuccess.setTitle(`${FlandreHi} | *Please wait for ${spouse.user.username} to Accept your Proposal! **${spouse.user.username}** Please type yes or no*`)
 Flandre.messageCreate(MarryEmbedSuccess, msg);
Database.set(`ongoingproposal_${msg.author.id}`, true)

let filter = m => m.author.id === spouse.id;
        try {
            let msge = await msg.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
            let word = 'yes'
            let decline = 'no'
           if(msge.first().content.toLowerCase() === word) {
            Database.set(`marrieduserdata_${msg.author.id}`, true)
            Database.set(`marrieduserdata_${spouse.id}`, true)
            Database.set(`spousesuserdata_${spouse.id}_${msg.author.id}`, 1)
   MarryEmbedSuccess.setTitle(`${FlandreHi} | *Congrats! ${spouse.user.username} and ${msg.author.username} Are now Married!*`)
   Database.set(`ongoingproposal_${msg.author.id}`, false)
   Flandre.messageCreate(MarryEmbedSuccess, msg);
           } else if(msge.first().content.toLowerCase() === decline) {
               MarryEmbedError.setTitle(`${FlandreLaugh} | *${spouse.user.username} Declined Your Proposal!*`)
  Flandre.messageCreate(MarryEmbedError, msg);
  Database.set(`ongoingproposal_${msg.author.id}`, false)
} else {
 MarryEmbedError.setTitle(`${FlandreLaugh} | *Incorrect Answer Try Again!*`)
    Flandre.messageCreate(MarryEmbedError, msg);
  Database.set(`ongoingproposal_${msg.author.id}`, false)
}
        }
        catch(ex) {
             MarryEmbedError.setTitle(`${FlandreLaugh} | *Sorry it seems ${spouse.user.username} Did'nt Answered!*`)
            Flandre.messageCreate(MarryEmbedError, msg);
                        Database.set(`ongoingproposal_${msg.author.id}`, false)
        }
  } else if(command === 'divorce') {
      Flandre.logging(msg);
      const DivorceEmbedError = new Flandre.flandreEmbedError().setFooter(`Divorce Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            DivorceEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Divorce Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));

      let marrydb = Database.get(`marrieduserdata_${msg.author.id}`)
      DivorceEmbedError.setTitle(`${FlandreUhhh} | *You don't even have a Spouse! Please marry first!*`)
  if(marrydb === false) return Flandre.messageCreate(DivorceEmbedError, msg);
  
  let user = msg.mentions.members.first() || FlandreClient.users.cache.get(args[0]);
            DivorceEmbedError.setTitle(`${FlandreUhhh} | *Please mention the user you wanna divorce!*`)
  if(!user) return Flandre.messageCreate(DivorceEmbedError, msg);
              DivorceEmbedError.setTitle(`${FlandreUhhh} | *You can't divorce a bot!*`)
 if(user.user.bot === true) return Flandre.messageCreate(DivorceEmbedError, msg);
              DivorceEmbedError.setTitle(`${FlandreUhhh} | *You can't divorce yourself!*`)
if(user.id === msg.author.id) return Flandre.messageCreate(DivorceEmbedError, msg);

let reason = args.slice(1).join(" ");
if(!reason) {
  reason = 'Unspecified Reason!'
}

 let marrydb2 = Database.get(`marrieduserdata_${user.id}`)
               DivorceEmbedError.setTitle(`${FlandreUhhh} | *This user is not even married!*`)
  if(marrydb2 === false) return Flandre.messageCreate(DivorceEmbedError, msg);
  
  let userdb = Database.get(`spousesuserdata_${user.id}_${msg.author.id}`)
  if(userdb === null) {
                     DivorceEmbedError.setTitle(`${FlandreUhhh} | *You're not spouse of ${user.user.username}! or The one who proposed to you should divorce not by you! Ask ${user.user.username} to divorce!*`)
return Flandre.messageCreate(DivorceEmbedError, msg);
  } else {
    Database.set(`marrieduserdata_${msg.author.id}`, false)
    Database.set(`marrieduserdata_${user.id}`, false)
    Database.delete(`spousesuserdata_${user.id}_${msg.author.id}`)
DivorceEmbedError.setTitle(`${FlandreUhhh} | *${msg.author.username} Decided to divorce you! Reason: ${reason}.*`)
user.send(DivorceEmbedError);
      DivorceEmbedSuccess.setTitle(`${FlandreHi} | *You and ${user.user.username} Are not spouse now!*`)
Flandre.messageCreate(DivorceEmbedSuccess, msg);
  }
  } else if(command === 'ev') {
      Flandre.logging(msg);
      const EvalEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter('Eval Mwaster :3', FlandreClient.user.displayAvatarURL({ dynamic: true })),
            EvalEmbedError = new Flandre.flandreEmbedError().setFooter('Eval Mwaster :3', FlandreClient.user.displayAvatarURL({ dynamic: true }));
      
      function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        if (!Developer.includes(msg.author.id)) return;

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            msg.react("✅");
                EvalEmbedSuccess.setTitle('Result')
                EvalEmbedSuccess.setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
            Flandre.messageCreate(EvalEmbedSuccess, msg);
        } catch (err) {
            msg.react("⚠");
                EvalEmbedError.setTitle('Result')
                EvalEmbedError.setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
            Flandre.messageCreate(EvalEmbedError, msg);
        }
  } else if(command === 'setchatchannel') {
      Flandre.logging(msg);
      const ChatEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Chat Bot Flandre! Powered by smartestchatbot~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            ChatEmbedError = new Flandre.flandreEmbedError().setFooter(`Chat Bot Flandre! Powered by smartestchatbot~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
              if(!msg.member.hasPermission(Flandre.manage_guild)) {
                             ChatEmbedError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_guild} Permission to use this command!*`)
                  Flandre.messageCreate(ChatEmbedError, msg);
              } else {
      let Toggle = ['enable', 'disable'],
          ToggleArgs = args[0],
          ChannelDB = Database.get(`ChatChannel_${msg.guild.id}`),
          ChannelStatusDB = Database.get(`ChatChannelStatus_${msg.guild.id}`);
      ChatEmbedError.setTitle(`${FlandreUgh} | *Please specify if \`enable <#Channel>\` or \`disable\`!*`)
      if(!Toggle.includes(ToggleArgs)) {
          return Flandre.messageCreate(ChatEmbedError, msg);
      } else if(ToggleArgs.toLowerCase() === 'enable') {
      let Channel = msg.mentions.channels.first()
      ChatEmbedError.setTitle(`${FlandreUgh} | *Please mention a channel!*`)
      if(!Channel) return Flandre.messageCreate(ChatEmbedError, msg);
      ChatEmbedError.setTitle(`${FlandreUgh} | *You can't specify the same Channel!*`)
      if(Channel === ChannelDB) return Flandre.messageCreate(ChatEmbedError, msg);
       
      Database.set(`ChatChannel_${msg.guild.id}`, Channel.id)
      Database.set(`ChatChannelStatus_${msg.guild.id}`, true)
      ChatEmbedSuccess.setTitle(`${FlandreHi} | *Successfully Setted the Chat Channel to ${Channel}!*`)
          Flandre.messageCreate(ChatEmbedSuccess, msg);
      } else if(ToggleArgs.toLowerCase() === 'disable') {
          switch(ChannelStatusDB) {
              case null:
                  ChatEmbedError.setTitle(`${FlandreUgh} | *Chat Channel is already disabled!*`)
                  Flandre.messageCreate(ChatEmbedError, msg);
                  return;
                  break;
              case true:
                  Database.delete(`ChatChannel_${msg.guild.id}`)
                  Database.delete(`ChatChannelStatus_${msg.guild.id}`)
             ChatEmbedSuccess.setTitle(`${FlandreHi} | *Successfully Disabled the chat channel!*`)
                  Flandre.messageCreate(ChatEmbedSuccess, msg);
                  return;
                  break;
          }
      }
  }
  } else if(command === 'emojis') {
      Flandre.logging(msg);
      const EmojisEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Emojis Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
      
    let Emojis = '',
	    EmojisAnimated = '',
	    EmojiCount = 0,
	    Animated = 0,
	    OverallEmojis = 0;
	function Emoji(id) {
		return FlandreClient.emojis.cache.get(id).toString();
	}
	msg.guild.emojis.cache.forEach(emoji => {
		OverallEmojis++;
		if (emoji.animated) {
			Animated++;
			EmojisAnimated += Emoji(emoji.id);
		} else {
			EmojiCount++;
			Emojis += Emoji(emoji.id);
		}
	});
		EmojisEmbedSuccess.setTitle(`${FlandreHi} | *Emojis in ${msg.guild.name}!*`)
		EmojisEmbedSuccess.setThumbnail(msg.guild.iconURL({ dynamic: true }))
        if(OverallEmojis > 30) {
            		EmojisEmbedSuccess.setDescription(`Animated - \`${Animated}\`\nStandard - \`${EmojiCount}\`\nAll Emojis\n\`${OverallEmojis}\``)
         Flandre.messageCreate(EmojisEmbedSuccess, msg);
        } else {
		EmojisEmbedSuccess.setDescription(`Animated - \`${Animated}\`\n${EmojisAnimated}\nStandard - \`${EmojiCount}\`\n${Emojis}\nAll Emojis\n\`${OverallEmojis}\``)
    Flandre.messageCreate(EmojisEmbedSuccess, msg);
        }
  } else if(command === 'info') { 
      Flandre.logging(msg);
   const InfoEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Info Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
  InfoEmbedSuccess.setTitle(`${FlandreHi} | *${FlandreClient.user.username} Info!*`)
  InfoEmbedSuccess.setThumbnail(FlandreClient.user.displayAvatarURL({ dynamic: true }))
  InfoEmbedSuccess.addField(`Username`, `\`${FlandreClient.user.username}\``)
  InfoEmbedSuccess.addField(`Discriminator`, `\`${FlandreClient.user.discriminator}\``)
  InfoEmbedSuccess.addField(`Developer`, `\`${FlandreClient.users.cache.get(Developer).tag}\``)
  InfoEmbedSuccess.addField(`Bot Created`, `\`${Moment.utc(FlandreClient.user.createdAt).format("DD/MM/YYYY - HH:mm:ss")}\``)
  InfoEmbedSuccess.addField(`Bot Servers`, `\`${FlandreClient.guilds.cache.size}\``)
  InfoEmbedSuccess.addField(`Bot Users`, `\`${FlandreClient.users.cache.size}\``)
  Flandre.messageCreate(InfoEmbedSuccess, msg);
  } else if(command === 'roleinfo') {
      Flandre.logging(msg);
      const Role = msg.mentions.roles.first(),
            RoleInfoEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`RoleInfo Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            RoleInfoEmbedError = new Flandre.flandreEmbedError().setFooter(`RoleInfo Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
        RoleInfoEmbedError.setTitle(`${FlandreUgh} | *Please specify a role!*`)
		if(!Role)  return Flandre.messageCreate(RoleInfoEmbedError, msg);
		
		let permissions;
		if(Role.permissions.toArray().length !== 0) {
			permissions = Role.permissions.toArray().map(x => x.split('_').map(y => y[0] + y.slice(1).toLowerCase()).join(' ')).join(', ');
		}
		else {
			permissions = 'No Permissions!';
		}
      
		RoleInfoEmbedSuccess.setTitle(`${FlandreLaugh} | *${Role.name} Info!*`)
		RoleInfoEmbedSuccess.addField(`Role name`, `\`${Role.name}\``)
		RoleInfoEmbedSuccess.addField(`Role ID`, `\`${Role.id}\``)
		RoleInfoEmbedSuccess.addField(`Role Color`, `\`${Role.hexColor.toUpperCase()}\``)
	    RoleInfoEmbedSuccess.addField(`Role Members`, `\`${Role.members.size}\``)
		RoleInfoEmbedSuccess.addField(`High Role`, `\`${Role.hoist ? 'Yes' : 'No'}\``)
		RoleInfoEmbedSuccess.addField(`Role Mentionable`, `\`${Role.mentionable ? 'Yes' : 'No'}\``)
		RoleInfoEmbedSuccess.addField(`Role Created`, `\`${Moment(Role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - Role.createdTimestamp) / 86400000)} days ago}\``)
		RoleInfoEmbedSuccess.addField(`Role Permissions`, `\`${permissions}\``)
      Flandre.messageCreate(RoleInfoEmbedSuccess, msg);
  } else if(command === 'neko') {
      Flandre.logging(msg);
      const NekoEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Nekos Flandre! Powered by sfw HMfull~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
      let Res = HMfull.HMtai.sfw.neko()
      NekoEmbedSuccess.setTitle(`${FlandreLaugh} | *Nekos~*`)
      NekoEmbedSuccess.setImage(Res.url)
      Flandre.messageCreate(NekoEmbedSuccess, msg);
  } else if(command === 'raquote') {
      Flandre.logging(msg);
      const RaquotesEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Random Anime Quotes Flandre! Powered by anime-quotes-api~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
(async function() { //$using this kind of function comforts me C:
let Quote = new AnimeQuotesApi(),
   Get_quotes = await Quote.quotes();
    RaquotesEmbedSuccess.setTitle(`${FlandreHi} | *${Get_quotes[0].title}*`)
    RaquotesEmbedSuccess.setDescription(`${Get_quotes[0].quote}`)
    RaquotesEmbedSuccess.setImage(Get_quotes[0].image)
    Flandre.messageCreate(RaquotesEmbedSuccess, msg);
})();
  } else if(command === 'animebg') {
      Flandre.logging(msg);
      const AnimeBgEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Anime Wallpapers Flandre! Powered by sfw HMfull~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
      let Res = HMfull.HMtai.sfw.wallpaper();
      AnimeBgEmbedSuccess.setTitle(`${FlandreHi} | *Anime Wallpaper!*`)
      AnimeBgEmbedSuccess.setImage(Res.url)
      Flandre.messageCreate(AnimeBgEmbedSuccess, msg);
  } else if(command === 'animemobilebg') {
      Flandre.logging(msg);
      const AnimeMobileBgEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Anime Mobile Wallpapers Flandre! Powered by sfw HMfull~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
      let Res = HMfull.HMtai.sfw.mobileWallpaper();
      AnimeMobileBgEmbedSuccess.setTitle(`${FlandreHi} | *Anime Mobile Wallpaper!*`)
      AnimeMobileBgEmbedSuccess.setImage(Res.url)
      Flandre.messageCreate(AnimeMobileBgEmbedSuccess, msg);       
} else if(command === 'autoping') {
      Flandre.logging(msg);
      const AutoPingEmbedError = new Flandre.flandreEmbedError().setFooter(`AutoPing Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            AutoPingEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`AutoPing Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
        if(!msg.member.hasPermission(Flandre.manage_guild)) {
           AutoPingEmbedError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_guild} Permission to use this command!*`)
           Flandre.messageCreate(AutoPingEmbedError, msg);
        } else {
            let Toggle = ['enable', 'disable'],
                ToggleArgs = args[0];
            if(!Toggle.includes(ToggleArgs)) {
                AutoPingEmbedError.setTitle(`${FlandreHi} | *Please Specify if \`enable <#Channel>\` or \`disable\`*`)
                Flandre.messageCreate(AutoPingEmbedError, msg);
            } else if(ToggleArgs.toLowerCase() === 'enable') {
                let Channel = msg.mentions.channels.first();
                        AutoPingEmbedError.setTitle(`${FlandreHi} | *Please mention a ChanneL!*`)
                if(!Channel) return Flandre.messageCreate(AutoPingEmbedError, msg);
                Database.set(`AutoPingChannel_${msg.guild.id}`, Channel.id)
                Database.set(`AutoPingStatus_${msg.guild.id}`, true)
                AutoPingEmbedSuccess.setTitle(`${FlandreHi} | *Successfully setted Auto ping to ${Channel}!*`)
                Flandre.messageCreate(AutoPingEmbedSuccess, msg);
            } else if(ToggleArgs.toLowerCase() === 'disable') {
                let AutoPingStatus = Database.get(`AutoPingStatus_${msg.guild.id}`)
                switch(AutoPingStatus) {
                    case null:
                        AutoPingEmbedError.setTitle(`${FlandreUgh} | *Auto Ping is already disabled!*`)
                        Flandre.messageCreate(AutoPingEmbedError, msg);
                       return;
                        break;
                    case true:
                        Database.delete(`AutoPingStatus_${msg.guild.id}`)
                        AutoPingEmbedSuccess.setTitle(`${FlandreLaugh} | *Successfully Disabled Auto Ping!*`)
                        Flandre.messageCreate(AutoPingEmbedSuccess, msg);
                        return;
                        break;
                }
            }
        }
  } else if(command === 'weather') {
      Flandre.logging(msg);
      const WeatherEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Weather Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            WeatherEmbedError = new Flandre.flandreEmbedError().setFooter(`Weather Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
    if(!args.length) {
        WeatherEmbedError.setTitle(`${FlandreUgh} | *Please specify a location!*`)
       return Flandre.messageCreate(WeatherEmbedError, msg);
    }
 Weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
try {
WeatherEmbedSuccess.setTitle(`${FlandreHi} | *Weather - ${result[0].location.name}*`)
WeatherEmbedSuccess.setDescription(`Temperature units can may be differ some time!`)
WeatherEmbedSuccess.addField(`Temperature`, `\`${result[0].current.temperature} Celcius\``)
WeatherEmbedSuccess.addField(`Sky Text`, `\`${result[0].current.skytext}\``)
WeatherEmbedSuccess.addField(`Humidity`, `\`${result[0].current.humidity}\``)
WeatherEmbedSuccess.addField(`Wind Speed`, `\`${result[0].current.windspeed}\``)
WeatherEmbedSuccess.addField(`Observation Time`, `\`${result[0].current.observationtime}\``)
WeatherEmbedSuccess.addField(`Wind Display`, `\`${result[0].current.winddisplay}\``)
return Flandre.messageCreate(WeatherEmbedSuccess, msg);
} catch(err) {
    WeatherEmbedError.setTitle(`${FlandreUgh} | *Sorry! but i'm unable to get the data of the given location!*`)
   return Flandre.messageCreate(WeatherEmbedError, msg);
}
});  
 } else if(command === 'punch') {
     Flandre.logging(msg);
     const PunchEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Punch Flandre! Powered by Neko-Love~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Punchu = `*${msg.author.username} Punches itself!*`;
    FlandreNekoClient.punch().then((url) => {
        PunchEmbed.setTitle(`${FlandreHi} | ${Punchu}`)
        PunchEmbed.setImage(url);
        Flandre.messageCreate(PunchEmbed, msg);
    });
        } else {
          let Punchu = `*${msg.author.username} Punches ${User.username}!*`;
         FlandreNekoClient.punch().then((url) => {
          PunchEmbed.setTitle(`${FlandreHi} | ${Punchu}`)
          PunchEmbed.setImage(url)
          Flandre.messageCreate(PunchEmbed, msg);
         });
  }
 } else if(command === 'nekogif') {
     Flandre.logging(msg);
    const NekoGifEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Neko Gif Flandre! Powered by @freezegold/anime.js~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     FlandreFreezeAnimeClient.sfw('nekoGif').then(Res => {
         NekoGifEmbedSuccess.setTitle(`${FlandreHi} | *Nekos Gif!*`)
         NekoGifEmbedSuccess.setImage(Res.url)
         Flandre.messageCreate(NekoGifEmbedSuccess, msg);
      })
 } else if(command === 'racharacter') {
     Flandre.logging(msg);
     const RacharacterEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Random Anime Character Flandre! Powered by anime-quote-api~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
(async function() {
   let Character = new AnimeQuotesApi(),
    Get_Character = await Character.quotes(),
    Str = Get_Character[0].title.search(' Quote'),
    CharacterName = Get_Character[0].title.slice(0, Str);
    RacharacterEmbedSuccess.setTitle(`${FlandreHi} | *${CharacterName}*`)
    RacharacterEmbedSuccess.setImage(Get_Character[0].image)
    Flandre.messageCreate(RacharacterEmbedSuccess, msg);
 })();
 } else if(command === 'rafact') {
     Flandre.logging(msg);
     const RafactsEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Random Anime Facts Flandre! Powered by anime-facts~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     (async function() {
    const Fact = AnimeFacts.facts()
    RafactsEmbedSuccess.setTitle(`${FlandreHi} | *Facts!*`)
    RafactsEmbedSuccess.setDescription(`${Fact.slice(0, 1000)}`)
    Flandre.messageCreate(RafactsEmbedSuccess, msg);
     })();    
 } else if(command === 'ranime') {
     Flandre.logging(msg);
     const RanimeEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Random Anime Flandre! Powered by RandomAnime~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     let Ranime = RandomAnime.anime();
     RanimeEmbedSuccess.setTitle(`${FlandreHi} | *Anime!*`)
     RanimeEmbedSuccess.setImage(Ranime)
     Flandre.messageCreate(RanimeEmbedSuccess, msg);
 } else if(command === 'nervous') {
     Flandre.logging(msg);
     const NervousEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Nervous Flandre! Powered by rukanpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Nervousu = `*${msg.author.username} is Nervous!*`,
              NervousRuka = Ruka.nervous();
          NervousEmbed.setTitle(`${FlandreHi} | ${Nervousu}`)
          NervousEmbed.setImage(NervousRuka)
          Flandre.messageCreate(NervousEmbed, msg);
        } else {
          let Nervousu = `*${msg.author.username} is nervous to ${User.username}!*`,
              NervousRuka = Ruka.nervous();
             NervousEmbed.setTitle(`${FlandreLaugh} | ${Nervousu}`)
             NervousEmbed.setImage(NervousRuka)
             Flandre.messageCreate(NervousEmbed, msg);
        }
 } else if(command === 'happy') {
     Flandre.logging(msg);
    const HappyEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Happy Flandre! Powered by rukanpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Happu = `*${msg.author.username} is Happy!*`,
              HappyRuka = Ruka.happy();
    HappyEmbed.setTitle(`${FlandreHi} | ${Happu}`)
    HappyEmbed.setImage(HappyRuka)
    Flandre.messageCreate(HappyEmbed, msg);
        } else {
          let Happu = `*${msg.author.username} and ${User.username} are Happy!*`,
              HappyRuka = Ruka.happy();
    HappyEmbed.setTitle(`${FlandreHi} | ${Happu}`)
    HappyEmbed.setImage(HappyRuka)
    Flandre.messageCreate(HappyEmbed, msg);
  }
 } else if(command === 'dance') {
     Flandre.logging(msg);
     const DanceEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Dance Flandre! Powered by rukanpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Dancu = `*${msg.author.username} Dances!*`,
              DanceRuka = Ruka.dance();
    DanceEmbed.setTitle(`${FlandreHi} | ${Dancu}`)
    DanceEmbed.setImage(DanceRuka)
    Flandre.messageCreate(DanceEmbed, msg);
        } else {
          let Dancu = `*${msg.author.username} and ${User.username} Dances Together!*`,
              DanceRuka = Ruka.dance();
    DanceEmbed.setTitle(`${FlandreHi} | ${Dancu}`)
    DanceEmbed.setImage(DanceRuka)
    Flandre.messageCreate(DanceEmbed, msg);
  }
 } else if(command === 'run') {
     Flandre.logging(msg);
     const RunEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Run Flandre! Powered by rukanpm~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Runu = `*${msg.author.username} Runs!*`,
              RunRuka = Ruka.run();
    RunEmbed.setTitle(`${FlandreHi} | ${Runu}`)
    RunEmbed.setImage(RunRuka)
    Flandre.messageCreate(RunEmbed, msg);
        } else {
          let Runu = `*${msg.author.username} runs at ${User.username}!*`,
              RunRuka = Ruka.run();
    RunEmbed.setTitle(`${FlandreHi} | ${Runu}`)
    RunEmbed.setImage(RunRuka)
    Flandre.messageCreate(RunEmbed, msg);
  }
 } else if(command === 'pout') {
     Flandre.logging(msg);
    const PoutEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Pout Flandre! Powered by Donutapi~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Poutu = `*${msg.author.username} pouts!*`,
              PoutDonut = await DonutApi.pout();
    PoutEmbed.setTitle(`${FlandreHi} | ${Poutu}`)
    PoutEmbed.setImage(PoutDonut)
    Flandre.messageCreate(PoutEmbed, msg);
        } else {
          let Poutu = `*${msg.author.username} pouts at ${User.username}!*`,
              PoutDonut = await DonutApi.pout();
    PoutEmbed.setTitle(`${FlandreHi} | ${Poutu}`)
    PoutEmbed.setImage(PoutDonut)
    Flandre.messageCreate(PoutEmbed, msg);
  }
 } else if(command === 'bully') {
     Flandre.logging(msg);
     const BullyEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Bully Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Bullyu = `*${msg.author.username} bullies itself?!*`;
        Superagent
  .get("https://waifu.pics/api/sfw/bully")
    .end((err, response) => {
    BullyEmbed.setTitle(`${FlandreHi} | ${Bullyu}`)
    BullyEmbed.setImage(response.body.url)
    Flandre.messageCreate(BullyEmbed, msg);
    })
        } else {
          let Bullyu = `*${msg.author.username} bullies ${User.username}!*`;
        Superagent
     .get("https://waifu.pics/api/sfw/bully")
    .end((err, response) => {
    BullyEmbed.setTitle(`${FlandreHi} | ${Bullyu}`)
    BullyEmbed.setImage(response.body.url)
    Flandre.messageCreate(BullyEmbed, msg);
   })
  }
 } else if(command === 'cringe') {
     Flandre.logging(msg);
    const CringeEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Cringe Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Cringu = `*${msg.author.username} is Cringed!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/cringe")
    .end((err, response) => {
    CringeEmbed.setTitle(`${FlandreHi} | ${Cringu}`)
    CringeEmbed.setImage(response.body.url)
    Flandre.messageCreate(CringeEmbed, msg);
    })
        } else {
          let Cringu = `*${msg.author.username} is cringed at ${User.username}!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/cringe")
    .end((err, response) => {
    CringeEmbed.setTitle(`${FlandreHi} | ${Cringu}`)
    CringeEmbed.setImage(response.body.url)
    Flandre.messageCreate(CringeEmbed, msg);
    })
        }
 } else if(command === 'glomp') {
     Flandre.logging(msg);
        const GlompEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Glomp Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Glompu = `*${msg.author.username} Glomps itself?!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/glomp")
    .end((err, response) => {
    GlompEmbed.setTitle(`${FlandreHi} | ${Glompu}`)
    GlompEmbed.setImage(response.body.url)
    Flandre.messageCreate(GlompEmbed, msg);
    })
        } else {
          let Glompu = `*${msg.author.username} Glomps at ${User.username}!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/glomp")
    .end((err, response) => {
    GlompEmbed.setTitle(`${FlandreHi} | ${Glompu}`)
    GlompEmbed.setImage(response.body.url)
    Flandre.messageCreate(GlompEmbed, msg);
    })
        }
 } else if(command === 'highfive') {
     Flandre.logging(msg);
    const HighfiveEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Highfive Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Highfivu = `*${msg.author.username} Highfives itself?!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/highfive")
    .end((err, response) => {
    HighfiveEmbed.setTitle(`${FlandreHi} | ${Highfivu}`)
    HighfiveEmbed.setImage(response.body.url)
    Flandre.messageCreate(HighfiveEmbed, msg);
    })
        } else {
          let Highfivu = `*${msg.author.username} Highfives at ${User.username}!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/highfive")
    .end((err, response) => {
    HighfiveEmbed.setTitle(`${FlandreHi} | ${Highfivu}`)
    HighfiveEmbed.setImage(response.body.url)
    Flandre.messageCreate(HighfiveEmbed, msg);
    })
        }
 } else if(command === 'bonk') {
     Flandre.logging(msg);
     const BonkEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Bonk Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Bonku = `*${msg.author.username} bonks itself?!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/bonk")
    .end((err, response) => {
    BonkEmbed.setTitle(`${FlandreHi} | ${Bonku}`)
    BonkEmbed.setImage(response.body.url)
    Flandre.messageCreate(BonkEmbed, msg);
    })
        } else {
          let Bonku = `*${msg.author.username} bonks ${User.username}!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/bonk")
    .end((err, response) => {
    BonkEmbed.setTitle(`${FlandreHi} | ${Bonku}`)
    BonkEmbed.setImage(response.body.url)
    Flandre.messageCreate(BonkEmbed, msg);
    })
        }
 } else if(command === 'smile') {
     Flandre.logging(msg);
    const SmileEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Smile Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Smilu = `*${msg.author.username} smiles itself?!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/smile")
    .end((err, response) => {
    SmileEmbed.setTitle(`${FlandreHi} | ${Smilu}`)
    SmileEmbed.setImage(response.body.url)
    Flandre.messageCreate(SmileEmbed, msg);
    })
        } else {
          let Smilu = `*${msg.author.username} Smiles at ${User.username}!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/smile")
    .end((err, response) => {
    SmileEmbed.setTitle(`${FlandreHi} | ${Smilu}`)
    SmileEmbed.setImage(response.body.url)
    Flandre.messageCreate(SmileEmbed, msg);
    })
        }
 } else if(command === 'handhold') {
     Flandre.logging(msg);
   const HandHoldEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Hand Hold Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Handholdu = `*${msg.author.username} hand holds itself?!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/handhold")
    .end((err, response) => {
    HandHoldEmbed.setTitle(`${FlandreHi} | ${Handholdu}`)
    HandHoldEmbed.setImage(response.body.url)
    Flandre.messageCreate(HandHoldEmbed, msg);
    })
        } else {
          let Handholdu = `*${msg.author.username} hand holds with ${User.username}!*`;
          Superagent
  .get("https://waifu.pics/api/sfw/handhold")
    .end((err, response) => {
    HandHoldEmbed.setTitle(`${FlandreHi} | ${Handholdu}`)
    HandHoldEmbed.setImage(response.body.url)
    Flandre.messageCreate(HandHoldEmbed, msg);
    })
        }
 } else if(command === 'wave') {
     Flandre.logging(msg);
     const WaveEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Wave Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Wavu = `*${msg.author.username} waves at itself?!*`;
        Superagent
  .get("https://waifu.pics/api/sfw/wave")
    .end((err, response) => {
    WaveEmbed.setTitle(`${FlandreHi} | ${Wavu}`)
    WaveEmbed.setImage(response.body.url)
    Flandre.messageCreate(WaveEmbed, msg);
    })
        } else {
          let Wavu = `*${msg.author.username} waves at ${User.username}!*`;
        Superagent
     .get("https://waifu.pics/api/sfw/wave")
    .end((err, response) => {
    WaveEmbed.setTitle(`${FlandreHi} | ${Wavu}`)
    WaveEmbed.setImage(response.body.url)
    Flandre.messageCreate(WaveEmbed, msg);
   })
  }
 } else if(command === 'nom') {
     Flandre.logging(msg);
     const NomEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Nom Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Nomu = `*${msg.author.username} noms itself?!*`;
        Superagent
  .get("https://waifu.pics/api/sfw/nom")
    .end((err, response) => {
    NomEmbed.setTitle(`${FlandreHi} | ${Nomu}`)
    NomEmbed.setImage(response.body.url)
    Flandre.messageCreate(NomEmbed, msg);
    })
        } else {
          let Nomu = `*${msg.author.username} noms ${User.username}!*`;
        Superagent
     .get("https://waifu.pics/api/sfw/nom")
    .end((err, response) => {
    NomEmbed.setTitle(`${FlandreHi} | ${Nomu}`)
    NomEmbed.setImage(response.body.url)
    Flandre.messageCreate(NomEmbed, msg);
   })
  }
 } else if(command === 'bite') {
     Flandre.logging(msg);
     const BiteEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Bite Flandre! Powered by Waifu.pics~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Bitu = `*${msg.author.username} bites itself?!*`;
        Superagent
  .get("https://waifu.pics/api/sfw/bite")
    .end((err, response) => {
    BiteEmbed.setTitle(`${FlandreHi} | ${Bitu}`)
    BiteEmbed.setImage(response.body.url)
    Flandre.messageCreate(BiteEmbed, msg);
    })
        } else {
          let Bitu = `*${msg.author.username} bites ${User.username}!*`;
        Superagent
     .get("https://waifu.pics/api/sfw/bite")
    .end((err, response) => {
    BiteEmbed.setTitle(`${FlandreHi} | ${Bitu}`)
    BiteEmbed.setImage(response.body.url)
    Flandre.messageCreate(BiteEmbed, msg);
   })
  }
 } else if(command === 'achinfo') {
     Flandre.logging(msg);
     const AchinfoEmbedError = new Flandre.flandreEmbedError().setFooter(`Anime Character Info Flandre! Powered by anilist-node~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           AchinfoEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Anime Character Info Flandre! Powered by anilist-node~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     let ChName = args.join(" ");
     AchinfoEmbedError.setTitle(`${FlandreAngery} | *Please type a Anime Character Name!*`)
     if(!ChName) return Flandre.messageCreate(AchinfoEmbedError, msg);
     let Name = ChName.toLowerCase();
FlandreAnilistClient.people.character(Name).then(data => {
    try {
    AchinfoEmbedSuccess.setTitle(`${FlandreHi} | *${data.name.english} Info!*`)
    AchinfoEmbedSuccess.setDescription(data.description.slice(0, 2048))
    AchinfoEmbedSuccess.setImage(data.image.large)
    AchinfoEmbedSuccess.addField(`Favourites`, `\`${data.favourites}\``)
    AchinfoEmbedSuccess.addField(`Nicknames`, `\`${data.name.alternative}\``)
    AchinfoEmbedSuccess.addField(`Anime`, `\`${data.media[0].title.english}\``)
    Flandre.messageCreate(AchinfoEmbedSuccess, msg);
    } catch (Err) {
         AchinfoEmbedError.setTitle(`${FlandreUgh} | *Unable to get that character!*`)
        return Flandre.messageCreate(AchinfoEmbedError, msg);
    }
});
 } else if(command === 'afk') {
     Flandre.logging(msg);
     const AfkEmbedError = new Flandre.flandreEmbedError().setFooter(`Afk Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           AfkEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Afk Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     
     let Reason = args.join(" ");
     if(!Reason) Reason = 'Not Specified!'
        Database.set(`UserAfk_${msg.author.id}_${msg.guild.id}`, Reason)
        AfkEmbedSuccess.setTitle(`${FlandreHi} | *You have been set to Afk! Reason:${Reason.slice(0, 50)}*`)
     Flandre.messageCreate(AfkEmbedSuccess, msg);
 } else if(command === 'azurlane') {
     const AzurlaneEmbedError = new Flandre.flandreEmbedError().setFooter(`Azurlane Flandre! Powered by @azurapi/azurapi~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           AzurlaneEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Azurlane Flandre! Powered by @azurapi/azurapi~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));

       let Name = args.join(' ')
       AzurlaneEmbedError.setTitle(`${FlandreAngery} | *Please specify a Azurlane Ship name!*`)
       if(!Name) return Flandre.messageCreate(AzurlaneEmbedError, msg);
       let ActualName = Name.toLowerCase();
      try{
       let AzurlaneName = Azurlane.getShipByName(ActualName)       
       AzurlaneEmbedSuccess.setTitle(`${FlandreHi} | *${AzurlaneName.names.en}*`)
       AzurlaneEmbedSuccess.setURL(AzurlaneName.wikiUrl)
       AzurlaneEmbedSuccess.setThumbnail(AzurlaneName.thumbnail)
       AzurlaneEmbedSuccess.setImage(AzurlaneName.skins.image)
       AzurlaneEmbedSuccess.addField(`ID`, `\`${AzurlaneName.id}\``)
       AzurlaneEmbedSuccess.addField(`Code Name`, `\`${AzurlaneName.names.code}\``)
       AzurlaneEmbedSuccess.addField(`Japanese Name`, `\`${AzurlaneName.names.jp}\``)
       AzurlaneEmbedSuccess.addField(`Class`, `\`${AzurlaneName.class}\``)
       AzurlaneEmbedSuccess.addField(`Nationality`, `\`${AzurlaneName.nationality}\``)
       AzurlaneEmbedSuccess.addField(`Rarity`, `\`${AzurlaneName.rarity}\``)
       AzurlaneEmbedSuccess.addField(`Health Stats`, `\`${AzurlaneName.stats.baseStats.health}\``)
       AzurlaneEmbedSuccess.addField(`Armor Stats`, `\`${AzurlaneName.stats.baseStats.armor}\``)
       AzurlaneEmbedSuccess.addField(`Artist`, `\`${AzurlaneName.misc.artist.name}\``)
          Flandre.messageCreate(AzurlaneEmbedSuccess, msg);
      } catch(Err) {
          AzurlaneEmbedError.setTitle(`${FlandreUgh} | *Unable to find that Ship Name!*`)
          Flandre.messageCreate(AzurlaneEmbedError, msg);
      }
 } else if(command === 'addrole') {     
     Flandre.logging(msg);
     const AddRoleError = new Flandre.flandreEmbedError().setFooter(`Add Role Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           AddRoleSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Add Role Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
         if(!msg.member.hasPermission(Flandre.manage_roles)) {
                    AddRoleError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_roles} Permission to use this command!*`)
             Flandre.messageCreate(AddRoleError, msg);
         } else if(!msg.guild.me.hasPermission(Flandre.manage_roles)) {
                      AddRoleError.setTitle(`${FlandreUgh} | *Sorry! But i need ${Flandre.manage_roles} Permission to perform this command!*`)
             Flandre.messageCreate(AddRoleError, msg);
         } else {
        try {
             const Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]),
                   Role = msg.mentions.roles.first();
              AddRoleError.setTitle(`${FlandreAngery} | *Please specify a user!*`)
              if(!Member) return Flandre.messageCreate(AddRoleError, msg);
              AddRoleError.setTitle(`${FlandreUgh} | *Please mention a role!*`)
              if(!Role) return Flandre.messageCreate(AddRoleError, msg);
             const alreadyHasRole = Member._roles.includes(Role.id);
             AddRoleError.setTitle(`${FlandreAngery} | *That user already has the ${Role.name}!*`)
            if(alreadyHasRole) return Flandre.messageCreate(AddRoleError, msg);
                 AddRoleSuccess.setTitle(`${FlandreHi} | *Successfully added ${Role.name} to ${Member.user} by ${msg.author.tag}!*`)
            return Member.roles.add(Role).then(() => Flandre.messageCreate(AddRoleSuccess, msg));
        } catch (Error) {
            AddRoleError.setTitle(`${FlandreUgh} | *Please specify a valid role!*`)
            return Flandre.messageCreate(AddRoleError, msg);
        }
         }
 } else if(command === 'removerole') {
        Flandre.logging(msg);
     const RemoveRoleError = new Flandre.flandreEmbedError().setFooter(`Remove Role Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           RemoveRoleSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Remove Role Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
         if(!msg.member.hasPermission(Flandre.manage_roles)) {
                    RemoveRoleError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_roles} Permission to use this command!*`)
             Flandre.messageCreate(RemoveRoleError, msg);
         } else if(!msg.guild.me.hasPermission(Flandre.manage_roles)) {
                      RemoveRoleError.setTitle(`${FlandreUgh} | *Sorry! But i need ${Flandre.manage_roles} Permission to perform this command!*`)
             Flandre.messageCreate(RemoveRoleError, msg);
         } else {
        try {
             const Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]),
                   Role = msg.mentions.roles.first();
              RemoveRoleError.setTitle(`${FlandreAngery} | *Please specify a user!*`)
              if(!Member) return Flandre.messageCreate(RemoveRoleError, msg);
              RemoveRoleError.setTitle(`${FlandreUgh} | *Please mention a role!*`)
              if(!Role) return Flandre.messageCreate(RemoveRoleError, msg);
             const alreadyNoRole = Member._roles.includes(Role.id);
             RemoveRoleError.setTitle(`${FlandreAngery} | *That user already dont have the ${Role.name}!*`)
            if(!alreadyNoRole) return Flandre.messageCreate(RemoveRoleError, msg);
                 RemoveRoleSuccess.setTitle(`${FlandreHi} | *Successfully removed ${Role.name} from ${Member.user} by ${msg.author.tag}!*`)
            return Member.roles.remove(Role).then(() => Flandre.messageCreate(RemoveRoleSuccess, msg));
        } catch (Error) {
            RemoveRoleError.setTitle(`${FlandreUgh} | *Please specify a valid role!*`)
     return Flandre.messageCreate(RemoveRoleError, msg);
        }
         }
 } else if(command === 'think') {
     Flandre.logging(msg);
      const ThinkEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Think Flandre! Powered by Tnai~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Thinku = `*${msg.author.username} Thinks itself!*`,
              TnaiThink = await FlandreTnaiClient.sfw.think();
    ThinkEmbed.setTitle(`${FlandreHi} | ${Thinku}`)
    ThinkEmbed.setImage(TnaiThink)
    Flandre.messageCreate(ThinkEmbed, msg);
        } else {
          let Thinku = `*${msg.author.username} Thinks about ${User.username}!*`,
              TnaiThink = await FlandreTnaiClient.sfw.think();
    ThinkEmbed.setTitle(`${FlandreHi} | ${Thinku}`)
    ThinkEmbed.setImage(TnaiThink)
    Flandre.messageCreate(ThinkEmbed, msg);
  }
 } else if(command === 'confused') {
     Flandre.logging(msg);
      const ConfusedEmbed = new Flandre.flandreEmbedSuccess().setFooter(`Confused Flandre! Powered by Tnai~`, FlandreClient.user.displayAvatarURL({ dynamic: true }))
        let User = msg.mentions.users.first();
        if(!User) {
          let Confu = `*${msg.author.username} Confused about itself!*`,
              TnaiConfused = await FlandreTnaiClient.sfw.confused();
    ConfusedEmbed.setTitle(`${FlandreHi} | ${Confu}`)
    ConfusedEmbed.setImage(TnaiConfused)
    Flandre.messageCreate(ConfusedEmbed, msg);
        } else {
          let Confu = `*${msg.author.username} and ${User.username} is Confused!*`,
              TnaiConfused = await FlandreTnaiClient.sfw.confused();
    ConfusedEmbed.setTitle(`${FlandreHi} | ${Confu}`)
    ConfusedEmbed.setImage(TnaiConfused)
    Flandre.messageCreate(ConfusedEmbed, msg);
  }
 } else if(command === 'wolverine') {
     Flandre.logging(msg);
     const WolverineEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Wolverine Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
     WolverineEmbedSuccess.setTitle(`${FlandreHi} | *Wolverine ${Member.user.tag}!*`)
     WolverineEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/wolverine?user=${Member.user.displayAvatarURL({ format: "png" })}`))
     Flandre.messageCreate(WolverineEmbedSuccess, msg);
 } else if(command === 'speed') {
     Flandre.logging(msg);
     const SpeedEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Speed Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    SpeedEmbedSuccess.setTitle(`${FlandreHi} | *I am speed ${Member.user.tag}!*`)
    SpeedEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/iamspeed?user=${Member.user.displayAvatarURL({ format: "png" })}`))
    Flandre.messageCreate(SpeedEmbedSuccess, msg);
 } else if(command === 'stonks') {
     Flandre.logging(msg);
     const StonksEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Stonks Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    StonksEmbedSuccess.setTitle(`${FlandreHi} | *Stonks ${Member.user.tag}!*`)
    StonksEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/stonks?user=${Member.user.displayAvatarURL({ format: "png" })}`))
    Flandre.messageCreate(StonksEmbedSuccess, msg);
 } else if(command === 'icanmilkyou') {
     Flandre.logging(msg);
     const MilkEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Milk Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member1 = msg.member,
           Member2 = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    MilkEmbedSuccess.setTitle(`${FlandreHi} | *${Member1.user.tag} i can milk ${Member2.user.tag}!*`)
    MilkEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/icanmilkyou?user1=${Member1.user.displayAvatarURL({ format: 'png'})}&user2=${Member2.user.displayAvatarURL({ format: 'png'})}`))
    Flandre.messageCreate(MilkEmbedSuccess, msg);
 } else if(command === 'drip') {
     Flandre.logging(msg);
     const DripEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Drip Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    DripEmbedSuccess.setTitle(`${FlandreHi} | *Drip ${Member.user.tag}!*`)
    DripEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/drip?user=${Member.user.displayAvatarURL({ format: "png" })}`))
    Flandre.messageCreate(DripEmbedSuccess, msg);
 } else if(command === 'emergency') {
     Flandre.logging(msg);
     const EmergencyEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Emergency Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           EmergencyEmbedError = new Flandre.flandreEmbedError().setFooter(`Emergency Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
     
    let EmergencyText = args.join(' ')
    EmergencyEmbedError.setTitle(`${FlandreUgh} | *Please type any emergency text meeting!*`)
    if(!EmergencyText) return Flandre.messageCreate(EmergencyEmbedError, msg);
    EmergencyEmbedSuccess.setTitle(`${FlandreHi} | *Emergency ${Member.user.tag}!*`)
    EmergencyEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/emergencymeeting?text=${EmergencyText}`))
    Flandre.messageCreate(EmergencyEmbedSuccess, msg);
 } else if(command === 'ejected') {
    Flandre.logging(msg);
     const EjectedEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Ejected Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member,
           ImpostorColors = ['black', 'blue', 'brown', 'cyan', 'darkgreen', 'lime', 'orange', 'pink', 'purple', 'red', 'white', 'yellow'],
           Color = ImpostorColors[Math.floor(Math.random() * ImpostorColors.length)];
    EjectedEmbedSuccess.setTitle(`${FlandreHi} | *Ejected ${Member.user.tag}!*`)
    EjectedEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/ejected?name=${Member.user.username}&impostor=true&crewmate=${Color}`))
    Flandre.messageCreate(EjectedEmbedSuccess, msg); 
 } else if(command === 'water') {
   Flandre.logging(msg);
     const WaterEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Water Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           WaterEmbedError = new Flandre.flandreEmbedError().setFooter(`Water Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
         
     let WaterText = args.join(' ')
     WaterEmbedError.setTitle(`${FlandreUgh} | *Please type a text!*`)
     if(!WaterText) return Flandre.messageCreate(WaterEmbedError, msg);
    WaterEmbedSuccess.setTitle(`${FlandreHi} | *Water!*`)
    WaterEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/water?text=${WaterText}`))
    Flandre.messageCreate(WaterEmbedSuccess, msg);  
 } else if(command === 'carreverse') {
     Flandre.logging(msg);
     const CarreverseEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Car Reverse Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           CarreverseEmbedError = new Flandre.flandreEmbedError().setFooter(`Car Reverse Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
         
     let CarReverseText = args.join(' ')
     CarreverseEmbedError.setTitle(`${FlandreUgh} | *Please type a text!*`)
     if(!CarReverseText) return Flandre.messageCreate(CarreverseEmbedError, msg);
    CarreverseEmbedSuccess.setTitle(`${FlandreHi} | *Car Reverse!*`)
    CarreverseEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/carreverse?text=${CarReverseText}`))
    Flandre.messageCreate(CarreverseEmbedSuccess, msg);  
 } else if(command === 'firsttime') {
     Flandre.logging(msg);
     const FirstTimeEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`First Time Flandre! Powered by Vacefron~`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
           Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    FirstTimeEmbedSuccess.setTitle(`${FlandreHi} | *First time ${Member.user.tag}!*`)
    FirstTimeEmbedSuccess.setImage(encodeURI(`https://vacefron.nl/api/firsttime?user=${Member.user.displayAvatarURL({ format: "png" })}`))
    Flandre.messageCreate(FirstTimeEmbedSuccess, msg);
 } else if(command === 'customcmd') {
      Flandre.logging(msg);
            const CustomCmdEmbedError = new Flandre.flandreEmbedError().setFooter(`Custom Command Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
                  CustomCmdEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Custom Command Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
         if(!msg.member.hasPermission(Flandre.manage_messages)) {
                        CustomCmdEmbedError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_messages} Permission to use this command!*`)
             Flandre.messageCreate(CustomCmdEmbedError, msg);
         } else {
             let Toggle = ['add', 'remove', 'list'],
                 ToggleArgs = args[0];
             if(!Toggle.includes(ToggleArgs)) {
               CustomCmdEmbedError.setTitle(`${FlandreHi} | *Please Specify if \`add <Custom Command Name> <Custom Command Response>\`, \`remove <Command name>\` or \`list\`*`)
                 Flandre.messageCreate(CustomCmdEmbedError, msg);
             } else if(ToggleArgs.toLowerCase() === 'add') {
                 let CmdName = args[1];
        CustomCmdEmbedError.setTitle(`${FlandreAngery} | *Please Specify a Command name!*`)
        if(!CmdName) return Flandre.messageCreate(CustomCmdEmbedError, msg);
        let CmdResponse = args.slice(2).join(" ")
        CustomCmdEmbedError.setTitle(`${FlandreAngery} | *Please Specify Your Custom Command Response!*`)
        if(!CmdResponse) return Flandre.messageCreate(CustomCmdEmbedError, msg);
    let CmdDb = Database.get(`CustomCommands_${msg.guild.id}`)
    CustomCmdEmbedError.setTitle(`${FlandreAngery} | *This Command is already your Custom Command!*`)
    if(CmdDb && CmdDb.find(x => x.name === CmdName.toLowerCase())) return Flandre.messageCreate(CustomCmdEmbedError, msg);
    let data = {
      name: CmdName.toLowerCase(),
      response: CmdResponse
    }
    Database.push(`CustomCommands_${msg.guild.id}`, data)
    CustomCmdEmbedSuccess.setTitle(`${FlandreHi} | *Successfully added ${CmdName} to your Custom Commands in this Server!*`)
                 return Flandre.messageCreate(CustomCmdEmbedSuccess, msg);
             } else if(ToggleArgs.toLowerCase() === 'remove') {
    let CmdName = args[1];
    CustomCmdEmbedError.setTitle(`${FlandreUgh} | *Please specify some custom Commands in this server!*`)
    if(!CmdName) return  Flandre.messageCreate(CustomCmdEmbedError, msg);
    let CmdDatabase = Database.get(`CustomCommands_${msg.guild.id}`)
    if(CmdDatabase) {
      let CmdData = CmdDatabase.find(x => x.name === CmdName.toLowerCase())
      CustomCmdEmbedError.setTitle(`${FlandreAngery} | *Sorry it seems i'm unable to find that custom command!*`)
      if(!CmdData) return Flandre.messageCreate(CustomCmdEmbedError, msg);
      let value = CmdDatabase.indexOf(CmdData)
      delete CmdDatabase[value]
      var Filter = CmdDatabase.filter(x => {
        return x != null && x != ''
      })
      Database.set(`CustomCommands_${msg.guild.id}`, Filter)
      CustomCmdEmbedSuccess.setTitle(`${FlandreHi} | *Successfully Removed ${CmdName} in this Server!*`)
      return Flandre.messageCreate(CustomCmdEmbedSuccess, msg);
    } else {
      CustomCmdEmbedError.setTitle(`${FlandreAngery} | *Sorry it seems i'm unable to find that custom command!*`)
        return Flandre.messageCreate(CustomCmdEmbedError, msg);
    }
             } else if(ToggleArgs.toLowerCase() === 'list') { 
             let CustomCmdDb = await Database.get(`CustomCommands_${msg.guild.id}`) 
             CustomCmdEmbedError.setTitle(`${FlandreAngery} | *It seems custom commands for this server are Empty!`)
             if(!CustomCmdDb) return Flandre.messageCreate(CustomCmdEmbedError, msg);
             CustomCmdEmbedSuccess.setTitle(`${FlandreHi} | *${msg.guild.name} Custom Commands List!*`)
             CustomCmdEmbedSuccess.setThumbnail(msg.guild.iconURL())
if(CustomCmdDb && CustomCmdDb.length) {
  let array =[]
    CustomCmdDb.forEach(c => {
    array.push(`${c.name}`)
  })
  CustomCmdEmbedSuccess.setDescription(`${array.join('\n')}`)
}
          Flandre.messageCreate(CustomCmdEmbedSuccess, msg);
}
         }
  }
let CmdDatabase = Database.get(`CustomCommands_${msg.guild.id}`)
if(CmdDatabase) {
  let CmdName = CmdDatabase.find(x => x.name === command)
  if(CmdName) return Flandre.messageCreate(CmdName.response, msg);
}
 } catch (Err) {
    const ErrorEmbedError = new Flandre.flandreEmbedError().setFooter(`Command: ${msg.content}, Error Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
     ErrorEmbedError.setTitle(`${FlandreAngery} | *Something is wrong with this Command! Please report this to ${FlandreClient.users.cache.get(Developer).tag} in my Support Server!*`)
     ErrorEmbedError.setDescription(`[Support Server](${Server})\nError:\n\`${Err}\``)
     return Flandre.messageCreate(ErrorEmbedError, msg);
 }
})
FlandreClient.on('message', async msg => {
    const ChatBotEmbedSuccess = new Flandre.flandreEmbedSuccess(),
          ChatBotEmbedError = new Flandre.flandreEmbedError();
    let ChannelStatus = Database.get(`ChatChannelStatus_${msg.guild.id}`);
    switch(ChannelStatus) {
        case null:
            return;
            break;
        case true:
            let Channel = Database.get(`ChatChannel_${msg.guild.id}`);
            if(!Channel) return;
            if(msg.channel.id === Channel) {
            if(msg.author.bot) return;
             msg.content = msg.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (msg.content.includes(`@`)) {
        ChatBotEmbedError.setTitle(`${FlandreUgh} | *Please don't mention Anyone!*`)
      return msg.channel.send(ChatBotEmbedError);
    }
   ChatBotEmbedError.setTitle(`${FlandreUgh} | *Please Say something!*`)
    msg.channel.startTyping();
    if (!msg.content) return msg.channel.send(ChatBotEmbedError);
    ChatBot.chat({message: msg.content, name: FlandreClient.user.username, owner: 'Zed the Weeb Dev. C:', user: msg.author.id}).then(reply => {
     ChatBotEmbedSuccess.setTitle(`> ${msg.content} \n *${reply}*`)
     msg.channel.send(ChatBotEmbedSuccess);
    })
    msg.channel.stopTyping();
    }
    }
})
 FlandreClient.on('guildMemberAdd', async member => {
     let AutoRoleStatus = Database.get(`statusautorole_${member.guild.id}`)
     switch(AutoRoleStatus) {
         case null:
             return;
             break;
         case true:
             if(member.guild.roles.cache.get(Database.get(`roleForAutorole_${member.guild.id}`))) {
member.roles.add(member.guild.roles.cache.get(Database.get(`roleForAutorole_${member.guild.id}`))).catch(console.error);
             break;
             }
     }
 })
FlandreClient.on('guildMemberAdd', async member => {
    let AutoPingStatus = Database.get(`AutoPingStatus_${member.guild.id}`)
    switch(AutoPingStatus) {
        case null:
            return;
            break;
        case true:
            let AutoPingChannel = Database.get(`AutoPingChannel_${member.guild.id}`)
            if(!AutoPingChannel) return;
            FlandreClient.channels.cache.get(AutoPingChannel).send(`<@${member.user.id}>`).then(msgf => {
                msgf.delete({ timeout: 1000 })
            })
            return;
            break;
    }
})
FlandreClient.on('guildCreate', async guild => {
        const GuildEmbed = new Flandre.flandreEmbedSuccess().setFooter(`New Server Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
    let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
    GuildEmbed.setTitle(`${FlandreHi} | *Thanks for inviting me! Type ${Prefix}help for The list of Modules!*`)
    defaultChannel.send(GuildEmbed).catch(err => {
        return;
    })
})
}
module.exports = FlandreScript;
