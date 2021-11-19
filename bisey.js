const { Client } = require('whatsapp-web.js'); //kütüphanenin bütün isleri client ile calısacak
const qrcode = require('qrcode-terminal');


//const { request } = require('express');
var request = require("request");


const client = new Client();
var PersonList = new Array();


/*
const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json());

app.get('/', (req, res) => {           //get req attım locale girince
    client.sendMessage('905357484443@c.us', "REST API SERVERI BAŞARILI"); 
    return res.send('REST API IS SUCCESS - by ERSEL AKBAY');
});

app.post('/', (req, res) => {
    const lastseen = req.body.lastseen;
    console.log(lastseen);
    client.sendMessage('905357484443@c.us', lastseen);
    return res.send("Success");
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

app.listen(PORT, () => console.log("Server is alive at http://localhost:$",{PORT}));
*/


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

});

client.on('message', msg => {

    if(msg.isStatus)
    {
        return;
    }
    let date_ob = new Date();
    let hours = date_ob.getHours();

    var oneri = " "

    gelen=msg.body.split(' ')
    


    if(hours>=0 && hours < 6)
    {
        var set=1;
        var adi = msg.id["remote"];

        //console.log("yazan: ", adi);
        //console.log("sayi:", PersonList.length)

        for (var i =0; i < PersonList.length; i++ )
        {

            //console.log(PersonList[i]);
            //console.log(adi);
            if (PersonList[i]==adi)
            {
                //console.log("trrr");
                set=0;
            }
        }
        if (set==1)
            {
                msg.reply('Merhaba! Şuan müsait değilim. Mesai saatleri içerisinde sizinle iletişime geçeceğim.'); 
                PersonList.push(adi);

            }
    }


    else if (msg.body == 'sa' || msg.body == "Sa" || msg.body == "SA" || msg.body == "selamun aleykum"|| msg.body == "selamun aleyküm" || msg.body == "Selamun Aleykum"|| msg.body == "Selamun Aleyküm" || msg.body == "Selamınaleyküm" || msg.body == "selamunaleyküm" || msg.body == "Selamın Aleyküm" || msg.body == "Selamın aleyküm" || msg.body == "Selamunaleykum" || msg.body == "Selamun aleyküm") 
    {
        
        client.sendMessage(msg.from, 'aleyküm selam ve rahmetullahi ve berekatuhu ve magfiratuhu ebeden ve daimen. ')
        client.sendMessage(msg.from, 'Size en yakın zamanda dönüş yapacağım')
        PersonList=[];
    }
    else if(gelen[0] == "!havadurumu" || gelen[0] == "!Havadurumu")
    {
        PersonList=[];

        var options = { method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          qs: { q: gelen[1], APPID: '0c48be2b864bfe67d539becca3b3ff4f' },  //benim
           };
        
        request(options, function (error, response, body) {

            var x = JSON.parse(body);
            if(x.cod != 200){          client.sendMessage(msg.from, "girdiginiz sehir bulunamadi!")
        return}
          if (error) throw new Error(error);
        
          var sehir= x.name
            var durum= x.weather[0].description
            if (durum=="overcast clouds")
            {durum="kapalı, bulutlu"
            oneri= "Öneri: Bugün yağmurluğunuzu yanınıza almanızda fayda var"}
            if (durum=="scattered clouds")
            {durum="parçalı bulutlu"}
            if (durum=="clear sky")
            {durum="gökyüzü açık"}
            if (durum=="few clouds")
            {durum="az bulutlu"}
            if (durum=="broken clouds")
            {durum="yer yer açık"}
            var sicaklik = x.main.temp.toString()
            sicaklik=sicaklik - 272
            sicaklik= sicaklik.toFixed(2);
            var nem = x.main.humidity.toString()
            var hissedilen= x.main.feels_like.toString()
            hissedilen=hissedilen - 272
            hissedilen= hissedilen.toFixed(2);
            var ruzgar=x.wind.speed.toString()
            
            if (hours>=6 && hours < 11)
          {
            if (hissedilen<6)
            { 
                var cumle = "Dışarısı fazla soğuk görünüyor. Dikkatli olun!"
                client.sendMessage(msg.from,  "Günaydın! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar +  oneri +"\n\n" + cumle)
            }
            else{
              client.sendMessage(msg.from,  "Günaydın! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar  + oneri )
            }
        }
        if (hours>=11 && hours < 17)
         {
            if (hissedilen<6)
            { 
                var cumle = "Dışarısı fazla soğuk görünüyor. Dikkatli olun!"
            client.sendMessage(msg.from,  "Mutlu Günler! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar  + oneri+"\n\n" + cumle )
            }
            else{
                client.sendMessage(msg.from,  "Mutlu Günler! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar  + oneri)
            }
         } 
         if (hours>=17 && hours < 21)
         {
            if (hissedilen<6)
            { 
                var cumle = "Dışarısı fazla soğuk görünüyor. Dikkatli olun!"
            client.sendMessage(msg.from,  "İyi Akşamlar! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar +  oneri+"\n\n" + cumle )
         }
        else{
            client.sendMessage(msg.from,  "İyi Akşamlar! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar +  oneri)
        } }
         if (hours>=21 && hours < 24)
         {
            if (hissedilen<6)
            { 
                var cumle = "Dışarısı fazla soğuk görünüyor. Dikkatli olun!"
            client.sendMessage(msg.from,  "İyi Geceler! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar  + oneri +"\n\n" + cumle)
             
        }
    else{
        client.sendMessage(msg.from,  "İyi Geceler! \n\nŞehir Adı: "+sehir+"\nHavanın Durumu: "+durum+"\nSıcaklık: "+sicaklik+"\nHissedilen Sıcaklık: "+hissedilen+"\nNem: "+nem+"\nRuzgar: "+ruzgar  + oneri )
    }
    }
         console.log("OK! ")
        });

        
    }


    else if (msg.body == '!komutlar' || msg.body == "!Komutlar") 

    {
        client.sendMessage(msg.from, '!havadurumu sehiradi\n')
    }
}

);

client.initialize();

//client.sendMessage('905357484443@c.us', adi);
//client.getProfilePicUrl('905319274988@c.us').then(value => console.log(value));   //profil foto link cekmek
//msg.reply('aleyküm selam ve rahmetullahi ve berekatuhu ve magfiratuhu ebeden ve daimen');       //etiketli yanıt


