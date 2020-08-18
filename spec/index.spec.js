const { Shop, Item } = require('../src/gilded_rose.js');

const inventory = [];

describe('Gilded Rose', () => {
	describe('updateQuality method', () => {

		beforeEach(() => {
			inventory.length = 0;
			inventory.push(
				new Item('+5 Dexterity Vest', 10, 20),
				new Item('Aged Brie', 2, 0),
				new Item('Elixir of the Mongoose', 5, 7),
				new Item('Sulfuras, Hand of Ragnaros', 0, 80),
				new Item('Sulfuras, Hand of Ragnaros', -1, 80),
				new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
				new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
				new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)
			);
		});

		it('should return an array with all items and valid properties', () => {
			const items = [ new Item('foo', 3, 3), new Item('bar', 5, 5) ];
			const gildedRose = new Shop(items);

			const result = gildedRose.updateQuality();

			expect(result.length).toBe(2);
			result.forEach( (item) => {
				expect(Object.prototype.hasOwnProperty.call(item, 'name')).toBeTrue();
				expect(Object.prototype.hasOwnProperty.call(item, 'sellIn')).toBeTrue();
				expect(Object.prototype.hasOwnProperty.call(item, 'quality')).toBeTrue();
			});
			expect(result[0].name).toEqual('foo');
			expect(result[1].name).toEqual('bar');
		});

		describe('on all product', () => {
			it('should not decrement quality of product to a negative value', () => {
				const gildedRose = new Shop(inventory);

				const updatesOfInventory = 100;
				let result;
				for (let index = 0; index < updatesOfInventory; index++) {
					result = gildedRose.updateQuality();
				}

				expect(result.length).toBeGreaterThan(0);
				result.forEach(item => {
					expect(item.quality).not.toBeLessThan(0);
				});
			});
		});

		describe('on standard product', () => {
			it('should decrement quality of product by 2 if sellIn date is lower or equal than 0', () => {
				const items = [ new Item('foo', 1, 3), new Item('bar', 0, 5) ];
				const gildedRose = new Shop(items);

				const result = gildedRose.updateQuality();

				expect(result[0].quality).toEqual(2);
				expect(result[1].quality).toEqual(3);
			});

			it('should not increment quality of product over 50', () => {
				const items = [ new Item('foo', 1, 3), new Item('bar', 0, 5) ];
				const gildedRose = new Shop(items);

				const updatesOfInventory = 100;
				let result;
				for (let index = 0; index < updatesOfInventory; index++) {
					result = gildedRose.updateQuality();
				}

				expect(result.length).toBeGreaterThan(0);
				result.forEach(item => {
					expect(item.quality).not.toBeGreaterThan(50);
				});
			});
		});

		describe('on "Aged Brie" product', () => {
			xit('should increment quality of product by 1 if sellIn date is greather than 0', () => {
				const sellInDate = 1;
				const quality = 4;
				const items = [new Item('Aged Brie', sellInDate, quality)];

				const gildedRose = new Shop(items);
				const result = gildedRose.updateQuality();

				expect(result[0].sellIn).toEqual(0);
				expect(result[0].quality).toEqual(5);
			});

			xit('should increment quality of product by 2 if sellIn date is lower or equal than 0', () => {
				const sellInDate = 0;
				const quality = 5;
				const items = [new Item('Aged Brie', sellInDate, quality)];

				const gildedRose = new Shop(items);
				const result = gildedRose.updateQuality();

				expect(result[0].sellIn).toEqual(-1);
				expect(result[0].quality).toEqual(7);
			});
		});

	});
});