let awardsCont = {
    awardsForm: $('#form-awards'),
    companySelect: $('#companyId'),
    awardCount: parseInt($('#awardCount').val()),

    init: () => {
        awardsCont.awardsForm.submit(awardsCont.saveAwards)

        let awardInfo = $(`.award-info`)
        awardInfo.change(awardsCont.updateAwardInfo)
        awardInfo.change()
    },

    updateAwardInfo: (event) => {
        let award = $(event.target).data('award')

        let awardAmount = rulegasCommons.parseFloat(`#awardAmount${award}`)

        let awardPercent = rulegasCommons.parseFloat(`#awardPercent${award}`)
        let percentage = awardPercent / 100.0

        let awardTotal = Math.floor(awardAmount * percentage)

        $(`#awardTotal${award}`).val(rulegasCommons.numberFormatter.format(awardTotal))
    },

    saveAwards: (event) => {
        event.preventDefault()

        let data = {
            companyId: awardsCont.companySelect.val(),
            multiple: rulegasCommons.parseInt(`#awardMultiple`),
            awards: []
        }

        for (let i = 0; i < awardsCont.awardCount; i++) {
            data.awards.push({
                tickets: $(`#awardTicket${i}`).val(),
                amount: $(`#awardAmount${i}`).val(),
                percentage: $(`#awardPercent${i}`).val(),
                total: $(`#awardTotal${i}`).val()
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