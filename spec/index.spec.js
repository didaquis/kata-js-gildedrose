const { Shop, Item } = require('../src/gilded_rose.js');

describe('Gilded Rose', () => {
	it('should foo', () => {
		const gildedRose = new Shop([ new Item('foo', 0, 0) ]);
		const items = gildedRose.updateQuality();
		expect(items[0].name).toEqual('fixme');
	});
});