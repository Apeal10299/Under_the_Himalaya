/*
  Dynamic covered-area filters.
  Only areas represented by at least one story are shown.
  Example:
  - If there is a Kathmandu story -> Kathmandu appears.
  - If there is no Kathmandu story -> Kathmandu does not appear.
  - Province/District/Place are dependent.
*/
(function () {
  function unique(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  window.coveredLocations = function (items = stories) {
    return {
      provinces: unique(items.map(s => s.province)),
      districts: unique(items.map(s => s.district)),
      places: unique(items.map(s => s.place)),
      disasters: unique(items.map(s => s.disaster)),
      years: unique(items.map(s => s.year))
    };
  };

  window.getCoveredDistricts = function (province, items = stories) {
    return unique(items.filter(s => !province || s.province === province).map(s => s.district));
  };

  window.getCoveredPlaces = function (province, district, items = stories) {
    return unique(items.filter(s =>
      (!province || s.province === province) &&
      (!district || s.district === district)
    ).map(s => s.place));
  };

  window.getCoveredDisasters = function (items = stories) {
    return unique(items.map(s => s.disaster));
  };

  window.getCoveredYears = function (items = stories) {
    return unique(items.map(s => s.year)).sort((a,b) => Number(b)-Number(a));
  };

  window.populateCoveredSelect = function (select, values, placeholder, disabled = false) {
    if (!select) return;
    select.innerHTML = "";
    select.add(new Option(placeholder, ""));
    values.forEach(value => select.add(new Option(value, value)));
    select.disabled = disabled;
  };
})();
