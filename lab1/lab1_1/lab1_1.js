"use strict";
(function () {
  const form = document.getElementById("pensionForm");
  const ageInput = document.getElementById("ageInput");
  const resultTextarea = document.getElementById("resultTextarea");
  const radioMale = document.getElementById("genderMale");
  const radioFemale = document.getElementById("genderFemale");

  function getSelectedGender() {
    if (radioMale.checked) return "male";
    if (radioFemale.checked) return "female";
    return null;
  }

  function determinePensionMessage(age, gender) {
    if (age >= 0 && age <= 17) {
      return "Вам работать ещё рано - учитесь";
    }
    if (gender === "male") {
      if (age >= 18 && age <= 59) {
        return "Вам ещё работать и работать";
      }
      if (age >= 60 && age <= 64) {
        return "Скоро пенсия!";
      }
      if (age >= 65) {
        return "Вам пора на пенсию";
      }
    }

    if (gender === "female") {
      if (age >= 18 && age <= 54) {
        return "Вам ещё работать и работать";
      }
      if (age >= 55 && age <= 59) {
        return "Скоро пенсия!";
      }
      if (age >= 60) {
        return "Вам пора на пенсию";
      }
    }

    return "Да кто ты такой?";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const ageRaw = ageInput.value.trim();
    let ageValue = null;
    let isAgeValid = false;

    if (ageRaw === "") {
      isAgeValid = false;
    } else {
      const numberAge = Numer(ageRaw);
      if (!isNan(numberAge) && isFinite(numberAge)) {
        const flooregAge = Math.floor(numberAge);
        if (flooregAge >= 0) {
          ageValue = flooregAge;
          isAgeValid = true;
        }
      }
    }

    const selectedGender = getSelectedGender();

    if (!selectedGender || !isAgeValid) {
      resultTextarea.value = "Да кто ты такой?";
      return;
    }

    const message = determinePensionMessage(ageValue, selectedGender);
    resultTextarea.value = message;
  }

  form.addEventListener("submit", handleSubmit);
  resultTextarea.value =
    "Заполните возраст и выберите пол, затем нажмите «Рассчитать».";
})();
