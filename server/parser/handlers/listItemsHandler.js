const cherio = require('cherio');

const createParserEvent = require('../../graphql/resolvers/parserEvent');
const {getPageContent} = require('../helpers/puppeteer');
const { formatPrice, formatPeriod } = require('../helpers/common');
const { taskQueue, p } = require('../index');


// const task = async initialData => {
 
// };


module.exports ={
  async listItemsHandler() {

    try {
      for (const initialData of eventsData){
        const detailContent = await getPageContent(initialData.urlContent);
        const $ = cherio.load(detailContent);
    
        let headerDescription = $('.info-widget__header').text();
        let description = $('.info-widget__description').text();
        let address = $('.unit__col-value-label').text();
        let time = $('.unit__col').text()
        let period = $('._2YgOJ').text();
        
  
        await createParserEvent(
          {input:{
            ...initialData,
            headerDescription,
            description,
            address,
            time,
            period,
          }
        });
      }
    } catch (err) {
      throw err;
    }
  }
}