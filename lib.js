/** CONSTANTS **/

// Item id of "Tier 21 Superior Twin Swords"
const HIGHLIGHT_ITEM = 110684;

// Item id of "Annihilation Disc (x1 effect)"
const HIGHLIGHT_ITEM_BLUE = 89542;

// Item id of "Annihilation Disc (x2 effect)"
const HIGHLIGHT_ITEM_PURPLE = 89543;

// Item id of "Zenobia's Breeze Crate"
const HIGHLIGHT_ITEM_RED = 206960;

// Item id of "Velika Banquet Coin"
const MARKER_ITEM = 88704;


/** LIB CLASSES **/

/**
 * Spawn class.
 *
 * @param   Object    handlers  Object of function_event_handlers (see index.js)
 * @param   Object    event     Object of called event
 * @param   Object    entity    Object of the binding point (S_ACTION_STAGE)
 * @param   Instance  dispatch  Instance of DispatchWrapper
 * @return  Void
 */
class Spawn {
	constructor(handlers, event, entity, dispatch) {
		this.handlers = handlers;
		this.event = event;
		this.entity = entity;
		this.dispatch = dispatch;
	}

	/**
	 * Spawn specified item.
	 *
	 * @param   Integer  item      Item identifier of the spawned item
	 * @param   Integer  angle     Offset angle relative to binding point (e.g. boss)
	 * @param   Integer  distance  Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer  delay     Object spawn time delay
	 * @param   Integer  duration  The lifetime of the object (before its despawn)
	 * @return  Void
	 */
	item(item, angle, distance, delay, duration) {
		angle =  Math.PI * angle / 180;

		this.object("item", false, item,
			0, 0,
			angle, distance,
			delay, duration,
			null
		);
	}

	/**
	 * Spawn a marker item.
	 *
	 * @param   Boolean         target     Using "dest" instead of "loc" when defining an anchor point
	 * @param   Integer         angle      Offset angle relative to binding point (e.g. boss)
	 * @param   Integer         distance   Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer         delay      Object spawn time delay
	 * @param   Integer         duration   The lifetime of the object (before its despawn)
	 * @param   String|Boolean  highlight  Turn on the highlight marker
	 * @param   Array           label      Array of text label
	 * @return  Void
	 */
	marker(target, angle, distance, delay, duration, highlight, label) {
		if (!label) {
			label = ["SAFE SPOT", "SAFE"];
		}

		angle =  Math.PI * angle / 180;

		// Spawn a marker board item
		this.object("build_object", target, 1,
			0, 0,
			angle, distance,
			delay, duration,
			label
		);

		// Add highlight point to the marker if highlight param is true
		// Also allow to specify color of the highlight item
		if (highlight) {
			let item = HIGHLIGHT_ITEM;

			switch (highlight) {
				case "blue":   item = HIGHLIGHT_ITEM_BLUE;   break;
				case "purple": item = HIGHLIGHT_ITEM_PURPLE; break;
				case "red":    item = HIGHLIGHT_ITEM_RED;    break;
			}

			this.object("item", target, item,
				0, 0,
				angle, distance,
				delay, duration,
				null
			);
		}
	}

	/**
	 * Spawn a point.
	 *
	 * @param   Integer  item      Item identifier of the spawned item
	 * @param   Integer  angle     Offset angle relative to binding point (e.g. boss)
	 * @param   Integer  distance  Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer  delay     Object spawn time delay
	 * @param   Integer  duration  The lifetime of the object (before its despawn)
	 * @return  Void
	 */
	point(item, angle, distance, delay, duration) {
		angle = Math.PI * angle / 180;

		this.object("collection", false, item,
			0, 0,
			angle, distance,
			delay, duration,
			null
		);
	}

	/**
	 * Spawn a vector figure.
	 *
	 * @param   Integer  item            Item identifier of the spawned items
	 * @param   Integer  offsetAngle     Offset angle relative to binding point (e.g. boss)
	 * @param   Integer  offsetDistance  Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer  angle           Angle of the vector direction 
	 * @param   Integer  length          The length of the vector in units (1 meter = 25 units)
	 * @param   Integer  delay           Object spawn time delay
	 * @param   Integer  duration        The lifetime of the object (before its despawn)
	 * @return  Void
	 */
	vector(item, offsetAngle, offsetDistance, angle, length, delay, duration) {
		angle = angle * Math.PI / 180;

		for (let radius = 50; radius <= length; radius += 50) {
			this.object("collection", false, item,
				offsetAngle, offsetDistance,
				angle, radius,
				delay, duration,
				null
			);
		}
	}

