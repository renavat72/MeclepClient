module.exports.validateRegisterInput = (
    firstName,
    secondName,
    email,
    password,
    confirmPassword
  ) => {
    const errors = {};
    const forbiddenWords =['Fuck','anal',	'dyke',	'jerkoff',	'scrotum',
    'ass',	'eatme',	'jewboy',	'shit',
    'bastard',	'fag',	'jizz',	'sitonmyface',
    'beatoff',	'faggot',	'kike',	'sixtynine',
    'bitch',	'fellatio',	'lesbo',	'slag',
    'BJ',	'fisting',	'limey',	'slant',
    'cameljockey',	'fleshflute',	'manloaf',	'sodomize',
    'chink',	'fleshpopsicle',	'masturbate',	'spankthemonkey',
    'circlejerk',	'fornicate',	'muffdiver',	'spearchucker',
    'clit',	'fuck',	'nigger',	'spic',
    'cock',	'fudgepacking',	'nutsack',	'spooge',
    'coolie',	'gangbang',	'paki',	'teabagging',
    'coon',	'genital',	'panface',	'testicles',
    'cornhole',	'getlaid',	'poontang',	'twat',
    'cum',	'gobtheknob',	'pubic',	'vagina',
    'cunt',	'goldenshower',	'pussy',	'wetback',
    'dago',	'gook',	'queef',	'whackoff',
    'deepthroating',	'hairpie',	'queer',	'whipitout',
    'dickhead',	'hardon',	'raghead',	'whiteswallow',
    'dickwad',	'homo',	'rimjob',	'wop',
    'dildo',	'honkey',	'rubyredbag']

    const NameEx=/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

    //FirstName
    if (forbiddenWords.includes(firstName)) {
      throw new Error("This isn't available. Please try another.");
    }

    if (!NameEx.test(firstName)) {
      errors.firstName = 'First name must be a valid';
    }
    if (firstName.length > 10) {
      errors.firstName = 'First name no more than 10 characters.';
    }
    if (firstName.length < 2) {
      errors.firstName = 'First name no less than 2 characters.';
    }

    //SecondName
    if (forbiddenWords.includes(secondName)) {
      throw new Error("This isn't available. Please try another.");
    }

    if (!NameEx.test(secondName)) {
      errors.secondName = 'Second name must be a valid';
    }
    if (secondName.length > 10) {
      errors.secondName = 'Second name no more than 10 characters.';
    }
    if (secondName.length < 2) {
      errors.secondName = 'Second name no less than 2 characters.';
    }

    //Email
    if (forbiddenWords.includes(email)) {
      throw new Error("This isn't available. Please try another.");
    }

    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } else {
      const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEx.test(String(email).toLowerCase()))  {
        errors.email = 'Email must be a valid email address';
      }
    }

    //Password

    if (password.length < 6) {
      errors.password = 'Password min 6 characters.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    
    //Forbidden words

   
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };
  
module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
      }
      
     if (password.trim() === '') {
        errors.password = 'Password must not be empty';
      }
    return {
        errors,
        valid: Object.keys(errors).length < 1
      };
}