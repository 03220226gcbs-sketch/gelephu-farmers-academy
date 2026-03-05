import { useState, useCallback } from 'react';

type Language = 'en' | 'dz';

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', dz: 'གཞི་ས' },
  'nav.techniques': { en: 'Techniques', dz: 'ལག་རྩལ' },
  'nav.training': { en: 'Training', dz: 'སློབ་སྦྱོང' },
  'nav.news': { en: 'News', dz: 'གསར་འགྱུར' },
  'nav.projects': { en: 'Projects', dz: 'ལས་གཞི' },
  'nav.sops': { en: 'SOPs', dz: 'ལས་རིམ' },
  'nav.store': { en: 'Store', dz: 'ཚོང་ར' },
  'nav.gdp': { en: 'GDP Impact', dz: 'དཔལ་འབྱོར' },
  'nav.pedagogy': { en: 'Pedagogy', dz: 'སློབ་ཁྲིད' },
  'nav.contact': { en: 'Contact', dz: 'འབྲེལ་ལམ' },
  'nav.faq': { en: 'FAQ', dz: 'དྲི་བ' },
  'nav.admin': { en: 'Admin', dz: 'འཛིན་སྐྱོང' },
  'nav.dashboard': { en: 'Dashboard', dz: 'སྡེ་ཚན' },
  'nav.login': { en: 'Login', dz: 'ནང་འཛུལ' },
  'nav.logout': { en: 'Logout', dz: 'ཕྱིར་འཐོན' },
  // Page headings
  'home.hero.title': { en: 'Gelephu Farmers Academy', dz: 'གེལེཕུ་ཞིང་པ་སློབ་གྲྭ' },
  'home.hero.subtitle': { en: 'Empowering Bhutanese Farmers Through Modern Agriculture', dz: 'དེང་རབས་ཞིང་ལས་ཀྱིས་འབྲུག་གི་ཞིང་པ་རྣམས་ལ་ནུས་པ་སྤྲོད་པ' },
  'home.objectives': { en: 'Our Objectives', dz: 'ང་ཚོའི་དམིགས་ཡུལ' },
  'home.stories': { en: 'Farmer Success Stories', dz: 'ཞིང་པའི་གྲུབ་འབྲས་གཏམ' },
  'techniques.title': { en: 'Farming Techniques Library', dz: 'ཞིང་ལས་ལག་རྩལ་མཛོད' },
  'techniques.search': { en: 'Search techniques...', dz: 'ལག་རྩལ་འཚོལ...' },
  'training.title': { en: 'Training Programs', dz: 'སློབ་སྦྱོང་ལས་རིམ' },
  'training.courses': { en: 'Available Courses', dz: 'སློབ་ཚན་ཐོབ་ཐང' },
  'training.enrollments': { en: 'My Enrollments', dz: 'ངའི་ཞུ་ཡིག' },
  'training.stories': { en: 'Success Stories', dz: 'གྲུབ་འབྲས་གཏམ' },
  'contact.title': { en: 'Contact & Registration', dz: 'འབྲེལ་ལམ་དང་ཞུ་ཡིག' },
  'contact.name': { en: 'Full Name', dz: 'མིང་ཚང་མ' },
  'contact.contact': { en: 'Contact Details', dz: 'འབྲེལ་ལམ་ཆ་འཕྲིན' },
  'contact.location': { en: 'Location', dz: 'གནས་ས' },
  'contact.interests': { en: 'Areas of Interest', dz: 'དོན་གཉེར་ཁུལ' },
  'contact.submit': { en: 'Submit', dz: 'འབུལ་བ' },
};

let globalLanguage: Language = (sessionStorage.getItem('gfa_language') as Language) || 'en';
const listeners: Set<() => void> = new Set();

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(globalLanguage);

  const setLanguage = useCallback((lang: Language) => {
    globalLanguage = lang;
    sessionStorage.setItem('gfa_language', lang);
    setLanguageState(lang);
    listeners.forEach(fn => fn());
  }, []);

  const toggleLanguage = useCallback(() => {
    const next: Language = globalLanguage === 'en' ? 'dz' : 'en';
    globalLanguage = next;
    sessionStorage.setItem('gfa_language', next);
    setLanguageState(next);
    listeners.forEach(fn => fn());
  }, []);

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] ?? translations[key]?.['en'] ?? key;
  }, [language]);

  return { language, setLanguage, toggleLanguage, t };
}
