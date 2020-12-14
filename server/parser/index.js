const {slugify} = require('transliteration');
const cherio = require('cherio');

const listItemsHandler = require('./handlers/listItemsHandler');
const { arrayFromLength } = require('./helpers/common');
const { getPageContent } = require('./helpers/puppeteer');
const createParserEvent = require('../graphql/resolvers/parserEvent');


const SITE = 'https://www.afisha.ru/msk/schedule_exhibition/';
const pages = 1;


async function main() {
  try {
    for(const page of arrayFromLength(pages)){
      const url = `${SITE}${pages}`
      const pageContent = getPageContent(url)
      const $ = cherio.load(pageContent);
          const eventsData = [];

          $('._1F19s').each((i, header) => {
            const url = $(header).attr('href');
            const urlContent = `https://www.afisha.ru${url}`
            const title = $(header).text();
            eventsData.push({
              title,
              urlContent,
              code: slugify(title)
            });
            const detailContent = getPageContent(urlContent);
            const $ = cherio.load(detailContent);
        
            let headerDescription = $('.info-widget__header').text();
            let description = $('.info-widget__description').text();
            let address = $('.unit__col-value-label').text();
            let time = $('.unit__col').text()
            let period = $('._2YgOJ').text();
            eventsData.push({
              title,
              urlContent,
              headerDescription,
              description,
              address,
              time,
              period,
            });
            console.log(eventsData)
            listItemsHandler(eventsData)
            PostData(
              
                    ...initialData,
                headerDescription,
                description,
                address,
                time,
                period,
              
            );
          });
          // await listItemsHandler(eventsData)
        }
  }
  catch(err){ console.log(err)}
}
main()
console.log(SITE)

function PostData(data){
  const { code } = data;

  const fileName = `${code}.json`;
  const savePath = path.join(__dirname, '..', 'data', fileName);

  const {  initialData,
    headerDescription,
    description,
    address,
    time,
    period} = data;
    
  return new Promise((resolve, reject)=>{
 
    createParserEvent(
      {
        input: {
      initialData,
      headerDescription,
      description,
      address,
      time,
      period,
    }
  });
if (err) {
  return reject(err);
}
  resolve();
})
}