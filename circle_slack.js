var CircleSlack = {
    installed: false,
    gender: 'male'
};

CircleSlack.socials = {
    peer: {
        desc: 'You peer around you, uncertain that what you see is actually true.',
        emote: "peers around, looking as if $e has trouble seeing everything clearly.",
    },
    gasp: {
        desc: 'You gasp in astonishment.',
        emote: "gasps in astonishment."
    },
    cheer: {
        desc: 'You cheer wildly.',
        emote: 'cheers wildly.'
    },
    ponder: {
        desc: 'You ponder over matters as they appear to you at this moment.',
        emote: 'sinks deeply into $s own thoughts.'
    },
    cry: {
        desc: 'Waaaaah..',
        emote: 'bursts into tears.'
    },
    disapprove: {
        desc: 'ಠ_ಠ',
        emote: 'looks around disapprovingly. ಠ_ಠ'
    },
    snap: {
        desc: 'PRONTO!  You snap your fingers.',
        emote: 'snaps $s fingers.'
    },
    grin: {
        desc: 'You grin evilly.',
        emote: 'grins evilly.'
    },
    applaud: {
        desc: 'Clap, clap, clap.',
        emote: 'gives a round of applause.'
    },
    bleed: {
        desc: 'You bleed profusely, making an awful mess...',
        emote: 'bleeds profusely, making an awful mess...'
    },
    blush: {
        desc: 'Your cheeks are burning.',
        emote: 'blushes.'
    },
    beg: {
        desc: 'You beg the gods for mercy.  (No way you\'re gonna get it! :-))',
        emote: 'begs the gods for mercy, at which they fall down laughing.'
    },
    bounce: {
        desc: 'BOIINNNNNNGG!',
        emote: 'bounces around.'
    },
    bow: {
        desc: 'You bow deeply.',
        emote: 'bows deeply.'
    },
    burp: {
        desc: 'You burp loudly.',
        emote: 'burps loudly.'
    },
    cackle: {
        desc: 'You cackle gleefully.',
        emote: 'throws back $s head and cackles with insane glee!'
    },
    grumble: {
        desc: 'You grumble inwardly.',
        emote: 'grumbles mildly to $mself.'
    },
    giggle: {
        desc: 'You giggle.',
        emote: 'giggles.'
    },
    chuckle: {
        desc: 'You chuckle politely.',
        emote: 'chuckles politely.'
    },
    weep: {
        desc: 'You cry more than a little.',
        emote: 'weeps uncontrollably.'
    },
    sob: {
        desc: 'You sob into your handkerchief.',
        emote: 'sobs quietly to $mself.'
    },
    cringe: {
        desc: 'You cringe in terror.',
        emote: 'cringes in terror!'
    },
    groan: {
        desc: 'You groan loudly.',
        emote: 'groans loudly.'
    }
};

CircleSlack.convertGender = function(emote) {
    var words = {
        possessive: 'its',
        noun: 'it',
        pronoun: 'its'
    };
    switch (CircleSlack.gender) {
    case 'male':
        words = {
            possessive: 'his',
            noun: 'he',
            pronoun: 'him'
        }
        break;
    case 'female':
        words = {
            possessive: 'her',
            noun: 'she',
            pronoun: 'her'
        }
        break;
    }

    emote = emote.replace('$s', words.possessive);
    emote = emote.replace('$e', words.noun);
    emote = emote.replace('$m', words.pronoun);

    return emote;
};

CircleSlack.emote = function(cmd, rest, words, e) {
    // console.log("OKAY COMMAND", cmd, rest, words, e)
    var emote = TS.cmd_handlers[cmd].emote;
    emote = CircleSlack.convertGender(emote);
    emote = TS.format.doEmoticonConversion(emote);
    TS.api.call("chat.command", {
        agent: "webapp",
        command: '/me',
        text: emote,
        channel: TS.model.active_cid
    }, TS.client.ui.onAPICommand)
};

CircleSlack.install = function() {
    if (CircleSlack.installed) {
        return true;
    }

    CircleSlack.installed = true;

    $.each(CircleSlack.socials, function(name, data) {
        TS.cmd_handlers['/' + name] = {
            type: 'client',
            autocomplete: true,
            alias_of: null,
            aliases: null,
            desc: data.desc,
            emote: data.emote,
            func: CircleSlack.emote
        };
    });
}
