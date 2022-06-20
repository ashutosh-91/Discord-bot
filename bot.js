
//get discord bot
const {Client,Intents}=require("discord.js");
const dotenv=require('dotenv')
      dotenv.config();
      const axios = require('axios')
//client which communicates with discord 
const client=new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES] });
const url = "https://codeforces.com/api/contest.list"
client.on('ready',()=>{
    console.log("ready to go")
})

client.on( "messageCreate"  ,(msg)=>{
   
    if(msg.content=="contest")
      {
        
        axios.get(`${url}`)
        .then( response=>{
           let result = ` `;
           const arr1 = response.data.result
           let i=0;
           while(true)
           {
               if(arr1[i].phase === "BEFORE")
               {
                   let mydate = new Date(arr1[i].startTimeSeconds * 1000)
                   mydate = mydate.toLocaleString('hi-IN', { timeZone: 'Asia/Kolkata' }) 
                   result+="Contest Name - "+arr1[i].name+'\n'
                   result += 'Timing- ' + mydate+'\n'
                   result+="Duration - "+(arr1[i].durationSeconds/3600)+" hours \n"
                   result+="Type - "+(arr1[i].type)+'\n\n'

               }
               else
               {
                   break;
               }
               i=i+1;
           }

             msg.reply(result)
            // console.log(result)  

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

      }
      
  
})

// takes all env variable an dloads to bot token
client.login(process.env.BOT_TOKEN)

