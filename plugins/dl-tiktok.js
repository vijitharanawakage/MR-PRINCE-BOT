 
import fg from 'api-dylux'
import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    
        if (!args[0]) throw `✳️ Give the link of the video Tiktok or quote a tiktok link\n\n 📌 Example: ${usedPrefix + command} https://vm.tiktok.com`
        if (!args[0].match(/tiktok/gi)) throw `❎ Please provide a valid tiktok Link`
        m.react(rwait)
      
        try {
        let res = await fetch(global.API('fgmods', '/api/downloader/tiktok', { url: args[0] }, 'apikey'))
        let data = await res.json()

        if (!data.result.images) {
            let tex = `
┌─⊷ *TIKTOK IMG* 
┃ *Name:* ${data.result.author.nickname}
┃ *Username:* ${data.result.author.unique_id}
┃ *Duration:* ${data.result.duration}
┃ *Likes:* ${data.result.digg_count}
┃ *Views:* ${data.result.play_count}
┃ *Description:* ${data.result.title}
└───────────
`
            conn.sendFile(m.chat, data.result.play, 'tiktok.mp4', tex, m);
            m.react(done)
        } else {
            let cap = `
┌─⊷ *TIKTOK VID*           
┃ *Likes:* ${data.result.digg_count}
┃ *Description:* ${data.result.title}
└───────────
`
            for (let ttdl of data.result.images) {
                conn.sendMessage(m.chat, { image: { url: ttdl }, caption: cap }, { quoted: m })
            }
            conn.sendFile(m.chat, data.result.play, 'tiktok.mp3', '', m, null, { mimetype: 'audio/mp4' })
            m.react(done)
        }

      } catch (error) {
        m.reply(`❎ Error`)
    }
   
}

handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = ['tiktok', 'tt', 'tiktokimg', 'tk']

export default handler
