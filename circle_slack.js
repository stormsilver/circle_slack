var CircleSlack = {};
CircleSlack.emote = function(cmd, rest, words, e) {
    // console.log("OKAY COMMAND", cmd, rest, words, e)
    rest = TS.format.doEmoticonConversion(TS.cmd_handlers[cmd].emote);
    TS.api.call("chat.command", {
        agent: "webapp",
        command: '/me',
        text: rest,
        channel: TS.model.active_cid
    }, TS.client.ui.onAPICommand)
};

TS.cmd_handlers['/peer'] = {
    type: 'client',
    autocomplete: true,
    alias_of: null,
    aliases: null,
    desc: 'You peer around you, uncertain that what you see is actually true.',
    emote: "peers around, looking as if he has trouble seeing everything clearly.",
    func: CircleSlack.emote
};
