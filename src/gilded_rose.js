class Item {
	constructor (name, sellIn, quality){
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}
  
class Shop {
	constructor (items = []){
		this.items = items;
		this.AGED_BRIE = 'Aged Brie';
		this.BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
		this.SULFURAS = 'Sulfuras, Hand of Ragnaros';
		this.CONJURED = 'Conjured Mana Cake';
	}

	_decreaseSellIn (value) {
		return value - 1;
	}
	
	_decreaseQuality (value) {
		if (value > 0) {
			return value - 1;
		}
		return value;
	}

	_increaseQuality (value) {
		if (value < 50) {
			return value + 1;
		}
		return value;
	}

	updateQuality () {

		this.items.forEach(item => {

			switch (item.name) {
				case this.AGED_BRIE:
					if (item.sellIn <= 0) {
						item.quality = this._increaseQuality(item.quality);
					}
					item.quality = this._increaseQuality(item.quality);
					break;
				case this.BACKSTAGE_PASSES:
					item.quality = this._increaseQuality(item.quality);
					if (item.sellIn < 11) {
						item.quality = this._increaseQuality(item.quality);
					}
					if (item.sellIn < 6) {
						item.quality = this._increaseQuality(item.quality);
					}
					if (item.sellIn < 0) {
						item.quality = 0;
					}
					break;
				case this.SULFURAS:
					return;
				case this.CONJURED:
					item.quality = this._decreaseQuality(item.quality);
					item.quality = this._decreaseQuality(item.quality);
					break;
				default:
					if (item.sellIn <= 0) {
						item.quality = this._decreaseQuality(item.quality);
					}
					item.quality = this._decreaseQuality(item.quality);
					break;
			}

			item.sellIn = this._decreaseSellIn(item.sellIn);

		});

		return this.items;
	}
}
module.exports = { Item, Shop };
  