var awardsCont = {
    editForm: $('#form-edit-award'),
    editModal: $('#editModal'),
    apiAwardUrl: $('#apiAwardUrl').val(),

    init: () => {
        awardsCont.editModal.on('show.bs.modal', awardsCont.showEditModal)

        $('#save-edit-form').click(() => {
            awardsCont.editForm.submit()
        })
    },

    showEditModal: (event) => {
        let button = $(event.relatedTarget)
        let award = button.data('award-id')
        let modal = ('#editModal')

        $.get(`${awardsCont.apiAwardUrl}${award}`)
            .done((data) => {
                console.log(data)

                awardsCont.editModal.find('.modal-title').text(data.name)

                awardsCont.editModal.find('.modal-body #awardId').val(data.id)
                awardsCont.editModal.find('.modal-body #awardName').val(data.name)
                awardsCont.editModal.find('.modal-body #awardCount').val(data.total_awards)
                awardsCont.editModal.find('.modal-body #awardPerDay').val(data.awards_per_day)
                awardsCont.editModal.find('.modal-body #awardActive').prop('checked', data.is_active)
            })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    awardsCont.init()
})