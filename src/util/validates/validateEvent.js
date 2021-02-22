export const Validate = (nameOfEvent,aboutOfEvent,address, timeOfEvent, t) => {

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
        return (`${t('validateEvent.availableName')}`);
      }
      if (nameOfEvent.trim() === '') {
        return (`${t('validateEvent.emptyTitle')}`);
      }
      
      if (nameOfEvent.length > 20) {
        return (`${t('validateEvent.titleMore')}`);
      }
      if (nameOfEvent.length < 5) {
        return (`${t('validateEvent.titleLess')}`);
      }

      if (timeOfEvent.trim() === '') {
        return (`${t('validateEvent.emptyTime')}`);
      }

      if (address === undefined) {
        return (`${t('validateEvent.emptyAddress')}`);
      }

       //Description
  
       if (ForbiddenWords.includes(aboutOfEvent)) {
        return (`${t('validateEvent.availableName')}`);
      }
  
      if (aboutOfEvent.trim() === '') {
        return (`${t('validateEvent.emptyDescription')}`);
      }
      if (aboutOfEvent.length > 100) {
        return (`${t('validateEvent.descriptionMore')}`);
      }
      if (aboutOfEvent.length < 5) {
        return (`${t('validateEvent.descriptionLess')}`);
      }
}