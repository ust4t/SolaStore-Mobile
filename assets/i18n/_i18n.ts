import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';
import tr from './tr';
import en from './en';
import fr from './fr';
import ru from './ru';
import ar from './ar';


const locales = RNLocalize.getLocales();
I18n.locale = locales[0].languageTag;
export const isRtl = locales[0].isRTL;
// I18nManager.forceRTL(isRtl); // Arayüz bileşenlerinin soldan sağa yerine sağdan sola doğru dizilmesini zorunlu tutmak içindir.
I18n.fallbacks = true;
I18n.locales.no = 'en';
I18n.translations = {
  en,
  tr,
  fr,
  ru,
  ar
};
export default I18n;