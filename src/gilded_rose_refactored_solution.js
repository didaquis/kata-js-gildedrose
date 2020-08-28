/*
 * This is an alternative solution that exceeds the original rules of kata with the intention of bringing a different vision to the problem.
 */

class ItemBuilder {
	constructor () {
		this.AGED_BRIE = 'Aged Brie';
		this.BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
		this.SULFURAS = 'Sulfuras, Hand of Ragnaros';
		this.CONJURED = 'Conjured Mana Cake';
	}

	createNewItem (typeOfItem, sellIn, quality) {
		switch (typeOfItem) {
			case this.AGED_BRIE:
				return new AgedBrie(typeOfItem, sellIn, quality);
			case this.BACKSTAGE_PASSES:
				return new BackstagePass(typeOfItem, sellIn, quality);
			case this.SULFURAS:
				return new Sulfuras(typeOfItem, sellIn, quality);
			case this.CONJURED:
				return new Conjured(typeOfItem, sellIn, quality);
			default:
				return new Item(typeOfItem, sellIn, quality);
		}
	}
}


class Item {
	constructor (name, sellIn, quality){
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
		this.QUALITY_INCREASE_LIMIT = 50;
		this.QUALITY_REDUCTION_LIMIT = 0;
		this.SELL_IN_DEADLINE = 0;
	}
	
	_decreaseQuality () {
		if (this.quality > this.QUALITY_REDUCTION_LIMIT) {
			this.quality--;
		}
	}
	
	_increaseQuality () {
		if (this.quality < this.QUALITY_INCREASE_LIMIT) {
			this.quality++;
		}
	}
	
	decreaseSellIn () {
		this.sellIn--;
	}

	updateQuality () {
		if (this.sellIn <= this.SELL_IN_DEADLINE) {
			this._decreaseQuality();
		}
		this._decreaseQuality();
	}
}

class AgedBrie extends Item {
	constructor (name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	updateQuality () {
		if (this.sellIn <= this.SELL_IN_DEADLINE) {
			this._increaseQuality();
		}
		this._increaseQuality();
	}
}

class BackstagePass extends Item {
	constructor (name, sellIn, quality) {
		super(name, sellIn, quality);
		this.BACKSTAGE_FIRST_DEADLINE_INCREASE_QUALITY = 10;
		this.BACKSTAGE_SECOND_DEADLINE_INCREASE_QUALITY = 5;
	}

	updateQuality () {
		this._increaseQuality();

		if (this.sellIn <= this.BACKSTAGE_FIRST_DEADLINE_INCREASE_QUALITY) {
			this._increaseQuality();
		}
		if (this.sellIn <= this.BACKSTAGE_SECOND_DEADLINE_INCREASE_QUALITY) {
			this._increaseQuality();
		}
		if (this.sellIn <= this.SELL_IN_DEADLINE) {
			this.quality = this.QUALITY_REDUCTION_LIMIT;
		}
	}
}

class Sulfuras extends Item {
	constructor (name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	decreaseSellIn () {
		// nothing to update
	}

	updateQuality () {
		// nothing to update
	}
}

class Conjured extends Item {
	constructor (name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	updateQuality () {
		this._decreaseQuality();
		this._decreaseQuality();
	}
}



class Shop {
	constructor (items = []){
		this.items = items;
	}

	updateQuality () {
		this.items.forEach(item => {
			item.updateQuality();
			item.decreaseSellIn();
		});

		return this.items;
	}
}
module.exports = { Item, Shop, ItemBuilder };
  