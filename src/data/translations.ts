import type { Language, PageId } from '../types';

export const LANGUAGE_LABELS: Record<Language, { native: string; short: string; speechCode: string }> = {
  en: { native: 'English', short: 'EN', speechCode: 'en-IN' },
  hi: { native: 'हिन्दी', short: 'हिन्दी', speechCode: 'hi-IN' },
  kn: { native: 'ಕನ್ನಡ', short: 'ಕನ್ನಡ', speechCode: 'kn-IN' },
};

export const UI_COPY: Record<
  Language,
  {
    brandTagline: string;
    heroHeadline: string;
    heroSubhead: string;
    reportFraudBtn: string;
    exploreModulesBtn: string;
    helpline1930Title: string;
    helpline1930Desc: string;
    helpline14440Title: string;
    helpline14440Desc: string;
    callNow: string;
    tickerLabel: string;
    pauseTicker: string;
    playTicker: string;
    listenLabel: string;
    stopListenLabel: string;
    quickModulesTitle: string;
    quickModulesSub: string;
    voiceHintText: string;
    statsTitle: string;
    statFamilies: string;
    statSavings: string;
    statQuizzes: string;
    nav: {
      home: string;
      learn: string;
      tools: string;
      fraud: string;
      community: string;
    };
    pages: Record<PageId, { title: string; subtitle: string }>;
  }
