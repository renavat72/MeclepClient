export const Validate = (email,firstName,secondName, password, confirmPassword,errors) => {
    const NameEx=/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    const EmailEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const ForbiddenWords =['Fuck','anal',	'dyke',	'jerkoff',	'scrotum',
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
    'dildo',	'honkey',	'rubyredbag'];

    //FirstName
    if (ForbiddenWords.includes(firstName)) {
        return ("This isn't available. Please try another.");
      }
  
      if (!NameEx.test(firstName)) {
        return 'First name must be a valid';
      }
      if (firstName.length > 10) {
        return 'First name no more than 10 characters.';
      }
      if (firstName.length < 2) {
        return 'First name no less than 2 characters.';
      }
  
      //SecondName
      if (ForbiddenWords.includes(secondName)) {
        return ("This isn't available. Please try another.");
      }
  
      if (!NameEx.test(secondName)) {
        return 'Second name must be a valid';
      }
      if (secondName.length > 10) {
        return 'Second name no more than 10 characters.';
      }
      if (secondName.length < 2) {
        return 'Second name no less than 2 characters.';
      }
  
      //Email
      if (ForbiddenWords.includes(email)) {
        return ("This isn't available. Please try another.");
      }
  
      if (email.trim() === '') {
        return 'Email must not be empty';
      } else {
        if (!EmailEx.test(String(email).toLowerCase()))  {
            return 'Email must be a valid email address';
        }
      }
  
      //Password
  
      if (password.length < 6) {
        return 'Password min 6 characters.';
      } else if (password !== confirmPassword) {
        return 'Passwords must match';
      }
      
}