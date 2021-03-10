const dd = require("date-and-time");

const toDBOutObject = (record) => {
  const res = {
    date: strToDate(record["A"]),
    mode: record["B"],
    location: record["C"],
    customer: record["D"],
    product_code: record["E"],
    source: record["F"],
    railcar: record["G"],
    fleet: record["H"],
    subfleet: record["I"],
    railcar_seals: strToArr(record["J"]),
    bol: record["K"],
    destination: record["L"],
    city: record["M"],
    state: record["N"],
    weight: strToNum(record["O"] + ""),
    temperature: strToNum(record["P"] + ""),
    density: strToNum(record["Q"] + ""),
    sw_percent: strToNum(record["R"] + ""),
    sw_bbl: strToNum(record["S"] + ""),
    net_oil_bbl: strToNum(record["T"] + ""),
    total_volume_bbl: strToNum(record["U"] + ""),
    sw_m3: strToNum(record["V"] + ""),
    net_oil_m3: strToNum(record["W"] + ""),
    total_volume_m3: strToNum(record["X"] + ""),
    bol_date: strToDate(record["Y"]),
    heel_volume: strToNum(record["Z"] + ""),
    heel_weight: strToNum(record["AA"] + ""),
    contract_id: strToNum(record["AB"] + ""),
  };
  return res;
};
const toDBInObject = (record) => {
  const res = {
    date: strToDate(record["A"]),
    mode: record["B"],
    location: record["C"],
    customer: record["D"],
    product_code: record["E"],
    source: record["F"],
    railcar: record["G"],
    fleet: record["H"],
    subfleet: record["I"],
    railcar_seals: strToArr(record["J"]),
    bol: record["K"],
    destination: record["L"],
    city: record["M"],
    state: record["N"],
    weight: strToNum(record["O"] + ""),
    temperature: strToNum(record["P"] + ""),
    density: strToNum(record["Q"] + ""),
    sw_percent: strToNum(record["R"] + ""),
    sw_bbl: strToNum(record["S"] + ""),
    net_oil_bbl: strToNum(record["T"] + ""),
    total_volume_bbl: strToNum(record["U"] + ""),
    sw_m3: strToNum(record["V"] + ""),
    net_oil_m3: strToNum(record["W"] + ""),
    total_volume_m3: strToNum(record["X"] + ""),
    bol_date: strToDate(record["Y"]),
    heel_volume: strToNum(record["Z"] + ""),
    heel_weight: strToNum(record["AA"] + ""),
  };
  return res;
};

const strToDate = (str) => {
  date1 = new Date(str);
  return dd.format(date1, "MMM DD YYYY");
};

const strToArr = (str) => {
  return str.split();
};

const strToNum = (str) => {
  return str.replace(/[^\d.-]/g, "");
};

module.exports = {toDBOutObject,toDBInObject};
