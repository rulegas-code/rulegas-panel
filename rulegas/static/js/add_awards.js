let awardsCont = {
    totalBag: 0,
    price: 0,
    bag: 0,
    bagElement: $('#bag'),
    awardsForm: $('#form-awards'),
    companySelect: $('#companyId'),
    awardCount: rulegasCommons.parseInt('#awardCount'),

    init: () => {
        let totalBag = $('#totalbag')
        totalBag.change(() => {
            awardsCont.totalBag = rulegasCommons.parseFloat(totalBag)
            awardsCont.updateBag()
        })
        totalBag.change()

        let price = $('#price')
        price.change(() => {
            awardsCont.price = rulegasCommons.parseFloat(price)
            awardsCont.updateBag()
        })
        price.change()

        awardsCont.awardsForm.submit(awardsCont.saveAwards)

        let awardType = $('.awardType')
        awardType.change(awardsCont.awardTypeChange)
        awardType.change()

        let awardInfo = $(`.award-info`)
        awardInfo.change(awardsCont.updateAwardInfo)
        awardInfo.change()
    },

    updateBag: () => {
        awardsCont.bag = awardsCont.totalBag * awardsCont.price
        awardsCont.bagElement.val(rulegasCommons.numberFormatter.format(awardsCont.bag))
    },

    updateAwardInfo: (event) => {
        let award = $(event.target).data('award')

        let awardPercent = rulegasCommons.parseFloat(`#awardPercent${award}`)

        let percentage = awardPercent / 100.0

        let awardCashTotal = Math.floor(awardsCont.bag * percentage)
        let awardLtsTotal = Math.floor(awardsCont.totalBag * percentage)

        let check = $(`#awardTypeLts${award}`).prop('checked')

        let ltsPerAward = rulegasCommons.parseInt(`#ltsPerAward${award}`)
        let cashPerAward = rulegasCommons.parseInt(`#cashPerAward${award}`)

        let awardTotal = Math.floor(check ? awardLtsTotal / ltsPerAward : awardCashTotal / cashPerAward)

        $(`#awardLtsTotal${award}`).val(awardLtsTotal)
        $(`#awardTotal${award}`).val(awardTotal)
        $(`#awardCashTotal${award}`).val(rulegasCommons.numberFormatter.format(awardCashTotal))
        $(`#awardPerDay${award}`).val(Math.floor(awardTotal / 30))
    },

    awardTypeChange: (event) => {
        let award = $(event.target).data('award')

        let awardLts = $(`#ltsPerAward${award}`)
        let awardCash = $(`#cashPerAward${award}`)

        let ltsCheck = $(`#awardTypeLts${award}`).prop('checked')

        awardLts.prop('disabled', !ltsCheck)
        awardCash.prop('disabled', ltsCheck)

        awardsCont.updateAwardInfo(event)
    },

    saveAwards: (event) => {
        event.preventDefault()

        let data = {
            totalBag: awardsCont.totalBag,
            price: awardsCont.price,
            companyId: awardsCont.companySelect.val(),
            awards: []
        }

        for (let i = 0; i < awardsCont.awardCount; i++) {
            data.awards.push({
                name: $(`#awardName${i}`).val(),
                total: rulegasCommons.parseInt(`#awardTotal${i}`),
                perDay: rulegasCommons.parseInt(`#awardPerDay${i}`)
            })
        }

        console.log(data)

        rulegasCommons.sendJsonRequest('post', awardsCont.awardsForm.prop('action'), data)
            .done(() => rulegasCommons.showSuccessAlert('#alert-submit', 'Se guardaron los premios correctamente.'))
            .fail(() => rulegasCommons.showDangerAlert('#alert-submit', 'Ocurrió un error al guardar los premios.'))
    }
}


document.addEventListener("DOMContentLoaded", () => {
    awardsCont.init()
})