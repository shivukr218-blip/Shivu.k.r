import type { BadgeDef, ForumPost, Language, PageId, QuizQuestion } from '../types';

export interface QuickModuleCard {
  id: PageId;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  category: Record<Language, string>;
  duration: string;
  iconName: string;
}

export const QUICK_MODULES: QuickModuleCard[] = [
  {
    id: 'banking',
    title: { en: 'Banking Basics', hi: 'बैंकिंग की मूल बातें', kn: 'ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಭೂತ ಅಂಶಗಳು' },
    summary: {
      en: 'Open zero-balance accounts, use AePS safely & read passbooks.',
      hi: 'जन धन खाता, सुरक्षित अंगूठा बैंकिंग और पासबुक पढ़ना सीखें।',
      kn: 'ಜೀರೋ-ಬ್ಯಾಲೆನ್ಸ್ ಖಾತೆ ತೆರೆಯಿರಿ, ಸುರಕ್ಷಿತವಾಗಿ AePS ಬಳಸಿ ಮತ್ತು ಪಾಸ್‌ಬುಕ್ ಓದಿ.',
    },
    category: { en: 'Foundation', hi: 'बुनियादी पाठ', kn: 'ಮೂಲಭೂತ' },
    duration: '5 min',
    iconName: 'Landmark',
  },
  {
    id: 'savings',
    title: { en: 'Savings & Interest Tools', hi: 'बचत और ब्याज कैलकुलेटर', kn: 'ಉಳಿತಾಯ ಮತ್ತು ಬಡ್ಡಿ ಸಾಧನಗಳು' },
    summary: {
      en: 'Plan emergency funds and calculate daily & quarterly bank interest.',
      hi: 'आपातकालीन फंड बनाएँ और तिमाही बैंक ब्याज की गणना करें।',
      kn: 'ತುರ್ತು ನಿಧಿ ಯೋಜಿಸಿ ಮತ್ತು ದೈನಂದಿನ ಹಾಗೂ ತ್ರೈಮಾಸಿಕ ಬ್ಯಾಂಕ್ ಬಡ್ಡಿ ಲೆಕ್ಕ ಹಾಕಿ.',
    },
    category: { en: 'Calculator', hi: 'कैलकुलेटर', kn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್' },
    duration: 'Interactive',
    iconName: 'PiggyBank',
  },
  {
    id: 'fraud',
    title: { en: 'Fraud Awareness Hub', hi: 'फ्रॉड जागरूकता केंद्र', kn: 'ವಂಚನೆ ಜಾಗೃತಿ ಕೇಂದ್ರ' },
    summary: {
      en: 'Golden Hour 1930 guide, AI SMS scam detector, OCR scanner & quiz.',
      hi: 'गोल्डन आवर गाइड, AI स्कैम जांच, स्क्रीनशॉट स्कैनर और क्विज़।',
      kn: 'ಗೋಲ್ಡನ್ ಅವರ್ 1930 ಮಾರ್ಗದರ್ಶಿ, AI SMS ವಂಚನೆ ಪತ್ತೆ, OCR ಸ್ಕ್ಯಾನರ್ ಮತ್ತು ರಸಪ್ರಶ್ನೆ.',
    },
    category: { en: 'Protection', hi: 'सुरक्षा', kn: 'ರಕ್ಷಣೆ' },
    duration: '8 min',
    iconName: 'ShieldAlert',
  },
  {
    id: 'budget',
    title: { en: 'Money Management', hi: 'पैसे का हिसाब-किताब', kn: 'ಹಣ ನಿರ್ವಹಣೆ' },
    summary: {
      en: 'Track farm & household income with smart expense categorization.',
      hi: 'खेती और घर के खर्चों का आसान चार्ट और स्मार्ट वर्गीकरण।',
      kn: 'ಸ್ಮಾರ್ಟ್ ವರ್ಗೀಕರಣದೊಂದಿಗೆ ಕೃಷಿ ಮತ್ತು ಮನೆ ಆದಾಯ-ಖರ್ಚುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    },
    category: { en: 'Tool', hi: 'उपकरण', kn: 'ಸಾಧನ' },
    duration: 'Interactive',
    iconName: 'PieChart',
  },
  {
    id: 'literacy',
    title: { en: 'Financial Literacy', hi: 'वित्तीय साक्षरता', kn: 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ' },
    summary: {
      en: 'Compare 7% bank loans vs. 36% moneylenders and organize KYC papers.',
      hi: 'बैंक ऋण बनाम साहूकार का ब्याज और ज़रूरी कागज़ात की सूची।',
      kn: '7% ಬ್ಯಾಂಕ್ ಸಾಲ vs 36% ಲೇವಾದೇವಿದಾರರ ಬಡ್ಡಿ ಹೋಲಿಸಿ ಮತ್ತು KYC ದಾಖಲೆಗಳನ್ನು ಜೋಡಿಸಿ.',
    },
    category: { en: 'Core Lesson', hi: 'मुख्य पाठ', kn: 'ಮುಖ್ಯ ಪಾಠ' },
    duration: '6 min',
    iconName: 'BookOpen',
  },
  {
    id: 'income',
    title: { en: 'Income Diversification', hi: 'अतिरिक्त कमाई के साधन', kn: 'ಹೆಚ್ಚುವರಿ ಆದಾಯದ ಮಾರ್ಗಗಳು' },
    summary: {
      en: 'Startup costs & monthly profit plans for poultry, kitchen gardens & dairy.',
      hi: 'मुर्गीपालन, किचन गार्डन, डेयरी व सिलाई से अतिरिक्त आय की योजना।',
      kn: 'ಕೋಳಿ ಸಾಕಣೆ, ಕೈತೋಟ ಮತ್ತು ಹೈನುಗಾರಿಕೆಯ ಆರಂಭಿಕ ವೆಚ್ಚ ಹಾಗೂ ಮಾಸಿಕ ಲಾಭದ ಯೋಜನೆ.',
    },
    category: { en: 'Livelihood', hi: 'आजीविका', kn: 'ಜೀವನೋಪಾಯ' },
    duration: '6 min',
    iconName: 'Sprout',
  },
  {
    id: 'economics',
    title: { en: 'Inflation & GDP', hi: 'महंगाई और GDP', kn: 'ಹಣದುಬ್ಬರ ಮತ್ತು GDP' },
    summary: {
      en: 'See why prices rise over 10 years and how rural work builds GDP.',
      hi: '10 साल में महंगाई का असर और गाँव की मेहनत से GDP कैसे बढ़ती है।',
      kn: '10 ವರ್ಷಗಳಲ್ಲಿ ಬೆಲೆಗಳು ಏಕೆ ಏರುತ್ತವೆ ಮತ್ತು ಗ್ರಾಮೀಣ ದುಡಿಮೆ GDP ಯನ್ನು ಹೇಗೆ ಬೆಳೆಸುತ್ತದೆ.',
    },
    category: { en: 'Economics', hi: 'अर्थशास्त्र', kn: 'ಅರ್ಥಶಾಸ್ತ್ರ' },
    duration: '4 min',
    iconName: 'TrendingUp',
  },
  {
    id: 'community',
    title: { en: 'Community Forum', hi: 'समुदाय मंच (Q&A)', kn: 'ಸಮುದಾಯ ವೇದಿಕೆ (Q&A)' },
    summary: {
      en: 'Ask safe questions, upvote trusted peer tips, and share village stories.',
      hi: 'सुरक्षित सवाल पूछें, भरोसेमंद जवाब पढ़ें और अनुभव साझा करें।',
      kn: 'ಸುರಕ್ಷಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ, ಉಪಯುಕ್ತ ಸಲಹೆಗಳಿಗೆ ಮತ ನೀಡಿ ಮತ್ತು ಗ್ರಾಮದ ಕಥೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
    },
    category: { en: 'Peer Q&A', hi: 'चर्चा', kn: 'ಚರ್ಚೆ' },
    duration: 'Live',
    iconName: 'Users',
  },
  {
    id: 'badges',
    title: { en: 'Gamification & Badges', hi: 'बैज और प्रगति', kn: 'ಪ್ರಗತಿ ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು' },
    summary: {
      en: 'Track your literacy progress rings, XP points & earned badges.',
      hi: 'अपनी सीखने की प्रगति, अंक और अर्जित बैज यहाँ देखें।',
      kn: 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಪ್ರಗತಿ, XP ಅಂಕಗಳು ಮತ್ತು ಗಳಿಸಿದ ಬ್ಯಾಡ್ಜ್‌ಗಳನ್ನು ನೋಡಿ.',
    },
    category: { en: 'Rewards', hi: 'प्रगति', kn: 'ಬಹುಮಾನ' },
    duration: 'Progress',
    iconName: 'Award',
  },
  {
    id: 'offline',
    title: { en: 'Alerts & Offline Hub', hi: 'अलर्ट और ऑफलाइन केंद्र', kn: 'ಎಚ್ಚರಿಕೆ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಕೇಂದ್ರ' },
    summary: {
      en: 'Subscribe to SMS scam tips, download offline guides & bank numbers.',
      hi: 'SMS चेतावनी सेवा, ऑफलाइन 1930 गाइड और डाउनलोड करने योग्य पाठ।',
      kn: 'SMS ವಂಚನೆ ಎಚ್ಚರಿಕೆಗೆ ಸೇರಿ, ಆಫ್‌ಲೈನ್ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸಂಖ್ಯೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
    },
    category: { en: 'Offline Ready', hi: 'ऑफलाइन', kn: 'ಆಫ್‌ಲೈನ್' },
    duration: 'Cached',
    iconName: 'WifiOff',
  },
  {
    id: 'contact',
    title: { en: 'Contact & Help', hi: 'संपर्क और सहायता', kn: 'ಸಂಪರ್ಕ ಮತ್ತು ಸಹಾಯ' },
    summary: {
      en: 'Helpline directory, village camp requests & direct support form.',
      hi: 'सभी हेल्पलाइन नंबर और गाँव में वित्तीय शिविर का अनुरोध करें।',
      kn: 'ಸಹಾಯವಾಣಿ ಪಟ್ಟಿ, ಗ್ರಾಮ ಶಿಬಿರ ವಿನಂತಿ ಮತ್ತು ನೇರ ಬೆಂಬಲ ಅರ್ಜಿ.',
    },
    category: { en: 'Support', hi: 'सहायता', kn: 'ಬೆಂಬಲ' },
    duration: '24x7',
    iconName: 'PhoneCall',
  },
];

export const BADGE_DEFINITIONS: BadgeDef[] = [
  {
    id: 'first-step-banking',
    title: { en: 'Safe Banker', hi: 'सुरक्षित बैंकर', kn: 'ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕರ್' },
    description: {
      en: 'Completed Banking Basics and learned safe AePS & ATM rules.',
      hi: 'बैंकिंग की मूल बातें पूरी कीं और सुरक्षित ATM व AePS नियम सीखे।',
      kn: 'ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಭೂತ ಪಾಠ ಪೂರ್ಣಗೊಳಿಸಿ ಸುರಕ್ಷಿತ AePS ಮತ್ತು ATM ನಿಯಮಗಳನ್ನು ಕಲಿತಿದ್ದೀರಿ.',
    },
    xpReward: 100,
    iconName: 'Landmark',
  },
  {
    id: 'fraud-fighter',
    title: { en: 'Fraud Fighter', hi: 'फ्रॉड रक्षक', kn: 'ವಂಚನೆ ಹೋರಾಟಗಾರ' },
    description: {
      en: 'Scored 75%+ on the Rural Cyber Fraud Awareness Quiz.',
      hi: 'साइबर फ्रॉड जागरूकता क्विज़ में 75% या अधिक अंक प्राप्त किए।',
      kn: 'ಗ್ರಾಮೀಣ ಸೈಬರ್ ವಂಚನೆ ಜಾಗೃತಿ ರಸಪ್ರಶ್ನೆಯಲ್ಲಿ 75%+ ಅಂಕ ಗಳಿಸಿದ್ದೀರಿ.',
    },
    xpReward: 150,
    iconName: 'ShieldCheck',
  },
  {
    id: 'first-step-saver',
    title: { en: 'Emergency Planner', hi: 'आपातकालीन बचतकर्ता', kn: 'ತುರ್ತು ಉಳಿತಾಯಗಾರ' },
    description: {
      en: 'Planned an emergency fund and tested the Interest Calculator.',
      hi: 'आपातकालीन बचत की योजना बनाई और ब्याज कैलकुलेटर का उपयोग किया।',
      kn: 'ತುರ್ತು ನಿಧಿಯನ್ನು ಯೋಜಿಸಿ ಬಡ್ಡಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಬಳಸಿದ್ದೀರಿ.',
    },
    xpReward: 100,
    iconName: 'PiggyBank',
  },
  {
    id: 'budget-master',
    title: { en: 'Budget Master', hi: 'बजट मास्टर', kn: 'ಬಜೆಟ್ ಮಾಸ್ಟರ್' },
    description: {
      en: 'Logged income and expenses in the Money Management dashboard.',
      hi: 'बजट डैशबोर्ड में आमदनी और खर्च का सही हिसाब दर्ज किया।',
      kn: 'ಹಣ ನಿರ್ವಹಣೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಆದಾಯ ಮತ್ತು ಖರ್ಚುಗಳನ್ನು ದಾಖಲಿಸಿದ್ದೀರಿ.',
    },
    xpReward: 120,
    iconName: 'PieChart',
  },
  {
    id: 'smart-borrower',
    title: { en: 'Smart Borrower', hi: 'समझदार ऋणी', kn: 'ಬುದ್ಧಿವಂತ ಸಾಲಗಾರ' },
    description: {
      en: 'Completed Financial Literacy lessons on bank loans vs. moneylenders.',
      hi: 'बैंक ऋण और दस्तावेज़ों से जुड़े सभी वित्तीय पाठ पूरे किए।',
      kn: 'ಬ್ಯಾಂಕ್ ಸಾಲ vs ಲೇವಾದೇವಿದಾರರ ಬಡ್ಡಿ ಕುರಿತ ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ ಪಾಠ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.',
    },
    xpReward: 120,
    iconName: 'BookOpen',
  },
  {
    id: 'village-guardian',
    title: { en: 'Village Guardian', hi: 'ग्राम प्रहरी', kn: 'ಗ್ರಾಮ ರಕ್ಷಕ' },
    description: {
      en: 'Checked Offline Hub or participated in the Community Forum.',
      hi: 'ऑफलाइन सुरक्षा केंद्र देखा या समुदाय मंच में भाग लिया।',
      kn: 'ಆಫ್‌ಲೈನ್ ಸುರಕ್ಷತಾ ಕೇಂದ್ರ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಸಮುದಾಯ ವೇದಿಕೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದ್ದೀರಿ.',
    },
    xpReward: 100,
    iconName: 'Users',
  },
];

export const FRAUD_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    scenario: {
      en: 'You receive an SMS: "Your bank KYC has expired. Account will close tonight. Click bit.ly/kyc-bank99 and enter Aadhaar + OTP." What should you do?',
      hi: 'आपको SMS आता है: "आपका बैंक KYC समाप्त हो गया है। आज रात खाता बंद होगा। bit.ly/kyc-bank99 पर आधार और OTP डालें।" आप क्या करेंगे?',
      kn: 'ನಿಮಗೆ ಒಂದು SMS ಬರುತ್ತದೆ: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ KYC ಅವಧಿ ಮುಗಿದಿದೆ. ಇಂದು ರಾತ್ರಿ ಖಾತೆ ಬಂದ್ ಆಗುತ್ತದೆ. bit.ly/kyc-bank99 ಕ್ಲಿಕ್ ಮಾಡಿ ಆಧಾರ್ ಮತ್ತು OTP ನಮೂದಿಸಿ." ನೀವು ಏನು ಮಾಡಬೇಕು?',
    },
    options: {
      en: [
        'Click the link quickly so my pension does not stop',
        'Delete the SMS, never click unknown links, and verify directly at my bank branch',
        'Reply with my Aadhaar number only, without OTP',
      ],
      hi: [
        'तुरंत लिंक पर क्लिक करें ताकि पेंशन न रुके',
        'SMS डिलीट करें, अनजान लिंक पर न जाएँ और सीधे बैंक शाखा से जाँच करें',
        'बिना OTP के केवल आधार नंबर भेज दें',
      ],
      kn: [
        'ಪಿಂಚಣಿ ನಿಲ್ಲದಂತೆ ತಕ್ಷಣ ಲಿಂಕ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
        'SMS ಅಳಿಸಿ, ಅಪರಿಚಿತ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಮತ್ತು ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಶಾಖೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ',
        'OTP ಇಲ್ಲದೆ ಕೇವಲ ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ಕಳುಹಿಸಿ',
      ],
    },
    correctIndex: 1,
    explanation: {
      en: 'Banks NEVER send shortened links (bit.ly) threatening same-night account closure. KYC is updated inside the bank branch or official bank app only.',
      hi: 'बैंक कभी भी एक ही रात में खाता बंद करने की धमकी वाला संक्षिप्त लिंक नहीं भेजता। KYC केवल बैंक शाखा या आधिकारिक ऐप से होता है।',
      kn: 'ಬ್ಯಾಂಕ್‌ಗಳು ಎಂದಿಗೂ ಒಂದೇ ರಾತ್ರಿಯಲ್ಲಿ ಖಾತೆ ಮುಚ್ಚುವ ಬೆದರಿಕೆಯ ಶಾರ್ಟ್ ಲಿಂಕ್ (bit.ly) ಕಳುಹಿಸುವುದಿಲ್ಲ. KYC ಬ್ಯಾಂಕ್ ಶಾಖೆಯಲ್ಲಿ ಮಾತ್ರ ಆಗುತ್ತದೆ.',
    },
  },
  {
    id: 'q2',
    scenario: {
      en: 'A buyer wants to pay ₹2,500 for your vegetables via UPI. He sends a UPI "Collect / Pay Request" and says "Enter your PIN to receive the ₹2,500." Is this real?',
      hi: 'एक खरीदार आपकी सब्ज़ियों के ₹2,500 UPI से भेजने के लिए "Pay/Collect Request" भेजता है और कहता है "पैसे पाने के लिए अपना UPI PIN डालें।" क्या यह सही है?',
      kn: 'ನಿಮ್ಮ ತರಕಾರಿಗಳಿಗೆ ₹2,500 UPI ಮೂಲಕ ಕೊಡಲು ಒಬ್ಬರು "Collect / Pay Request" ಕಳುಹಿಸಿ "₹2,500 ಪಡೆಯಲು ನಿಮ್ಮ UPI PIN ಹಾಕಿ" ಎನ್ನುತ್ತಾರೆ. ಇದು ನಿಜವೇ?',
    },
    options: {
      en: [
        'Yes, entering PIN is needed to accept money',
        'No! Entering a UPI PIN ALWAYS sends money OUT of your account. Decline immediately.',
        'Try once with ₹1 first',
      ],
      hi: [
        'हाँ, पैसे लेने के लिए PIN डालना पड़ता है',
        'नहीं! UPI PIN डालने से हमेशा आपके खाते से पैसे कटते हैं। तुरंत अस्वीकार करें।',
        'पहले ₹1 से कोशिश करें',
      ],
      kn: [
        'ಹೌದು, ಹಣ ಪಡೆಯಲು PIN ಹಾಕುವುದು ಅಗತ್ಯ',
        'ಇಲ್ಲ! UPI PIN ಹಾಕಿದರೆ ಯಾವಾಗಲೂ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ. ತಕ್ಷಣ ತಿರಸ್ಕರಿಸಿ.',
        'ಮೊದಲು ₹1 ಪ್ರಯತ್ನಿಸಿ ನೋಡಿ',
      ],
    },
    correctIndex: 1,
    explanation: {
      en: 'Golden Rule of UPI: You NEVER need a PIN or QR scan to RECEIVE money. PIN is only for SENDING money.',
      hi: 'UPI का सुनहरा नियम: पैसे पाने के लिए कभी PIN या QR स्कैन नहीं करना पड़ता। PIN केवल पैसे भेजने के लिए होता है।',
      kn: 'UPI ಸುವರ್ಣ ನಿಯಮ: ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ PIN ಅಥವಾ QR ಸ್ಕ್ಯಾನ್ ಬೇಕಾಗಿಲ್ಲ. ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ PIN ಅಗತ್ಯ.',
    },
  },
  {
    id: 'q3',
    scenario: {
      en: 'Someone calls claiming to be from "Kisan Lottery Department" and asks you to install "AnyDesk / QuickSupport" app to verify your ₹50,000 prize.',
      hi: 'कोई व्यक्ति "किसान लॉटरी विभाग" से बोलकर ₹50,000 का इनाम पाने के लिए "AnyDesk / QuickSupport" ऐप डाउनलोड करने को कहता है।',
      kn: 'ಯಾರೋ "ಕಿಸಾನ್ ಲಾಟರಿ ಇಲಾಖೆ" ಯಿಂದ ಕರೆ ಮಾಡಿ ₹50,000 ಬಹುಮಾನ ಪಡೆಯಲು "AnyDesk / QuickSupport" ಆಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಕೇಳುತ್ತಾರೆ.',
    },
    options: {
      en: [
        'Never install screen-sharing apps for callers — it lets scammers see your OTP and empty your bank',
        'Install it just for 2 minutes to check the prize',
        'Give them your son’s phone number instead',
      ],
      hi: [
        'कॉलर के कहने पर स्क्रीन-शेयरिंग ऐप कभी न डालें — इससे ठग आपका OTP देख सकते हैं',
        'इनाम देखने के लिए सिर्फ 2 मिनट के लिए ऐप डाल लें',
        'बेटे का फोन नंबर दे दें',
      ],
      kn: [
        'ಕರೆ ಮಾಡಿದವರ ಮಾತಿಗೆ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆಪ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ — ಇದರಿಂದ ವಂಚಕರು ನಿಮ್ಮ OTP ನೋಡುತ್ತಾರೆ',
        'ಬಹುಮಾನ ನೋಡಲು ಕೇವಲ 2 ನಿಮಿಷ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
        'ಅವರಿಗೆ ಮಗನ ಫೋನ್ ನಂಬರ್ ಕೊಡಿ',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: 'Screen-sharing apps (AnyDesk, TeamViewer, QuickSupport) let scammers control your phone remotely and read every bank OTP.',
      hi: 'स्क्रीन-शेयरिंग ऐप (AnyDesk आदि) से ठग दूर बैठे आपका फोन चला सकते हैं और सारे OTP पढ़ सकते हैं।',
      kn: 'ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆಪ್‌ಗಳು (AnyDesk, QuickSupport) ವಂಚಕರಿಗೆ ನಿಮ್ಮ ಫೋನ್ ನಿಯಂತ್ರಿಸಲು ಮತ್ತು ಎಲ್ಲಾ OTP ಓದಲು ಅವಕಾಶ ನೀಡುತ್ತವೆ.',
    },
  },
  {
    id: 'q4',
    scenario: {
      en: 'Money was stolen from your bank account 15 minutes ago through a fake link. What is your MOST urgent first step?',
      hi: '15 मिनट पहले एक नकली लिंक से आपके खाते से पैसे कट गए। आपका सबसे पहला और ज़रूरी कदम क्या होना चाहिए?',
      kn: '15 ನಿಮಿಷಗಳ ಹಿಂದೆ ನಕಲಿ ಲಿಂಕ್ ಮೂಲಕ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಹಣ ಕಳವಾಗಿದೆ. ನಿಮ್ಮ ಮೊದಲ ತುರ್ತು ಹೆಜ್ಜೆ ಯಾವುದು?',
    },
    options: {
      en: [
        'Wait until Monday morning to visit the bank',
        'Call 1930 immediately within the Golden Hour (1 hour) and block your card/UPI',
        'Post your bank account number on social media asking for help',
      ],
      hi: [
        'सोमवार सुबह बैंक खुलने का इंतज़ार करें',
        'गोल्डन आवर (1 घंटे) के भीतर तुरंत 1930 पर कॉल करें और कार्ड/UPI ब्लॉक करें',
        'सोशल मीडिया पर खाता नंबर लिखकर मदद माँगें',
      ],
      kn: [
        'ಸೋಮವಾರ ಬೆಳಿಗ್ಗೆ ಬ್ಯಾಂಕ್ ತೆರೆಯುವವರೆಗೆ ಕಾಯಿರಿ',
        'ಗೋಲ್ಡನ್ ಅವರ್ (1 ಗಂಟೆ) ಒಳಗೆ ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಕಾರ್ಡ್/UPI ಬ್ಲಾಕ್ ಮಾಡಿ',
        'ಸಹಾಯಕ್ಕಾಗಿ ಸಾಮಾಜಿಕ ಜಾಲತಾಣದಲ್ಲಿ ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಖ್ಯೆ ಹಾಕಿ',
      ],
    },
    correctIndex: 1,
    explanation: {
      en: 'Calling 1930 within the first hour ("Golden Hour") helps cyber police put an immediate lien/freeze on the scammer’s receiving account before cash is withdrawn.',
      hi: 'पहले 1 घंटे (गोल्डन आवर) में 1930 पर कॉल करने से साइबर पुलिस ठग के खाते में पैसा फ्रीज़ कर सकती है।',
      kn: 'ಮೊದಲ 1 ಗಂಟೆಯೊಳಗೆ ("ಗೋಲ್ಡನ್ ಅವರ್") 1930 ಗೆ ಕರೆ ಮಾಡುವುದರಿಂದ ಸೈಬರ್ ಪೊಲೀಸರು ವಂಚಕರ ಖಾತೆಯಲ್ಲಿ ಹಣವನ್ನು ತಕ್ಷಣ ಫ್ರೀಜ್ ಮಾಡಬಹುದು.',
    },
  },
];

export const BANK_HELPLINES = [
  { name: 'National Cyber Crime Helpline', tollFree: '1930', note: '24x7 Fraud Freeze & Reporting', url: 'https://cybercrime.gov.in' },
  { name: 'RBI Sachet / Customer Care', tollFree: '14440', note: 'Unauthorized Deduction & Banking Rules', url: 'https://sachet.rbi.org.in' },
  { name: 'State Bank of India (SBI)', tollFree: '1800 1234', note: 'Block ATM Card / Unauthorized UPI', url: 'https://sbi.co.in' },
  { name: 'Punjab National Bank (PNB)', tollFree: '1800 1800', note: '24x7 Card & NetBanking Block', url: 'https://pnbindia.in' },
  { name: 'Bank of Baroda (BoB)', tollFree: '1800 5700', note: 'Freeze Account / Debit Card Block', url: 'https://bankofbaroda.in' },
  { name: 'HDFC / ICICI / Axis Emergency', tollFree: '1800 1600', note: 'Instant Fraud & Card Hotlisting', url: 'https://rbi.org.in' },
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Ramesh Patil',
    village: 'Satara District',
    category: 'Fraud Alerts',
    title: 'Fake electricity bill disconnection WhatsApp message warning',
    body: 'Yesterday I received a WhatsApp message saying our farm pump electricity will cut tonight at 9 PM unless I call a personal mobile number. I called our local MSEDCL office directly and confirmed it was a scam. Never call numbers inside random WhatsApp texts!',
    upvotes: 28,
    timestamp: '2 days ago',
    replies: [
      {
        id: 'r-1',
        author: 'Sunita Devi',
        village: 'Wardha Block',
        text: 'Thank you for sharing! Two neighbours in our SHG group got the exact same message last week. We reported the number on Chakshu portal.',
        timestamp: '1 day ago',
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Kavita Yadav',
    village: 'Barabanki',
    category: 'Savings',
    title: 'How our women SHG saved ₹18,000 before monsoon using the 20% harvest rule',
    body: 'Instead of keeping all harvest cash at home, our 10-member group opened individual zero-balance accounts and moved 20% of every weekly vegetable sale into recurring deposits. It covered our children’s school fees without taking any 5%-per-month loan.',
    upvotes: 41,
    timestamp: '4 days ago',
    replies: [],
  },
  {
    id: 'post-3',
    author: 'Mahesh Verma',
    village: 'Sikar',
    category: 'Farming & Loans',
    title: 'Kisan Credit Card (KCC) interest subvention tip — pay on time for 4% effective rate',
    body: 'Many farmers do not realize that if you repay your KCC crop loan on or before the due date, the government interest subvention reduces your effective interest from 7% down to 4% per year!',
    upvotes: 35,
    timestamp: '6 days ago',
    replies: [],
  },
];