> = {
  en: {
    brandTagline: 'Safe Rural Banking & Financial Wisdom for Every Household',
    heroHeadline: 'Protect your savings. Grow your village income safely.',
    heroSubhead:
      'Simple, voice-guided banking lessons, live savings & interest calculators, and instant 1930 cyber fraud protection — built to work even on low-network phones.',
    reportFraudBtn: 'Report Fraud Now',
    exploreModulesBtn: 'Start Learning Free',
    helpline1930Title: '1930 National Cyber Crime Helpline',
    helpline1930Desc: 'Call immediately within 1 hour of any UPI, OTP, or bank scam to freeze stolen funds.',
    helpline14440Title: '14440 RBI Sachet Toll-Free',
    helpline14440Desc: 'Verify banking rules, report unauthorized deductions, or ask RBI customer support.',
    callNow: 'Call Toll-Free',
    tickerLabel: 'Weekly Scam Alert',
    pauseTicker: 'Pause alerts',
    playTicker: 'Resume alerts',
    listenLabel: 'Listen',
    stopListenLabel: 'Stop audio',
    quickModulesTitle: '12 Essential Modules & Tools',
    quickModulesSub: 'Tap any card to open. Use the ruby speaker button anywhere to hear lessons read aloud.',
    voiceHintText: 'Voice guide available',
    statsTitle: 'Rural Households Empowered',
    statFamilies: 'Households Trained',
    statSavings: 'Emergency Funds Planned',
    statQuizzes: 'Scam Traps Avoided',
    nav: {
      home: 'Home',
      learn: 'Learn',
      tools: 'Calculators',
      fraud: 'Fraud Hub',
      community: 'Community',
    },
    pages: {
      home: { title: 'GramFin Home', subtitle: 'Your trusted rural banking & fraud safety companion' },
      banking: { title: 'Banking Basics', subtitle: 'Zero-balance accounts, safe AePS deposits, ATM & UPI care' },
      savings: { title: 'Savings & Interest Tools', subtitle: 'Plan your emergency fund and calculate real bank interest' },
      fraud: { title: 'Fraud Awareness Hub', subtitle: 'Golden hour response, scam SMS detector, OCR scanner & quiz' },
      budget: { title: 'Money Management', subtitle: 'Visual household budget & smart expense categorization' },
      literacy: { title: 'Financial Literacy', subtitle: 'Loans vs. moneylenders, compound interest & key KYC papers' },
      income: { title: 'Income Diversification', subtitle: 'Low-cost rural side businesses with startup & profit guides' },
      economics: { title: 'Inflation & GDP', subtitle: 'Understand rising prices and how village work powers India' },
      community: { title: 'Community Forum', subtitle: 'Safe peer questions & verified rural money tips' },
      badges: { title: 'Learning Progress & Badges', subtitle: 'Track completed modules, quiz scores & earned rewards' },
      offline: { title: 'Alerts & Offline Hub', subtitle: 'SMS alert signup, cached 1930 emergency guide & PDF packs' },
      contact: { title: 'Contact & Help', subtitle: 'Helplines, village workshop requests & direct support' },
    },
  },
  hi: {
    brandTagline: 'हर ग्रामीण परिवार के लिए सुरक्षित बैंकिंग और वित्तीय समझ',
    heroHeadline: 'अपनी बचत सुरक्षित रखें। गाँव की कमाई समझदारी से बढ़ाएँ।',
    heroSubhead:
      'आसान आवाज़-आधारित बैंकिंग पाठ, लाइव बचत व ब्याज कैलकुलेटर, और तुरंत 1930 साइबर फ्रॉड सुरक्षा — कम नेटवर्क वाले फोन पर भी चलने के लिए तैयार।',
    reportFraudBtn: 'तुरंत फ्रॉड रिपोर्ट करें',
    exploreModulesBtn: 'मुफ़्त सीखना शुरू करें',
    helpline1930Title: '1930 राष्ट्रीय साइबर अपराध हेल्पलाइन',
    helpline1930Desc: 'UPI, OTP या बैंक ठगी होने पर 1 घंटे के अंदर कॉल करें ताकि चोरी हुआ पैसा रोका जा सके।',
    helpline14440Title: '14440 RBI सचेत टोल-फ्री नंबर',
    helpline14440Desc: 'बैंक नियम जानें, बिना अनुमति कटे पैसे की शिकायत करें या RBI से सहायता लें।',
    callNow: 'टोल-फ्री कॉल करें',
    tickerLabel: 'साप्ताहिक फ्रॉड चेतावनी',
    pauseTicker: 'रोकें',
    playTicker: 'चलाएँ',
    listenLabel: 'सुनें',
    stopListenLabel: 'बंद करें',
    quickModulesTitle: '12 ज़रूरी पाठ और उपकरण',
    quickModulesSub: 'किसी भी कार्ड को खोलें। कहीं भी रूबी स्पीकर बटन दबाकर हिंदी में सुनें।',
    voiceHintText: 'आवाज़ में सुनें',
    statsTitle: 'सशक्त हुए ग्रामीण परिवार',
    statFamilies: 'प्रशिक्षित परिवार',
    statSavings: 'योजनाबद्ध आपातकालीन बचत',
    statQuizzes: 'ठगी से बचाव अभ्यास',
    nav: {
      home: 'मुख्य पृष्ठ',
      learn: 'सीखें',
      tools: 'कैलकुलेटर',
      fraud: 'फ्रॉड सुरक्षा',
      community: 'समुदाय',
    },
    pages: {
      home: { title: 'GramFin मुख्य पृष्ठ', subtitle: 'आपका भरोसेमंद ग्रामीण बैंकिंग और सुरक्षा साथी' },
      banking: { title: 'बैंकिंग की मूल बातें', subtitle: 'जन धन खाता, सुरक्षित AePS जमा, ATM और पासबुक' },
      savings: { title: 'बचत और ब्याज कैलकुलेटर', subtitle: 'आपातकालीन फंड और बैंक ब्याज की सही गणना करें' },
      fraud: { title: 'फ्रॉड जागरूकता केंद्र', subtitle: 'गोल्डन आवर गाइड, AI स्कैम जांच, रसीद स्कैनर और क्विज़' },
      budget: { title: 'पैसे का हिसाब-किताब', subtitle: 'घर की आमदनी और खर्च का आसान बजट डैशबोर्ड' },
      literacy: { title: 'वित्तीय साक्षरता', subtitle: 'बैंक ऋण बनाम साहूकार ब्याज और ज़रूरी दस्तावेज़' },
      income: { title: 'अतिरिक्त कमाई के साधन', subtitle: 'मुर्गीपालन, किचन गार्डन और छोटे व्यवसाय का खर्च-लाभ' },
      economics: { title: 'महंगाई और GDP', subtitle: 'बढ़ती कीमतों और गाँव की अर्थव्यवस्था को सरल भाषा में समझें' },
      community: { title: 'समुदाय मंच (Q&A)', subtitle: 'सुरक्षित सवाल-जवाब और गाँव के अनुभव' },
      badges: { title: 'प्रगति और बैज', subtitle: 'पूरे किए गए पाठ, क्विज़ स्कोर और इनाम देखें' },
      offline: { title: 'अलर्ट और ऑफलाइन केंद्र', subtitle: 'SMS अलर्ट, ऑफलाइन 1930 गाइड और डाउनलोड पैक' },
      contact: { title: 'संपर्क और सहायता', subtitle: 'हेल्पलाइन नंबर और गाँव कार्यशाला अनुरोध' },
    },
  },
  kn: {
    brandTagline: 'ಪ್ರತಿ ಗ್ರಾಮೀಣ ಕುಟುಂಬಕ್ಕೂ ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಆರ್ಥಿಕ ಅರಿವು',
    heroHeadline: 'ನಿಮ್ಮ ಉಳಿತಾಯವನ್ನು ರಕ್ಷಿಸಿ. ಗ್ರಾಮದ ಆದಾಯವನ್ನು ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬೆಳೆಸಿ.',
    heroSubhead:
      'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನದ ಸುಲಭ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಠಗಳು, ಲೈವ್ ಉಳಿತಾಯ ಮತ್ತು ಬಡ್ಡಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗಳು ಹಾಗೂ ತಕ್ಷಣದ 1930 ಸೈಬರ್ ವಂಚನೆ ರಕ್ಷಣೆ — ಕಡಿಮೆ ನೆಟ್‌ವರ್ಕ್ ಫೋನ್‌ಗಳಲ್ಲೂ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.',
    reportFraudBtn: 'ತಕ್ಷಣ ವಂಚನೆ ವರದಿ ಮಾಡಿ',
    exploreModulesBtn: 'ಉಚಿತವಾಗಿ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ',
    helpline1930Title: '1930 ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ಸಹಾಯವಾಣಿ',
    helpline1930Desc: 'UPI, OTP ಅಥವಾ ಬ್ಯಾಂಕ್ ವಂಚನೆ ನಡೆದ 1 ಗಂಟೆಯೊಳಗೆ ಕರೆ ಮಾಡಿ ಕದ್ದ ಹಣವನ್ನು ತಡೆಯಿರಿ.',
    helpline14440Title: '14440 RBI ಸಚೇತ್ ಟೋಲ್-ಫ್ರೀ ಸಂಖ್ಯೆ',
    helpline14440Desc: 'ಬ್ಯಾಂಕ್ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಅನಧಿಕೃತ ಹಣ ಕಡಿತದ ಬಗ್ಗೆ ದೂರು ನೀಡಿ ಅಥವಾ RBI ನೆರವು ಪಡೆಯಿರಿ.',
    callNow: 'ಟೋಲ್-ಫ್ರೀ ಕರೆ ಮಾಡಿ',
    tickerLabel: 'ವಾರದ ವಂಚನೆ ಎಚ್ಚರಿಕೆ',
    pauseTicker: 'ನಿಲ್ಲಿಸಿ',
    playTicker: 'ಮುಂದುವರಿಸಿ',
    listenLabel: 'ಕೇಳಿ',
    stopListenLabel: 'ನಿಲ್ಲಿಸಿ',
    quickModulesTitle: '12 ಅಗತ್ಯ ಪಾಠಗಳು ಮತ್ತು ಸಾಧನಗಳು',
    quickModulesSub: 'ಯಾವುದೇ ಕಾರ್ಡ್ ತೆರೆಯಿರಿ. ಕನ್ನಡದಲ್ಲಿ ಕೇಳಲು ಎಲ್ಲಿಯಾದರೂ ರೂಬಿ ಸ್ಪೀಕರ್ ಬಟನ್ ಒತ್ತಿರಿ.',
    voiceHintText: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಲಭ್ಯವಿದೆ',
    statsTitle: 'ಸಬಲಗೊಂಡ ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳು',
    statFamilies: 'ತರಬೇತಿ ಪಡೆದ ಕುಟುಂಬಗಳು',
    statSavings: 'ಯೋಜಿತ ತುರ್ತು ಉಳಿತಾಯ',
    statQuizzes: 'ತಪ್ಪಿಸಿದ ವಂಚನೆ ಬಲೆಗಳು',
    nav: {
      home: 'ಮುಖಪುಟ',
      learn: 'ಕಲಿಯಿರಿ',
      tools: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      fraud: 'ವಂಚನೆ ಕೇಂದ್ರ',
      community: 'ಸಮುದಾಯ',
    },
    pages: {
      home: { title: 'GramFin ಮುಖಪುಟ', subtitle: 'ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಗ್ರಾಮೀಣ ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಸುರಕ್ಷತಾ ಸಂಗಾತಿ' },
      banking: { title: 'ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಭೂತ ಅಂಶಗಳು', subtitle: 'ಜೀರೋ-ಬ್ಯಾಲೆನ್ಸ್ ಖಾತೆ, ಸುರಕ್ಷಿತ AePS, ATM ಮತ್ತು ಪಾಸ್‌ಬುಕ್' },
      savings: { title: 'ಉಳಿತಾಯ ಮತ್ತು ಬಡ್ಡಿ ಸಾಧನಗಳು', subtitle: 'ತುರ್ತು ನಿಧಿ ಯೋಜನೆ ಮತ್ತು ಬ್ಯಾಂಕ್ ಬಡ್ಡಿಯ ನಿಖರ ಲೆಕ್ಕಾಚಾರ' },
      fraud: { title: 'ವಂಚನೆ ಜಾಗೃತಿ ಕೇಂದ್ರ', subtitle: 'ಗೋಲ್ಡನ್ ಅವರ್ ನೆರವು, AI ಸ್ಕ್ಯಾಮ್ ತಪಾಸಣೆ, ಸ್ಕ್ಯಾನರ್ ಮತ್ತು ರಸಪ್ರಶ್ನೆ' },
      budget: { title: 'ಹಣ ನಿರ್ವಹಣೆ', subtitle: 'ಮನೆ ಮತ್ತು ಕೃಷಿ ಆದಾಯ-ಖರ್ಚುಗಳ ಸುಲಭ ಬಜೆಟ್ ಚಾರ್ಟ್' },
      literacy: { title: 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ', subtitle: 'ಬ್ಯಾಂಕ್ ಸಾಲ vs ಲೇವಾದೇವಿದಾರರ ಬಡ್ಡಿ ಮತ್ತು ಪ್ರಮುಖ ದಾಖಲೆಗಳು' },
      income: { title: 'ಹೆಚ್ಚುವರಿ ಆದಾಯದ ಮಾರ್ಗಗಳು', subtitle: 'ಕೋಳಿ ಸಾಕಣೆ, ಕೈತೋಟ ಮತ್ತು ಸಣ್ಣ ಉದ್ಯಮದ ವೆಚ್ಚ-ಲಾಭ ಮಾರ್ಗದರ್ಶಿ' },
      economics: { title: 'ಹಣದುಬ್ಬರ ಮತ್ತು GDP', subtitle: 'ಬೆಲೆ ಏರಿಕೆ ಮತ್ತು ಗ್ರಾಮೀಣ ದುಡಿಮೆ GDP ಗೆ ಹೇಗೆ ನೆರವಾಗುತ್ತದೆ' },
      community: { title: 'ಸಮುದಾಯ ವೇದಿಕೆ', subtitle: 'ಸುರಕ್ಷಿತ ಪ್ರಶ್ನೋತ್ತರ ಮತ್ತು ಗ್ರಾಮಸ್ಥರ ಅನುಭವ ಹಂಚಿಕೆ' },
      badges: { title: 'ಪ್ರಗತಿ ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು', subtitle: 'ಪೂರ್ಣಗೊಂಡ ಪಾಠಗಳು, ರಸಪ್ರಶ್ನೆ ಅಂಕಗಳು ಮತ್ತು ಬಹುಮಾನಗಳು' },
      offline: { title: 'ಎಚ್ಚರಿಕೆ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಕೇಂದ್ರ', subtitle: 'SMS ಎಚ್ಚರಿಕೆ ನೋಂದಣಿ, ಆಫ್‌ಲೈನ್ 1930 ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್' },
      contact: { title: 'ಸಂಪರ್ಕ ಮತ್ತು ಸಹಾಯ', subtitle: 'ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಗ್ರಾಮ ಶಿಬಿರ ವಿನಂತಿ' },
    },
  },
};

export const SCAM_TICKER_ALERTS: Record<Language, string[]> = {
  en: [
    'SMS ALERT: Fake "PM-KISAN KYC Update.apk" links on WhatsApp steal bank OTPs. Never install APK files from strangers.',
    'UPI ALERT: Receiving money NEVER requires entering your UPI PIN. Decline any "Collect Request" promising lottery or refund.',
    'VOICE ALERT: Banks NEVER ask for Aadhaar OTP, ATM PIN, or CVV over phone calls. Hang up and dial 1930 within 1 hour.',
    'AePS ALERT: Always check your SMS balance alert immediately after biometric fingerprint withdrawal at a village CSP.',
  ],
  hi: [
    'SMS चेतावनी: WhatsApp पर "PM-KISAN KYC.apk" जैसे लिंक बैंक OTP चुराते हैं। अनजान APK फाइल कभी डाउनलोड न करें।',
    'UPI चेतावनी: पैसे प्राप्त करने के लिए कभी UPI PIN नहीं डालना पड़ता। इनाम या रिफंड के नाम पर आने वाली Collect Request तुरंत अस्वीकार करें।',
    'कॉल चेतावनी: कोई भी बैंक फोन पर आधार OTP, ATM PIN या CVV नहीं पूछता। तुरंत कॉल काटें और 1 घंटे में 1930 पर कॉल करें।',
    'AePS चेतावनी: फिंगरप्रिंट से पैसे निकालते समय तुरंत बैंक का SMS बैलेंस और रसीद ज़रूर जाँचें।',
  ],
  kn: [
    'SMS ಎಚ್ಚರಿಕೆ: WhatsApp ನಲ್ಲಿ ಬರುವ "PM-KISAN KYC.apk" ನಂತಹ ಲಿಂಕ್‌ಗಳು ಬ್ಯಾಂಕ್ OTP ಕದಿಯುತ್ತವೆ. ಅಪರಿಚಿತ APK ಫೈಲ್‌ಗಳನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.',
    'UPI ಎಚ್ಚರಿಕೆ: ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ UPI PIN ನಮೂದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ. ಬಹುಮಾನ ಅಥವಾ ರೀಫಂಡ್ ಹೆಸರಿನಲ್ಲಿ ಬರುವ Collect Request ತಿರಸ್ಕರಿಸಿ.',
    'ಕರೆ ಎಚ್ಚರಿಕೆ: ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಫೋನ್‌ನಲ್ಲಿ ಆಧಾರ್ OTP, ATM PIN ಅಥವಾ CVV ಕೇಳುವುದಿಲ್ಲ. ಕರೆ ಕಟ್ ಮಾಡಿ 1 ಗಂಟೆಯೊಳಗೆ 1930 ಗೆ ಕರೆ ಮಾಡಿ.',
    'AePS ಎಚ್ಚರಿಕೆ: ಗ್ರಾಮೀಣ CSP ಯಲ್ಲಿ ಬೆರಳಚ್ಚು ಮೂಲಕ ಹಣ ತೆಗೆದ ತಕ್ಷಣ ಬ್ಯಾಂಕ್ SMS ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸಿ.',
  ],
};
