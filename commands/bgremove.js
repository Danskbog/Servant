const Jimp = require('jimp');

exports.run = async (client, message, [link, rgb, diff], level) => {
  message.delete();

  if (!link) return message.reply('Please provide a link of the image.');
  const asd = link.substr(link.length - 4);
  if (!asd === ".jpg" || !asd === ".png" || !asd === ".gif") return message.reply('Make sure that the last 3 letters of the link is the file extension.');

  if (!rgb) rgb = [255, 255, 255];
  else if (rgb.indexOf(",") > -1) {
    rgb = rgb.split(",");
    rgb = rgb.map(c => {
      return parseInt(c);
    });
  } else if (rgb == "black") {
    rgb = [0, 0, 0];
  }

  const bgc = rgb;

  if (!diff) diff = 18;

  let stop = false;

  function penis (x, y, idx) {
    if (x == this.bitmap.width - 1)
      stop = false

    if (stop)
      return

    const r = Math.abs(this.bitmap.data[idx] - bgc[0])
    const g = Math.abs(this.bitmap.data[idx + 1] - bgc[1])
    const b = Math.abs(this.bitmap.data[idx + 2] - bgc[2])

    const avg = (r + g + b) / 3

    if (avg <= diff)
      this.bitmap.data[idx + 3] = 0
    else
      stop = true
  }

  Jimp.read(link).then(img => {
    let width = img.bitmap.width
    let height = img.bitmap.height

    if (width > height) height = width
    if (height > width) width = height
    img
      .autocrop()
      .flip(true, false)
      .scan(0, 0, width, height, penis)
      .flip(true, false)
      .scan(0, 0, width, height, penis)
      .rotate(90)
      .scan(0, 0, width, height, penis)
      .rotate(-180)
      .scan(0, 0, width, height, penis)
      .rotate(90)
      .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        message.channel.sendFile(buffer);
      });
  });

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bgremove",
  category: "Miscellaneous",
  description: "Removes the background of an image.",
  usage: "bgremove <link> <R,G,B> <diff>"
};