	/**
	 * Spawn a circle figure.
	 *
	 * @param   Boolean  target          Using "dest" instead of "loc" when defining an anchor point
	 * @param   Integer  item            Item identifier of the spawned items
	 * @param   Integer  offsetAngle     Offset angle relative to binding point (e.g. boss)
	 * @param   Integer  offsetDistance  Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer  interval        The factor of the multiplicity of objects in a circle (less value - more objects)
	 * @param   Integer  radius          The radius of the circle in units (1 meter = 25 units)
	 * @param   Integer  delay           Object spawn time delay
	 * @param   Integer  duration        The lifetime of the object (before its despawn)
	 * @return  Void
	 */
	circle(target, item, offsetAngle, offsetDistance, interval, radius, delay, duration) {
		for (let angle = -Math.PI; angle <= Math.PI; angle +=  Math.PI * interval / 180) {
			this.object("collection", target, item,
				offsetAngle, offsetDistance,
				angle, radius,
				delay, duration,
				null
			);
		}
	}

	/**
	 * Spawn a Semicircle
	 *
	 * @param   Integer  degree1         Degree of the first half of the semicircle (negative values allowed)
	 * @param   Integer  degree2         Degree of the second half of the semicircle (negative values allowed)
	 * @param   Integer  item            Item identifier of the spawned items
	 * @param   Integer  offsetAngle     Offset angle relative to binding point (e.g. boss)
	 * @param   Integer  offsetDistance  Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer  interval        The factor of the multiplicity of objects in a circle (less value - more objects)
	 * @param   Integer  radius          The radius of the circle in units (1 meter = 25 units)
	 * @param   Integer  delay           Object spawn time delay
	 * @param   Integer  duration        The lifetime of the object (before its despawn)
	 * @return  Void
	 */
	semicircle(degree1, degree2, item, offsetAngle, offsetDistance, interval, radius, delay, duration) {
		let db, dg;

		if (degree1 <= 180 && degree2 <= 180) {
			db = -degree1 / 180;
			dg =  degree2 / 180;
		} else if (degree1 > 180 && degree2 > 180) {
			db = -degree1 / 180;
			dg =  degree2 / 180;
		} else {
			db = -degree1 / 180;
			dg =  degree2 / 180;

			for (let angle = -Math.PI * db; angle <= Math.PI; angle +=  Math.PI * interval / 180) {
				this.object("collection", false, item,
					offsetAngle, offsetDistance,
					angle, radius,
					delay, duration,
					null
				);
			}

			for (let angle = Math.PI ; angle <= Math.PI * dg; angle +=  Math.PI * interval / 180) {
				this.object("collection", false, item,
					offsetAngle, offsetDistance,
					angle, radius,
					delay, duration,
					null
				);
			}

			return;
		}

		for (let angle = -Math.PI * db; angle <= Math.PI * dg; angle +=  Math.PI * interval / 180) {
			this.object("collection", false, item,
				offsetAngle, offsetDistance,
				angle, radius,
				delay, duration,
				null
			);
		}
	}

	/**
	 * Spawn a single object.
	 *
	 * @param   String   type            Type of spawned object (allowed values: "collection", "item", "build_object")
	 * @param   Boolean  target          Using "dest" instead of "loc" when defining an anchor point
	 * @param   Integer  item            Item identifier of the spawned object items
	 * @param   Integer  offsetAngle     Offset angle relative to binding point (e.g. boss)
	 * @param   Integer  offsetDistance  Offset distance relative to binding point (1 meter = 25 units)
	 * @param   Integer  angle           Angle of the object direction
	 * @param   Integer  distance        Distance (1 meter = 25 units)
	 * @param   Integer  delay           Object spawn time delay
	 * @param   Integer  duration        The lifetime of the object (before its despawn)
	 * @param   Array    label           Array of text label
	 * @return  Void
	 */
	object(type, target, item, offsetAngle, offsetDistance, angle, distance, delay, duration, label) {
		const self = this;

