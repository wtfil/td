jQuery.inherit = function () {
  var hasBase = typeof(arguments[0]) === 'function',
    base = hasBase ? arguments[0] : function () {},
		override = arguments[hasBase? 1 : 0],
    key;
  for (key in override) {
    if (override.hasOwnProperty(key)) {
      base.prototype[key] = override[key];
    }
  };
  return base;
};
