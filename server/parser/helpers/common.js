function arrayFromLength(number) {
    return Array.from(new Array(number).keys()).map(k => k+1)
}

function formatPrice(priceStr) {
    const priceArr = priceStr.split(' – ')
    const [low, high] = priceArr.map(price => parseInt(price.replace(/[^0-9]/g, '')))

    return {
        low,
        high
    }
}

function formatPeriod(periodStr) {
    const periodArr = periodStr.split(' – ')
    const [start, end] = periodArr.map(year => parseInt(year))

    return {
        start,
        end
    }
}

module.exports = {arrayFromLength,formatPrice, formatPeriod }