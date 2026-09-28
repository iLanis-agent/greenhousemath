/* GreenhouseMath engine - pure functions, no DOM. Honest greenhouse math.
   Constants stated in the UI: glazing U-values (single glass 1.1, double poly 0.7,
   twin-wall polycarbonate 0.58 BTU/hr/ft2/F), 10% infiltration allowance,
   3.412 BTU per watt, one air change per minute summer ventilation,
   2.5 gal water per sq ft floor for thermal mass, 8.34 lb per gallon. */
var GreenhouseMath = (function () {
  function glazingAreaFt2(w, l, eaveH, ridgeH) {
    var walls = 2 * (l * eaveH) + 2 * (w * eaveH);
    var gables = w * (ridgeH - eaveH);
    var slope = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(ridgeH - eaveH, 2));
    var roof = 2 * l * slope;
    return walls + gables + roof;
  }
  function volumeFt3(w, l, eaveH, ridgeH) {
    return w * l * eaveH + l * (w / 2) * (ridgeH - eaveH);
  }
  function heatBtuHr(areaFt2, uValue, deltaT, infilFactor) {
    return areaFt2 * uValue * deltaT * infilFactor;
  }
  function heaterWatts(btuHr) { return btuHr / 3.412; }
  function heaterVerdict(watts) {
    if (watts <= 1500) return 'One ordinary 1500W electric heater covers this - a circuit can spare it.';
    if (watts <= 3000) return 'Two heaters or a 240V unit - check the panel before the plants freeze.';
    return 'Serious heat demand - look at propane or better glazing before paying the electric bill.';
  }
  function glazingVerdict(u) {
    if (u >= 1.0) return 'Single glass: beautiful, honest, and the heating bill hurts.';
    if (u >= 0.65) return 'Double poly film: cheap, 80% light, and the middle of the heat-loss road.';
    return 'Twin-wall polycarbonate: the best heat keeper of the common glazings.';
  }
  function ventCfm(w, l, eaveH, ridgeH) {
    return volumeFt3(w, l, eaveH, ridgeH);
  }
  function ventVerdict(cfm) {
    if (cfm <= 800) return 'A small exhaust fan handles summer - one air change a minute.';
    if (cfm <= 2000) return 'A mid-size fan or two small ones - size up, heat spikes kill fast.';
    return 'Big volume - plan multiple fans or roll-up sides, summer will test it.';
  }
  function thermalMassGals(floorSqFt, galPerSqFt) {
    return floorSqFt * galPerSqFt;
  }
  function storedBtu(gals, swingF) { return gals * 8.34 * swingF; }
  function massVerdict(stored, nightLossBtu) {
    var pct = stored / nightLossBtu * 100;
    if (pct >= 40) return 'Water barrels carry ' + Math.round(pct) + '% of a cold night - real frost insurance.';
    if (pct >= 15) return 'Barrels shave ' + Math.round(pct) + '% off the night - helpful, not sufficient alone.';
    return 'Only ' + Math.round(pct) + '% of the night covered - the heater is still doing the work.';
  }
  return {
    glazingAreaFt2: glazingAreaFt2, volumeFt3: volumeFt3,
    heatBtuHr: heatBtuHr, heaterWatts: heaterWatts, heaterVerdict: heaterVerdict, glazingVerdict: glazingVerdict,
    ventCfm: ventCfm, ventVerdict: ventVerdict,
    thermalMassGals: thermalMassGals, storedBtu: storedBtu, massVerdict: massVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = GreenhouseMath;
