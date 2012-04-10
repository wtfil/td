var TD = {};
TD.monsters = {};
TD.towers = {};
TD.stage = {
  map: {},
  units: [],
};
TD.Unit = function (teem) {
  this.teem = teem;
};
TD.Unit.prototype = {
  image: '/images/unit.png',
};
TD.Monster = jQuery.inherit(TD.Unit, {
});
TD.Tower = jQuery.inherit(TD.Unit, {
});
TD.Bullet = jQuery.inherit(TD.Unit, {
});
TD.addMonster = function (name, diff) {
  TD.monsters[name] = jQuery.inherit(TD.Monster, diff);
};
TD.addTower = function (name, diff) {
  TD.towers[name] = jQuery.inherit(TD.Tower, diff);
};
TD.addMonster('Simple', {});
TD.addTower('Simple', {});
TD.addTower('Simple2', {});
