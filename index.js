
attachEvtToInput();
attachEvtToSubmit();
var currArSelectList = getCurrArAttachEvt();
var currRefreshCount = getRefrAttachEvt();
var wantedArSelectList = getWantedARandAttachEvtHandler();

var totalExperienceRequired = document.getElementById('totalExp')
var estDaysToLevel = document.getElementById('estDays')
setTimeout(() => getData(window.localStorage), 5)
const ADVENTURE_RANK_EXP_TABLE = {
  1: 0,
  2: 375,
  3: 875,
  4: 1500,
  5: 2225,
  6: 3075,
  7: 4025,
  8: 5100,
  9: 6275,
  10: 7575,
  11: 9000,
  12: 10525,
  13: 12175,
  14: 13950,
  15: 15825,
  16: 17825,
  17: 20200,
  18: 22700,
  19: 25325,
  20: 28100,
  21: 30925,
  22: 34350,
  23: 38075,
  24: 42075,
  25: 46375,
  26: 50950,
  27: 55825,
  28: 60975,
  29: 66425,
  30: 72150,
  31: 78175,
  32: 84475,
  33: 91075,
  34: 97975,
  35: 105150,
  36: 112625,
  37: 120375,
  38: 128425,
  39: 136750,
  40: 145375,
  41: 155925,
  42: 167450,
  43: 179925,
  44: 193375,
  45: 207775,
  46: 223125,
  47: 239450,
  48: 256725,
  49: 274975,
  50: 294175,
  51: 320575,
  52: 349375,
  53: 380575,
  54: 414175,
  55: 450175,
  56: 682525,
  57: 941475,
  58: 1227225,
  59: 1540050,
  60: 1880175,
};

const REFRESHED_RESIN_TABLE = {
  0: 0,
  1: 60,
  2: 120,
  3: 180,
  4: 240,
  5: 300,
  6: 360
}

appendListItems(currArSelectList, ADVENTURE_RANK_EXP_TABLE)
appendListItems(currRefreshCount, REFRESHED_RESIN_TABLE)
appendListItems(wantedArSelectList, ADVENTURE_RANK_EXP_TABLE)


var MY_AR_EXP, MY_AR, WANTED_AR, REFRESHED_RESIN_EXP, RESIN_REFRESH_INDEX, PASSDATA;

const RESIN_USAGE_PER_DAY = 180
const EXP_PER_20_RESIN = 100

var RESIN_EXP_PER_DAY = RESIN_USAGE_PER_DAY / 20 * EXP_PER_20_RESIN
const DAILY_COMMISION_EXP = 500 + (4 * 250)



function attachEvtToInput() {
  const InpuField = document.getElementById('myArExp');
  if (InpuField)
    InpuField.addEventListener("input", function () { MY_AR_EXP = Number(this.value); });
}

function attachEvtToSubmit() {
  const submitbtn = document.getElementById('Submit');
  if (submitbtn)
    submitbtn.addEventListener('click', () => { PASSDATA = calc(WANTED_AR, MY_AR, MY_AR_EXP, REFRESHED_RESIN_EXP, RESIN_REFRESH_INDEX); setPrevData(PASSDATA[0], PASSDATA[1], WANTED_AR, MY_AR, MY_AR_EXP, PASSDATA[2], PASSDATA[3]); });
}

function getCurrArAttachEvt() {
  const currArSelectList = document.getElementById('currAr');
  if (currArSelectList)
    currArSelectList.addEventListener('change', () => { MY_AR = handleEvents('currAr', 'myAr'); });
  return currArSelectList;
}

function getRefrAttachEvt() {
  const currRefreshCount = document.getElementById('resinRefresh');
  if (currRefreshCount)
    currRefreshCount.addEventListener('change', function () { REFRESHED_RESIN_EXP = Number(this.value); RESIN_REFRESH_INDEX = handleEvents('resinRefresh', 'ResinRefresh'); });
  return currRefreshCount;
}

function getWantedARandAttachEvtHandler() {
  const wantedArSelectList = document.getElementById('wantedAR');
  if (wantedArSelectList)
    wantedArSelectList.addEventListener('change', function () { WANTED_AR = handleEvents('wantedAR', 'Wanted AR'); });
  return wantedArSelectList;
}

