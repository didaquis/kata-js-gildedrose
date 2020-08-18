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

	updateQuality () {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].name != this.AGED_BRIE && this.items[i].name != this.BACKSTAGE_PASSES) {
				if (this.items[i].quality > 0) {
					if (this.items[i].name != this.SULFURAS) {
						this.items[i].quality = this.items[i].quality - 1;
					}
				}
			} else {
				if (this.items[i].quality < 50) {
					this.items[i].quality = this.items[i].quality + 1;
					if (this.items[i].name == this.BACKSTAGE_PASSES) {
						if (this.items[i].sellIn < 11) {
							if (this.items[i].quality < 50) {
								this.items[i].quality = this.items[i].quality + 1;
							}
						}
						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < 50) {
								this.items[i].quality = this.items[i].quality + 1;
							}
						}
					}
				}
			}

			if (this.items[i].name != this.SULFURAS) {
				this.items[i].sellIn = this.items[i].sellIn - 1;
			}

			if (this.items[i].sellIn < 0) {
				if (this.items[i].name != this.AGED_BRIE) {
					if (this.items[i].name != this.BACKSTAGE_PASSES) {
						if (this.items[i].quality > 0) {
							if (this.items[i].name != this.SULFURAS) {
								this.items[i].quality = this.items[i].quality - 1;
							}
						}
					} else {
						this.items[i].quality = this.items[i].quality - this.items[i].quality;
					}
				} else {
					if (this.items[i].quality < 50) {
						this.items[i].quality = this.items[i].quality + 1;
					}
				}
			}
		}

		return this.items;
	}
}
module.exports = { Item, Shop };
  