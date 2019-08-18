const config = {
  "ownerID": "221373638979485696",
  "admins": [],
  "support": [],

  "token":  "",

  "defaultSettings" : {
    "prefix": ";",
    "logChannel": "logs",
    "modLogChannel": "mod-log",
    "trialmodRole": "Trial Moderator",
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "mutedRole": "Muted",
    "requiredRole": "Member",
    "customrolePos": "58",
    "autoRole": "Member",
    "autoroleEnabled": "false",
    "systemNotice": "true",
    "rulesChannel": "rules",
    "welcomeEnabled": "true",
    "welcomeChannel": "general",
    "welcomeTitle": "A new person just arrived!",
    "welcomeMessage1": 'It\'s {{user}}!',
    "welcomeMessage2": 'Welcome <@{{user}}>! Feel free to talk, but make sure u read {{rules}} first!',
  },

  // PERMISSION LEVEL DEFINITIONS.
  permLevels: [
    { level: 0,
      name: "User",
      check: () => true
    },

    { level: 1,
      name: "Trial Moderator",
      check: (message) => {
        try {
          const trialmodRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.trialmodRole.toLowerCase());
          if (trialmodRole && message.member.roles.has(trialmodRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner",
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },

    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner",
     check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
