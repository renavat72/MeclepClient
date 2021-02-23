export const Validate = (email, firstName, secondName, password, confirmPassword, t) => {
  const NameEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  const EmailEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ForbiddenWords = [
    'Fuck',
    'anal',
    'dyke',
    'jerkoff',
    'scrotum',
    'ass',
    'eatme',
    'jewboy',
    'shit',
    'bastard',
    'fag',
    'jizz',
    'sitonmyface',
    'beatoff',
    'faggot',
    'kike',
    'sixtynine',
    'bitch',
    'fellatio',
    'lesbo',
    'slag',
    'BJ',
    'fisting',
    'limey',
    'slant',
    'cameljockey',
    'fleshflute',
    'manloaf',
    'sodomize',
    'chink',
    'fleshpopsicle',
    'masturbate',
    'spankthemonkey',
    'circlejerk',
    'fornicate',
    'muffdiver',
    'spearchucker',
    'clit',
    'fuck',
    'nigger',
    'spic',
    'cock',
    'fudgepacking',
    'nutsack',
    'spooge',
    'coolie',
    'gangbang',
    'paki',
    'teabagging',
    'coon',
    'genital',
    'panface',
    'testicles',
    'cornhole',
    'getlaid',
    'poontang',
    'twat',
    'cum',
    'gobtheknob',
    'pubic',
    'vagina',
    'cunt',
    'goldenshower',
    'pussy',
    'wetback',
    'dago',
    'gook',
    'queef',
    'whackoff',
    'deepthroating',
    'hairpie',
    'queer',
    'whipitout',
    'dickhead',
    'hardon',
    'raghead',
    'whiteswallow',
    'dickwad',
    'homo',
    'rimjob',
    'wop',
    'dildo',
    'honkey',
    'rubyredbag',
  ];

  //FirstName
  if (ForbiddenWords.includes(firstName)) {
    return `${t('validateRegister.availableName')}`;
  }

  if (!NameEx.test(firstName)) {
    return `${t('validateRegister.validFistName')}`;
  }
  if (firstName.length > 10) {
    return `${t('validateRegister.firstNameMore')}`;
  }
  if (firstName.length < 2) {
    return `${t('validateRegister.firstNameLess')}`;
  }

  //SecondName
  if (ForbiddenWords.includes(secondName)) {
    return `${t('validateRegister.availableName')}`;
  }

  if (!NameEx.test(secondName)) {
    return `${t('validateRegister.validSecondName')}`;
  }
  if (secondName.length > 10) {
    return `${t('validateRegister.secondNameMore')}`;
  }
  if (secondName.length < 2) {
    return `${t('validateRegister.secondNameLess')}`;
  }

  //Email
  if (ForbiddenWords.includes(email)) {
    return `${t('validateRegister.availableName')}`;
  }

  if (email.trim() === '') {
    return `${t('validateRegister.emptyEmail')}`;
  } else {
    if (!EmailEx.test(String(email).toLowerCase())) {
      return `${t('validateRegister.validEmail')}`;
    }
  }

  //Password

  if (password.length < 6) {
    return `${t('validateRegister.passwordLess')}`;
  } else if (password !== confirmPassword) {
    return `${t('validateRegister.passwordMath')}`;
  }
};
