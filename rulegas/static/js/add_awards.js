var awardsCont = {
    totalBag: $('#totalbag'),
    price: $('#price'),
    bag: $('#bag'),
    awardsForm: $('#form-awards'),
    companySelect: $('#companyId'),
    awardsCount: 0,

    init: () => {
        awardsCont.totalBag.change(awardsCont.updateBag)

        awardsCont.price.change(awardsCont.updateBag)

        $('#add-row').click(awardsCont.addAwardRow)

        awardsCont.awardsForm.submit((event) => {
            event.preventDefault()

            let data = {
                totalBag: awardsCont.totalBag.val(),
                price: awardsCont.price.val(),
                companyId: awardsCont.companySelect.val(),
                awards: []
            }

            for (let i = 0; i < awardsCont.awardsCount; i++) {
                let awardClass = `award${i}`

                data.awards.push({
                    probability: $(`.${awardClass}.awardProbability`).val(),
                    name: $(`.${awardClass}.awardName`).val(),
                    lts: $(`.${awardClass}.awardLts`).val(),
                    count: $(`.${awardClass}.awardCount`).val(),
                    amount: $(`.${awardClass}.awardAmount`).val(),
                    perDay: $(`.${awardClass}.awardPerDay`).val()
                })
            }

            console.log(data)

            $.post({
                url: '/api/awards/save',
                headers: {'X-CSRFToken':$('#form-awards [name="csrfmiddlewaretoken"]').val()},
                data: JSON.stringify(data),
                processData: false,
                contentType: 'application/json',
                dataType: 'json'
            })
        })

        awardsCont.addAwardRow()
    },
    updateBag: () => {
        awardsCont.bag.val((parseFloat(awardsCont.totalBag.val()) * parseFloat(awardsCont.price.val())).toFixed(2))
    },
    addAwardRow: () => {
        let awardClass = `award${awardsCont.awardsCount}`

        $('#section-awards').append(`
            <div class="form-group row">
                <div class="col-2 col-auto">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control ${awardClass} awardProbability" data-prize="${awardClass}">
                        <div class="input-group-append">
                            <div class="input-group-text">%</div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <input type="text" class="form-control ${awardClass} awardName">
                </div>
                <div class="col-2 col-auto">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control ${awardClass} awardLts" disabled>
                        <div class="input-group-append">
                            <div class="input-group-text">Lts</div>
                        </div>
                    </div>
                </div>
                <div class="col-2 col-auto">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control ${awardClass} awardCount" data-prize="${awardsCont.awardsCount}">
                    </div>
                </div>
                <div class="col-2 col-auto">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control ${awardClass} awardAmount" disabled>
                    </div>
                </div>
                <div class="col-1 col-auto">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control ${awardClass} awardPerDay">
                    </div>
                </div>
            </div>`)


        $(`.${awardClass}.awardProbability`).change(awardsCont.updateAwardInfo)

        awardsCont.awardsCount++
    },
    updateAwardInfo: (event) => {
        let totalBag = parseFloat(awardsCont.totalBag.val())
        let percentage = parseFloat(event.target.value) / 100.0
        let ltsPerAwards = totalBag * percentage
        let awardAmount = percentage * parseFloat(awardsCont.price.val())

        let awardClass = $(event.target).data('prize')

        $(`.${awardClass}.awardlts`).val(ltsPerAwards.toFixed(2))
        $(`.${awardClass}.awardamount`).val(awardAmount.toFixed(2))
    }
}


document.addEventListener("DOMContentLoaded", () => {
    awardsCont.init()
})