//// Hoisted Functions ////



/**
 * Returns x raised to the n-th power.
 *
 * @param {HTMLElement} elementId The Element ID to use.
 * @param {String} vars The String Value to be represented (eq. Wanted AR:).
 * @return {number} returns id of Select Box Value.
 */
function handleEvents(elementId, vars) {
  let result = Number(getIdfromSelect(elementId));
  // console.log(`${vars}: ${result}`);

  return result;
}


function getIdfromSelect(e) {
  return document.querySelector(`#${e} > option:checked`).id
}

/**
 * 
 * @param {HTMLOptionElement} e Option Element to append the list to 
 * @param {Object} o Object with key value pairs to append to the list with key being the index
 */
function appendListItems(e, o) {
  for (const [key, value] of Object.entries(o)) {
    // console.log(`${key}: ${value}`);

    var option = document.createElement("option");
    option.value = `${value}`;
    // console.log(option)
    option.text = `${key}`;
    option.id = `${key}`;
    if (e)
      e.appendChild(option);
  }
}


/**
 * 
 * @param {Number} WANTED_AR required to get the EXP from the table according to the index
 * @param {Number} MY_AR same as above
 * @param {Number} MY_AR_EXP input exp value
 * @param {Number} REFRESHED_RESIN_EXP calc refreshed exp
 * @param {Number} RESIN_REFRESH_INDEX used to calc refresh exp
 * @returns {Array} [est, TOTAL_EXP_REQUIRED, RESIN_REFRESH_INDEX, REFRESHED_RESIN_EXP]
 */
function calc(WANTED_AR, MY_AR, MY_AR_EXP, REFRESHED_RESIN_EXP, RESIN_REFRESH_INDEX) {
  var EXP_GAIN_PER_DAY = DAILY_COMMISION_EXP + RESIN_EXP_PER_DAY + (REFRESHED_RESIN_EXP / 20 * EXP_PER_20_RESIN)

  var TOTAL_EXP_REQUIRED = ADVENTURE_RANK_EXP_TABLE[WANTED_AR] - ADVENTURE_RANK_EXP_TABLE[MY_AR] - MY_AR_EXP
  //console.log("Total Exp required:", TOTAL_EXP_REQUIRED)

  //console.log("Est. days until goal AR", TOTAL_EXP_REQUIRED / EXP_GAIN_PER_DAY)
  let est = Math.round(TOTAL_EXP_REQUIRED / EXP_GAIN_PER_DAY)

  estDaysToLevel.innerText = `Est. days until goal AR: ${est} `
  totalExperienceRequired.innerText = `Total Exp required: ${TOTAL_EXP_REQUIRED} `

  return [est, TOTAL_EXP_REQUIRED, RESIN_REFRESH_INDEX, REFRESHED_RESIN_EXP]

}


const setPrevData = (...params) => {
  console.table([params])
  window.localStorage.clear();

  params.forEach((value, key) => {
    // console.table(key, value);
    // console.log(key)
    // console.log(value)
    window.localStorage.setItem(key, value);
  }
  )

  // console.log(params)
}


/**
 * 
 * @param {Window.localStorage} storage is necessary to initialize values otherwise the calculations will return NaN 
 */
function getData(storage) {
  if (storage.length !== 0) {
    let est = storage[0];
    let req_exp = storage[1];
    REFRESHED_RESIN_EXP = storage[6];
    RESIN_REFRESH_INDEX = storage[5];
    MY_AR_EXP = storage[4];;
    MY_AR = storage[3];;
    WANTED_AR = storage[2];
    document.querySelector("#myArExp").value = MY_AR_EXP
    document.querySelector(`#currAr`).selectedIndex = MY_AR - 1
    document.querySelector(`#wantedAR`).selectedIndex = WANTED_AR - 1
    document.querySelector(`#resinRefresh`).selectedIndex = RESIN_REFRESH_INDEX
    estDaysToLevel.innerText = `Est. days until goal AR: ${est} `
    totalExperienceRequired.innerText = `Total Exp required: ${req_exp} `

    console.table(storage)
  }

}