export const Validate = (nameOfEvent,aboutOfEvent,address, timeOfEvent) => {
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


      //Title
  
      if (ForbiddenWords.includes(nameOfEvent)) {
        return ("This isn't available. Please try another.");
      }
      if (nameOfEvent.trim() === '') {
        return 'Title must not be empty';
      }
      
      if (nameOfEvent.length > 20) {
        return 'Title no more than 12 characters.';
      }
      if (nameOfEvent.length < 5) {
        return 'Title no less than 5 characters.';
      }

      if (timeOfEvent.trim() === '') {
        return 'Time must not be empty';
      }

      if (address === undefined) {
        return 'Address must not be empty';
      }

       //Description
  
       if (ForbiddenWords.includes(aboutOfEvent)) {
        return ("This isn't available. Please try another.");
      }
  
      if (aboutOfEvent.trim() === '') {
        return 'Description must not be empty';
      }
      if (aboutOfEvent.length > 100) {
        return 'Description no more than 100 characters.';
      }
      if (aboutOfEvent.length < 5) {
        return 'Description no less than 5 characters.';
      }
}