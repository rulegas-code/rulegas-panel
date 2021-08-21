var awardsCont = {
    totalBag: 0,
    price: 0,
    bag: 0,
    bagElement: $('#bag'),
    awardsForm: $('#form-awards'),
    formUrl: $('#form-url').val(),
    companySelect: $('#companyId'),
    awardCount: parseInt($('#awardCount').val()),
    numberFormatter: new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }),

    init: () => {
        let totalBag = $('#totalbag')
        totalBag.change((event) => {
            awardsCont.totalBag = parseFloat(totalBag.val())
            awardsCont.updateBag()
        })
        totalBag.change()

        let price = $('#price')
        price.change((event) => {
            awardsCont.price = parseFloat(price.val())
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
        awardsCont.bagElement.val(awardsCont.numberFormatter.format(awardsCont.bag))
    },

    updateAwardInfo: (event) => {
        let award = $(event.target).data('award')

        let awardPercent = parseFloat($(`#awardPercent${award}`).val())

        let percentage = awardPercent / 100.0

        let awardCashTotal = Math.floor(awardsCont.bag * percentage)
        let awardLtsTotal = Math.floor(awardsCont.totalBag * percentage)

        let check = $(`#awardTypeLts${award}`).prop('checked')

        let ltsPerAward = parseInt($(`#ltsPerAward${award}`).val())
        let cashPerAward = parseInt($(`#cashPerAward${award}`).val())

        let awardTotal = Math.floor(check ? awardLtsTotal / ltsPerAward : awardCashTotal / cashPerAward)

        $(`#awardLtsTotal${award}`).val(awardLtsTotal)
        $(`#awardTotal${award}`).val(awardTotal)
        $(`#awardCashTotal${award}`).val(awardsCont.numberFormatter.format(awardCashTotal))
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
                total: $(`#awardTotal${i}`).val(),
                perDay: $(`#awardPerDay${i}`).val()
            })
        }

        console.log(data)

        $.post({
            url: awardsCont.awardsForm.prop('action'),
            headers: {'X-CSRFToken': $('#form-awards [name="csrfmiddlewaretoken"]').val()},
            data: JSON.stringify(data),
            processData: false,
            contentType: 'application/json',
            dataType: 'json'
        })
            .done(() => {
                awardsCont.showAlert('success', 'Se guardaron los premios correctamente.')
            })
            .fail(() => {
                awardsCont.showAlert('danger', 'Ocurrió un error al guardar los premios.')
            })
    },

    showAlert: (type, message) => {
        $('#alert-submit').html(`
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
    }
}


document.addEventListener("DOMContentLoaded", () => {
    awardsCont.init()
})