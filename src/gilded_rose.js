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
		this.QUALITY_INCREASE_LIMIT = 50;
		this.QUALITY_REDUCTION_LIMIT = 0;
		this.BACKSTAGE_FIRST_DEADLINE_INCREASE_QUALITY = 10;
		this.BACKSTAGE_SECOND_DEADLINE_INCREASE_QUALITY = 5;
		this.DAYS_UNTIL_SALE_DEADLINE = 0;
	}

	_decreaseSellIn (value) {
		return value - 1;
	}
	
	_decreaseQuality (value) {
		if (value > this.QUALITY_REDUCTION_LIMIT) {
			return value - 1;
		}
		return value;
	}

	_increaseQuality (value) {
		if (value < this.QUALITY_INCREASE_LIMIT) {
			return value + 1;
		}
		return value;
	}

	updateQuality () {

		this.items.forEach(item => {

			switch (item.name) {
				case this.AGED_BRIE:
					if (item.sellIn <= this.DAYS_UNTIL_SALE_DEADLINE) {
						item.quality = this._increaseQuality(item.quality);
					}
					item.quality = this._increaseQuality(item.quality);
					break;
				case this.BACKSTAGE_PASSES:
					item.quality = this._increaseQuality(item.quality);
					if (item.sellIn <= this.BACKSTAGE_FIRST_DEADLINE_INCREASE_QUALITY) {
						item.quality = this._increaseQuality(item.quality);
					}
					if (item.sellIn <= this.BACKSTAGE_SECOND_DEADLINE_INCREASE_QUALITY) {
						item.quality = this._increaseQuality(item.quality);
					}
					if (item.sellIn <= this.DAYS_UNTIL_SALE_DEADLINE) {
						item.quality = this.QUALITY_REDUCTION_LIMIT;
					}
					break;
				case this.SULFURAS:
					return;
				case this.CONJURED:
					item.quality = this._decreaseQuality(item.quality);
					item.quality = this._decreaseQuality(item.quality);
					break;
				default:
					if (item.sellIn <= this.DAYS_UNTIL_SALE_DEADLINE) {
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
  