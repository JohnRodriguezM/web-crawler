const {crawlPage} = require('./crawl/crawl')

const main = () => {
  if(process.argv.length < 3) {
    console.log('Please provide a URL')
    process.exit(1)
  }
  if(process.argv.length > 3) {
    console.log('Please provide only one URL')
    process.exit(2)
  }
  const url = process.argv[2]
  crawlPage(url)
}

main()
