const rulegasCommons = {
    numberFormatter: new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }),

    parseInt: (element) => parseInt($(element).val()),
    parseFloat: (element) => parseFloat($(element).val()),

    showAlert: (container, message, type) => $(container).html(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`),

    getCSRFToken: () => $('#form-awards [name="csrfmiddlewaretoken"]').val(),

    sendJsonRequest: (method, url, data) => $.ajax({
            method: method,
            url: url,
            headers: {'X-CSRFToken': rulegasCommons.getCSRFToken()},
            data: JSON.stringify(data),
            processData: false,
            contentType: 'application/json',
            dataType: 'json'
        }),

    showPrimaryAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'primary')
    },

    showSecondaryAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'secondary')
    },

    showSuccessAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'success')
    },

    showDangerAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'danger')
    },

    showWarningAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'warning')
    },

    showInfoAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'info')
    },

    showLightAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'light')
    },

    showDarkAlert: (container, message) => {
        rulegasCommons.showAlert(container, message, 'dark')
    },
};