		// Spawn callback function
		const callback = function(type, target, item, offsetAngle, offsetDistance, angle, distance, duration, label) {
			// A binding point for a spawned object
			let shield_loc;

			// Use "dest" instead of "loc" if it's specified and target is true
			if (target && self.entity["dest"] !== undefined) {
				shield_loc = self.entity["dest"].clone();
			// Use "loc" if if it's specified and target is false
			} else if (self.entity["loc"] !== undefined) {
				shield_loc = self.entity["loc"].clone();
			} else {
				return;
			}

			// Set value of loc.w for the binding point
			shield_loc.w = self.entity["loc"].w;

			// Apply distance to the binding point
			applyDistance(shield_loc, offsetDistance, 360 - offsetAngle);

			// Spawn a object by specified type
			switch (type) {
				// S_SPAWN_COLLECTION
				case "collection":
					self.handlers["spawn"]({
						id: item,
						sub_delay: duration,
						distance: distance,
						offset: angle
					}, {
						loc: shield_loc
					});
					break;

				// S_SPAWN_DROPITEM
				case "item":
					self.handlers["spawn"]({
						sub_type: "item",
						id: item,
						sub_delay: duration,
						distance: distance,
						offset: angle
					}, {
						loc: shield_loc
					});
					break;

				// S_SPAWN_BUILD_OBJECT
				case "build_object":
					self.handlers["spawn"]({
						sub_type: "build_object",
						id: item,
						sub_delay: duration,
						distance: distance,
						offset: angle,
						ownerName: label[0],
						message: label[1]
					}, {
						loc: shield_loc
					});
					break;
			}
		}

		// Create a local timer if delay more that zero
		if (delay > 0) {
			this.dispatch.setTimeout(callback, delay,
				type, target, item, offsetAngle, offsetDistance, angle, distance, duration, label
			);
		} else {
			callback(type, target, item, offsetAngle, offsetDistance, angle, distance, duration, label);
		}
	}
}


/** HELPER FUNCTIONS **/

/**
 * Apply distance to specified binding point.
 *
 * @param   Integet  offsetDistance  Offset distance relative to binding point
 * @param   Integet  offsetAngle     Offset angle relative to binding point
 * @return  Object
 */
function applyDistance(loc, offsetDistance, offsetAngle) {
	const r = loc.w; //(loc.w / 0x8000) * Math.PI;
	const rads = (offsetAngle * Math.PI / 180);
	const finalrad = r - rads;

	loc.x += Math.cos(finalrad) * offsetDistance;
	loc.y += Math.sin(finalrad) * offsetDistance;

	return loc;
}


/** COMPAT FUNCTIONS **/

// Functions for compatibility with the old style of object spawning
const compat = {
	SpawnItem(item, angle, distance, delay, duration, ...args) {
		(new Spawn(...args)).item(item, angle, distance, delay, duration);
	},
	SpawnMarker(target, angle, distance, delay, duration, highlight, label, ...args) {
		(new Spawn(...args)).marker(target, angle, distance, delay, duration, highlight, label);
	},
	SpawnPoint(item, angle, distance, delay, duration, ...args) {
		(new Spawn(...args)).point(item, angle, distance, delay, duration);
	},
	SpawnVector(item, offsetAngle, offsetDistance, angle, length, delay, duration, ...args) {
		(new Spawn(...args)).vector(item, offsetAngle, offsetDistance, angle, length, delay, duration);
	},
	SpawnCircle(target, item, offsetAngle, offsetDistance, interval, radius, delay, duration, ...args) {
		(new Spawn(...args)).circle(target, item, offsetAngle, offsetDistance, interval, radius, delay, duration);
	},
	SpawnSemicircle(degree1, degree2, item, offsetAngle, offsetDistance, interval, radius, delay, duration, ...args) {
		(new Spawn(...args)).semicircle(degree1, degree2, item, offsetAngle, offsetDistance, interval, radius, delay, duration);
	},
	SpawnObject(type, target, item, offsetAngle, offsetDistance, angle, distance, delay, duration, label, ...args) {
		(new Spawn(...args)).object(type, target, item, offsetAngle, offsetDistance, angle, distance, delay, duration, label);
	}
};


/** EXPORTS **/

module.exports = Object.assign(compat, {
	HIGHLIGHT_ITEM,
	HIGHLIGHT_ITEM_BLUE,
	HIGHLIGHT_ITEM_PURPLE,
	HIGHLIGHT_ITEM_RED,
	MARKER_ITEM,
	Spawn,
	applyDistance
});