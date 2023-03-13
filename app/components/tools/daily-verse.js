import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  camelJoke: computed(function () {
    const camelJoke = {
      joke: '',
      answer: '',
    };
    switch (new Date().getDay()) {
      case 0:
        camelJoke.joke = `Waarom gaan kamelen zo goed op in hun omgeving?`;
        camelJoke.answer = 'Camelflage!';
        break;
      case 1:
        camelJoke.joke = `Een priester komt in een woestijn en wil een kameel huren. De verhuurder zegt: 'Als je "poeh poeh" zegt, gaat de kameel rijden. Als je "poeh" zegt, gaat-ie harder rijden en als je "amen" zegt dan stopt het dier.' 'Oké', zegt de priester. Hij gaat op de kameel zitten en zegt: 'Poeh poeh'. Even later zegt de priester 'poeh' en de kameel gaat harder lopen. Dan ziet de priester in de verte een ravijn opdoemen. Maar hij is vergeten hoe je de kameel stopt. Hij doet nog een laatste schietgebedje en eindigt met amen. De kameel stopt één centimeter voor het ravijn. Dan zegt de priester: 'Poeh poeh, dat was op het nippertje!'`;
        camelJoke.answer = '';
        break;
      case 2:
        camelJoke.joke = `Wat krijg je als je een kameel en een sneeuwpop kruist?`;
        camelJoke.answer = 'Een lama die op vakantie is in de woestijn!';
        break;
      case 3:
        camelJoke.joke = `Een olifant komt een kameel tegen en vraagt “Waarom heb jij borsten op je rug?” Zegt de kameel “Wat een aparte vraag voor iemand die een lul aan zijn gezicht heeft hangen.”`;
        camelJoke.answer = '';
        break;
      case 4:
        camelJoke.joke = `Wat is zoet en loopt door de woestijn?`;
        camelJoke.answer = 'Een caramel!';
        break;
      case 5:
        camelJoke.joke = `Wat zei de kameel tegen de Sahara?`;
        camelJoke.answer = 'Long time no sea!';
        break;
      case 6:
        camelJoke.joke = `Hoe noem je een kameel die zijn broer heeft opgegeten?`;
        camelJoke.answer = 'Een camibalist';
    }
    return camelJoke;
  }),
});
