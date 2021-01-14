/*
if(command === 'prefix') {
      const PrefixEmbedError = new Flandre.flandreEmbedError().setFooter(`Prefix Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true })),
            PrefixEmbedSuccess = new Flandre.flandreEmbedSuccess().setFooter(`Prefix Flandre!`, FlandreClient.user.displayAvatarURL({ dynamic: true }));
        let Reply = new Object(),
            PrefixDb = Database.get(`prefixdatabase_${msg.guild.id}`);
        if(PrefixDb === null) {
          PrefixDb = Prefix;
        }
        if(!args[0]) {
          PrefixEmbedSuccess.setTitle(`${FlandreHi} | *Prefix for this guild is ${PrefixDb}*`)
          Reply = PrefixEmbedSuccess;
          Flandre.messageCreate(Reply, msg)
        } else {
         if(!msg.member.hasPermission(Flandre.manage_guild)) {
           PrefixEmbedError.setTitle(`${FlandreUgh} | *Sorry! But you need ${Flandre.manage_guild} Permission to use this command!*`)
           Reply = PrefixEmbedError;
           Flandre.messageCreate(Reply, msg);
         } else {
         let PrefixArgs = args[0].toLowerCase()
         if(PrefixArgs === PrefixDb) {
           PrefixEmbedError.setTitle(`${FlandreUgh} | *Please Specify other Prefixes ${PrefixArgs} is already my Prefix!*`)
           Reply = PrefixEmbedError;
           Flandre.messageCreate(Reply, msg);
         } else {
         Database.set(`prefixdatabase_${msg.guild.id}`, PrefixArgs)
         PrefixEmbedSuccess.setTitle(`${FlandreLaugh} | *Successfully Changed my prefix for this Guild to ${PrefixArgs}*`)
         Reply = PrefixEmbedSuccess;
         Flandre.messageCreate(Reply, msg);
         Flandre.logging(msg);
         }
         }
        }
      }
      check the ?.ts file for info
      */