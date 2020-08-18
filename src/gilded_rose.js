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

	_decreaseByOne (value) {
		return value - 1;
	}

	_increaseByOne (value) {
		return value + 1;
	}

	updateQuality () {

		this.items.forEach(item => {
			if (item.name != this.AGED_BRIE && item.name != this.BACKSTAGE_PASSES) {
				if (item.quality > 0) {
					if (item.name != this.SULFURAS) {
						item.quality = this._decreaseByOne(item.quality);
					}
				}
			} else {
				if (item.quality < 50) {
					item.quality = this._increaseByOne(item.quality);
					if (item.name == this.BACKSTAGE_PASSES) {
						if (item.sellIn < 11) {
							if (item.quality < 50) {
								item.quality = this._increaseByOne(item.quality);
							}
						}
						if (item.sellIn < 6) {
							if (item.quality < 50) {
								item.quality = this._increaseByOne(item.quality);
							}
						}
					}
				}
			}

			if (item.name != this.SULFURAS) {
				item.sellIn = this._decreaseByOne(item.sellIn);
			}

			if (item.sellIn < 0) {
				if (item.name != this.AGED_BRIE) {
					if (item.name != this.BACKSTAGE_PASSES) {
						if (item.quality > 0) {
							if (item.name != this.SULFURAS) {
								item.quality = this._decreaseByOne(item.quality);
							}
						}
					} else {
						item.quality = item.quality - item.quality;
					}
				} else {
					if (item.quality < 50) {
						item.quality = this._increaseByOne(item.quality);
					}
				}
			}
		});

		return this.items;
	}
}
module.exports = { Item, Shop };
  