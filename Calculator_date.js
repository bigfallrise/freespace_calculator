
    $(document).ready(function () {
        // Початкові значення
        var defaults = {
            areaValue: 50,
            areaPricePerItem: 1,
            revenue: 0,
            minimulFt: 45,
        };

        // Посилання на елементи на сторінці
        var uiStorage = {
            areaOutput: $("#area-output"),
            fullProject: $("#fullProject"),
            measurements: $("#measurements"),
            replanning: $("#replanning"),
            furnitureSelection: $("#furnitureSelection"),
            visualization: $("#visualization"),
            drafts: $("#drafts"),
            estimate: $("#estimate"),
            supervision: $("#supervision"),
            projectRevenue: $("#projectRevenue"),
            repaireRevenue: $("#repaireRevenue"),
            radioButtonsBudget: $("[name='Budget']"),
            radioButtonsStyle: $("[name='Style']"),
            radioButtonsAppointment: $("[name='Appointment']"),
            radioButtonsBuilding: $("[name='Building']")

            // Посилання на елементи Date на сторінці 
            fullProjectDate: $("#fullProject"),
            measurementsDate: $("#measurements"),
            replanningDate: $("#replanning"),
            furnitureSelectionDate: $("#furnitureSelection"),
            visualizationDate: $("#visualization"),
            draftsDate: $("#drafts"),
            estimateDate: $("#estimate"),
            supervisionDate: $("#supervision"),
            projectRevenueDate: $("#projectRevenue"),
            repaireRevenueDate: $("#repaireRevenue"),
            projectDate: $("#projectDate"),
            repaireDate: $("#repaireDate"),
            radioButtonsBudgetDate: $("[name='Budget']"),
            radioButtonsStyleDate: $("[name='Style']"),
            radioButtonsAppointmentDate: $("[name='Appointment']"),
            radioButtonsBuildingDate: $("[name='Building']")
        };

        // Функція розрахунку ціни
        var calculate = function () {
            // Коефіцієнт, на який множимо значення слайдера площі
            var areaBudgetMultiplier = 0.0;
            var areaStyleMultiplier = 0.0;
            var areaAppointmentMultiplier = 0.0;
            var areaBuildingMultiplier = 0.0;
            // Коефіцієнт, на який множимо всю суму
            var fullProject = uiStorage.fullProject.is(":checked") ? 25 : 0.0;
            var measurements = uiStorage.measurements.is(":checked") ? 200 : 0.0;
            var replanning = uiStorage.replanning.is(":checked") ? 6 : 0.0;
            var furnitureSelection = uiStorage.furnitureSelection.is(":checked") ? 4 : 0.0;
            var visualization = uiStorage.visualization.is(":checked") ? 8 : 0.0;
            var drafts = uiStorage.drafts.is(":checked") ? 8 : 0.0;
            var estimate = uiStorage.estimate.is(":checked") ? 4 : 0.0;
            var supervision = uiStorage.supervision.is(":checked") ? 250 : 0.0;

            // Визначаємо значення обраного радіокнопки Budget
            var selectedRadioButtonsBudgetValue = $("[name='Budget']:checked").val();
            if (selectedRadioButtonsBudgetValue === "middle budget" || selectedRadioButtonsBudgetValue === "high budget") {
                areaBudgetMultiplier = 1;
            }

            // Визначаємо значення обраного радіокнопки Style
            var selectedRadioButtonsStyleValue = $("[name='Style']:checked").val();
            if (selectedRadioButtonsStyleValue === "loft") {
                areaStyleMultiplier = 1.08;
              } else if(selectedRadioButtonsStyleValue === "classic") {
               areaStyleMultiplier = 1.16;
            } else if(selectedRadioButtonsStyleValue === "minimalism") {
                areaStyleMultiplier = 1;
             }

            // Визначаємо значення обраного радіокнопки Appointment
            var selectedRadioButtonsAppointmentValue = $("[name='Appointment']:checked").val();
            if (selectedRadioButtonsAppointmentValue === "for living") {
                areaAppointmentMultiplier = 1;
              } else if(selectedRadioButtonsAppointmentValue === "commercial") {
               areaAppointmentMultiplier = 0.7;
            }

            // Визначаємо значення обраного радіокнопки Building
            var selectedRadioButtonsBuildingValue = $("[name='Building']:checked").val();
            if (selectedRadioButtonsBuildingValue === "new building") {
                areaBuildingMultiplier = 1;
              } else if(selectedRadioButtonsBuildingValue === "old building") {
               areaBuildingMultiplier = 1.08;
            }

            // Розрахунок ціни
            var pricearea = parseInt(uiStorage.areaOutput.html())

            var projectRevenue = ((((defaults.revenue +
                Number.parseInt(uiStorage.areaOutput.html())
                * fullProject
                + Number.parseInt(uiStorage.areaOutput.html())
                * replanning
                + Number.parseInt(uiStorage.areaOutput.html())
                * furnitureSelection
                + Number.parseInt(uiStorage.areaOutput.html())
                * visualization
                + Number.parseInt(uiStorage.areaOutput.html())
                * drafts
                + Number.parseInt(uiStorage.areaOutput.html())
                * estimate)
                * areaBuildingMultiplier)) 
                * areaAppointmentMultiplier)
                * areaStyleMultiplier
                + measurements
                ;

            // Записуємо до UI елементу

            uiStorage.projectRevenue.html("$" + (Math.round(projectRevenue)));
        };





  // Функція розрахунку дати
var calculate = function () {
    // Коефіцієнт, на який множимо значення слайдера площі
    var areaBudgetDateMultiplier = 0.0;
    var areaStyleDateMultiplier = 0.0;
    var areaAppointmentDateMultiplier = 0.0;
    var areaBuildingDateMultiplier = 0.0;
    // Коефіцієнт, на який множимо всю суму
    var fullProjectDate = uiStorage.fullProject.is(":checked") ? 0.3333 : 0.0;
    var measurementsDate = uiStorage.measurements.is(":checked") ? 200 : 0.0;
    var replanningDate = uiStorage.replanning.is(":checked") ? 6 : 0.0;
    var furnitureSelectionDate = uiStorage.furnitureSelection.is(":checked") ? 4 : 0.0;
    var visualizationDate = uiStorage.visualization.is(":checked") ? 8 : 0.0;
    var draftsDate = uiStorage.drafts.is(":checked") ? 8 : 0.0;
    var estimateDate = uiStorage.estimate.is(":checked") ? 4 : 0.0;

    // Визначаємо значення обраного радіокнопки Budget
    var selectedRadioButtonsBudgetDateValue = $("[name='Budget']:checked").val();
    if (selectedRadioButtonsBudgetDateValue === "middle budget" || selectedRadioButtonsBudgetDateValue === "high budget") {
        areaBudgetDateMultiplier = 1;
    }

    // Визначаємо значення обраного радіокнопки Style
    var selectedRadioButtonsStyleDateValue = $("[name='Style']:checked").val();
    if (selectedRadioButtonsStyleDateValue === "loft") {
        areaStyleDateMultiplier = 1.08;
      } else if(selectedRadioButtonsStyleDateValue === "classic") {
       areaStyleDateMultiplier = 1.16;
    } else if(selectedRadioButtonsStyleDateValue === "minimalism") {
        areaStyleDateMultiplier = 1;
     }

    // Визначаємо значення обраного радіокнопки Appointment
    var selectedRadioButtonsAppointmentDateValue = $("[name='Appointment']:checked").val();
    if (selectedRadioButtonsAppointmentDateValue === "for living") {
        areaAppointmentDateMultiplier = 1;
      } else if(selectedRadioButtonsAppointmentDateValue === "commercial") {
       areaAppointmentDateMultiplier = 0.7;
    }

    // Визначаємо значення обраного радіокнопки Building
    var selectedRadioButtonsBuildingDateValue = $("[name='Building']:checked").val();
    if (selectedRadioButtonsBuildingDateValue === "new building") {
        areaBuildingDateMultiplier = 1;
      } else if(selectedRadioButtonsBuildingDateValue === "old building") {
       areaBuildingDateMultiplier = 1.08;
    }

    // Розрахунок ціни
    var pricearea = parseInt(uiStorage.areaOutput.html())

    var projectDate = defaults.revenue +
        Number.parseInt(uiStorage.areaOutput.html())
        * fullProjectDate
        ;

    // Записуємо до UI елементу

    uiStorage.projectDate.html("$" + (Math.round(projectDate)));
};







        // Встановлюємо початкові значення для UI елементів
        uiStorage.areaOutput.html(defaults.areaValue);
        $("input[name='Budget'][value='low budget']").attr("checked", true);
        $("input[name='Style'][value='minimalism']").attr("checked", true);
        $("input[name='Appointment'][value='for living']").attr("checked", true);
        $("input[name='Building'][value='new building']").attr("checked", true);




        uiStorage.fullProject.change(function () {
            // Вимикаємо інші чекбокси, крім supervision, якщо fullProject увімкнений
            if (uiStorage.fullProject.is(":checked")) {
                uiStorage.measurements.prop("checked", false).prop("disabled", true);
                uiStorage.replanning.prop("checked", false).prop("disabled", true);
                uiStorage.furnitureSelection.prop("checked", false).prop("disabled", true);
                uiStorage.visualization.prop("checked", false).prop("disabled", true);
                uiStorage.drafts.prop("checked", false).prop("disabled", true);
                uiStorage.estimate.prop("checked", false).prop("disabled", true);
            } else {
                // Якщо fullProject вимкнений, знову вмикаємо інші чекбокси
                uiStorage.measurements.prop("checked", false).prop("disabled", false);
                uiStorage.replanning.prop("checked", false).prop("disabled", false);
                uiStorage.furnitureSelection.prop("checked", false).prop("disabled", false);
                uiStorage.visualization.prop("checked", false).prop("disabled", false);
                uiStorage.drafts.prop("checked", false).prop("disabled", false);
                uiStorage.estimate.prop("checked", false).prop("disabled", false);
            }
            calculate();
        });

        // Підписуємось на подію зміни/вибору радіокнопки
        uiStorage.radioButtonsBudget.change(function () {
            calculate();
        });
        uiStorage.radioButtonsStyle.change(function () {
            calculate();
        });
        uiStorage.radioButtonsAppointment.change(function () {
            calculate();
        });
        uiStorage.radioButtonsBuilding.change(function () {
            calculate();
        });
        uiStorage.fullProject.change(function () {
            calculate();
        });
        uiStorage.measurements.change(function () {
            calculate();
        });
        uiStorage.replanning.change(function () {
            calculate();
        });
        uiStorage.furnitureSelection.change(function () {
            calculate();
        });
        uiStorage.visualization.change(function () {
            calculate();
        });
        uiStorage.drafts.change(function () {
            calculate();
        });
        uiStorage.estimate.change(function () {
            calculate();
        });
        uiStorage.supervision.change(function () {
            calculate();
        });

        var setProgress = function (obj, relation) {
            var percent = relation * 100;
            $(obj).css({ background: "linear-gradient(to right, #c0c0c0 0%, #000000 " + percent + "%, #c0c0c0 " + percent + "%, #c0c0c0 100%)" });
        };

        setProgress($("#area-slider")[0], (defaults.areaValue - 30) / 120);

        // Ініціалізація слайдера area
        $("#area-slider").slider({
            value: defaults.areaValue,
            min: 30,
            max: 150,
            slide: function (event, ui) {
                uiStorage.areaOutput.html(ui.value);
                setProgress(this, (ui.value - 30) / 120);
                calculate();
            }
        });

        calculate(); // Запуск розрахунку при завантаженні сторінки
    });
