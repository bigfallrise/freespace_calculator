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
        areaInput: $("#area-input"),  
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
        projectDate: $("#projectDate"),
        repaireDate: $("#repaireDate"),
        radioButtonsBudget: $("[name='Budget']"),
        radioButtonsStyle: $("[name='Style']"),
        radioButtonsAppointment: $("[name='Appointment']"),
        radioButtonsBuilding: $("[name='Building']")
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
        var replanning = uiStorage.replanning.is(":checked") ? 4 : 0.0;
        var furnitureSelection = uiStorage.furnitureSelection.is(":checked") ? 4 : 0.0;
        var visualization = uiStorage.visualization.is(":checked") ? 8 : 0.0;
        var drafts = uiStorage.drafts.is(":checked") ? 8 : 0.0;
        var estimate = uiStorage.estimate.is(":checked") ? 4 : 0.0;
        var supervision = uiStorage.supervision.is(":checked") ? 250 : 0.0;
        var pricearea = parseInt(uiStorage.areaInput.val()) || defaults.areaValue;

        document.getElementById("area-input").addEventListener("change", function() {
            let v = parseInt(this.value);
            if (v < 30) this.value = 30;
            if (v > 500) this.value = 500;
            calculate(); // Додайте цей виклик, щоб перерахувати ціни при зміні значення
        });

        // Визначаємо значення обраного радіокнопки Budget
        var selectedRadioButtonsBudgetValue = $("[name='Budget']:checked").val();
        if (selectedRadioButtonsBudgetValue === "low budget") {
            areaBudgetMultiplier = 1.0;
          } else if(selectedRadioButtonsBudgetValue === "middle budget") {
           areaBudgetMultiplier = 2.0;
        } else if(selectedRadioButtonsBudgetValue === "high budget") {
            areaBudgetMultiplier = 4.0;
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

        // Обмеження значення в межах мінімуму та максимуму
        pricearea = Math.min(Math.max(pricearea, 30), 500);
    
        // Записуємо до UI елементу
        uiStorage.areaOutput.html(pricearea);
    

        var projectRevenue = (
            defaults.revenue +
            Math.min(7500, Math.max(1000, parseInt(uiStorage.areaOutput.html()) * fullProject))
            * (uiStorage.fullProject.is(":checked") ? 1.0 : 0.0)
            + Math.min(1000,Math.max(200, parseInt(uiStorage.areaOutput.html()) * replanning))
            * (uiStorage.replanning.is(":checked") ? 1.0 : 0.0)
            + Math.min(1000,parseInt(uiStorage.areaOutput.html()) * furnitureSelection)
            + Math.min(3000,Math.max(400, parseInt(uiStorage.areaOutput.html()) * visualization))
            * (uiStorage.visualization.is(":checked") ? 1.0 : 0.0)
            + Math.min(3000,Math.max(400, parseInt(uiStorage.areaOutput.html()) * drafts))
            * (uiStorage.drafts.is(":checked") ? 1.0 : 0.0)
            + Math.min(1000,parseInt(uiStorage.areaOutput.html())) * estimate
            + parseInt(uiStorage.repaireDate.html()) * supervision
            * areaBuildingMultiplier
        ) * areaAppointmentMultiplier
        * areaStyleMultiplier
        + measurements;
        


        // Розрахунок ціни ремонту
        var repaireRevenue = (defaults.revenue +
        Number.parseInt(uiStorage.areaOutput.html())
        * 500
        * areaBudgetMultiplier
        * areaBuildingMultiplier
        * areaStyleMultiplier
        * areaAppointmentMultiplier
        + projectRevenue)
        * (uiStorage.supervision.is(":checked") ? 0.92 : 1.0);


        // Розрахунок терміну проекту
        var projectDate = ((Math.min.apply(null, [3,(defaults.revenue +
            Number.parseInt(uiStorage.areaOutput.html())
            * (uiStorage.fullProject.is(":checked") ? 0.033333 : 0.0))]))
            + (Math.min.apply(null, [0.25,((Number.parseInt(uiStorage.areaOutput.html())* 0.033333) 
            * (uiStorage.replanning.is(":checked") ? 0.15 : 0.0))]))
            + ((Math.max.apply(null, [0.25,((Number.parseInt(uiStorage.areaOutput.html())* 0.0222222) 
            * (uiStorage.furnitureSelection.is(":checked") ? 0.15 : 0.0))]))
                *(uiStorage.furnitureSelection.is(":checked") ? 1.0 : 0.0))
            + ((Math.max.apply(null, [0.5,(((Number.parseInt(uiStorage.areaOutput.html())* 0.033333) 
            * (uiStorage.visualization.is(":checked") ? 0.3 : 0.0)))]))
                *(uiStorage.visualization.is(":checked") ? 1.0 : 0.0))
            + ((Math.max.apply(null, [0.5,((Number.parseInt(uiStorage.areaOutput.html())* 0.033333) 
            * (uiStorage.drafts.is(":checked") ? 0.3 : 0.0))]))
                * (uiStorage.drafts.is(":checked") ? 1 : 0.0) )
            + ((Number.parseInt(uiStorage.areaOutput.html())* 0.033333) 
            * (uiStorage.estimate.is(":checked") ? 0.1 : 0.0)))
            * areaStyleMultiplier;


        // Розрахунок терміну ремонту
        var repaireDate = (Math.min.apply(null, [6,(defaults.revenue +
        Number.parseInt(uiStorage.areaOutput.html()) 
        * 0.040)]));


        // Записуємо до UI елементу

        uiStorage.projectRevenue.html("$" + (Math.round(projectRevenue)));
        uiStorage.repaireRevenue.html("$" + (Math.round(repaireRevenue)));
        uiStorage.projectDate.html(((projectDate).toFixed(1))+"міс");
        uiStorage.repaireDate.html(Math.round((repaireDate))+"міс");
    };

    // Встановлюємо початкові значення для UI елементів
    uiStorage.areaOutput.html(defaults.areaValue);
    uiStorage.areaInput.val(defaults.areaValue);
    $("input[name='Budget'][value='low budget']").attr("checked", true);
    $("input[name='Style'][value='minimalism']").attr("checked", true);
    $("input[name='Appointment'][value='for living']").attr("checked", true);
    $("input[name='Building'][value='new building']").attr("checked", true);

    uiStorage.areaInput.change(function () {
        var newValue = parseInt(uiStorage.areaInput.val());
        if (!isNaN(newValue)) {
            $("#area-slider").slider("value", newValue);  // Змінюємо значення слайдера
            uiStorage.areaOutput.html(newValue);  // Змінюємо вивід значення
            calculate();
        }
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
    
    // ...
    
    // Ініціалізація слайдера area
    $("#area-slider").slider({
        value: defaults.areaValue,
        min: 30,
        max: 500,
        slide: function (event, ui) {
            uiStorage.areaInput.val(ui.value); // Оновлюємо значення areaInput при руху слайдера
            uiStorage.areaOutput.html(ui.value);
            setProgress(this, (ui.value - 30) / 470); // Оновлюємо заливку слайдера
            calculate();
        }
    });
    
    // ...
    
    // Додайте подію на зміну в areaInput
    uiStorage.areaInput.on('input', function () {
        var newValue = parseInt(uiStorage.areaInput.val());
        if (!isNaN(newValue)) {
            $("#area-slider").slider("value", newValue); // Змінюємо значення слайдера при зміні areaInput
            uiStorage.areaOutput.html(newValue);
            setProgress($("#area-slider")[0], (newValue - 30) / 470); // Оновлюємо заливку слайдера
            calculate();
        }
    });



    // Додайте подію на введення для areaInput
uiStorage.areaInput.on('input', function () {
    var newValue = parseInt(uiStorage.areaInput.val());
    
    // Перевірте, чи число в межах мінімуму та максимуму
    if (!isNaN(newValue) && newValue >= 30 && newValue <= 500) {
        // Встановлюємо виправлене значення
        $("#area-slider").slider("value", newValue);
        uiStorage.areaOutput.html(newValue);
        setProgress($("#area-slider")[0], (newValue - 30) / 470);
        calculate();
    }
});
    
    // Ініціалізація слайдера area
    $("#area-slider").slider({
        value: defaults.areaValue,
        min: 30,
        max: 500,
        slide: function (event, ui) {
            uiStorage.areaInput.val(ui.value); // Оновлюємо значення areaInput при руху слайдера
            uiStorage.areaOutput.html(ui.value);
            setProgress($("#area-slider")[0], (ui.value - 30) / 470); // Оновлюємо заливку слайдера
            calculate();
        }
    });
    

    calculate(); // Запуск розрахунку при завантаженні сторінки
});