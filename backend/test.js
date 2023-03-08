const lots = [
    {
        id: 1,
        amount: 100
    },
    {
        id: 2,
        amount: 100
    },
    {
        id: 3,
        amount: 100
    },
]




const exportt = (num) => {
    var sum = 0
    lots.forEach((v, i, arr) => {
        sum += v.amount;
    })
    const totalamount = sum
    console.log({ "evailable balance ": sum })
    if (num > totalamount) {
        console.log('not enough')
        return
    }
    var remaining = num
    for (let index = 0; index < lots.length; index++) {
        const element = lots[index];
        var lotremain = element.amount
        console.log({ "Start remaining amount for transaction": remaining, "Start available in lot": lotremain })
        if (lotremain < remaining) {
            console.log('lot is smaller ++++++++++++++++++++')
            remaining = remaining - lotremain
            lotremain = 0
        } else if (lotremain > remaining) {
            console.log('lot is bigger +++++++++++++++++++++')
            lotremain = lotremain - remaining
            remaining = 0
        } else if (lotremain == remaining) {
            console.log('lot is equal ++++++++++++++++++++++')
            remaining = remaining - lotremain
            lotremain = 0
        }
        console.log({ "End remaining amount for transaction": remaining, "End available in lot": lotremain })
        console.log('cycle =================================================')
    }
}

exportt(50)