var Discord = require('discord.io');
var weekday = require('weekday');

var bot = new Discord.Client({
   token: "NDc2OTg5NjAyMzEwMzg5NzYw.Dk1nhw.IYoulO1tl7nEjR4qZbJx8B7giZs",
   autorun: true
});

bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, msg, evt) { 
    if(msg.match(/^\//) !== null){
    	var cmd = msg.substring(1).match(/^\w+/)[0];
    	cmd = cmd.toLowerCase();
    	switch(cmd){
    		/*case 'test':
	    		bot.sendMessage({ to: channelID, message: 'test completed' }, (err, res) =>{
	    			//console.log(res);
	    		});
	    		//bot.createRole(channelID, (err, res)=>{
	    				//console.log(res + '\n\n\n');
	    				//console.log(err);
	    		//});
	    		//bot.editRole({serverID:evt.d.guild_id, roleID:evt.d.member.roles[0]}, (err, res) =>{
	    			//console.log(res);
	    		//});
    		break;*/
    		case 'date':
	    		var date = new Date();
	    		var month = '';
	    		switch(date.getMonth()){
	    			case 1: month = 'January'; break;
	    			case 2: month = 'February'; break;
	    			case 3: month = 'March'; break;
	    			case 4: month = 'April'; break;
	    			case 5: month = 'May'; break;
	    			case 6: month = 'June'; break;
	    			case 7: month = 'July'; break;
	    			case 8: month = 'August'; break;
	    			case 9: month = 'September'; break;
	    			case 10: month = 'October'; break;
	    			case 11: month = 'November'; break;
	    			case 12: month = 'December'; break;
	    		}
	    		var suffix = 'th';
	    		switch(date.getDate()){
	    			case 1: suffix = 'st'; break;
	    			case 2: suffix = 'nd'; break;
	    			case 3: suffix = 'rd'; break;
	    			case 21: suffix = 'st'; break;
	    			case 22: suffix = 'nd'; break;
	    			case 23: suffix = 'rd'; break;
	    			case 31: suffix = 'st'; break;
	    		}
	    		bot.sendMessage({ to: channelID, message: weekday() + ', ' + month + ' ' +  date.getDate() + suffix + ', ' + date.getFullYear()});
	    	break;
    		case 'time':
	    		var date = new Date();
	    		var hour = date.getHours();
	    		var mmm = 'am';
	    		if(hour > 12) {hour -= 12; mmm = 'pm';}
	    		var min = date.getMinutes();
	    		if(min < 10) min = '0' + min;
				bot.sendMessage({ to: channelID, message: hour + ':' + min + ' ' + mmm});
	    	break;
	    	case 'colour':
	    	case 'color':
	    		if(msg.match(/^.\w+ \w+/) !== null){
	    			var color;
	    			if(cmd == 'color')
	    				color = msg.substring(7);
	    			if(cmd == 'colour')
	    				color = msg.substring(8);
	    			color = color.toLowerCase();
	    			var hex;
	    			switch(color){
	    				case 'black':hex = 0x010101; break;
	    				case 'default':hex = 0x000000; break;
						case 'red':hex = 0xff0000; break;
						case 'green':hex = 0x00ff00; break;
						case 'blue':hex = 0x0000ff; break;
						case 'yellow':hex = 0xffff00; break;
						case 'cyan':hex = 0x00ffff; break;
						case 'magenta':hex = 0xff00ff; break;
						case 'white':hex = 0xffffff; break;
						case 'orange':hex = 0xff8000; break;
						case 'lime':hex = 0x80ff00; break;
						case 'teal':hex = 0x00ff80; break;
						case 'skyblue':hex = 0x0080ff; break;
						case 'pink':hex = 0xff0080; break;
						case 'purple':hex = 0x8000ff; break;
						case 'grey':case 'gray':hex = 0x808080;break;
	    			}
	    			var arr = evt.d.member.roles;
	    			if(hex !== undefined)
	    				evt.hex = hex;
	    			check(evt, arr);
	    		}

	    	break;
	    	case 'role':
		    	if(msg.match(/^.\w+ \w+/) !== null){
		    		var role = msg.substring(6);
		    		var changed = false;
		    		for(var i in bot.servers[evt.d.guild_id].roles){
		    			if(bot.servers[evt.d.guild_id].roles[i].name.toLowerCase() == role.toLowerCase()){
		    				changed = true;
		    				if(bot.servers[evt.d.guild_id].members[evt.d.author.id].roles.includes(bot.servers[evt.d.guild_id].roles[i].id))
		    					bot.removeFromRole({userID:evt.d.author.id, roleID:bot.servers[evt.d.guild_id].roles[i].id, serverID:evt.d.guild_id}, (err) =>{
		    						if(err !== null)
		    							bot.sendMessage({ to: evt.d.channel_id, message: 'Insufficient permssions'});
		    						else 
		    							bot.sendMessage({ to: evt.d.channel_id, message: 'Role changed'});
		    					});
		    				else
		    					bot.addToRole({userID:evt.d.author.id, roleID:bot.servers[evt.d.guild_id].roles[i].id, serverID:evt.d.guild_id}, (err) =>{
		    						if(err !== null)
		    							bot.sendMessage({ to: evt.d.channel_id, message: 'Insufficient permssions'});
		    						else 
		    							bot.sendMessage({ to: evt.d.channel_id, message: 'Role changed'});
		    					});
		    			}
		    		}
		    		if(!changed)
		    			bot.sendMessage({ to: evt.d.channel_id, message: 'Role not found'});
		    	}
	    	break;
    	}
    }
});

function check(evt, arr){
	bot.editRole({serverID:evt.d.guild_id, roleID:arr[0]}, (err, res) => {
		if(res !== undefined){
			if(res.name == evt.d.author.username) {
				if(evt.hex !== undefined){
    				bot.editRole({serverID:evt.d.guild_id, roleID:res.id, color:evt.hex});
    				bot.sendMessage({ to: evt.d.channel_id, message: 'Color changed'});
				}
    			else if(evt.hex == undefined)
    				bot.sendMessage({ to: evt.d.channel_id, message: 'That is not a valid color'});
			}
			else if(arr.length <= 1){
				bot.sendMessage({ to: evt.d.channel_id, message: 'You do not have a role matching your name, or it can not be edited'});
			}
			else{
				arr.shift();
				check(evt, arr);
			}
		}
		else if(arr.length <= 1){
			bot.sendMessage({ to: evt.d.channel_id, message: 'You do not have a role matching your name, or it can not be edited'});
		}
		else{
			arr.shift();
			check(evt, arr);
		}
	});
}

/*
instance of response object in callback of message:
{ nonce: 6452381070554649,
  attachments: [],
  tts: false,
  embeds: [],
  timestamp: '2018-07-18T10:32:15.454000+00:00',
  mention_everyone: false,
  id: '469089010912985088',
  pinned: false,
  edited_timestamp: null,
  author:
   { username: 'test325',
     discriminator: '5962',
     bot: true,
     id: '468740014541373451',
     avatar: 'ea2b719b5288a92c6b8e3a44e29c8556' },
  mention_roles: [],
  content: 'June 18th, 2018',
  channel_id: '468747102114283543',
  mentions: [],
  type: 0 }
*/